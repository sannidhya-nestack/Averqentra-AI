# Pricing API contract - paste this into every product-page build

Every demo landing page shows **one** price. That number is **not** written into
the page - it is read at request time from the Nestack admin API, so an admin can
change a demo's price from the Nestack dashboard and the live page updates within
~a minute. This doc is the complete, copy-paste spec. Give it to the agent that
builds a template; the criticizer test at the bottom enforces it.

The `$` and `/mo` are fixed. Only the number is data. Default is **200**.

---

## 0. The source of truth already exists (do NOT rebuild it)

The Nestack app (`E:\agentic-builder-thanos-snap`, the "agent builder") owns it:

- **Table** `nestack_agents.product_pricing (insub_id PK, price_usd DEFAULT 200, live_url, updated_at)`
- **Public endpoint** `GET /api/product-price/<insub_id>` → `{ insubId, priceUsd, currency:"USD", period:"mo" }`
  - Public, CORS-open, short-cached. Returns `200` when the sub-industry has no row.
- **Admin editor** `/admin/product-pricing` - a table of all demos with a **View live product site** button and an inline price field. Superadmin + reviewer.

A template **never** touches the database or holds DB credentials. It only fetches
the endpoint above. This mirrors how templates already pull screenshots from
`/api/bucket-image/<insub>`.

---

## 1. Register the demo (once per template)

Insert (or upsert) a row so the admin can see and price it:

```sql
INSERT INTO nestack_agents.product_pricing (insub_id, price_usd, live_url, updated_at)
     VALUES ('<INSUB_ID>', 200, NULL, NOW())
ON DUPLICATE KEY UPDATE updated_at = NOW();
```

Set `live_url` after deploy (or from the admin) so **View live product site** works.

---

## 2. The single Pricing component (`components/sections/Pricing.tsx`)

A **Server Component** (fetches server-side, so no CORS and no DB creds). Keep the
shape exactly - the test checks for it. Style it in the template's OWN design
language; only the marked bits are load-bearing.

```tsx
import Link from "next/link";

const INSUB_ID = "<INSUB_ID>";          // ← this demo's sub-industry id
const DEFAULT_PRICE_USD = 200;          // ← the ONLY hard number allowed (fallback)

async function getPrice(): Promise<number> {
  const base = process.env.NEXT_PUBLIC_NESTACK_API;
  if (!base) return DEFAULT_PRICE_USD;
  try {
    const res = await fetch(`${base}/api/product-price/${INSUB_ID}`, {
      next: { revalidate: 60 },          // near-live; never a blank price
    });
    if (!res.ok) return DEFAULT_PRICE_USD;
    const data = (await res.json()) as { priceUsd?: number };
    return Number(data.priceUsd) > 0 ? Number(data.priceUsd) : DEFAULT_PRICE_USD;
  } catch {
    return DEFAULT_PRICE_USD;
  }
}

export default async function Pricing() {
  const price = await getPrice();
  return (
    <section id="pricing" /* …template styling… */>
      {/* “Starting at” label - fixed text */}
      <span>Starting at</span>

      {/* THE PRICE - must render the {price} VARIABLE, never a literal */}
      <span className="/* big display */">
        $<span data-price data-price-source="api">{price}</span>
      </span>
      <span>/mo</span>

      {/* CTA - label “Know more”, must link to #contact (book a demo) */}
      <Link href="#contact">Know more</Link>
    </section>
  );
}
```

**Load-bearing (the test enforces all of these):**

1. `INSUB_ID = "insub_…"` set to this demo.
2. Fetches `` `${NEXT_PUBLIC_NESTACK_API}/api/product-price/${INSUB_ID}` ``.
3. The price is the **`{price}` variable** inside a `[data-price] data-price-source="api"` element - **never** a literal number.
4. Fallback constant `DEFAULT_PRICE_USD = 200` is the only hard-coded number.
5. CTA text **“Know more”**, `href="#contact"`.

Keep it to **one** price block per page - no tiers.

---

## 3. The API host (hardcoded - NO env var)

`lib/nestack.ts` hardcodes the base. **Never introduce `NEXT_PUBLIC_NESTACK_API`
or any other env var.**

```ts
export const NESTACK_API = "https://www.nestack.ai";
```

Use the **`www`** host, not the apex. `https://nestack.ai` 307-redirects to
`www.nestack.ai` and **the redirect response carries no `Access-Control-Allow-Origin`
header**, so a browser `fetch()` to the apex aborts at the redirect - the module
picker and booking calendar come back **empty**. `https://www.nestack.ai` returns
`200` with `Access-Control-Allow-Origin: *` directly (no redirect). `getPrice()` is
server-side so pricing survives the apex, but the client calls do not - always use
`www`.

---

## 4. The criticizer test (`scripts/pricing.test.mjs`)

Ship the file verbatim (it is design-agnostic). It has two layers:

- **Static** (always): asserts the component fetches the endpoint, renders
  `{price}` (not a literal), marks `data-price-source="api"`, and points the CTA
  at `#contact`. Catches a hard-coded / botched price.
- **Runtime sentinel** (when `PRICING_TEST_PAGE_URL` + `PRICING_TEST_SENTINEL`
  are set): fetches the running page and asserts the sentinel the endpoint was
  made to return actually renders in `[data-price]`. A hard-coded price can
  never satisfy this - it is the decisive check.

Run: `node scripts/pricing.test.mjs` (exit 0 = pass, 1 = fail with reasons).

---

## 5. Pipeline: criticizer + healing loop

After the build step, the pipeline runs the criticizer:

```
1. Build the template.
2. Static test:   node scripts/pricing.test.mjs
3. Runtime test:  start the built app with NEXT_PUBLIC_NESTACK_API pointed at a
                  mock (or the real endpoint) returning a SENTINEL (e.g. a random
                  4-digit number). Then:
                  PRICING_TEST_PAGE_URL=<url> PRICING_TEST_SENTINEL=<n> \
                    node scripts/pricing.test.mjs
4. PASS  → stop-loop; proceed to the next pipeline step.
   FAIL  → healing-loop: feed the test's stderr (the exact failed assertions)
           back to the builder agent → it fixes Pricing.tsx → rebuild → rerun.
           Cap at N attempts (e.g. 3); if still failing, mark the run failed.
```

Because the failure output names the exact broken invariant ("renders a
hard-coded number", "CTA not linked to #contact", "sentinel 4242 did not
render"), the healing agent has a precise, testable target each round.
