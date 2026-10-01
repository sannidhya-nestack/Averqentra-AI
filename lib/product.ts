/* ─────────────────────────────────────────────────────────────────────────
 * PRODUCT - the single edit-point for this product page.
 *
 * Every section imports insubId + name from here - there is no per-file
 * INSUB_ID or PRODUCT_NAME duplication anywhere else.
 *
 * Rules:
 *   • insubId - this product's sub-industry id, "insub_XXXNNN".
 *   • name    - ALWAYS ends in ".AI" or " AI".
 *   • tagline - one line describing what the product does.
 * ───────────────────────────────────────────────────────────────────────── */

export const PRODUCT = {
  insubId: "insub_HLTH890",
  name: "Averqentra AI",
  tagline: "AI-Powered Healthcare Transformation Intelligence Platform",
} as const;

/**
 * The name split into its base and its AI suffix (".AI" or " AI"), so a wordmark
 * can accent the suffix without hard-coding where the split falls.
 * "Elyqentra AI" → { base: "Elyqentra", suffix: " AI" }
 */
export const NAME_PARTS = (() => {
  const match = PRODUCT.name.match(/(\.AI| AI)$/i);
  if (!match) return { base: PRODUCT.name, suffix: "" };
  return { base: PRODUCT.name.slice(0, -match[0].length), suffix: match[0] };
})();
