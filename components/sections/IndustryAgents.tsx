"use client";

import { ArrowUpRight, ShieldCheck } from "lucide-react";

/* ─────────────────────────────────────────────────────────────────────────
 * INDUSTRY AI AGENTS (Sister platform - Nestack Agent Care)
 *
 * Modeled after the reference dark band presentation:
 *   - Sister platform badge
 *   - Headline with highlighted brand pill
 *   - Telemetry & 3am crew on-call subhead
 *   - Direct link out to nestackagents.com
 *   - 4-column failure mode & telemetry stats
 *   - Pinned to the Healthcare Services playbook note
 * ───────────────────────────────────────────────────────────────────────── */

export default function IndustryAgents() {
  return (
    <section id="agent-care" className="scroll-mt-24 bg-[var(--navy)] text-white">
      <div className="mx-auto max-w-[1240px] px-4 py-16 text-center sm:px-8 sm:py-[100px]">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/6 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden="true" />
          Sister platform - Nestack Agent Care
        </div>

        <h2 className="h-section text-balance mx-auto mt-8 max-w-[17ch] text-[clamp(2.1rem,5.6vw,4.1rem)] text-white">
          Your{" "}
          <span className="box-decoration-clone rounded-[4px] bg-[var(--brand)] px-2.5 py-0.5 text-white">
            Healthcare Services
          </span>{" "}
          AI agents, run like production systems.
        </h2>

        <p className="mx-auto mt-7 max-w-[54ch] text-[16px] sm:text-[17px] leading-[1.6] text-white/65">
          Telemetry, evaluations, guardrails, human review, and a crew on call when one of
          them starts drifting at 3am.
        </p>

        <div className="mt-9 flex justify-center">
          <a
            href="https://nestackagents.com/industries/healthcare"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light min-h-[44px] inline-flex items-center gap-1.5 px-6 font-medium text-[14.5px]"
          >
            <span>Explore Healthcare Services</span>
            <ArrowUpRight className="h-[17px] w-[17px]" aria-hidden="true" />
            <span className="sr-only">(opens nestackagents.com/industries/healthcare in a new tab)</span>
          </a>
        </div>

        {/* 4-column stats */}
        <ul className="mt-12 sm:mt-[70px] grid grid-cols-2 gap-y-8 sm:grid-cols-4">
          <li className="px-4">
            <span className="tnum block font-display text-[clamp(2.2rem,3.4vw,3.1rem)] font-medium leading-[1] tracking-[-0.035em] text-[var(--brand)]">
              30
            </span>
            <span className="mt-3 block font-mono text-[10.5px] uppercase leading-[1.5] tracking-[0.12em] text-white/55">
              Failure modes catalogued
            </span>
          </li>
          <li className="border-l border-white/12 px-4 sm:border-l sm:border-white/12">
            <span className="tnum block font-display text-[clamp(2.2rem,3.4vw,3.1rem)] font-medium leading-[1] tracking-[-0.035em] text-[var(--brand)]">
              12
            </span>
            <span className="mt-3 block font-mono text-[10.5px] uppercase leading-[1.5] tracking-[0.12em] text-white/55">
              Rated SEV-1
            </span>
          </li>
          <li className="px-4 sm:border-l sm:border-white/12">
            <span className="tnum block font-display text-[clamp(2.2rem,3.4vw,3.1rem)] font-medium leading-[1] tracking-[-0.035em] text-[var(--brand)]">
              1,950+
            </span>
            <span className="mt-3 block font-mono text-[10.5px] uppercase leading-[1.5] tracking-[0.12em] text-white/55">
              Baseline eval cases
            </span>
          </li>
          <li className="border-l border-white/12 px-4 sm:border-l sm:border-white/12">
            <span className="tnum block font-display text-[clamp(2.2rem,3.4vw,3.1rem)] font-medium leading-[1] tracking-[-0.035em] text-[var(--brand)]">
              24/7
            </span>
            <span className="mt-3 block font-mono text-[10.5px] uppercase leading-[1.5] tracking-[0.12em] text-white/55">
              Agent monitoring
            </span>
          </li>
        </ul>

        <p className="mt-12 inline-flex items-center gap-2 text-[14px] text-white/55">
          <ShieldCheck className="h-[17px] w-[17px] text-[var(--brand)]" aria-hidden="true" />
          <span>Pinned to the Healthcare Services agent playbook - not a generic agent checklist.</span>
        </p>
      </div>
    </section>
  );
}
