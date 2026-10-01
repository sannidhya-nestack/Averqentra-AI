# Task: backfill `email_points_json` for every already-shipped product landing page

Hand this whole file to the developer agent that works in the product-landing repos.
It is self-contained - it does not assume the agent has seen the builder pipeline.

---

## What you are doing and why

Every sub-industry we ship gets a product landing page at `https://<slug>.nestack.ai`.
The outbound-email system needs, per product, **five points describing what the product
handles** plus **one line of context** about the workflow problem it sits on. Those go into
the campaign email's "What it handles" bullet list and its "What we built" paragraph.

New builds now produce this automatically at the end of the build pipeline. **The ~32
products that shipped before that step existed have nothing**, and that is what you are
filling in.

The single most important rule: **the points must describe the page that is actually live.**
A prospect receives the email and clicks through to `live_url`. Anything the points claim
that the page does not show is a contradiction they will see. So you read the *shipped repo*,
not any spec or design doc.

---

## Inputs

Connect to MySQL with the standard credentials (`DB_HOST` / `DB_USER` / `DB_PASSWORD` /
`DB_NAME`). Your worklist:

```sql
SELECT pp.insub_id, pp.product_name, pp.live_url, plr.github_repo_link
  FROM product_pricing pp
  LEFT JOIN product_landing_runs plr ON plr.insub_id = pp.insub_id
 WHERE pp.product_name IS NOT NULL AND pp.product_name <> ''
   AND pp.live_url LIKE 'https://%'
   AND pp.email_points_json IS NULL          -- resumable: already-done rows drop out
 ORDER BY pp.insub_id;
```

For the module names, per `insub_id`:

```sql
SELECT page_no, nav_label, nav_kind
  FROM bucket_dashboard_pages
 WHERE insub_id = ? ORDER BY page_no;

SELECT JSON_EXTRACT(spec_json, '$.sidebarTree.primary') AS primary_modules,
       JSON_EXTRACT(spec_json, '$.sidebarTree.groups')  AS group_modules
  FROM bucket_dashboards WHERE insub_id = ?;
```

Write those into `work/pages.json` (an array of `{page_no, nav_label, nav_kind}`) and
`work/spec.json` (the full `spec_json` object) inside the cloned repo - the validator reads
both from those exact paths.

---

## Per product, do this

1. **Clone** `github_repo_link` into a scratch directory. If it is null or the clone fails,
   record the failure and move on - do not guess the repo name.
2. **Write `work/pages.json` and `work/spec.json`** from the queries above.
3. **Copy the validator in.** It lives at `_guardrails/scripts/email-points.mjs` on `main`
   of `Template-Product-Landing-Automation`. Put it at `scripts/email-points.mjs` in the
   clone. **Do not modify it** - it is the definition of done, and it is the same file the
   live pipeline runs.
4. **Read the shipped page.** Find the central content file (usually `lib/data.ts`) and the
   section components. Read `lib/product.ts` for the brand. This is your source for what the
   product claims.
5. **Write `work/email-points.json`** to the contract below.
6. **Run** `node scripts/email-points.mjs <insub_id>`. It prints numbered failures. Fix the
   JSON and re-run until it prints `OK`. **Up to 4 attempts**; if it still fails, skip this
   product, record why, and move on. Never edit the validator to make it pass.
7. **Store it**, only after the validator passes:

```bash
B64=$(base64 -w0 work/email-points.json)
mysql -h "$DB_HOST" -u "$DB_USER" "$DB_NAME" --default-character-set=utf8mb4 -e "
  UPDATE product_pricing
     SET email_points_json = CAST(CONVERT(FROM_BASE64('$B64') USING utf8mb4) AS JSON),
         email_points_at   = NOW()
   WHERE insub_id = '<insub_id>';"
```

Base64, not string interpolation: the points are prose full of apostrophes, and this is the
one place that text meets the database. Then verify it landed:

```sql
SELECT JSON_LENGTH(email_points_json, '$.points') FROM product_pricing WHERE insub_id='<insub_id>';
-- must return 5
```

8. **Delete the clone** and move to the next product.

Process them one at a time. A failure on one product must never stop the rest.

---

## The contract

One JSON object at `work/email-points.json`. No markdown fence, no prose around it.

```json
{
  "version": 1,
  "insub_id": "insub_CO009",
  "product_name": "BidQuarry.AI",
  "live_url": "https://bidquarry.nestack.ai",
  "product_line": "BidQuarry.AI turns project documents into structured, estimating-ready data.",
  "build_context": "Estimating teams still read RFPs, drawings, specifications and subcontractor bids by hand to pull out scope, quantities, exclusions and risks before pricing can begin.",
  "input_artifacts": ["project drawings", "RFPs", "scopes of work", "specifications"],
  "integration_targets": ["estimating tools", "spreadsheets", "CRM"],
  "points": [
    { "label": "Bid Document Extraction", "line": "extracts scope, requirements, dates, exclusions, and line items from the bid package.", "modules": ["Bid Document Extraction"], "arc": "intake" },
    { "label": "Blueprint Takeoff",       "line": "identifies relevant assemblies, quantities, and drawing references for estimator review.", "modules": ["Blueprint Takeoff Automation"], "arc": "extract" },
    { "label": "Bid Risk Review",         "line": "flags scope gaps, conflicting requirements, exclusions, and items needing attention.", "modules": ["Bid Analysis Assistant", "Compliance Permit Assurance"], "arc": "verify" },
    { "label": "Cost Estimating",         "line": "drafts preliminary estimates from extracted scope, unit costs, and estimator assumptions.", "modules": ["Cost Estimating Copilot", "Quote and Proposal Generator"], "arc": "analyze" },
    { "label": "Estimating-Ready Output", "line": "structures validated scope, quantities, and pricing into your existing estimating tools.", "modules": ["Document Invoice Digitization"], "arc": "deliver" }
  ],
  "generated_at": "2026-08-28T09:00:00Z"
}
```

That example is real - it validates against `insub_CO009`. Use it as your model.

### Field rules

| Field | Rule |
|---|---|
| `product_line` | One sentence, 6-20 words, names the brand exactly once, ends with a full stop. Compress the page's own hero subheadline. |
| `build_context` | One line, 12-45 words, describing **the customer's** workflow moment: what they handle by hand and what it **blocks**. No "we"/"our". Must contain a blocking clause ("before pricing can begin"). This is what the mail generator reads to write "What we built". |
| `input_artifacts` | 2-6 documents/objects the product reads, in the customer's words. |
| `integration_targets` | 2-5 places the output lands. |
| `points` | **Exactly 5.** Never four, never six. |
| `points[].label` | 1-4 words, ≤34 chars, says what it *does*. Strip filler nouns - "Bid Analysis Assistant" → "Bid Risk Review". |
| `points[].line` | Starts lower-case with a present-tense verb, then 3-5 concrete comma-separated nouns. 8-22 words, ends with a full stop. **Every point uses a different verb.** |
| `points[].modules` | 1-4 module names, **verbatim** from `pages.json` / `spec.json`. |
| `points[].arc` | One of `intake` / `extract` / `verify` / `analyze` / `deliver`. |

### Choosing the five

Most products have more modules than points. **Combine** closely related modules into one
point and list them all in `modules` - do not drop them. Across the five points, cover at
least five distinct modules.

The five must **trace the workflow**, not list features: `intake → extract → verify →
analyze → deliver`. Use at least three distinct arc stages, and **exactly one** point with
arc `deliver` - the one saying where the output lands. That final point is the only one
allowed to address the reader ("...into **your** existing tools"). Order the points along
the arc.

### Hard rules

- **No numbers, percentages, durations, or quantity claims anywhere.** No "up to", "proven",
  "on average", "customers see", "three times faster". These emails carry no statistics.
  (`3D`, `B2B`, `24/7`, `ISO 9001` are fine - they are vocabulary, not claims.)
- **No marketing adjectives**: powerful, seamless, intelligent, advanced, robust,
  world-class, next-gen, best-in-class.
- **Never mention Nestack**, insub ids, bucket ids, or file names.
- **Never name a capability the shipped page does not show.**

---

## When you finish

Report a table of `insub_id | product_name | done / failed | reason if failed`, and the
final counts from:

```sql
SELECT COUNT(*) shipped, SUM(has_email_points) with_points
  FROM product_pricing
 WHERE product_name IS NOT NULL AND live_url LIKE 'https://%';
```

Do not commit anything to the product repos - this task only writes to the database.
