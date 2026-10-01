import { Fragment } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { PRODUCT } from "@/lib/product";
import { getPrice } from "@/lib/nestack";

/* ─────────────────────────────────────────────────────────────────────────
 * PRICING - the single price for this demo.
 *
 * The number is NOT hard-coded. It is read at request time from the Nestack
 * admin API for THIS product's sub-industry (getPrice → /api/product-price/
 * <insub>), so an admin can change the price from the Nestack dashboard and it
 * updates here within ~a minute. Only the number is data; the "$" and "/mo" are
 * fixed. Falls back to 200 if the API is unreachable, so the page never renders
 * a blank price.
 *
 * Contract (do not change the shape - scripts/check.mjs checks it):
 *   - the insub id + name come from lib/product.ts (single edit-point)
 *   - getPrice() fetches the price for this insub from lib/nestack
 *   - the price renders inside [data-price] with data-price-source="api"
 *   - the CTA links to #contact (book a demo)
 *
 * Layout: a centred column - lowercase mono eyebrow, a serif
 * sentence-case statement that lands word by word, a short calm paragraph, and
 * ONE quiet card sitting centred beneath it. Deliberately NOT the sibling
 * demos' "description left, card right" split.
 * ───────────────────────────────────────────────────────────────────────── */

const DEFAULT_PRICE_USD = 200;

/** The statement, word by word - the last clause resolves in italic sage. */
const HEADLINE = ["Support", "that", "fits", "your", "health system."];
const EM_FROM = 3;

/** Every live module bucket for Averqentra AI. */
const INCLUDED = [
  "dashboard command center",
  "engagement & workstream setup",
  "structured evidence intake",
  "kpi analysis & root cause matrix",
  "recommendation builder",
  "delivery pmo board",
  "outcome benefit verification",
  "assurance & compliance audit",
];

export default async function Pricing() {
  const price = await getPrice(PRODUCT.insubId, DEFAULT_PRICE_USD);

  return (
    <section id="pricing" className="scroll-mt-24 border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-28">
        {/* ── centred statement ─────────────────────────────────────────── */}
        <div className="mx-auto max-w-[640px] text-center">
          <span className="eyebrow">our prices</span>
          <h2 className="h-section word-reveal mt-5 text-[clamp(2.1rem,4.4vw,3.4rem)] text-[var(--ink)]">
            {HEADLINE.map((w, i) => (
              <Fragment key={w}>
                <span
                  className={i >= EM_FROM ? "word h-em" : "word"}
                  style={{ ["--i" as string]: i }}
                >
                  {w}
                </span>{" "}
              </Fragment>
            ))}
          </h2>
          <p className="mx-auto mt-6 max-w-[52ch] text-[15.5px] leading-[1.7] text-[var(--ink-soft)]">
            A first conversation is often just that - a conversation. From there it
            is one plan at one price, whichever healthcare transformation workflows you hand
            to {PRODUCT.name}. No tiers to decode.
          </p>
        </div>

        {/* ── the single card, centred beneath ──────────────────────────── */}
        <div className="card mx-auto mt-10 sm:mt-14 w-full max-w-[500px] p-6 sm:p-10">
          <span className="eyebrow mute">the whole healthcare organization</span>

          <div className="mt-5 flex items-end font-display leading-[0.88] text-[var(--ink)]">
            <span className="text-[clamp(2.6rem,6.5vw,3.9rem)]">$</span>
            <span data-price data-price-source="api" className="tnum text-[clamp(2.6rem,6.5vw,3.9rem)]">
              {price}
            </span>
            <span className="font-body pb-[0.5em] pl-2 text-[15px] font-medium text-[var(--ink-mute)]">
              /mo
            </span>
          </div>
          <p className="mt-4 text-[13.5px] leading-[1.6] text-[var(--ink-mute)]">
            Starting at ${price}/mo - every module, billed monthly.
          </p>

          <div className="hair my-8" />

          <ul className="space-y-3.5">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-center gap-3 text-[14.5px] text-[var(--ink-soft)]">
                <span className="grid size-[19px] flex-none place-items-center rounded-full bg-[var(--tint)]">
                  <Check size={11} strokeWidth={3} className="text-[var(--brand-d)]" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <Link href="#contact" className="btn btn-primary mt-9 w-full min-h-[44px]">
            Know more
          </Link>
        </div>

        <p className="mx-auto mt-7 max-w-[46ch] text-center text-[13.5px] leading-[1.6] text-[var(--ink-mute)]">
          Nothing is locked in. Move at the pace your community moves - change
          or pause whenever it suits you.
        </p>
      </div>
    </section>
  );
}
