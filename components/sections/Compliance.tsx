import { PRODUCT } from "@/lib/product";
import { COMPLIANCE } from "@/lib/showcase";
import { ShieldCheck } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
 * COMPLIANCE - info-only. The REAL, named standards a US senior living /
 * elder care operator is held to:
 *   - HIPAA (Privacy & Security Rules)
 *   - 42 CFR Part 483 (CMS Requirements of Participation for Long-Term Care)
 *
 * Rendered in a balanced 2-column card layout matching the reference UX,
 * pairing each regime with an active shield badge, clean code pill,
 * full regulation title, and plain-English operational note.
 * ───────────────────────────────────────────────────────────────────────── */

export default function Compliance() {
  if (COMPLIANCE.length === 0) return null;

  return (
    <section id="compliance" className="scroll-mt-24 border-b border-[var(--line)] bg-[var(--paper-2)]">
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-20">
          <div>
            <span className="eyebrow">Compliance</span>
            <h2 className="h-section mt-4 text-[clamp(2rem,4.2vw,3.4rem)] text-[var(--ink)]">
              Built to the rules you are already held to
            </h2>
          </div>
          <p className="max-w-[48ch] text-[15.5px] leading-relaxed text-[var(--ink-soft)] lg:pb-2">
            Senior living &amp; elder care runs on records that have to be exactly right.{" "}
            {PRODUCT.name} is designed around the regimes below - here is what it supports,
            and what each one actually covers.
          </p>
        </div>

        {/* 2-Column Balanced Card Grid (Mobile: swipeable horizontal scroll, Desktop: 2-col grid) */}
        <div className="-mx-4 px-4 sm:-mx-8 sm:px-8 md:mx-0 md:px-0 mt-10 sm:mt-14 overflow-x-auto md:overflow-visible scrollbar-none pb-4 md:pb-0">
          <ul className="flex md:grid md:grid-cols-2 gap-4 sm:gap-6 snap-x snap-mandatory md:snap-none">
            {COMPLIANCE.map((c) => (
              <li
                key={c.code}
                className="w-[85vw] max-w-[340px] flex-none sm:w-[380px] sm:max-w-none md:w-auto md:flex-1 snap-start flex flex-col justify-between rounded-[20px] sm:rounded-[24px] border border-[var(--line-2)] bg-[var(--card)] p-6 sm:p-8 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.04)] transition-all hover:border-[var(--brand)]/40 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.08)]"
              >
                <div>
                  <div className="flex items-center gap-3">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[var(--tint)] text-[var(--brand)]"
                      aria-hidden="true"
                    >
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <span className="inline-flex items-center rounded-full border border-[var(--line-2)] bg-[var(--paper)] px-3.5 py-1.5 font-label text-[12px] font-bold tracking-[0.04em] text-[var(--brand-d)]">
                      {c.code}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-[1.15rem] font-semibold leading-[1.35] text-[var(--ink)]">
                    {c.name}
                  </h3>

                  <p className="mt-3.5 text-[14px] leading-[1.65] text-[var(--ink-soft)]">
                    {c.note}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-[var(--line-2)] pt-4 text-[12px] font-medium text-[var(--ink-soft)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden="true" />
                  <span>Active in all {PRODUCT.name} modules</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
