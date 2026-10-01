import Figure from "./Figure";
import { NAME_PARTS, PRODUCT } from "@/lib/product";
import { GlowField } from "@/components/Motion";

/* The dashboard host, derived from the product name - never hard-coded. */
const HOST = `app.${NAME_PARTS.base.toLowerCase()}.ai`;

/* ── Eight core operational modules of Averqentra AI ───────────────────────
 * Evidence → Analysis → Recommendation → Execution → Measurable Outcome
 * The intelligence & orchestration layer for healthcare transformation engagements. */
const MODULES = [
  {
    src: "/assets/averqentra-dashboard.png",
    label: "Dashboard",
    path: "/dashboard",
    title: "Executive command center for transformation engagements.",
    body: [
      "The Dashboard provides executive leaders with live insight across all healthcare transformation workstreams. It pairs four core executive KPIs (Discharge Before Noon, Average LOS, Validated Benefit, and Value at Risk) with AI-powered trend forecasting, patient flow unit heatmaps, initiative delivery pulses, and data extraction confidence metrics.",
    ],
    fields: ["discharge before noon", "average length of stay", "validated benefit", "value at risk", "patient flow heatmap"],
  },
  {
    src: "/assets/averqentra-engagement.jpg",
    label: "Engagement",
    path: "/engagement",
    title: "The operational setup and control record.",
    body: [
      "Engagement defines the operational foundation for healthcare consulting initiatives. It establishes active workstreams (Patient Flow, Workforce, Revenue Cycle), locks baseline KPI targets against future goals, manages formal data request lifecycles (Requested → Received → Validating → Accepted / Rejected), and enforces clear governance decision rights.",
    ],
    fields: ["workstream scope", "baseline kpis", "data request lifecycle", "governance matrix"],
  },
  {
    src: "/assets/averqentra-evidence.jpg",
    label: "Evidence",
    path: "/evidence",
    title: "Structured evidence intake with 100% source lineage.",
    body: [
      "Evidence converts unstructured clinical documents, EHR extracts, staffing rosters, and payer contracts into trusted, structured data. Featuring a 3-pane Document Inspector, it retains end-to-end lineage from original file page and cell to final extraction confidence while automatically validating data quality and masking PHI.",
    ],
    fields: ["structured extraction", "source lineage", "data validation", "sensitive data masking"],
  },
  {
    src: "/assets/averqentra-analysis.jpg",
    label: "Analysis",
    path: "/analysis",
    title: "Healthcare KPI engine & root cause matrix.",
    body: [
      "Analysis answers what is happening, where, and why across health systems down to facility, service line, and department levels. The Root Cause Matrix links KPI variances directly to underlying clinical records and AI diagnostics, distinguishing true operational bottlenecks from random variation.",
    ],
    fields: ["kpi registry", "drilldown analytics", "cohort comparison", "root cause matrix"],
  },
  {
    src: "/assets/averqentra-recommendations.png",
    label: "Recommendations",
    path: "/recommendations",
    title: "Evidence-backed operational interventions.",
    body: [
      "Recommendations converts diagnostic findings into concrete operational interventions (e.g. 08:30 Multidisciplinary Discharge-Readiness Huddle). Every recommendation explicitly details the finding addressed, target KPI improvements, scenario modeling, implementation risks, dependencies, and linked source evidence.",
    ],
    fields: ["finding addressed", "proposed intervention", "target kpi", "scenario modeling", "linked evidence"],
  },
  {
    src: "/assets/averqentra-delivery.png",
    label: "Delivery",
    path: "/delivery",
    title: "Turn approved recommendations into implemented change.",
    body: [
      "Delivery provides a real-time PMO board tracking approved initiatives across Planned, Active, At Risk, Validation, and Complete states. It assigns explicit operational owners, tracks prerequisite milestone dependencies, flags schedule risks via AI Delivery Intelligence, and verifies completion proof before closing out tasks.",
    ],
    fields: ["initiative kanban", "assigned owners", "milestone tracking", "dependency risks", "ai delivery risk"],
  },
  {
    src: "/assets/averqentra-outcomes.png",
    label: "Outcomes",
    path: "/outcomes",
    title: "Verify realized financial and operational benefit.",
    body: [
      "Outcomes evaluates baseline vs. target vs. current performance across defined post-implementation measurement windows. It features an inline AI Attribution Check to evaluate potential confounders (e.g., patient census shifts) before certifying realized value ($1.84M) into Verified, Partially Verified, or Pending states.",
    ],
    fields: ["outcome matrix", "baseline vs target", "realized benefit", "attribution check", "sustainability monitoring"],
  },
  {
    src: "/assets/averqentra-assurance.png",
    label: "Assurance",
    path: "/assurance",
    title: "Complete governance, traceability & auditability.",
    body: [
      "Assurance delivers complete compliance governance across all transformation activities. The 3-pane workspace links regulatory and policy requirements directly to authentic source documents, mapped policies, evidence artifacts, identified gaps, and remediation verification with full audit trails and RBAC controls.",
    ],
    fields: ["requirement mapping", "policy inspector", "ai evidence check", "gap remediation", "audit trail"],
  },
];

export default function Modules() {
  return (
    <section id="modules" className="relative overflow-hidden scroll-mt-24 bg-[var(--paper)]">
      <GlowField drift={50} />
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-8 sm:py-32">
        {/* ── Intro: headline left, warm paragraph set to the right ───────── */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.72fr)] lg:items-end lg:gap-16">
          <div>
            <span className="eyebrow">The 8 Operational Modules</span>
            <h2 className="h-section mt-6 max-w-[18ch] text-[clamp(2.1rem,4.4vw,3.5rem)] text-[var(--ink)]">
              Evidence to outcomes, <span className="h-em">orchestrated in one platform</span>.
            </h2>
          </div>
          <p className="max-w-[46ch] text-[16.5px] leading-[1.72] text-[var(--ink-soft)] lg:pb-2">
            What follows are real screens from {PRODUCT.name} - tracking healthcare transformation from evidence collection and diagnostic root cause analysis to frontline execution and verified financial realization.
          </p>
        </div>

        <div className="hair mt-14 sm:mt-16" />

        {/* ── Eight module threads (Mobile: swipeable horizontal carousel, Desktop: alternating rhythm) ── */}
        <div className="-mx-4 px-4 sm:-mx-8 sm:px-8 md:mx-0 md:px-0 mt-12 sm:mt-16 md:mt-16 flex md:block overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none scrollbar-none pb-6 md:pb-0 gap-6 md:space-y-20 lg:space-y-28">
          {MODULES.map((m, i) => {
            const plateRight = i % 2 === 1;
            return (
              <article
                key={m.label}
                className={`w-[88vw] max-w-[440px] flex-none snap-start flex flex-col justify-between rounded-[20px] sm:rounded-[24px] border border-[var(--line-2)] bg-[var(--card)] p-5 sm:p-7 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.04)] md:w-auto md:max-w-none md:flex-initial md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none md:grid md:gap-9 lg:items-center lg:gap-14 ${plateRight
                  ? "lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.85fr)] xl:grid-cols-[minmax(0,0.7fr)_minmax(0,2fr)]"
                  : "lg:grid-cols-[minmax(0,1.85fr)_minmax(0,0.85fr)] xl:grid-cols-[minmax(0,2fr)_minmax(0,0.7fr)]"
                  }`}
              >
                <div className={plateRight ? "lg:order-2" : ""}>
                  <Figure
                    src={m.src}
                    alt={`${PRODUCT.name} - ${m.label} module`}
                    url={`${HOST}${m.path}`}
                    lean={plateRight ? "right" : "left"}
                  />
                </div>

                <div className={`mt-5 md:mt-0 ${plateRight ? "lg:order-1" : ""}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="eyebrow">{m.label}</span>
                    <span className="font-label text-[11px] text-[var(--ink-mute)] md:hidden">
                      {String(i + 1).padStart(2, "0")} / {String(MODULES.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="h-section mt-4 md:mt-5 max-w-[26ch] sm:max-w-[28ch] text-[clamp(1.35rem,2.3vw,1.95rem)] text-[var(--ink)]">
                    {m.title}
                  </h3>
                  {m.body.map((p) => (
                    <p
                      key={p.slice(0, 24)}
                      className="mt-3.5 md:mt-4 max-w-[44ch] text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[var(--ink-soft)]"
                    >
                      {p}
                    </p>
                  ))}
                  <ul className="mt-4 md:mt-6 flex max-w-[44ch] flex-wrap gap-x-2 gap-y-2">
                    {m.fields.map((f) => (
                      <li
                        key={f}
                        className="font-label rounded-full border border-[var(--line)] bg-[var(--paper-2)] px-3 py-[5px] text-[11px] lowercase tracking-[0.04em] text-[var(--ink-mute)]"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
        <div className="mt-20 sm:mt-28 text-center">
          <a href="#contact" className="link-quiet">
            see these in action for your health system
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
