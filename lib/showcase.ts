/* ─────────────────────────────────────────────────────────────────────────
 * SHOWCASE - two config-driven, info-only sections that render DYNAMICALLY.
 *
 * Both arrays ship EMPTY in the template and are populated PER SUB-INDUSTRY
 * from that product's compliance / product audit. When an array is empty its
 * section renders NOTHING (the component returns null).
 *
 * Populated here for insub_HLTH285 - Senior Living & Elder Care (Elyqentra AI).
 *
 * COMPLIANCE - REAL, named standards that genuinely govern a US senior
 *   living / elder care operator and the software that runs it. Nothing
 *   invented. Info-only: no CTAs, no links-out.
 *
 * PRODUCTS - OUR proprietary connected companion devices (Bluetooth/USB
 *   sensors branded to this product), each streaming its readings into a live
 *   dashboard module (Clinical Review / Care Operations). Never a passive
 *   tool or a third-party brand. Showcase-only: no price, no buy control.
 *   `image` is an ASSOCIATE-EDITABLE path under /public/assets - left unset
 *   here so each card renders the clean sage placeholder tile for an
 *   associate to swap in the real device photo. Never point `image` at a file
 *   that does not exist.
 * ───────────────────────────────────────────────────────────────────────── */

/** A single real, named compliance standard this product supports. */
export type ComplianceItem = {
  /** Short code / acronym, e.g. "HIPAA", "42 CFR Part 483". */
  code: string;
  /** Full name of the standard. */
  name: string;
  /** One line: what it covers, in plain English + that this product supports it. */
  note: string;
};

/** A single real, ≤ ₹5,000 device aligned to a dashboard module (showcase-only). */
export type ProductItem = {
  /** Device name - the card heading. */
  name: string;
  /** A 2-line description of what the device does. */
  blurb: string;
  /**
   * OPTIONAL associate-editable photo path under /public/assets
   * (e.g. "/assets/product-1.jpg"). Omit for the placeholder tile.
   */
  image?: string;
};

/**
 * REAL named standards for US senior living & elder care - the regimes that
 * govern resident records, care planning, accessibility, exposure control
 * and reminder consent inside a long-term care operator.
 */
export const COMPLIANCE: ComplianceItem[] = [
  {
    code: "HIPAA",
    name: "Health Insurance Portability and Accountability Act - Privacy & Security Rules (45 CFR Parts 160 & 164)",
    note: "Protects healthcare information across evidence intake, clinical data analysis, and execution records; Averqentra AI enforces strict PHI safeguards, role-based access, and immutable audit logs.",
  },
  {
    code: "CMS CoP",
    name: "CMS Conditions of Participation & Quality Governance",
    note: "Supports hospital throughput compliance, discharge planning standards, and continuous operational improvement verification across healthcare systems.",
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    name: "Averqentra Evidence Lineage Engine",
    blurb:
      "Connects raw hospital datasets (ADT, census, staffing) directly to AI diagnostics with end-to-end evidence lineage from source document to verified outcome.",
  },
  {
    name: "Averqentra Delivery & Attribution Monitor",
    blurb:
      "Real-time operational tracking board connecting approved transformation recommendations directly to frontline initiatives and verified financial benefit realization.",
  },
];
