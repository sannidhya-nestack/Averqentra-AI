"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Maximize2, X } from "lucide-react";

export type CalloutPin = {
  id: string;
  label: string;
  title?: string;
  anchor: { x: number; y: number };
  label_at?: { x: number; y: number };
  side?: "left" | "right";
  /**
   * What this callout is - shown when the pin is CLICKED (the label opens into a
   * small description popover). REQUIRED: every callout must carry a real, 1-2
   * sentence explanation of the UI element it points at, so the pin is an
   * interactive explainer, not a static tag. Written per product from the real p1.
   */
  description?: string;
};

type FigureProps = {
  src: string;
  alt: string;
  url: string;
  callouts?: CalloutPin[];
  /** A small chip over the top-left of the screenshot (module name etc.). */
  tag?: string;
  /** Pointer-driven 3D tilt on the hero plate only. */
  tilt?: boolean;
  /** Static resting lean (alternated across a grid); straightens on hover. */
  lean?: "left" | "right";
  priority?: boolean;
  width?: number;
  height?: number;
};

export default function Figure({
  src,
  alt,
  url,
  callouts,
  tag,
  tilt = false,
  lean,
  priority = false,
  width = 1600,
  height = 900,
}: FigureProps) {
  const [zoom, setZoom] = useState(false);
  // Which callout pin is open (showing its description popover). Defaults to null (all closed).
  const [openPin, setOpenPin] = useState<string | null>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const openZoom = useCallback(() => {
    lastFocusRef.current = document.activeElement as HTMLElement | null;
    setZoom(true);
  }, []);

  const close = useCallback(() => {
    setZoom(false);
    setTimeout(() => {
      lastFocusRef.current?.focus();
    }, 50);
  }, []);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openPin) {
          setOpenPin(null);
        } else {
          close();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Shift focus to close button for keyboard accessibility
    closeBtnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom, close, openPin]);

  // Close an open callout popover on Escape, a click/touch anywhere outside a pin, or on orientation change.
  useEffect(() => {
    if (!openPin) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenPin(null);
    };
    const onDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-callout]")) setOpenPin(null);
    };
    const onResize = () => setOpenPin(null);

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [openPin]);

  // Hero-only tilt. Fine pointers only; disabled under reduced motion. Writes
  // the transform straight to the node so there is no per-move React render.
  useEffect(() => {
    if (!tilt) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = tiltRef.current;
    if (!el) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(1200px) rotateY(${(px * 3).toFixed(2)}deg) rotateX(${(-py * 2.4).toFixed(2)}deg)`;
    };
    const reset = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    el.addEventListener("pointercancel", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
      el.removeEventListener("pointercancel", reset);
    };
  }, [tilt]);

  const renderCalloutElements = (isZoomed: boolean) => {
    if (!callouts || callouts.length === 0) return null;
    return callouts.map((c) => {
      const labelSide = c.side ?? "left";
      const labelX =
        c.label_at?.x ??
        (labelSide === "left"
          ? Math.max(0.2, c.anchor.x - 0.08)
          : Math.min(0.9, c.anchor.x + 0.08));
      const labelY = c.label_at?.y ?? c.anchor.y;
      const lineLeft = Math.min(c.anchor.x, labelX) * 100;
      const lineWidth = Math.abs(c.anchor.x - labelX) * 100;
      const isOpen = openPin === c.id;
      const isBottom = labelY > 0.65;

      return (
        <span
          key={c.id}
          className={isZoomed ? "block" : "hidden md:block"}
          data-callout
        >
          {/* Connecting Line */}
          <span
            className="pin-line"
            style={{
              left: `${lineLeft}%`,
              top: `${c.anchor.y * 100}%`,
              width: `${lineWidth}%`,
            }}
            aria-hidden
          />
          {/* Anchor Dot */}
          <span
            className="pin"
            style={{
              left: `${c.anchor.x * 100}%`,
              top: `${c.anchor.y * 100}%`,
            }}
            aria-hidden
          />
          {/* Pill Button */}
          <button
            type="button"
            className="pin-label cursor-pointer"
            style={{
              left: `${labelX * 100}%`,
              top: `${labelY * 100}%`,
              transform:
                labelSide === "left"
                  ? "translate(-100%, -50%)"
                  : "translate(0, -50%)",
            }}
            aria-expanded={isOpen}
            aria-label={c.description ? `${c.label} - toggle details` : c.label}
            onClick={(e) => {
              e.stopPropagation(); // never trigger the plate's zoom
              setOpenPin(isOpen ? null : c.id);
            }}
          >
            <span>{c.label}</span>
            <span
              className="inline-flex items-center justify-center text-[12px] font-bold leading-none ml-1 opacity-90 select-none"
              aria-hidden
            >
              {isOpen ? "⊖" : "⊕"}
            </span>
          </button>

          {/* Description popover */}
          {isOpen && c.description && (
            <div
              role="dialog"
              aria-label={c.title ?? c.label}
              onClick={(e) => e.stopPropagation()}
              className="callout-popover"
              style={{
                position: "absolute",
                zIndex: 40,
                width: isZoomed ? "22rem" : "19.5rem",
                maxWidth: "calc(100% - 2rem)",
                ...(labelSide === "right"
                  ? { left: `clamp(1rem, ${labelX * 100}%, calc(100% - 23.5rem))` }
                  : { right: `clamp(1rem, ${(1 - labelX) * 100}%, calc(100% - 23.5rem))` }),
                ...(isBottom
                  ? { bottom: `calc(${(1 - labelY) * 100}% + 18px)` }
                  : { top: `calc(${labelY * 100}% + 18px)` }),
              }}
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="callout-title font-sans text-[13.5px] sm:text-[14px] font-bold tracking-tight">
                  {c.title ?? c.label}
                </h4>
                <button
                  type="button"
                  aria-label="Close callout"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenPin(null);
                  }}
                  className="cursor-pointer text-current opacity-60 hover:opacity-100 transition-opacity p-0.5 rounded"
                >
                  <X size={14} strokeWidth={2.2} />
                </button>
              </div>
              <p className="callout-body mt-1.5 text-[12.5px] sm:text-[13px] leading-[1.55]">
                {c.description}
              </p>
            </div>
          )}
        </span>
      );
    });
  };

  const plate = (
    <figure className="figure-frame">
      <div className="figure-chrome">
        <span className="dot" aria-hidden />
        <span className="dot" aria-hidden />
        <span className="dot" aria-hidden />
        <span className="url" aria-hidden>{url}</span>
        <button
          type="button"
          onClick={openZoom}
          aria-label="Zoom screenshot"
          className="ml-2 grid h-8 w-8 place-items-center rounded-md border border-[var(--line-2)] bg-[var(--card)] text-[var(--ink-soft)] transition-colors hover:text-[var(--brand)] cursor-pointer"
        >
          <Maximize2 size={14} strokeWidth={1.75} />
        </button>
      </div>
      <div
        className="relative block w-full cursor-zoom-in"
        role="button"
        tabIndex={0}
        aria-label={`Zoom ${alt}`}
        onClick={openZoom}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openZoom();
          }
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="block h-auto w-full"
          sizes="(min-width: 1024px) 900px, 100vw"
        />
        {tag && (
          <span className="absolute left-3 top-3 z-10 rounded-full border border-[var(--line-2)] bg-[var(--card)]/90 px-3 py-1 text-[11px] font-semibold text-[var(--ink)] backdrop-blur">
            {tag}
          </span>
        )}
        {renderCalloutElements(false)}
      </div>
    </figure>
  );

  return (
    <>
      {tilt ? (
        <div ref={tiltRef} style={{ transition: "transform .25s ease" }}>
          {plate}
        </div>
      ) : lean ? (
        <div className={lean === "left" ? "plate-lean-left" : "plate-lean-right"}>
          {plate}
        </div>
      ) : (
        plate
      )}

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Zoomed: ${alt}`}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-start overflow-y-auto overscroll-contain bg-[color:var(--ink)]/85 p-4 sm:p-10"
          onClick={close}
        >
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close zoom"
            className="fixed top-[max(1rem,env(safe-area-inset-top,0px))] right-[max(1rem,env(safe-area-inset-right,0px))] z-50 grid h-11 w-11 min-h-[44px] min-w-[44px] place-items-center rounded-full border border-white/30 bg-[var(--ink)] text-white hover:bg-white hover:text-[var(--ink)] cursor-pointer focus-visible:ring-2 focus-visible:ring-white shadow-lg"
          >
            <X size={20} />
          </button>
          <div
            className="figure-frame w-full max-w-[1400px] my-auto flex-none shadow-2xl"
            onClick={(e) => {
              e.stopPropagation();
              const t = e.target as HTMLElement;
              if (!t.closest("[data-callout]")) {
                setOpenPin(null);
              }
            }}
          >
            <div className="figure-chrome">
              <span className="dot" aria-hidden />
              <span className="dot" aria-hidden />
              <span className="dot" aria-hidden />
              <span className="url" aria-hidden>{url}</span>
            </div>
            <div className="relative block w-full select-none">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="block h-auto w-full"
                sizes="90vw"
              />
              {renderCalloutElements(true)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
