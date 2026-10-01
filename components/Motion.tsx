"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/* ─────────────────────────────────────────────────────────────────────────
 * MOTION - the design template's scroll vocabulary, rebuilt.
 *
 * Measured off the live reference over CDP rather than guessed:
 *   • its parallax frames hold an <img> 200-300px taller than the window and
 *     translate it from -span → 0 as the frame crosses the viewport;
 *   • its feature images are masked to organic blob radii with a hairline
 *     outline echo offset behind them;
 *   • its arch images flatten from a domed top to a flat bar on scroll.
 *
 * Everything here is scroll-progress driven: one shared rAF loop, transforms
 * written straight to the DOM (never React state per frame), and every effect
 * degrades to a static, correct layout with JS off or reduced motion on.
 * ───────────────────────────────────────────────────────────────────────── */

/**
 * True when the caller already positions the frame itself. Adding our own
 * `relative` on top of an `absolute` caller class makes the two position
 * utilities collide - whichever Tailwind emits last wins, the frame can lose
 * its `inset-0` anchoring, collapse to zero height, and the image disappears.
 */
const positioned = (cls: string) => /\b(absolute|fixed|sticky)\b/.test(cls);

/** Progress of an element through the viewport: 0 entering → 1 leaving. */
function useScrollProgress(
  ref: React.RefObject<HTMLElement | null>,
  apply: (p: number, el: HTMLElement) => void,
  mode: "cross" | "self" = "cross",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let visible = false;

    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      let p: number;
      if (mode === "self") {
        // For a full-viewport element pinned to the top of the page: 0 while it
        // is parked, 1 once it has scrolled its own height away. "cross" only
        // ever reaches ~0.5→1 for such an element, which is why a hero using it
        // travels half its span and reads as no parallax at all.
        p = r.height > 0 ? Math.min(Math.max(-r.top / r.height, 0), 1) : 0;
      } else {
        // 0 when the element's top hits the bottom of the viewport,
        // 1 when its bottom hits the top.
        const total = r.height + vh;
        p = total > 0 ? Math.min(Math.max((vh - r.top) / total, 0), 1) : 0;
      }
      apply(p, el);
    };
    const onScroll = () => {
      if (visible && !raf) raf = requestAnimationFrame(run);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting;
        if (visible) onScroll();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);

    run();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("orientationchange", onScroll);
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("orientationchange", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, apply, mode]);
}

/* ── Parallax image ───────────────────────────────────────────────────────
 * A fixed-shape frame with an oversized image drifting inside it. `span` is
 * how far the image travels (the reference uses 200-300px); the image is
 * grown by exactly that much so no edge is ever exposed.
 * ──────────────────────────────────────────────────────────────────────── */
export function ParallaxImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  span = 220,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  mode = "cross",
  style,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  span?: number;
  priority?: boolean;
  sizes?: string;
  mode?: "cross" | "self";
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useScrollProgress(frame, (p) => {
    const el = inner.current;
    if (!el) return;
    // -span at the bottom of the viewport → 0 as it leaves the top
    el.style.transform = `translate3d(0, ${(-span * (1 - p)).toFixed(1)}px, 0)`;
  }, mode);

  return (
    <div
      ref={frame}
      className={`${positioned(className) ? "" : "relative "}overflow-hidden ${className}`}
      style={style}
    >
      <div
        ref={inner}
        className="absolute inset-x-0 top-0 will-change-transform"
        style={{ height: `calc(100% + ${span}px)` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={`object-cover ${imgClassName}`}
        />
      </div>
      {children}
    </div>
  );
}

/* ── Arch → bar morph ─────────────────────────────────────────────────────
 * The reference's signature clip: an image sits under a tall domed top and,
 * as it scrolls up through the viewport, the dome flattens into a level bar
 * while the copy beneath settles into place. Driven entirely by radius
 * interpolation so it stays GPU-cheap and needs no clip-path support.
 * ──────────────────────────────────────────────────────────────────────── */
export function ArchMorph({
  src,
  alt,
  className = "",
  span = 200,
  priority = false,
  sizes = "(min-width: 1024px) 70vw, 100vw",
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  span?: number;
  priority?: boolean;
  sizes?: string;
  children?: ReactNode;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useScrollProgress(frame, (p, el) => {
    // Ease the middle of the travel so the dome holds, then releases.
    const t = Math.min(Math.max((p - 0.12) / 0.55, 0), 1);
    const eased = t * t * (3 - 2 * t);
    const topPct = 50 - eased * 42; // 50% dome → 8% almost-flat
    const topPx = 18 + (1 - eased) * 10;
    el.style.borderRadius = `${topPct}% ${topPct}% ${topPx}px ${topPx}px / ${(
      topPct * 0.78
    ).toFixed(1)}% ${(topPct * 0.78).toFixed(1)}% ${topPx}px ${topPx}px`;
    const img = inner.current;
    if (img) img.style.transform = `translate3d(0, ${(-span * (1 - p)).toFixed(1)}px, 0)`;
  });

  return (
    <div
      ref={frame}
      className={`${positioned(className) ? "" : "relative "}overflow-hidden ${className}`}
      style={{ borderRadius: "50% 50% 18px 18px / 39% 39% 18px 18px" }}
    >
      <div
        ref={inner}
        className="absolute inset-x-0 top-0 will-change-transform"
        style={{ height: `calc(100% + ${span}px)` }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </div>
      {children}
    </div>
  );
}

/* ── Blob image ───────────────────────────────────────────────────────────
 * The reference's journal cards: an organic squircle mask with a hairline
 * outline of a *different* blob offset behind it. The two shapes counter-
 * rotate very slightly on scroll, which is what makes them feel alive.
 * ──────────────────────────────────────────────────────────────────────── */
const BLOBS = [
  "62% 38% 46% 54% / 54% 46% 58% 42%",
  "44% 56% 62% 38% / 48% 58% 42% 52%",
  "58% 42% 38% 62% / 42% 54% 46% 58%",
];
const BLOBS_ECHO = [
  "48% 52% 60% 40% / 60% 42% 58% 40%",
  "58% 42% 44% 56% / 42% 56% 44% 58%",
  "46% 54% 56% 44% / 56% 44% 56% 44%",
];

export function BlobImage({
  src,
  alt,
  variant = 0,
  className = "",
  sizes = "(min-width: 1024px) 33vw, 80vw",
}: {
  src: string;
  alt: string;
  variant?: number;
  className?: string;
  sizes?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const shape = useRef<HTMLDivElement>(null);
  const echo = useRef<HTMLDivElement>(null);

  useScrollProgress(wrap, (p) => {
    const d = (p - 0.5) * 2; // -1 → 1
    if (shape.current) shape.current.style.transform = `rotate(${(d * 2.2).toFixed(2)}deg)`;
    if (echo.current)
      echo.current.style.transform = `rotate(${(-d * 3.4).toFixed(2)}deg) scale(1.06)`;
  });

  const i = variant % BLOBS.length;

  return (
    <div ref={wrap} className={`relative ${className}`}>
      {/* hairline outline echo, offset behind */}
      <div
        ref={echo}
        aria-hidden
        className="pointer-events-none absolute inset-0 border border-[var(--line-2)] will-change-transform"
        style={{ borderRadius: BLOBS_ECHO[i], transform: "scale(1.06)" }}
      />
      <div
        ref={shape}
        className="relative h-full w-full overflow-hidden will-change-transform"
        style={{ borderRadius: BLOBS[i] }}
      >
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      </div>
    </div>
  );
}

/* ── Scroll reveal ────────────────────────────────────────────────────────
 * Content rises and fades once as it enters. The reference reveals almost
 * every block this way; without it the page reads flat no matter how good
 * the type is.
 * ──────────────────────────────────────────────────────────────────────── */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure";
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => {
      el.style.opacity = "1";
      el.style.transform = "none";
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={className}
      style={{
        opacity: 0,
        transform: `translate3d(0, ${y}px, 0)`,
        transition: `opacity .85s cubic-bezier(.22,.68,.3,1) ${delay}ms, transform .85s cubic-bezier(.22,.68,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}

/* ── Drifting hairline curves ─────────────────────────────────────────────
 * The pale elliptical strokes that loop behind the reference's step numbers.
 * Pure SVG, no fill, drifting at a fraction of scroll speed.
 * ──────────────────────────────────────────────────────────────────────── */
export function CurveField({
  className = "",
  drift = 90,
}: {
  className?: string;
  drift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, (p, el) => {
    el.style.transform = `translate3d(0, ${((0.5 - p) * drift).toFixed(1)}px, 0)`;
  });
  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 will-change-transform ${className}`}
    >
      <svg
        viewBox="0 0 1200 700"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <g stroke="var(--line-2)" strokeWidth="0.9" opacity="0.85">
          <ellipse cx="470" cy="300" rx="250" ry="330" transform="rotate(-24 470 300)" />
          <ellipse cx="560" cy="330" rx="330" ry="215" transform="rotate(14 560 330)" />
          <ellipse cx="700" cy="360" rx="185" ry="300" transform="rotate(36 700 360)" />
          <ellipse cx="430" cy="420" rx="120" ry="245" transform="rotate(-8 430 420)" />
        </g>
      </svg>
    </div>
  );
}

/* ── Soft sage gradient blobs ─────────────────────────────────────────────
 * The reference floats very large, very soft sage circles behind its light
 * sections. Pure CSS radial gradients - resolution independent, themeable,
 * and zero bytes of image payload.
 * ──────────────────────────────────────────────────────────────────────── */
export function GlowField({
  className = "",
  drift = 60,
}: {
  className?: string;
  drift?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollProgress(ref, (p, el) => {
    el.style.transform = `translate3d(0, ${((0.5 - p) * drift).toFixed(1)}px, 0)`;
  });
  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 will-change-transform ${className}`}
    >
      <div className="glow-blob" style={{ width: 1080, height: 1080, left: "-18%", top: "-24%" }} />
      <div className="glow-blob soft" style={{ width: 860, height: 860, right: "-14%", top: "18%" }} />
    </div>
  );
}
