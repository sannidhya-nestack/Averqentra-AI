"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PRODUCT } from "@/lib/product";

/* ─────────────────────────────────────────────────────────────────────────
 * FAQ / QUESTIONS SECTION
 * Hairlined accordion with single-open behavior:
 *   - Clicking an item opens it and automatically closes any previously open item.
 *   - Clicking the currently open item closes it.
 *   - Displays core healthcare transformation operational & commercial questions.
 * ───────────────────────────────────────────────────────────────────────── */

const HEADLINE = ["Your", "questions.", "Answered", "plainly."];
const EM_FROM = 2;

const faqs = [
  {
    q: "What is included in the Averqentra AI subscription?",
    a: "Your subscription provides full access to the Averqentra AI platform across all 8 modules (Dashboard, Engagement, Evidence, Analysis, Recommendations, Delivery, Outcomes, and Assurance). We confirm the health systems, workstreams, users, integrations, and support coverage in your proposal.",
  },
  {
    q: "How is pricing determined for healthcare transformation teams?",
    a: "Pricing is based on the scale of your healthcare transformation engagements, such as active facilities, workstreams, users, and integration scope. We provide explicit commercial terms upfront rather than charging unexpected fees mid-engagement.",
  },
  {
    q: "Do we need to replace our current EHR, HIS, or ERP systems?",
    a: "No. Averqentra AI is not an EHR, HIS, billing platform, or generic project management software. It acts as an intelligence and orchestration layer sitting above your existing EHR, HIS, and ERP systems without requiring a costly rip-and-replace.",
  },
  {
    q: "How does Averqentra AI handle sensitive patient and client data?",
    a: "Averqentra AI incorporates automatic PHI detection and identity blurring for names, MRNs, DOBs, and client identities. It maintains strict role-based access control (RBAC), tenant isolation, and immutable audit logging compliant with HIPAA and enterprise healthcare security standards.",
  },
  {
    q: "How does evidence lineage work within the platform?",
    a: "Every extracted data point or KPI metric retains immutable lineage back to its original source document, page, section, and cell. This ensures that every recommendation and verified outcome is permanently connected to authentic healthcare evidence.",
  },
  {
    q: "Does AI make clinical or operational decisions automatically?",
    a: "No. Averqentra AI provides diagnostic intelligence, inline scope checks, and scenario modeling to assist healthcare leaders. All operational recommendations, initiative approvals, and outcome verifications remain strictly with authorized human leaders.",
  },
  {
    q: "How are financial benefits validated in the Outcomes module?",
    a: "The Outcomes module compares baseline, target, and current performance across defined measurement windows. Inline AI attribution checks evaluate potential confounders (such as census fluctuations or seasonal shifts) before certifying financial benefits.",
  },
  {
    q: "What support and onboarding do consulting firms and hospital teams receive?",
    a: "We provide dedicated engagement setup, integration configuration, staff onboarding, and ongoing technical support. Your proposal clearly outlines service-level commitments and support channels before purchase.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex((current) => (current === idx ? null : idx));
  };

  return (
    <section id="faq" className="scroll-mt-24 border-b border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1240px] px-4 py-16 sm:px-8 sm:py-28">
        {/* Header */}
        <div className="mx-auto max-w-[620px] text-center">
          <span className="eyebrow">common questions</span>
          <h2 className="h-section word-reveal mt-5 text-[clamp(2.1rem,4.4vw,3.4rem)] text-[var(--ink)]">
            {HEADLINE.map((w, i) => (
              <Fragment key={`${w}-${i}`}>
                <span
                  className={i >= EM_FROM ? "word h-em" : "word"}
                  style={{ ["--i" as string]: i }}
                >
                  {w}
                </span>{" "}
              </Fragment>
            ))}
          </h2>
          <p className="mx-auto mt-6 max-w-[50ch] text-[15.5px] leading-[1.7] text-[var(--ink-soft)]">
            Orchestrating healthcare transformation with AI raises important questions. Here are the answers healthcare leaders and consulting partners ask first.
          </p>
        </div>

        <div className="mx-auto mt-12 flex max-w-[860px] justify-center">
          <span className="chip tinted">About {PRODUCT.name}</span>
        </div>

        {/* Hairline Accordion with Single-Open Behavior */}
        <div className="mx-auto mt-8 max-w-[860px] border-t border-[var(--line)]">
          {faqs.map((f, i) => {
            const isOpen = openIndex === i;
            return (
              <details
                key={f.q}
                className="faq"
                open={isOpen}
                name="faq-group"
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    toggleItem(i);
                  }}
                  className="select-none min-h-[44px] cursor-pointer"
                >
                  <span>{f.q}</span>
                  <span className="ico" aria-hidden="true">
                    <Plus size={16} strokeWidth={2.2} />
                  </span>
                </summary>
                <p className="ans">{f.a}</p>
              </details>
            );
          })}
        </div>

        <p className="mx-auto mt-12 max-w-[54ch] text-center text-[14.5px] leading-[1.7] text-[var(--ink-soft)]">
          Didn&rsquo;t find your answer?{" "}
          <Link
            href="#contact"
            className="text-[var(--ink)] underline decoration-[var(--brand)] decoration-1 underline-offset-4 transition-colors hover:text-[var(--brand)]"
          >
            Send us a message
          </Link>{" "}
          - we&rsquo;ll respond with care and clarity.
        </p>
      </div>
    </section>
  );
}
