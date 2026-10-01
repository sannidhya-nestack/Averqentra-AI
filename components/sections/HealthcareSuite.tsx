"use client";

import Image from "next/image";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";
import { PRODUCT } from "@/lib/product";

/* ─────────────────────────────────────────────────────────────────────────
 * THE NESTACK HEALTHCARE SUITE (#suite)
 *
 * Modeled after the reference Construction Suite section on takeubid.nestack.ai:
 *   - Positioned immediately after the Calendar / Consultation walkthrough (#contact)
 *   - Header introducing the unified Nestack Healthcare Suite
 *   - Mobile view (sm:hidden): Compact list items with thumbnail, domain, and title
 *   - Desktop view (hidden sm:grid): Rich cards with 16:9 sector imagery, dark
 *     charcoal header banner, structured metadata table (Users / Intake / Output),
 *     and "Open site" link
 *   - Integrated walkthrough CTA card linking back to #contact
 *   - Pre-configured with the 4 core healthcare platforms:
 *       1. Elyqentra AI   (Senior Living & Memory Care) - Present platform
 *       2. Qevarynth AI   (Digital Health & Health Systems) - https://qevarynth.nestack.ai
 *       3. Serevance.AI   (Wellness & Integrative Clinics) - https://serevance.nestack.ai
 *       4. Tamvoriq AI    (Outpatient & Ambulatory Care) - https://tamvoriq.nestack.ai
 * ───────────────────────────────────────────────────────────────────────── */

export interface HealthcareProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  users: string;
  intake: string;
  output: string;
  isCurrent?: boolean;
}

const HEALTHCARE_SUITE: HealthcareProduct[] = [
  {
    id: "averqentra",
    name: "Averqentra AI",
    category: "Healthcare Transformation Intelligence",
    description:
      "Evidence-backed transformation intelligence orchestrating healthcare consulting work from Evidence to Analysis, Recommendation, Execution, and Verified Outcome.",
    image: "/assets/averqentra-dashboard.png",
    imageAlt: "Averqentra AI Executive Dashboard",
    href: "#top",
    users: "Healthcare consulting & hospital teams",
    intake: "ADT, census, staffing & policy extracts",
    output: "Verified outcomes & ROI realization",
    isCurrent: true,
  },
  {
    id: "qevarynth",
    name: "Qevarynth AI",
    category: "Digital health & virtual care",
    description:
      "Unified care operations connecting EHR, triage, care documentation, prior authorization, and billing for digital health operators.",
    image: "/assets/suite-qevarynth.jpg",
    imageAlt: "A patient at home going through a care plan together with a family member in a bright living room",
    href: "https://qevarynth.nestack.ai",
    users: "Digital health operators",
    intake: "Patient access & referrals",
    output: "Prior auth & clean claims",
  },
  {
    id: "serevance",
    name: "Serevance.AI",
    category: "Wellness & integrative clinics",
    description:
      "Client onboarding, scheduling, personalized wellness recommendations, and progress tracking woven into one calm care journey.",
    image: "/assets/suite-serevance.jpg",
    imageAlt: "A group wellness session in a bright practice room with warm natural light",
    href: "https://serevance.nestack.ai",
    users: "Health & wellness practices",
    intake: "Health histories & inquiries",
    output: "Tailored paths & progress logs",
  },
  {
    id: "tamvoriq",
    name: "Tamvoriq AI",
    category: "Outpatient & ambulatory care",
    description:
      "Predictive control for outpatient clinics - referral triage, insurance verification, chart summaries, encounters, and claims.",
    image: "/assets/suite-tamvoriq.jpg",
    imageAlt: "Two clinicians reviewing outpatient operations and diagnostic records together in a clinic reading room",
    href: "https://tamvoriq.nestack.ai",
    users: "Outpatient specialty clinics",
    intake: "EHR referrals & insurance",
    output: "Predictive control & care flow",
  },
];

export default function HealthcareSuite() {
  return (
    <section
      id="suite"
      className="scroll-mt-24 border-t border-[var(--line-2)] bg-[#FAF8F5] py-16 sm:py-24 lg:py-28"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        {/* Section Header */}
        <div className="max-w-[48rem]">
          <div className="font-label text-[12px] font-normal lowercase tracking-[0.06em] text-[var(--brand-d)]">
            The Nestack healthcare suite
          </div>
          <h2 className="h-section mt-4 text-[clamp(2.1rem,4.4vw,3.5rem)] text-[var(--ink)]">
            Built for every corner of <span className="h-em">modern healthcare</span>.
          </h2>
          <p className="mt-5 max-w-[62ch] text-[15.5px] sm:text-[16.5px] leading-[1.72] text-[var(--ink-soft)]">
            Healthcare moves differently in every care setting, with unique clinical teams,
            patient journeys, documentation standards, and regulatory frameworks. Your
            intelligence platform should be purpose-built to work the way your care specialty
            operates.
          </p>
        </div>

        {/* ── MOBILE LIST VIEW (sm:hidden) ── */}
        <div className="mt-10 border-t border-[#2e3231] sm:hidden">
          {HEALTHCARE_SUITE.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target={item.isCurrent ? undefined : "_blank"}
              rel={item.isCurrent ? undefined : "noopener noreferrer"}
              className="grid grid-cols-[62px_minmax(0,1fr)_18px] items-center gap-3.5 border-b border-[var(--line-2)] bg-white px-4 py-3.5 transition-colors hover:bg-[#FAFAFA]"
            >
              <div className="relative h-12 w-[62px] overflow-hidden rounded-md border border-[var(--line-2)] bg-[#f3f4f6]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="62px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-[var(--brand-d)]">
                    {item.category}
                  </span>
                  {item.isCurrent && (
                    <span className="rounded-full bg-[var(--tint)] px-1.5 py-0.2 font-mono text-[8px] font-bold uppercase tracking-wider text-[var(--brand-d)]">
                      Current
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-[15px] font-bold leading-tight text-[#111111]">
                  {item.name}
                </div>
                <div className="mt-0.5 truncate text-[11.5px] text-[#6b7280]">
                  {item.users}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[var(--ink)]" aria-hidden="true" />
            </a>
          ))}

          {/* Mobile Walkthrough CTA */}
          <a
            href="#contact"
            className="mt-4 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-[#2e3231] px-5 py-5 text-center text-white transition-colors hover:bg-[#252827]"
          >
            <span className="font-display text-[1.25rem] font-bold leading-tight text-white">
              Book a walkthrough
            </span>
            <span className="font-mono text-[9.5px] uppercase tracking-[0.12em] flex items-center gap-1.5 text-[var(--brand)]">
              <span>See it against your care flow</span>
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </a>
        </div>

        {/* ── DESKTOP & TABLET GRID VIEW (hidden sm:grid) ── */}
        <div className="mt-14 hidden auto-rows-fr gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {HEALTHCARE_SUITE.map((item) => (
            <a
              key={item.id}
              href={item.href}
              target={item.isCurrent ? undefined : "_blank"}
              rel={item.isCurrent ? undefined : "noopener noreferrer"}
              className="group flex flex-col overflow-hidden rounded-[18px] border border-[var(--line-2)] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand)] hover:shadow-[0_16px_36px_-12px_rgba(46,50,49,0.18)]"
            >
              {/* Top 16:9 Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-[var(--line-2)] bg-[#f3f4f6]">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                {item.isCurrent && (
                  <div className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-[#2e3231]/85 px-2.5 py-1 backdrop-blur-xs font-mono text-[10px] font-semibold uppercase tracking-wider text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)] animate-pulse" />
                    <span>Current Product</span>
                  </div>
                )}
              </div>

              {/* Dark Charcoal Category Banner */}
              <div className="flex items-center justify-between border-b border-[#2e3231] bg-[#2e3231] px-5 py-3 text-white">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-white/90">
                  {item.category}
                </span>
                {!item.isCurrent && (
                  <ExternalLink className="h-3.5 w-3.5 text-white/50 transition-colors group-hover:text-white" />
                )}
              </div>

              {/* Card Body */}
              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-[1.45rem] font-bold leading-tight text-[#111111]">
                      {item.name}
                    </h3>
                  </div>

                  <p className="mt-2 text-[13px] leading-[1.6] text-[#4b5563]">
                    {item.description}
                  </p>

                  {/* Metadata Table */}
                  <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 border-t border-dashed border-[var(--line-2)] pt-4">
                    <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6b7280]">
                      Users
                    </dt>
                    <dd className="text-right text-[12.5px] font-medium text-[#111111]">
                      {item.users}
                    </dd>

                    <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6b7280]">
                      Intake
                    </dt>
                    <dd className="text-right text-[12.5px] font-medium text-[#111111]">
                      {item.intake}
                    </dd>

                    <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-[#6b7280]">
                      Output
                    </dt>
                    <dd className="text-right text-[12.5px] font-medium text-[#111111]">
                      {item.output}
                    </dd>
                  </dl>
                </div>

                {/* Footer Link */}
                <div className="mt-6 flex items-center justify-between border-t border-[#f0f0f0] pt-4 text-[13px] font-semibold text-[var(--brand-d)] transition-colors group-hover:text-[#111111]">
                  <span>{item.isCurrent ? "Explore platform" : "Open site"}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>
          ))}

          {/* ── DEMO / WALKTHROUGH CTA CARD (Matching Takeubid's layout) ── */}
          <a
            href="#contact"
            className="group flex flex-col justify-between overflow-hidden rounded-[18px] border border-[#2e3231] bg-[#2e3231] p-7 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#252827] hover:shadow-[0_16px_36px_-12px_rgba(46,50,49,0.28)]"
          >
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-3.5 py-1 font-mono text-[10.5px] font-semibold uppercase tracking-[0.14em] text-white/85">
                <Sparkles className="h-3 w-3 text-[var(--brand)]" />
                <span>Product Consultation</span>
              </div>

              <h3 className="font-display mt-5 text-[1.65rem] sm:text-[1.85rem] font-medium leading-[1.15] text-white">
                See {PRODUCT.name} against your own care flow.
              </h3>

              <p className="mt-4 text-[13.5px] leading-relaxed text-white/70">
                Pick a time, select the resident operations workflows you want demonstrated live,
                and see our clinical intelligence in action.
              </p>
            </div>

            <div className="mt-8 border-t border-white/12 pt-6">
              <div className="flex items-center justify-between text-white">
                <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--brand)]">
                  Free &middot; 45 minutes
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-[13.5px] text-white transition-transform group-hover:translate-x-1">
                  <span>Book a demo</span>
                  <ArrowRight className="h-4 w-4 text-[var(--brand)]" />
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
