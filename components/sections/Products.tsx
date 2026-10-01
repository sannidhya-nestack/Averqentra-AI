import Image from "next/image";
import { HeartPulse, Watch, Activity, type LucideIcon } from "lucide-react";
import { PRODUCT } from "@/lib/product";
import { PRODUCTS } from "@/lib/showcase";

/* ─────────────────────────────────────────────────────────────────────────
 * PRODUCTS - showcase-only. A 3-across grid (1-2 on mobile) of the everyday
 * companion devices that keep resident readings flowing between physician
 * visits. Each card is a uniform-aspect frame in THIS template's own card
 * style (hairline border, 16px radius): when a photo is set it FILLS the
 * frame edge-to-edge (object-cover); when it is not, the frame renders a
 * clean sage-tint placeholder tile with the device name and a lucide icon,
 * ready for an associate to drop the real photo in. Below the frame: the
 * device NAME and a 2-line blurb. NO buttons, NO price, NO buy / cart /
 * learn-more.
 *
 * DYNAMIC: the list comes from lib/showcase. When PRODUCTS is empty this
 * section renders NOTHING.
 * ───────────────────────────────────────────────────────────────────────── */

/* One quiet line icon per card, in the order the devices are configured. */
const icons: LucideIcon[] = [HeartPulse, Activity, Watch];

export default function Products() {
  if (PRODUCTS.length === 0) return null;

  return (
    <section id="products" className="scroll-mt-24 border-b border-[var(--line)] bg-[var(--paper-2)]">
      <div className="mx-auto max-w-[1240px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-[54ch]">
          <span className="eyebrow">between rounds</span>
          <h2 className="h-section mt-6 text-[clamp(1.95rem,3.8vw,3.15rem)] text-[var(--ink)]">
            Small devices that keep the <span className="h-em">signal</span> going.
          </h2>
          <p className="mt-7 max-w-[50ch] text-[16px] leading-[1.7] text-[var(--ink-soft)]">
            Everyday companion kit that lives on the med cart and at the
            bedside. Each one pairs with {PRODUCT.name}, so the days between
            physician visits arrive on the resident&rsquo;s Clinical Review
            timeline as readings rather than recollection.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((p, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article key={p.name}>
                {/* Uniform-aspect frame in the template's own card style. */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--paper)]">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[var(--tint)] px-8 text-center">
                      <Icon
                        size={30}
                        strokeWidth={1.4}
                        className="text-[var(--ink)]/70"
                        aria-hidden
                      />
                      <span className="font-display text-[17px] leading-[1.25] tracking-[-0.02em] text-[var(--ink)]">
                        {p.name}
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="mt-6 font-display text-[21px] leading-[1.2] tracking-[-0.025em] text-[var(--ink)]">
                  {p.name}
                </h3>
                <p className="mt-3 max-w-[42ch] text-[14.5px] leading-[1.65] text-[var(--ink-soft)]">
                  {p.blurb}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
