import { PRODUCT } from "@/lib/product";
import { ArchMorph, CurveField, GlowField, Reveal } from "@/components/Motion";

/* ─────────────────────────────────────────────────────────────────────────
 * HOW IT WORKS - an unhurried, editorial process sequence for Averqentra AI.
 * ───────────────────────────────────────────────────────────────────────── */

const steps = [
  {
    n: "01",
    i: "one",
    t: "Evidence Intake & Automated Data Processing",
    d: `Raw healthcare datasets (ADT, census, staffing rosters, claims extracts, policies) are ingested into the platform. Averqentra AI classifies, validates, and extracts structured metrics while preserving 100% source lineage down to original file cells and masking sensitive PHI.`,
  },
  {
    n: "02",
    i: "two",
    t: "Diagnostic Analysis & Evidence-Backed Interventions",
    d: `Transformation leads and analysts evaluate root cause matrices, drilling down to specific facilities and departments (such as East-2 inpatient length of stay). Validated findings automatically generate structured recommendations (e.g. REC-001) complete with target KPIs, effort scores, and scenario modeling.`,
  },
  {
    n: "03",
    i: "three",
    t: "Frontline Delivery & Outcome Benefit Verification",
    d: `Operational leads execute approved initiatives on real-time PMO delivery boards. Inline AI Delivery Intelligence flags milestone risks before delays occur, while the Outcomes module validates baseline vs target performance across post-implementation measurement windows.`,
  },
];

const headPlain = "A seamless workflow,".split(" ");
const headEm = "from evidence to verified value.".split(" ");

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative overflow-hidden scroll-mt-24 border-y border-[var(--line)] bg-[var(--paper-2)]"
    >
      <GlowField drift={70} />
      <div className="relative mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-32">
        <span className="eyebrow">how it works</span>
        <h2 className="word-reveal h-section mt-7 max-w-[18ch] text-[clamp(2.3rem,5.4vw,4.1rem)] text-[var(--ink)]">
          {headPlain.map((w, n) => (
            <span key={w} className="word" style={{ ["--i" as string]: n }}>
              {w}&nbsp;
            </span>
          ))}
          {headEm.map((w, n) => (
            <span
              key={w}
              className="word h-em"
              style={{ ["--i" as string]: headPlain.length + n }}
            >
              {w}&nbsp;
            </span>
          ))}
        </h2>
        <p className="mt-9 max-w-[56ch] text-[16.5px] leading-[1.75] text-[var(--ink-soft)] lg:mt-11 lg:ml-[36%]">
          Healthcare transformation moves across evidence collection, diagnostic root cause analysis, intervention planning, and frontline delivery. {PRODUCT.name} unites every step into an integrated, evidence-backed workflow - ensuring insights flow smoothly from diagnostic analysis to verified financial realization.
        </p>

        <div className="relative mt-20 sm:mt-28">
          <CurveField className="hidden sm:block" drift={120} />

          <ol className="relative border-t border-[var(--line)]">
            {steps.map((s) => (
              <li
                key={s.i}
                className="grid items-center gap-6 border-b border-[var(--line)] py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)] lg:gap-16"
              >
                <Reveal y={30}>
                  <span className="font-label text-[12px] lowercase tracking-[0.06em] text-[var(--ink-mute)]">
                    step {s.i}
                  </span>
                  <h3 className="h-section mt-5 text-[clamp(1.7rem,3.4vw,2.8rem)] text-[var(--brand)]">
                    {s.t}
                  </h3>
                  <p className="mt-5 max-w-[58ch] text-[16px] leading-[1.78] text-[var(--ink-soft)]">
                    {s.d}
                  </p>
                </Reveal>

                <Reveal
                  y={40}
                  delay={120}
                  className="hidden select-none justify-end lg:flex"
                >
                  <span className="ghost-num" aria-hidden>
                    {s.n}
                  </span>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* Full-bleed photograph */}
        <figure className="mt-20 sm:mt-28">
          <ArchMorph
            src="/assets/photo-clinicians.jpg"
            alt="Hospital clinicians collaborating in a modern healthcare facility"
            className="relative left-1/2 h-[clamp(22rem,52vw,40rem)] w-screen -translate-x-1/2"
            span={220}
            sizes="100vw"
          />
          <figcaption className="mx-auto mt-7 max-w-[46ch] text-center text-[14px] leading-[1.7] text-[var(--ink-mute)]">
            Empowering healthcare consulting teams and hospital leaders with evidence-backed operational intelligence.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
