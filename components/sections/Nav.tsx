"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NAME_PARTS, PRODUCT } from "@/lib/product";



const links = [
  { href: "#platform", label: "platform" },
  { href: "#suite", label: "suite" },
  { href: "#modules", label: "module" },
  { href: "#add-ons", label: "add-ons" },
  { href: "#pricing", label: "pricing" },
  { href: "#faq", label: "questions" },
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

  /* Close mobile/tablet menu when tapping outside, clicking outside, or pressing Escape */
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-mobile-menu]")) {
        setMobileMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside, { passive: true });
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top,0px)] transition-[background-color,border-color,backdrop-filter] duration-500 ${
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

        <div className="flex items-center gap-2 sm:gap-4" data-mobile-menu>
          {/* First: "Book Demo" */}
          <Link
            href="#contact"
            className={`btn min-h-[38px] h-[38px] sm:min-h-[44px] sm:h-[46px] whitespace-nowrap px-3.5 sm:px-6 text-[12.5px] sm:text-[13px] font-medium ${
              solid ? "btn-primary" : "btn-light"
            }`}
          >
            Book Demo
          </Link>

          {/* Last: Three lines (hamburger button) on narrow mobile */}
          <div className="relative md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className={`inline-flex min-h-[40px] min-w-[40px] cursor-pointer items-center justify-center rounded-lg p-1 transition-colors duration-300 hover:text-[var(--brand)] ${
                solid ? "text-[var(--ink)]" : "text-white"
              }`}
            >
              {mobileMenuOpen ? (
                <X size={24} strokeWidth={2.2} />
              ) : (
                <Menu size={24} strokeWidth={2.2} />
              )}
            </button>

            {/* Pop-up menu when clicking the three lines */}
            {mobileMenuOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 flex w-[210px] flex-col rounded-[var(--radius-lg)] border border-[var(--line)] bg-[var(--paper)] p-2 shadow-[0_20px_46px_-28px_rgba(46,50,49,0.5)]">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-label flex min-h-[44px] items-center whitespace-nowrap rounded-[var(--radius-sm)] px-3.5 py-2 text-[12.5px] lowercase tracking-[0.05em] text-[var(--ink-soft)] transition-colors hover:bg-[var(--paper-2)] hover:text-[var(--brand)]"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
