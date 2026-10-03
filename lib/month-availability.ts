import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

/** Keep browser-local dates and timezone labels out of the server snapshot. */
export function useCalendarBrowserReady(): boolean {
  return useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
}

export type CalendarSlot = { startTime: string; spotsLeft: number | null };

/** Convert midnight in the booking timezone to UTC, including DST offsets. */
function monthBoundary(year: number, month: number, timezone: string): number {
  const wall = Date.UTC(year, month, 1);
  let instant = wall;
  const format = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
  });
  for (let i = 0; i < 3; i++) {
    const parts = Object.fromEntries(format.formatToParts(new Date(instant)).map(p => [p.type, p.value]));
    const displayed = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
    instant += wall - displayed;
  }
  return instant;
}

/** Fetch this displayed month only. Never invent slots or use the default six-week window. */
export async function getMonthAvailability(timezone: string, year: number, month: number): Promise<CalendarSlot[]> {
  const start = Math.max(monthBoundary(year, month, timezone), Date.now() + 3_600_000);
  const end = monthBoundary(year, month + 1, timezone);
  if (start >= end) return [];
  try {
    const query = new URLSearchParams({ timezone, start: new Date(start).toISOString(), end: new Date(end).toISOString() });
    const response = await fetch(`https://www.nestack.ai/api/product-demo/availability?${query}`);
    if (!response.ok) return [];
    const data = await response.json() as { slots?: CalendarSlot[] };
    return (data.slots ?? []).filter(slot => {
      const time = new Date(slot.startTime).getTime();
      return time >= start && time < end && slot.spotsLeft !== 0;
    });
  } catch { return []; }
}
