"use client";

import { PRODUCT } from "@/lib/product";

/* ─────────────────────────────────────────────────────────────────────────
 * HARDWARE ADD-ONS - compatible third-party enterprise peripherals.
 * Filtered specifically for Senior Living & Elder Care (Elyqentra AI):
 *   - Sheet-fed resident document & card scanner (Resident Intake & Admissions)
 *   - Cellular & BLE clinical vitals diagnostic hub (Clinical Review & Telemetry)
 *
 * (Removed unrelated acute hospital peripherals: 2D specimen reader & motorized
 * surgical PTZ exam camera).
 *
 * Rendered in a balanced 2-column card grid with warm #F4EFEA linen graphic
 * frames, "Feeds" module mapping, and the mandatory subscription disclaimer.
 * ───────────────────────────────────────────────────────────────────────── */

interface AddonCard {
  title: string;
  desc: string;
  feeds: string;
  svgGraphic: React.ReactNode;
}

const ADDONS_DATA: AddonCard[] = [
  {
    title: "Sheet-fed resident document & card scanner",
    desc: "Drop resident IDs, Medicare and Medicaid cards, power of attorney documents, state assessment forms, and paper hospital transfer packets straight into the feeder. Both sides are scanned in one pass and sent directly to the document intake queue for OCR, field extraction, and instant verification - no blurry smartphone photos.",
    feeds: "Resident Intake & Admissions",
    svgGraphic: (
      <svg viewBox="0 0 200 160" fill="none" className="h-full w-full p-4" aria-hidden="true">
        <rect x="25" y="65" width="150" height="65" rx="8" fill="#FFFFFF" stroke="var(--line-2)" strokeWidth="1.5" />
        <rect x="45" y="25" width="110" height="55" rx="4" fill="#FFFFFF" stroke="var(--brand)" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="60" y1="42" x2="140" y2="42" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
        <line x1="60" y1="52" x2="120" y2="52" stroke="var(--ink-mute)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="60" y1="62" x2="130" y2="62" stroke="var(--ink-mute)" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="40" y="80" width="120" height="8" rx="4" fill="#E2DDD7" />
        <circle cx="150" cy="105" r="5" fill="var(--brand)" />
        <circle cx="132" cy="105" r="3" fill="var(--ink-mute)" />
      </svg>
    ),
  },
  {
    title: "Cellular & BLE clinical vitals diagnostic hub",
    desc: "A medical-grade telemetry gateway that pairs seamlessly over Bluetooth with bedside and med-cart peripherals - blood pressure cuffs, pulse oximeters, weight scales, and glucometers - streaming biometric readings onto the Clinical Review timeline with automated threshold alerting.",
    feeds: "Clinical Review & Vitals Telemetry",
    svgGraphic: (
      <svg viewBox="0 0 200 160" fill="none" className="h-full w-full p-4" aria-hidden="true">
        <rect x="35" y="40" width="130" height="85" rx="12" fill="#FFFFFF" stroke="var(--line-2)" strokeWidth="1.5" />
        <rect x="50" y="55" width="100" height="40" rx="6" fill="var(--navy)" />
        <path d="M58 75 H70 L76 65 L84 85 L92 70 L98 75 H142" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="70" cy="110" r="4" fill="var(--ok)" />
        <circle cx="85" cy="110" r="4" fill="var(--brand)" />
        <circle cx="100" cy="110" r="4" fill="var(--ink-mute)" />
        <rect x="122" y="106" width="28" height="8" rx="4" fill="var(--tint)" />
      </svg>
    ),
  },
];

export default function HardwareAddons() {
  return (
    <section id="add-ons" className="scroll-mt-24 bg-[var(--paper)]">
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-[100px]">
        {/* Header Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.5fr)] lg:items-end lg:gap-[60px]">
          <div>
            <span className="eyebrow">Add-ons</span>
            <h2 className="h-section mt-2 max-w-[15ch] text-[clamp(2.1rem,4.6vw,3.5rem)] text-[var(--ink)]">
              Add the hardware your workflow needs.
            </h2>
          </div>
          <p className="text-[16px] leading-[1.6] text-[var(--ink-soft)]">
            Most of what {PRODUCT.name} reads still starts on paper, on someone’s desk or at
            the bedside. These are standard peripherals, not our own hardware - we enrol them
            against your workspace so each one streams into the module that already handles
            its output.
          </p>
        </div>

        {/* 2-across cards (Mobile: swipeable horizontal scroll, Desktop: 2-col grid) */}
        <div className="-mx-4 px-4 sm:-mx-8 sm:px-8 md:mx-0 md:px-0 mt-[60px] overflow-x-auto md:overflow-visible scrollbar-none pb-4 md:pb-0">
          <ul className="flex md:grid md:grid-cols-2 gap-5 sm:gap-6 snap-x snap-mandatory md:snap-none" aria-label="Hardware add-ons">
            {ADDONS_DATA.map((addon) => (
              <li key={addon.title} className="w-[85vw] max-w-[340px] flex-none sm:w-[380px] sm:max-w-none md:w-auto md:flex-1 snap-start flex flex-col gap-2">
                {/* Visual frame with warm #F4EFEA linen background */}
                <div className="relative h-[240px] overflow-hidden rounded-[var(--radius-md)] border border-[var(--line-2)] bg-[#F4EFEA] flex items-center justify-center">
                  {addon.svgGraphic}
                </div>

                {/* Card body */}
                <div className="card flex flex-1 flex-col justify-between gap-3 p-6 rounded-[var(--radius-md)] border border-[var(--line-2)]">
                  <div>
                    <h3 className="font-display text-[1.2rem] font-semibold leading-tight text-[var(--ink)]">
                      {addon.title}
                    </h3>
                    <p className="mt-2.5 text-[14.5px] leading-[1.6] text-[var(--ink-soft)]">
                      {addon.desc}
                    </p>
                  </div>
                  <p className="mt-auto border-t border-[var(--line-2)] pt-3.5 text-[13px] leading-[1.45] text-[var(--ink-mute)]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em]">Feeds</span>{" "}
                    <span className="font-medium text-[var(--ink)]">{addon.feeds}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Mandatory exact bottom note */}
        <p className="mt-10 max-w-[80ch] text-[14.5px] leading-[1.55] text-[var(--ink-mute)]">
          Hardware, installation, and integration are not included in the standard
          subscription. Additional charges apply based on the hardware selected,
          integration modules required, and implementation scope.
        </p>
      </div>
    </section>
  );
}
