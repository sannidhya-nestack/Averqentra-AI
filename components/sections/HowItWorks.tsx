import { PRODUCT } from "@/lib/product";
import { ArchMorph, CurveField, GlowField, Reveal } from "@/components/Motion";

/* ─────────────────────────────────────────────────────────────────────────
 * HOW IT WORKS - an unhurried, editorial process sequence. Each step is a
 * wide row separated by hairline rules, with a quiet lowercase index, a
 * sentence-case Crimson Text title, and a full warm paragraph. A tall ghost
 * numeral anchors the column beside them.
 * ───────────────────────────────────────────────────────────────────────── */

const steps = [
  {
    n: "01",
    i: "one",
    t: "Intake & Automated Records Ingestion",
    d: `When a referral or hospital transfer arrives, medical records, discharge summaries, and physician orders are uploaded into the platform. The AI assistant immediately reads and extracts resident history, diagnoses, and medication regimens in seconds, flagging missing documentation before move-in day so admissions advance without paperwork delays.`,
  },
  {
    n: "02",
    i: "two",
    t: "Clinical Synthesis & Acuity-Driven Planning",
    d: `Clinicians review AI-synthesized health findings, vital sign trends, and risk signals with complete authority over approvals. Validated assessments automatically translate into actionable, state-compliant daily care plans, while workforce intelligence aligns staffing schedules directly to resident care acuity by floor and shift.`,
  },
  {
    n: "03",
    i: "three",
    t: "Live Floor Execution & Continuous Protection",
    d: `Caregivers, med techs, and supervisors coordinate care delivery on live shift boards. The AI monitors shift progress in real time, alerting leads to overdue tasks, missed rounds, or emerging health declines. Every incident feeds into automated quality reviews, keeping your community proactive, protected, and continuously survey-ready.`,
  },
];

const headPlain = "A seamless workflow,".split(" ");
const headEm = "from intake to bedside.".split(" ");

export default function HowItWorks() {
  return (
    <section
      id="how"
      className="relative overflow-hidden scroll-mt-24 border-y border-[var(--line)] bg-[var(--paper-2)]"
    >
      <GlowField drift={70} />
      <div className="relative mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-32">
        <span className="eyebrow">how it works</span>
        <h2 className="word-reveal h-section mt-7 max-w-[16ch] text-[clamp(2.3rem,5.4vw,4.1rem)] text-[var(--ink)]">
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
          Senior living operations move rapidly across admissions, clinical evaluations,
          shift schedules, and daily floor care. {PRODUCT.name} unites every step into an
          integrated, AI-assisted workflow-ensuring information flows smoothly between
          teams while your clinicians and caregivers remain in total command.
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

        {/* Full-bleed photograph: opens under a tall domed top and flattens to
            a level band as it rises through the viewport. */}
        <figure className="mt-20 sm:mt-28">
          <ArchMorph
            src="/assets/photo-care.jpg"
            alt="A caregiver and a resident sharing a quiet afternoon by a bright window"
            className="relative left-1/2 h-[clamp(22rem,52vw,40rem)] w-screen -translate-x-1/2"
            span={220}
            sizes="100vw"
          />
          <figcaption className="mx-auto mt-7 max-w-[46ch] text-center text-[14px] leading-[1.7] text-[var(--ink-mute)]">
            The work stays where it belongs - with the person your team is
            caring for, not the paperwork that surrounds them.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
