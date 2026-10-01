"use client";

import { useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────
 * TOOLS & INTEGRATIONS
 * Modeled after the reference layout on qevarynth.nestack.ai:
 *   - Connectivity chip & section header
 *   - Dual smooth-scrolling marquee tracks with authentic SVG/PNG tool logo marks
 *   - Both automated continuous scroll and interactive drag/touch scrolling
 *   - Exact mandatory bottom disclaimer
 * ───────────────────────────────────────────────────────────────────────── */

interface ToolItem {
  name: string;
  logo: string;
}

const TRACK_1: ToolItem[] = [
  { name: "Epic Systems", logo: "/assets/logos/epic.svg" },
  { name: "Oracle Health / Cerner", logo: "/assets/logos/oracle.svg" },
  { name: "PointClickCare", logo: "/assets/logos/pointclickcare.svg" },
  { name: "Athenahealth", logo: "/assets/logos/athenahealth.svg" },
  { name: "Change Healthcare", logo: "/assets/logos/changehealthcare.svg" },
  { name: "Salesforce Health Cloud", logo: "/assets/logos/salesforce.svg" },
  { name: "Veeva Vault", logo: "/assets/logos/veeva.svg" },
  { name: "Twilio HIPAA SMS", logo: "/assets/logos/twilio.svg" },
  { name: "SendGrid", logo: "/assets/logos/sendgrid.svg" },
  { name: "Vonage Telehealth", logo: "/assets/logos/vonage.svg" },
  { name: "Slack Care Huddles", logo: "/assets/logos/slack.svg" },
  { name: "Microsoft Teams", logo: "/assets/logos/microsoft-teams.svg" },
  { name: "Snowflake Health Data", logo: "/assets/logos/snowflake.png" },
];

const TRACK_2: ToolItem[] = [
  { name: "AWS HealthLake", logo: "/assets/logos/aws.svg" },
  { name: "Google BigQuery", logo: "/assets/logos/googlecloud.svg" },
  { name: "Databricks", logo: "/assets/logos/databricks.svg" },
  { name: "Jira Software", logo: "/assets/logos/jira.svg" },
  { name: "Linear", logo: "/assets/logos/linear.svg" },
  { name: "HubSpot CRM", logo: "/assets/logos/hubspot.svg" },
  { name: "Availity Clearinghouse", logo: "/assets/logos/availity.svg" },
  { name: "DocuSign Life Sciences", logo: "/assets/logos/docusign.png" },
  { name: "Azure Health Data", logo: "/assets/logos/azure.svg" },
  { name: "Tableau", logo: "/assets/logos/tableau.png" },
  { name: "Power BI", logo: "/assets/logos/powerbi.svg" },
  { name: "Zapier", logo: "/assets/logos/zapier.svg" },
];

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: ToolItem[];
  reverse?: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - containerRef.current.offsetLeft;
    scrollLeft.current = containerRef.current.scrollLeft;
  };

  const onMouseLeave = () => {
    isDragging.current = false;
  };

  const onMouseUp = () => {
    isDragging.current = false;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    containerRef.current.scrollLeft = scrollLeft.current - walk;
  };

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className="marquee-mask overflow-x-auto scrollbar-none cursor-grab active:cursor-grabbing select-none"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <div
        className={`marquee-track slow ${reverse ? "reverse" : ""} flex items-center`}
      >
        {items.concat(items).concat(items).map((t, idx) => (
          <span
            key={`${t.name}-${idx}`}
            className="flex flex-none items-center gap-3 px-[clamp(16px,2.2vw,34px)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={t.logo}
              alt=""
              width={28}
              height={28}
              className="h-7 w-7 flex-none object-contain pointer-events-none"
              loading="lazy"
              draggable={false}
            />
            <span className="whitespace-nowrap font-display text-[clamp(1.05rem,2vw,1.35rem)] font-normal text-[var(--ink)]">
              {t.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Integrations() {
  return (
    <section id="integrations" className="scroll-mt-24 bg-[var(--paper-2)]">
      {/* Top Header */}
      <div className="mx-auto max-w-[1240px] px-4 pt-16 text-center sm:px-8 sm:pt-[100px]">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line-2)] bg-[var(--card)] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink-soft)] shadow-2xs">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden="true" />
          Connectivity
        </div>

        <h2 className="h-section text-balance mx-auto mt-5 max-w-[15ch] text-[clamp(2.1rem,4.8vw,3.6rem)] text-[var(--ink)]">
          Your whole stack, connected.
        </h2>

        <p className="mx-auto mt-5 max-w-[58ch] text-[16px] leading-[1.6] text-[var(--ink-soft)]">
          Epic Systems, Cerner, PointClickCare, Salesforce Health Cloud, Snowflake - and
          the rest of what your senior living and healthcare operation already runs on. 24
          integrations across the core care modules, every one of them reading the tool’s own
          public API.
        </p>
      </div>

      {/* Dual Interactive Marquee Band */}
      <div className="mt-14 bg-[var(--paper)] py-7 sm:py-8 border-y border-[var(--line)]">
        {/* Track 1 (forward scroll) */}
        <MarqueeRow items={TRACK_1} reverse={false} />

        {/* Track 2 (reverse scroll) */}
        <div className="mt-3.5 sm:mt-5">
          <MarqueeRow items={TRACK_2} reverse={true} />
        </div>
      </div>

      {/* Mandatory Exact Bottom Disclaimer */}
      <div className="mx-auto max-w-[1240px] px-5 pb-20 pt-8 sm:px-8 sm:pb-24 sm:pt-10 text-center">
        <p className="mx-auto max-w-[72ch] font-mono text-[12px] leading-[1.7] text-[var(--ink-mute)]">
          Tool names and marks belong to their respective owners. No endorsement or
          partnership implied.
        </p>
      </div>
    </section>
  );
}
