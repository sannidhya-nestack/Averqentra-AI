"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PRODUCT, NAME_PARTS } from "@/lib/product";

/* ─────────────────────────────────────────────────────────────────────────
 * FOOTER - a photograph grounded under a deep ink wash, a big sentence-case
 * serif newsletter invitation with a lowercase "subscribe" pill, then quiet
 * lowercase sitemap columns and a hairline bottom bar. No oversized wordmark
 * watermark.
 * ───────────────────────────────────────────────────────────────────────── */


const sitemap = [
  {
    h: "platform",
    items: [
      { t: "the platform", href: "#platform" },
      { t: "modules", href: "#modules" },
      { t: "architecture", href: "#orchestration" },
      { t: "ai agents", href: "#agent-care" },
      { t: "integrations", href: "#integrations" },
      { t: "hardware add-ons", href: "#add-ons" },
      { t: "how it works", href: "#how" },
      { t: "pricing", href: "#pricing" },
      { t: "questions", href: "#faq" },
    ],
  },
  {
    h: "modules",
    items: [
      { t: "resident intake", href: "#modules" },
      { t: "clinical review", href: "#modules" },
      { t: "care planning", href: "#modules" },
      { t: "workforce planning", href: "#modules" },
      { t: "care operations", href: "#modules" },
      { t: "resident life", href: "#modules" },
      { t: "quality control", href: "#modules" },
    ],
  },
  {
    h: "contact",
    items: [
      { t: "info@nestack.com", href: "mailto:info@nestack.com" },
      { t: "book a demo", href: "#contact" },
      { t: "talk to us", href: "#contact" },
    ],
  },
];

/* Associate-editable backdrop. Drop a soft photograph at /assets/photo-* and
   point this constant at it - the current file is a real image in the folder. */
const FOOTER_BACKDROP = "/assets/photo-calm.jpg";

export default function Footer() {
  const [signedUp, setSignedUp] = useState(false);

  return (
    <footer className="relative isolate overflow-hidden border-t border-white/10 bg-[var(--ink)] text-white">
      {/* Grounding photograph - washed deep, but visible enough at the top
          that the footer reads as its own band. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={FOOTER_BACKDROP}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(46,50,49,0.88)_0%,rgba(46,50,49,0.94)_30%,rgba(38,42,41,0.99)_58%,rgba(38,42,41,1)_78%)]" />
      </div>

      <div className="mx-auto max-w-[1240px] px-4 pt-20 sm:px-8 sm:pt-32">
        {/* ── Newsletter ─────────────────────────────────────────────── */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end lg:gap-20">
          <div>
            <span className="eyebrow on-dark">the monthly note</span>
            <h2 className="h-section mt-6 text-[clamp(2.2rem,5vw,4.1rem)] text-white">
              Join our{" "}
              <span className="h-em">quiet</span>
              <br />
              newsletter.
            </h2>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-[46ch] text-[15.5px] leading-[1.7] text-white/75">
              Once a month we send a short letter on running a calmer
              community - what we&rsquo;re learning about intake, coverage and
              following through with residents and families. No noise, and
              never more than one.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSignedUp(true);
              }}
              className="mt-7 flex flex-col sm:flex-row max-w-[440px] items-stretch sm:items-center gap-2 rounded-[22px] sm:rounded-full border border-white/15 bg-white/[0.06] p-1.5"
            >
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                name="email"
                inputMode="email"
                autoComplete="email"
                required
                placeholder="your email"
                className="min-w-0 flex-1 bg-transparent px-4 py-2.5 sm:py-0 text-[16px] sm:text-[14px] text-white placeholder:text-white/50 focus:outline-none"
              />
              <button
                type="submit"
                className="btn btn-light min-h-[44px] h-11 px-6 font-label text-[12px] lowercase tracking-[0.05em]"
              >
                subscribe
              </button>
            </form>

            <p
              aria-live="polite"
              className="mt-4 max-w-[44ch] text-[12.5px] leading-[1.6] text-white/55"
            >
              {signedUp
                ? "Thank you - the next letter will find you."
                : `By signing up to receive emails from ${PRODUCT.name}, you agree to our privacy policy. Every letter carries an unsubscribe link.`}
            </p>
          </div>
        </div>

        <div className="hair-dark mt-20 sm:mt-24" />

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.1fr)_repeat(3,minmax(0,0.7fr))] lg:gap-10">
          <div>
            <p className="font-display text-[28px] tracking-tight text-white sm:text-[32px]">
              {NAME_PARTS.base}
              <span className="font-display font-semibold text-[var(--brand)]">{NAME_PARTS.suffix}</span>
            </p>
            <p className="mt-5 max-w-[32ch] text-[14.5px] leading-[1.65] text-white/60">
              The operations platform for senior living &amp; elder care - intake,
              clinical review, care planning, staffing, life enrichment and
              quality, held on one thread.
            </p>
            <address className="mt-6 max-w-[34ch] text-[13px] not-italic leading-[1.7] text-white/55">
              Nestack Technologies Pvt Ltd<br />
              1st floor, Cresent&rsquo;s Krishna Mansion<br />
              As Rao Nagar, Hyderabad, Telangana 500062<br />
              <span className="mt-2 block text-white/70">
                USA (213) 660-4941 &middot; UK +44 1472 494941
              </span>
            </address>
          </div>

          {sitemap.map((c) => (
            <div key={c.h}>
              <h3 className="eyebrow on-dark">{c.h}</h3>
              <ul className="mt-5 space-y-3">
                {c.items.map((it) => (
                  <li key={it.t}>
                    <Link
                      href={it.href}
                      className="inline-block py-1 text-[14px] lowercase text-white/65 transition-colors hover:text-[var(--brand)]"
                    >
                      {it.t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hair-dark" />

        {/* ── Bottom bar ─────────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 py-8 pb-[max(2rem,calc(env(safe-area-inset-bottom,0px)+1.5rem))] sm:flex-row sm:items-center sm:justify-between">
          <p className="font-label text-[11.5px] lowercase tracking-[0.05em] text-white/55">
            copyright 2026 {PRODUCT.name}. built by Nestack.
          </p>
          <p className="text-[13px] italic text-white/55">{PRODUCT.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
