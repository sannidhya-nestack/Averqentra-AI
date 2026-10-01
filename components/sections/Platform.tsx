import { Fragment } from "react";
import Figure, { type CalloutPin } from "./Figure";
import { NAME_PARTS, PRODUCT } from "@/lib/product";

/* Same derivation the Modules showcase uses - the plate's chrome URL follows
   the product name instead of hard-coding it. */
const HOST = `app.${NAME_PARTS.base.toLowerCase()}.ai`;

/* Word by word - headline for Averqentra AI central dashboard */
const HEADLINE: { t: string; em?: boolean }[] = [
  { t: "Executive" },
  { t: "Command" },
  { t: "Center" },
  { t: "For" },
  { t: "Healthcare" },
  { t: "Transformation.", em: true },
];

/* Callout pins anchored on the actual averqentra-dashboard.png screenshot */
const pins: CalloutPin[] = [
  {
    id: "discharge-kpi",
    label: "Discharge Before Noon",
    title: "Discharge Before Noon (31.6%)",
    anchor: { x: 0.27, y: 0.18 },
    label_at: { x: 0.32, y: 0.18 },
    side: "right",
    description:
      "Primary operational throughput metric showing +11.8 points improvement, forecasting toward the 34.0% target.",
  },
  {
    id: "value-at-risk",
    label: "Value At Risk",
    title: "Value At Risk ($0.26M)",
    anchor: { x: 0.87, y: 0.18 },
    label_at: { x: 0.81, y: 0.18 },
    side: "left",
    description:
      "Identifies unverified benefit and operational demand effects requiring immediate attention.",
  },
  {
    id: "forecast-chart",
    label: "Discharge Forecast",
    title: "Discharge Performance Forecast",
    anchor: { x: 0.38, y: 0.46 },
    label_at: { x: 0.44, y: 0.46 },
    side: "right",
    description:
      "Actual vs. AI Forecast vs. Target trajectory showing month-by-month throughput progression from 19.8% to 34.0%.",
  },
  {
    id: "ai-brief",
    label: "AI Recommendations",
    title: "AI Recommendations Brief",
    anchor: { x: 0.85, y: 0.82 },
    label_at: { x: 0.79, y: 0.82 },
    side: "left",
    description:
      "Surfaces actionable priorities: pharmacy escalation, census effect validation, and East-2 targeting.",
  },
];

/* Core Transformation Impact figures */
const figures = [
  {
    v: "31.6%",
    l: "discharge before noon",
    note: "+11.8 pts improvement toward 34.0% target",
  },
  {
    v: "5.2 days",
    l: "average length of stay",
    note: "0.5 days lower than baseline (target gap 0.1d)",
  },
  {
    v: "$1.84M",
    l: "validated benefit",
    note: "87.6% of expected $2.10M annualized value",
  },
  {
    v: "100%",
    l: "evidence lineage",
    note: "complete traceability from dataset to verified outcome",
  },
];

export default function Platform() {
  return (
    <section id="platform" className="scroll-mt-24 bg-[var(--paper)]">
      <div className="mx-auto max-w-[1320px] px-4 py-16 sm:px-8 sm:py-32">
        {/* Header */}
        <div className="flex items-center justify-between gap-6 border-t border-[var(--line)] pt-5">
          <span className="eyebrow">the executive dashboard</span>
          <span className="font-label text-[11px] tracking-[0.06em] text-[var(--ink-mute)]">
            transformation command center
          </span>
        </div>

        <div className="mt-9 grid gap-9 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <h2 className="h-section word-reveal max-w-[20ch] text-[clamp(2.1rem,5vw,3.9rem)] text-[var(--ink)]">
            {HEADLINE.map((w, i) => (
              <Fragment key={`${w.t}-${i}`}>
                <span
                  className={`word${w.em ? " h-em" : ""}`}
                  style={{ ["--i" as string]: i }}
                >
                  {w.t}
                </span>{" "}
              </Fragment>
            ))}
          </h2>
          <p className="max-w-[44ch] text-[16.5px] leading-[1.7] text-[var(--ink-soft)] lg:pb-2">
            The {PRODUCT.name} Executive Dashboard anchors your healthcare transformation engagements. It connects live executive KPIs, patient flow unit heatmaps, AI discharge forecasts, and evidence confidence scores into one unified command center.
          </p>
        </div>

        {/* The screenshot plate */}
        <div className="mt-14">
          <Figure
            src="/assets/averqentra-dashboard.png"
            alt={`${PRODUCT.name} - Executive Command Center Dashboard`}
            url={`${HOST}/dashboard`}
            callouts={pins}
            tilt
            priority
          />
        </div>

        {/* Real numbers */}
        <div className="-mx-4 px-4 sm:-mx-8 sm:px-8 md:mx-0 md:px-0 mt-14 sm:mt-16 overflow-x-auto md:overflow-visible scrollbar-none pb-4 md:pb-0">
          <dl className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-x-8 md:gap-y-9 lg:gap-x-0 lg:gap-y-0 snap-x snap-mandatory md:snap-none border-t border-[var(--line)] pt-8 sm:pt-9">
            {figures.map((f, i) => (
              <div
                key={f.l}
                className={`w-[78vw] max-w-[280px] sm:w-[320px] sm:max-w-none md:w-auto md:flex-initial flex-none snap-start rounded-[16px] border border-[var(--line-2)] bg-[var(--paper-2)]/60 p-5 md:rounded-none md:border-none md:bg-transparent md:p-0 flex flex-wrap items-baseline gap-x-4 gap-y-2 lg:px-6 xl:px-8 ${
                  i === 0 ? "lg:pl-0" : "lg:border-l lg:border-[var(--line)]"
                } ${i === figures.length - 1 ? "lg:pr-0" : ""}`}
              >
                <dt className="font-display tnum text-[clamp(1.85rem,3.2vw,2.5rem)] leading-none tracking-[-0.03em] text-[var(--ink)]">
                  {f.v}
                </dt>
                <dd className="eyebrow mute">{f.l}</dd>
                <dd className="w-full text-[13px] leading-snug text-[var(--ink-soft)]">
                  {f.note}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
