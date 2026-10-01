import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PRODUCT } from "@/lib/product";
import { ParallaxImage, Reveal } from "@/components/Motion";

/* ─────────────────────────────────────────────────────────────────────────
 * HERO - full-bleed opening screen for Averqentra AI.
 * ───────────────────────────────────────────────────────────────────────── */

const HERO_IMAGE = "/assets/photo-consultation.jpg";

const HEADLINE: { text: string; em?: boolean }[] = [
  { text: "AI-Powered" },
  { text: "Healthcare" },
  { text: "Transformation" },
  { text: "Intelligence", em: true },
  { text: "Platform.", em: true },
];

const AVATARS = [
  { src: "/assets/avatar-1.jpg", alt: "Practice Leader" },
  { src: "/assets/avatar-2.jpg", alt: "Engagement Executive" },
  { src: "/assets/avatar-3.jpg", alt: "Transformation Director" },
];

export default function Hero() {
  return (
    <section id="top" className="hero-full">
      {/* the photograph drifting behind the type */}
      <ParallaxImage
        src={HERO_IMAGE}
        alt="Healthcare clinical leaders and medical team reviewing patient cases and operational metrics"
        className="absolute inset-0 h-full w-full"
        mode="self"
        span={380}
        priority
        sizes="100vw"
      />

      {/* sage duotone + legibility ramps */}
      <div className="hero-wash tint" aria-hidden />
      <div className="hero-wash ramp" aria-hidden />

      {/* thin white arc */}
      <svg
        className="hero-arc"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <ellipse cx="640" cy="470" rx="268" ry="430" transform="rotate(-13 640 470)" />
        <ellipse cx="700" cy="520" rx="150" ry="360" transform="rotate(9 700 520)" opacity="0.5" />
      </svg>

      {/* content weighted to bottom */}
      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end">
        <div className="mx-auto w-full max-w-[1400px] px-4 pb-14 pt-28 sm:px-10 sm:pb-20 lg:px-14 lg:pb-24 sm:pt-32">
          <Reveal y={18}>
            <span className="eyebrow on-dark">Healthcare Transformation Intelligence</span>
          </Reveal>

          <h1 className="word-reveal mt-6 h-display max-w-[17ch] text-white text-[clamp(2.1rem,6.8vw,6.8rem)]">
            {HEADLINE.map((w, i) => (
              <Fragment key={`${w.text}-${i}`}>
                <span
                  className={w.em ? "word italic" : "word"}
                  style={{ ["--i" as string]: i }}
                >
                  {w.text}
                </span>{" "}
              </Fragment>
            ))}
          </h1>

          <div className="mt-10 grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-20">
            <Reveal delay={220} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-7">
              <Link href="#contact" className="btn btn-sage min-h-[44px] h-[52px] w-full sm:w-auto px-8">
                request platform demo
                <span className="h-[5px] w-[5px] rounded-full bg-white/85" aria-hidden />
              </Link>
              <Link
                href="#modules"
                className="link-quiet inline-flex min-h-[44px] items-center py-2 !border-white/35 !text-white/85 hover:!border-white hover:!text-white"
              >
                explore 8 modules
                <ArrowRight size={14} strokeWidth={1.8} />
              </Link>
            </Reveal>

            <Reveal delay={320}>
              <p className="max-w-[48ch] text-[15.5px] leading-[1.72] text-white/85 lg:text-right">
                {PRODUCT.name} guides healthcare consulting firms, hospital transformation teams, and healthcare executives from <strong>Evidence → Analysis → Recommendation → Execution → Measurable Outcome</strong>. Sitting above legacy EHR, HIS, and ERP systems, it orchestrates end-to-end transformation.
              </p>
              <div className="mt-6 flex items-center gap-4 lg:justify-end">
                <span className="avatar-stack">
                  {AVATARS.map((a) => (
                    <span key={a.src} className="relative !border-white/60">
                      <Image src={a.src} alt={a.alt} fill sizes="34px" className="object-cover" />
                    </span>
                  ))}
                </span>
                <span className="text-[13px] text-white/75">Built for healthcare transformation leaders</span>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
