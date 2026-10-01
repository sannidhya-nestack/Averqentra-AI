"use client";

import { PRODUCT } from "@/lib/product";

/* ─────────────────────────────────────────────────────────────────────────
 * TRADITIONAL SaaS VS AI ORCHESTRATION - editorial side-by-side comparison
 * LEFT: Traditional SaaS (linear, closed, single model constraint)
 * RIGHT: Averqentra AI Routed transformation flow (multi-model task-based routing)
 * ───────────────────────────────────────────────────────────────────────── */

interface StepRoute {
  n: string;
  title: string;
  desc: string;
  model: string;
  modelBadge: string;
  service: string;
}

const ROUTED_STEPS: StepRoute[] = [
  {
    n: "01",
    title: "Parse hospital ADT extracts & scanned policy docs",
    desc: "Layout-aware OCR extracts clinical timestamps, census logs, and policy sections into structured formats.",
    model: "Mistral",
    modelBadge: "M",
    service: "Document AI / OCR",
  },
  {
    n: "02",
    title: "Classify raw datasets into structured evidence",
    desc: "A fine-tuned classifier categorizes claims, staffing rosters, and census files into validated evidence types.",
    model: "Hugging Face",
    modelBadge: "HF",
    service: "Inference Providers",
  },
  {
    n: "03",
    title: "Analyze 12-month patient flow trends across units",
    desc: "Long context analyzes long-term inpatient throughput, identifying bottlenecks in specific hospital units like East-2.",
    model: "Gemini",
    modelBadge: "G",
    service: "Gemini API",
  },
  {
    n: "04",
    title: "Extract structured KPIs into locked registry schema",
    desc: "Constrained decoding outputs precise KPI metrics (Discharge Before Noon, LOS, Overtime) to prevent schema drift.",
    model: "OpenAI",
    modelBadge: "AI",
    service: "Responses API",
  },
  {
    n: "05",
    title: "Draft evidence-backed recommendation & intervention plan",
    desc: "Constructs actionable interventions (REC-001) citing exact underlying diagnostic findings and target KPI trajectories.",
    model: "Claude",
    modelBadge: "A",
    service: "Anthropic Messages API",
  },
  {
    n: "06",
    title: "Run inline AI scope checks & validate data consistency",
    desc: "Evaluates missing baselines, data request gaps, and validation anomalies across thousands of records in parallel.",
    model: "DeepSeek",
    modelBadge: "DS",
    service: "DeepSeek API",
  },
  {
    n: "07",
    title: "Match interventions to CMS CoP & hospital policy guidelines",
    desc: "Vector embeddings and reranking align operational recommendations directly with regulatory compliance standards.",
    model: "Cohere",
    modelBadge: "C",
    service: "Rerank + Embed",
  },
  {
    n: "08",
    title: "Mask PHI & blur organizational identities locally",
    desc: "A self-hosted open model runs inside your VPC, masking patient IDs, MRNs, and manager names before external processing.",
    model: "Llama",
    modelBadge: "L",
    service: "Self-hosted in your VPC",
  },
];

export default function OrchestrationComparison() {
  return (
    <section id="orchestration" className="scroll-mt-24 bg-[var(--paper)]">
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-[100px]">
        {/* Header Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.62fr)] lg:items-end lg:gap-[60px]">
          <div>
            <span className="eyebrow">Traditional SaaS vs {PRODUCT.name}</span>
            <h2 className="h-section mt-2 max-w-[16ch] text-[clamp(2.1rem,4.8vw,3.6rem)] text-[var(--ink)]">
              Multi-model AI orchestration for healthcare.
            </h2>
          </div>
          <p className="text-[16px] leading-[1.6] text-[var(--ink-soft)]">
            Traditional software locks you into one model. {PRODUCT.name} places an intelligent orchestration layer between healthcare evidence and multi-model AI, ensuring every transformation step runs on optimal AI infrastructure.
          </p>
        </div>

        {/* Side-by-Side Comparison Container */}
        <div className="mt-10 sm:mt-[60px] grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,290px)_minmax(0,1fr)]">
          {/* LEFT: Traditional SaaS */}
          <div className="card-inset flex flex-col border border-[var(--line-2)] rounded-[var(--radius-lg)] overflow-hidden">
            <div className="px-4 py-3.5 sm:px-5 sm:py-4 border-b border-[var(--line-2)]">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-[var(--ink-mute)]">
                Traditional SaaS / BI
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
              <div className="grid min-h-[180px] sm:min-h-[210px] flex-1 place-items-center rounded-[var(--radius-md)] bg-[#e9e6e0] px-4 py-8 sm:py-10">
                <span className="text-center text-[19px] leading-[1.35] tracking-[-0.02em] text-[var(--ink-mute)]">
                  Data → Dashboard
                  <br />
                  <span className="text-[13px] opacity-70">Disconnected tasks & decks</span>
                </span>
              </div>
              <p className="text-[15px] leading-[1.55] text-[var(--ink-soft)]">
                Static charts and disconnected slide decks with no evidence lineage to verified outcomes.
              </p>
              <p className="mt-auto max-w-[18ch] text-[18px] sm:text-[19px] font-medium leading-[1.25] tracking-[-0.02em] text-[var(--ink)]">
                Disconnected execution.
              </p>
            </div>
          </div>

          {/* RIGHT: Averqentra AI Transformation Flow */}
          <div className="card overflow-hidden border border-[var(--line-2)] rounded-[var(--radius-lg)]">
            <div className="flex items-center bg-[var(--navy)] px-4 py-3.5 sm:px-6 sm:py-4">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-white/85">
                {PRODUCT.name} &middot; Transformation Intelligence Flow
              </span>
            </div>

            <ul>
              {ROUTED_STEPS.map((step, idx) => (
                <li
                  key={step.n}
                  className={`grid grid-cols-[28px_minmax(0,1fr)] gap-x-3 px-4 py-4 sm:grid-cols-[36px_minmax(0,1fr)_auto] sm:gap-x-5 sm:px-6 sm:py-5 ${
                    idx > 0 ? "border-t border-[var(--line)]" : ""
                  }`}
                >
                  <span className="pt-1 font-mono text-[11px] font-bold text-[var(--brand)]">
                    {step.n}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-[17px] sm:text-[18px] text-[var(--ink)] font-normal">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 max-w-[52ch] text-[14.5px] sm:text-[15px] leading-[1.5] text-[var(--ink-soft)]">
                      {step.desc}
                    </p>
                  </div>
                  <div className="col-start-2 mt-3 flex flex-col items-start gap-1.5 sm:col-start-3 sm:mt-0 sm:w-[160px] md:w-[180px] sm:items-stretch">
                    <span className="inline-flex items-center gap-2 rounded-[4px] bg-[var(--navy)] px-3 py-2 text-[13.5px] sm:text-[14px] font-medium text-white">
                      <span
                        className="grid h-5 w-5 flex-none place-items-center rounded-[2px] bg-[var(--brand)] text-[9.5px] font-semibold tracking-tight text-white"
                        aria-hidden="true"
                      >
                        {step.modelBadge}
                      </span>
                      {step.model}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-mute)]">
                      {step.service}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-2 bg-[var(--brand)] px-4 py-3.5 sm:px-6 sm:py-4">
              <span className="text-[17px] sm:text-[18px] font-medium tracking-[-0.02em] text-white font-display">
                Evidence → Verified Outcome
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.08em] sm:tracking-[0.1em] text-white/85 break-words">
                100% Lineage &middot; $1.84M Realized Benefit &middot; 0 Unverified Claims
              </span>
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-[76ch] text-[13.5px] leading-[1.55] text-[var(--ink-mute)]">
          Model and product names are trademarks of their respective owners, used here to describe the multi-model architecture powering Averqentra AI.
        </p>
      </div>
    </section>
  );
}
