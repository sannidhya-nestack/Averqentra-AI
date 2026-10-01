"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { NAME_PARTS, PRODUCT } from "@/lib/product";

const links = [
  { href: "#platform", label: "platform", num: "01" },
  { href: "#suite", label: "suite", num: "02" },
  { href: "#modules", label: "module", num: "03" },
  { href: "#add-ons", label: "add-ons", num: "04" },
  { href: "#pricing", label: "pricing", num: "05" },
  { href: "#faq", label: "questions", num: "06" },
];

export default function Nav() {
  /* Floats transparently over the full-bleed hero in white, then settles into
     a solid bar once the hero has scrolled past. */
  const [solid, setSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.82);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock background scroll when mobile menu is open */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  /* Close mobile menu on Escape key */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color,backdrop-filter] duration-500 ${
          solid
            ? "border-b border-[var(--line)] bg-[color:var(--paper)]/88 backdrop-blur-md"
            : "nav-on-photo border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] sm:h-[78px] max-w-[1400px] flex-nowrap items-center justify-between gap-4 px-4 sm:px-10 lg:px-14">
          {/* wordmark - clean serif title case with brand accent AI */}
          <Link
            href="#top"
            className="font-display inline-flex min-h-[44px] items-center gap-1 text-[22px] leading-none tracking-[-0.015em] sm:text-[25px]"
            aria-label={`${PRODUCT.name} home`}
          >
            <span className={`transition-colors duration-500 ${solid ? "text-[var(--ink)]" : "text-white"}`}>
              {NAME_PARTS.base}
            </span>
            <span className="font-display font-semibold text-[var(--brand)]">
              {NAME_PARTS.suffix.trim()}
            </span>
          </Link>

          {/* quiet lowercase links, centred on wide screens */}
          <nav
            className="absolute inset-y-0 left-1/2 hidden -translate-x-1/2 flex-nowrap items-center gap-4 xl:gap-8 md:flex"
            aria-label="Primary"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-label whitespace-nowrap text-[12px] lowercase tracking-[0.05em] transition-colors duration-500 hover:text-[var(--brand)] ${
                  solid ? "text-[var(--ink-soft)]" : "text-white/85 hover:!text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* First: "Book Demo" */}
            <Link
              href="#contact"
              className={`btn min-h-[38px] h-[38px] sm:min-h-[44px] sm:h-[46px] whitespace-nowrap px-3.5 sm:px-6 text-[12.5px] sm:text-[13px] font-medium ${
                solid ? "btn-primary" : "btn-light"
              }`}
            >
              Book Demo
            </Link>

            {/* Last: Hamburger button on narrow mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-expanded={mobileMenuOpen}
              aria-label="Open navigation menu"
              className={`inline-flex min-h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-lg p-1 transition-colors duration-300 hover:text-[var(--brand)] md:hidden ${
                solid ? "text-[var(--ink)]" : "text-white"
              }`}
            >
              <Menu size={24} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[var(--paper)] text-[var(--ink)] p-6 sm:p-10 pt-5 md:hidden animate-in fade-in duration-200 overflow-y-auto">
          {/* Top Header inside Fullscreen Overlay */}
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-5">
            <Link
              href="#top"
              onClick={() => setMobileMenuOpen(false)}
              className="font-display inline-flex items-center gap-1 text-[22px] leading-none tracking-[-0.015em]"
            >
              <span className="text-[var(--ink)]">{NAME_PARTS.base}</span>
              <span className="font-semibold text-[var(--brand)]">
                {NAME_PARTS.suffix.trim()}
              </span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--paper-2)] text-[var(--ink)] transition-colors hover:bg-[var(--line)]"
            >
              <X size={24} strokeWidth={2.2} />
            </button>
          </div>

          {/* Links list */}
          <nav className="my-auto flex flex-col gap-4 py-8" aria-label="Mobile Primary">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center justify-between border-b border-[var(--line)]/50 pb-3 pt-2 font-display text-2xl sm:text-3xl font-medium tracking-tight text-[var(--ink)] transition-colors hover:text-[var(--brand)]"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[var(--ink-mute)] group-hover:text-[var(--brand)]">
                    {l.num}
                  </span>
                  <span className="lowercase">{l.label}</span>
                </div>
                <ArrowRight size={20} className="opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100 text-[var(--brand)]" />
              </Link>
            ))}
          </nav>

          {/* Bottom CTA & footer */}
          <div className="flex flex-col gap-4 pt-4 border-t border-[var(--line)]">
            <Link
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary h-[50px] w-full text-center text-sm font-medium flex items-center justify-center gap-2"
            >
              Book Demo
              <ArrowRight size={16} />
            </Link>
            <p className="text-center font-mono text-[11px] uppercase tracking-wider text-[var(--ink-mute)]">
              Averqentra AI Platform
            </p>
          </div>
        </div>
      )}
    </>
  );
}
