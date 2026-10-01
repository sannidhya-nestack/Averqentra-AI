import { Check, Cloud, ShieldCheck } from "lucide-react";
import { PRODUCT } from "@/lib/product";

/* ─────────────────────────────────────────────────────────────────────────
 * ONBOARDING - "What your onboarding fee covers" for Averqentra AI.
 * ───────────────────────────────────────────────────────────────────────── */

const FEES = {
  essential: "$1,000+",
  plus: "$2,500+",
  enterprise: "$5,000+",
} as const;

const DEPLOYMENT = [
  {
    key: "Managed Cloud (SaaS)",
    icon: Cloud,
    body:
      "Runs in managed cloud infrastructure-the fastest way for healthcare consulting firms and transformation teams to deploy across engagements.",
  },
  {
    key: "Private Cloud / Self-Hosted",
    icon: ShieldCheck,
    body:
      "Deployed inside your health system's own infrastructure (AWS, Azure, GCP, or on-prem) with strict tenant isolation, PHI blurring, HIPAA compliance, and custom audit trails.",
  },
] as const;

const TIERS = [
  {
    key: "Essential",
    fee: FEES.essential,
    featured: false,
    opener: undefined as string | undefined,
    features: [
      "Kickoff call with engagement executive to map workstreams (Patient Flow, Workforce, Revenue Cycle)",
      "Averqentra AI workspace provisioned with role-based access for consultants and client leads",
      "Baseline KPI Target Registry configuration (LOS, Discharge Before Noon, Overtime, ED Boarding)",
      "Data Request lifecycle management setup (Requested → Received → Validating → Accepted / Rejected)",
      "Evidence intake templates configured for ADT extracts, census files, and staffing rosters",
      "Live-readiness walkthrough and engagement handbook before launch",
    ],
  },
  {
    key: "Plus",
    fee: FEES.plus,
    featured: true,
    opener: "Everything in Essential, plus:",
    features: [
      "Guided ingestion and structured extraction of historic clinical & operational datasets",
      "Automated evidence lineage tracking from raw file cells to diagnostic Findings",
      "Analysis module configuration with custom metric definition formulas and exclusions",
      "Recommendation Builder and Scenario Modeling workspace setup (REC-001)",
      "Delivery Board (Kanban) workflow integration for initiative execution tracking",
      "Dedicated transformation onboarding specialist through project kickoff",
    ],
  },
  {
    key: "Enterprise",
    fee: FEES.enterprise,
    featured: false,
    opener: "Everything in Plus, plus:",
    features: [
      "Multi-facility, multi-tenant deployment across large health system portfolios",
      "Custom EHR/HIS/ERP API pipelines, SSO authentication, and HIPAA BAA execution",
      "AI Attribution Check model calibration against hospital volume and seasonal confounders",
      "Assurance Workspace setup linking policy requirements directly to evidence artifacts",
      "Executive reporting export templates and custom KPI registry governance",
      "Dedicated engagement manager with committed SLAs and post-launch audit support",
    ],
  },
] as const;

export default function Onboarding() {
  return (
    <section
      id="onboarding"
      className="scroll-mt-24 border-b border-[var(--line)] bg-[var(--paper)]"
    >
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-28">
        {/* ── header ──────────────────────────────────────────────────────── */}
        <div className="max-w-[600px]">
          <span className="eyebrow">onboarding & setup</span>
          <h2 className="h-section mt-5 text-[clamp(1.95rem,3.8vw,3.15rem)] text-[var(--ink)]">
            What your onboarding fee covers
          </h2>
          <p className="mt-6 max-w-[54ch] text-[15.5px] leading-[1.7] text-[var(--ink-soft)]">
            A structured setup that gets your healthcare transformation team fully operational - establishing workstreams, setting locked baseline KPIs, connecting evidence sources, and configuring all 8 {PRODUCT.name} modules.
          </p>
        </div>

        {/* ── three cumulative tiers ── */}
        <div className="-mx-4 px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0 mt-12 sm:mt-14 overflow-x-auto lg:overflow-visible scrollbar-none pb-4 lg:pb-0">
          <div className="flex lg:grid lg:grid-cols-3 gap-6 snap-x snap-mandatory lg:snap-none">
            {TIERS.map(({ key, fee, featured, opener, features }) => (
              <div
                key={key}
                className={
                  "card flex flex-col p-6 xl:p-8 w-[85vw] max-w-[340px] flex-none sm:w-[360px] sm:max-w-none lg:w-auto lg:flex-1 snap-start" +
                  (featured ? " ring-1 ring-[var(--brand)]" : "")
                }
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-[21px] leading-none tracking-[-0.02em] text-[var(--ink)]">
                    {key}
                  </h3>
                  {featured ? (
                    <span className="inline-flex items-center rounded-full bg-[var(--tint)] px-3 py-1 font-label text-[10px] tracking-[0.06em] text-[var(--brand-d)]">
                      most chosen
                    </span>
                  ) : null}
                </div>

                <div className="mt-5 flex items-baseline gap-2 font-display text-[var(--ink)]">
                  <span className="text-[clamp(1.8rem,3vw,2.4rem)] leading-none">
                    {fee}
                  </span>
                  <span className="font-body text-[13px] font-medium text-[var(--ink-mute)]">
                    one-time
                  </span>
                </div>

                <div className="hair my-7" />

                {opener ? (
                  <p className="mb-4 text-[13.5px] font-medium text-[var(--ink)]">
                    {opener}
                  </p>
                ) : null}

                <ul className="flex flex-col gap-3.5">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-[3px] grid size-[19px] flex-none place-items-center rounded-full bg-[var(--tint)]">
                        <Check size={11} strokeWidth={3} className="text-[var(--brand-d)]" />
                      </span>
                      <span className="text-[14.5px] leading-[1.55] text-[var(--ink-soft)]">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── deployment options ── */}
        <div className="mt-14 sm:mt-16 overflow-hidden rounded-[14px] border border-[var(--line)] bg-[var(--paper-2)]">
          <div className="border-b border-[var(--line)] px-6 py-4 sm:px-8">
            <span className="eyebrow">deployment architecture</span>
            <p className="mt-2 max-w-[64ch] text-[13.5px] leading-[1.6] text-[var(--ink-mute)]">
              Two deployment options for {PRODUCT.name} - managed cloud or isolated private tenant.
            </p>
          </div>
          <div className="overflow-x-auto sm:overflow-visible scrollbar-none">
            <div className="flex sm:grid sm:grid-cols-2 gap-px bg-[var(--line)] snap-x snap-mandatory sm:snap-none">
              {DEPLOYMENT.map(({ key, icon: Icon, body }) => (
                <div key={key} className="w-[85vw] max-w-[340px] flex-none sm:w-auto sm:max-w-none sm:flex-1 snap-start bg-[var(--paper-2)] px-6 py-7 sm:px-8">
                  <div className="flex items-center gap-3">
                    <span className="grid size-[34px] flex-none place-items-center rounded-full bg-[var(--tint)]">
                      <Icon size={16} strokeWidth={2} className="text-[var(--brand-d)]" />
                    </span>
                    <h3 className="font-display text-[17px] leading-none tracking-[-0.02em] text-[var(--ink)]">
                      {key}
                    </h3>
                  </div>
                  <p className="mt-4 text-[14px] leading-[1.65] text-[var(--ink-soft)]">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
