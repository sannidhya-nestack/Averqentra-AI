/* ─────────────────────────────────────────────────────────────────────────
 * Nestack API - the ONE public surface every product page talks to.
 *
 * There is a single base and it is HARD-CODED. No env vars, no credentials:
 * every endpoint below is public and keyed by the product's sub-industry id
 * (see lib/product.ts). Data lands in the Nestack DB (product_pricing,
 * product_demo_drafts, product_demo_requests) via these endpoints - the
 * template itself holds no secrets.
 * ───────────────────────────────────────────────────────────────────────── */

// Canonical host is www - the apex (nestack.ai) 307-redirects to www and the
// redirect carries NO CORS header, so a browser fetch() to the apex aborts
// (module picker + booking calendar come back empty). www returns 200 + CORS
// directly. Still hardcoded, no env.
export const NESTACK_API = "https://www.nestack.ai";

/* ── Types ──────────────────────────────────────────────────────────────── */
export type Module = { pageNo: number; label: string };
export type Slot = { startTime: string; spotsLeft: number | null };
export type PriceInfo = { priceUsd: number; currency: string; period: string };

export type DraftInput = {
  insubId: string;
  productName: string;
  name: string;
  email: string;
  company: string;
  sourceUrl: string | null;
  sourceHost: string | null;
};

export type DraftPatch = {
  sessionToken: string;
  selectedModules?: string[];
  somethingElse?: string | null;
  status?: string;
};

export type BookInput = {
  insubId: string;
  productName: string;
  selectedModules: string[];
  somethingElse: string | null;
  name: string;
  email: string;
  company: string;
  startTime: string;
  timezone: string;
  sessionToken: string | null;
};

export type BookResult = {
  ok: boolean;
  status: number;
  scheduledAt?: string;
  error?: string;
};

/* ── Endpoints ──────────────────────────────────────────────────────────── */

/** The product's buckets/modules. Empty array on any failure - never throws. */
export async function getModules(insubId: string): Promise<Module[]> {
  try {
    const res = await fetch(`${NESTACK_API}/api/product-modules/${insubId}`);
    if (!res.ok) return [];
    const data = (await res.json()) as { modules?: Module[] };
    return data.modules ?? [];
  } catch {
    return [];
  }
}

/**
 * This product's price (USD/mo). Read at request time so an admin edit in the
 * Nestack dashboard shows here within ~60s. Falls back to `fallbackUsd` so the
 * page never renders a blank price.
 */
export async function getPrice(insubId: string, fallbackUsd = 200): Promise<number> {
  try {
    const res = await fetch(`${NESTACK_API}/api/product-price/${insubId}`, {
      // Near-live: an admin edit shows within ~60s; never a blank page.
      next: { revalidate: 60 },
    });
    if (!res.ok) return fallbackUsd;
    const data = (await res.json()) as { priceUsd?: number };
    return Number(data.priceUsd) > 0 ? Number(data.priceUsd) : fallbackUsd;
  } catch {
    return fallbackUsd;
  }
}

/** Open demo-slot availability for a timezone. Empty array on failure. */
export async function getAvailability(timezone: string): Promise<Slot[]> {
  try {
    const res = await fetch(
      `${NESTACK_API}/api/product-demo/availability?timezone=${encodeURIComponent(timezone)}`,
    );
    if (!res.ok) return [];
    const data = (await res.json()) as { slots?: Slot[] };
    return data.slots ?? [];
  } catch {
    return [];
  }
}

/**
 * Step 1 - open a draft session (records who + which product + source URL).
 * Returns the session token, or null if tracking failed (best-effort; the
 * caller must never block the visitor on this).
 */
export async function createDraft(input: DraftInput): Promise<string | null> {
  try {
    const res = await fetch(`${NESTACK_API}/api/product-demo/draft`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await res.json()) as { sessionToken?: string };
    return data.sessionToken ?? null;
  } catch {
    return null;
  }
}

/** Steps 2 & 3 - patch the draft (modules chosen, or status changes). Best-effort. */
export async function updateDraft(patch: DraftPatch): Promise<void> {
  try {
    await fetch(`${NESTACK_API}/api/product-demo/draft`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
  } catch {
    /* tracking is best-effort - never block the visitor */
  }
}

/** Final step - book the slot (finalises the draft into a booking). */
export async function book(input: BookInput): Promise<BookResult> {
  const res = await fetch(`${NESTACK_API}/api/product-demo/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const data = (await res.json().catch(() => ({}))) as {
    ok?: boolean;
    scheduledAt?: string;
    error?: string;
  };
  return {
    ok: Boolean(res.ok && data.ok),
    status: res.status,
    scheduledAt: data.scheduledAt,
    error: data.error,
  };
}

/**
 * Bucket screenshot URL for a page. Page 1 is the bare route; pages 2..N append
 * `/p<n>`. (Used when screenshots are pulled from the API rather than /assets.)
 */
export function bucketImage(insubId: string, pageNo = 1): string {
  return pageNo <= 1
    ? `${NESTACK_API}/api/bucket-image/${insubId}`
    : `${NESTACK_API}/api/bucket-image/${insubId}/p${pageNo}`;
}
