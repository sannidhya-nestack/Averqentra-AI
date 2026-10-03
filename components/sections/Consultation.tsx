"use client";

import { getMonthAvailability } from "@/lib/month-availability";

import { useState, useMemo, useEffect, useSyncExternalStore } from "react";
import {
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react";
import { PRODUCT } from "@/lib/product";
import {
  getModules,
  createDraft,
  updateDraft,
  book as bookDemo,
  type Slot,
} from "@/lib/nestack";

/* ─────────────────────────────────────────────────────────────────────────
 * INTERACTIVE WALKTHROUGH & CALENDAR SECTION (#contact)
 * Modeled after the 3-step walkthrough on qevarynth.nestack.ai:
 *   - Placed right after Platform
 *   - Left panel: 45 min video call overview, product initial badge, bullets, 01/03 progress bar
 *   - Right panel:
 *       Step 1: Interactive Date & Time selection calendar (Saturdays and Sundays strictly disabled)
 *       Step 2: User details (name, email, community)
 *       Step 3: Healthcare consulting module picker
 *       Confirmed: Success state
 * ───────────────────────────────────────────────────────────────────────── */

const MODULE_OPTIONS = [
  "Dashboard",
  "Engagement",
  "Evidence",
  "Analysis",
  "Recommendations",
  "Delivery",
  "Outcomes",
  "Assurance",
];

// Helper functions for timezone-aware date parsing and formatting
const getTimezone = () =>
  (typeof Intl !== "undefined" && Intl.DateTimeFormat().resolvedOptions().timeZone) ||
  "America/New_York";

const parseInTz = (isoString: string, tz: string) => {
  const [y, m, d] = new Date(isoString)
    .toLocaleDateString("en-CA", { timeZone: tz })
    .split("-")
    .map(Number);
  return { y, m: m - 1, d };
};

const formatTimeInTz = (isoString: string, tz: string) =>
  new Date(isoString).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: tz,
  });

const formatFullDate = (year: number, month: number, day: number) =>
  new Date(year, month, day).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

const subscribeToBrowser = () => () => {};
const browserReady = () => true;
const serverReady = () => false;

export default function Consultation() {
  const ready = useSyncExternalStore(subscribeToBrowser, browserReady, serverReady);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [moduleOptions, setModuleOptions] = useState<string[]>(MODULE_OPTIONS);

  useEffect(() => {
    let cancelled = false;
    getModules(PRODUCT.insubId).then((modules) => {
      if (!cancelled && modules.length) setModuleOptions(modules.map((module) => module.label));
    });
    return () => { cancelled = true; };
  }, []);

  // Timezone & API Availability
  const [userTz] = useState(getTimezone);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(true);

  // Calendar State
  const [currentDate, setCurrentDate] = useState(() => new Date(new Date().getFullYear(), new Date().getMonth(), 1)); // Default to October 2026
  const [selectedDay, setSelectedDay] = useState<number | null>(null); // October 5, 2026 (Monday)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Load API availability

  // Month navigation owns availability; cleanup rejects responses from older months.
  const calendarYear = currentDate.getFullYear();
  const calendarMonthIndex = currentDate.getMonth();
  const [calendarRevision, setCalendarRevision] = useState(0);
  useEffect(() => {
    if (!userTz) return;
    let cancelled = false;
    void Promise.resolve().then(async () => {
      if (cancelled) return;
      setSlots([]);
      setLoadingSlots(true);
      setSelectedDay(null);
      setSelectedSlot(null);
      setSelectedTime(null);
      const nextSlots = await getMonthAvailability(userTz, calendarYear, calendarMonthIndex);
      if (cancelled) return;
      setSlots(nextSlots);
      setLoadingSlots(false);
    });

    return () => { cancelled = true;  };
  }, [calendarYear, calendarMonthIndex, userTz, calendarRevision]);


  // Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedModules, setSelectedModules] = useState<string[]>([
    "Engagement",
    "Evidence",
  ]);

  const [loading, setLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  // Month navigation
  const monthName = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const prevMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
    setSelectedDay(null);
    setSelectedSlot(null);
    setSelectedTime(null);
  };
  const nextMonth = () => {
    setCurrentDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
    setSelectedDay(null);
    setSelectedSlot(null);
    setSelectedTime(null);
  };

  // Group slots by day of current month (strictly excluding weekends)
  const slotsByDay = useMemo(() => {
    const map = new Map<number, Slot[]>();
    for (const s of slots) {
      const parsed = parseInTz(s.startTime, userTz);
      // Exclude any weekend slot
      const dow = new Date(parsed.y, parsed.m, parsed.d).getDay();
      if (dow === 0 || dow === 6) continue;

      if (parsed.y === currentDate.getFullYear() && parsed.m === currentDate.getMonth()) {
        if (!map.has(parsed.d)) map.set(parsed.d, []);
        map.get(parsed.d)!.push(s);
      }
    }
    for (const list of map.values()) {
      list.sort((a, b) => a.startTime.localeCompare(b.startTime));
    }
    return map;
  }, [slots, currentDate, userTz]);

  const availableDays = useMemo(() => new Set(slotsByDay.keys()), [slotsByDay]);
  const currentDaySlots = selectedDay ? slotsByDay.get(selectedDay) ?? [] : [];

  // Calendar matrix calculation (Monday = 0 ... Sunday = 6)
  const calendarDays = useMemo(() => {
    const startDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    // Monday as 0: Sunday (0) -> 6, Monday (1) -> 0, etc.
    const offset = startDay === 0 ? 6 : startDay - 1;
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < offset; i++) {
      days.push(null);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(d);
    }
    return days;
  }, [currentDate]);

  // Handle Step 1 -> Step 2 (Strict weekend guard)
  const handleDateConfirm = () => {
    if (!selectedDay || !selectedTime) return;
    const dateObj = new Date(year, currentDate.getMonth(), selectedDay);
    const dayOfWeek = dateObj.getDay();
    // Sunday is 0, Saturday is 6
    if (dayOfWeek === 0 || dayOfWeek === 6) return;
    setStep(2);
  };

  // Handle Step 2 -> Step 3
  const handleDetailsConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    try {
      const token = await createDraft({
        insubId: PRODUCT.insubId,
        productName: PRODUCT.name,
        name,
        email,
        company: company || "Healthcare Organization",
        sourceUrl: typeof window !== "undefined" ? window.location.href : null,
        sourceHost: typeof window !== "undefined" ? window.location.hostname : null,
      });
      if (token) setSessionToken(token);
    } catch {
      // Best-effort tracking
    } finally {
      setLoading(false);
      setStep(3);
    }
  };

  // Handle Step 3 -> Final Book
  const handleFinalBook = async () => {
    setLoading(true);
    try {
      if (sessionToken) {
        await updateDraft({
          sessionToken,
          selectedModules,
          somethingElse: notes || null,
          status: "booked",
        });
      }

      const isoStartTime =
        selectedSlot ||
        `${year}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}T11:00:00Z`;

      await bookDemo({
        insubId: PRODUCT.insubId,
        productName: PRODUCT.name,
        selectedModules,
        somethingElse: notes || null,
        name,
        email,
        company: company || "Healthcare Organization",
        startTime: isoStartTime,
        timezone: userTz,
        sessionToken,
      });
    } catch {
      // Best effort
    } finally {
      setLoading(false);
      setStep(4);
    }
  };

  const toggleModule = (mod: string) => {
    setSelectedModules((prev) =>
      prev.includes(mod) ? prev.filter((m) => m !== mod) : [...prev, mod]
    );
  };

  if (!ready) {
    return <section id="contact" aria-busy="true" className="min-h-80" />;
  }

  return (
    <section id="contact" className="scroll-mt-24 border-t border-[var(--line-2)] bg-[#FAF8F5] py-16 sm:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-[760px] text-center">
          <div className="font-sans text-[13px] font-medium tracking-[0.02em] text-[#6b7280]">
            Interactive Walkthrough
          </div>
          <h2 className="mt-3 font-display text-[clamp(2.1rem,5vw,3.8rem)] font-medium leading-[1.12] tracking-[-0.02em] text-[#111827]">
            See it against your own care<br className="hidden sm:block" /> flow.
          </h2>
          <p className="mx-auto mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[#4b5563]">
            Three steps - pick a time that suits, let us know who you are, and select the
            modules you want to evaluate live.
          </p>
        </div>

        {/* 2-Column Walkthrough Card */}
        <div className="mx-auto mt-10 sm:mt-12 max-w-[1040px] overflow-hidden rounded-[20px] sm:rounded-[24px] border border-[#e5e7eb] bg-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.07)]">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_minmax(0,1fr)]">
            {/* Left Column Overview */}
            <div className="flex flex-col justify-between border-b border-[#f3f4f6] bg-[#FAFAFA] p-5 sm:p-9 lg:border-b-0 lg:border-r">
              <div>
                {/* Brand Initial Badge */}
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#2e3231] font-display text-lg font-bold text-white shadow-xs">
                    E
                  </span>
                  <div>
                    <div className="text-[15px] font-bold text-[#111111]">{PRODUCT.name}</div>
                    <div className="text-[12px] text-[#6b7280]">by Nestack</div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[13px] font-medium text-[#4b5563]">
                  <Clock className="h-4 w-4 text-[#4b5563]" />
                  <span>45 min video call</span>
                </div>

                <h3 className="mt-3.5 font-display text-[1.35rem] font-bold leading-snug text-[#111111]">
                  Product Walk-Through &amp; Discussion
                </h3>

                <p className="mt-3 text-[13.5px] leading-[1.65] text-[#4b5563]">
                  A focused 45-minute walk-through of {PRODUCT.name} against a slice of your own
                  care pipeline and resident operations - intake, document extraction,
                  acuity assessment, care protocols, workforce scheduling, and quality audit,
                  end to end.
                </p>

                <ul className="mt-6 space-y-2.5">
                  <li className="flex items-center gap-2.5 text-[13px] font-medium text-[#374151]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden="true" />
                    <span>Live Video Walkthrough</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[13px] font-medium text-[#374151]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden="true" />
                    <span>Free &middot; 45 Minutes</span>
                  </li>
                  <li className="flex items-center gap-2.5 text-[13px] font-medium text-[#374151]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" aria-hidden="true" />
                    <span>Live Q&amp;A with Engineering</span>
                  </li>
                </ul>

                {/* Selected Appointment Feedback Box */}
                {selectedDay && selectedTime && (
                  <div className="mt-6 rounded-xl border border-[#e5e7eb] bg-white p-3.5 shadow-xs">
                    <div className="text-[11px] font-bold uppercase tracking-[0.05em] text-[var(--brand-d)]">
                      Selected Appointment
                    </div>
                    <div className="mt-1 text-[13.5px] font-semibold text-[#111111]">
                      {formatFullDate(year, currentDate.getMonth(), selectedDay)} &middot; {selectedTime}
                    </div>
                  </div>
                )}
              </div>

              {/* Progress Bar 01/03 */}
              <div className="mt-10 flex items-center justify-between gap-4 border-t border-[#f0f0f0] pt-6">
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#e5e7eb]">
                  <div
                    className="h-full rounded-full bg-[#2e3231] transition-all duration-300"
                    style={{
                      width: step === 1 ? "33%" : step === 2 ? "66%" : "100%",
                    }}
                  />
                </div>
                <span className="font-mono text-[12px] font-medium text-[#6b7280]">
                  0{Math.min(step, 3)}/03
                </span>
              </div>
            </div>

            {/* Right Column Interactive Flow */}
            <div className="flex flex-col justify-between p-4 sm:p-8 md:p-9">
              {/* STEP 1: Date & Time Picker */}
              {step === 1 && (
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
                    <div>
                      <span className="text-[13px] font-medium text-[var(--brand-d)]">Pick a time</span>
                      <h4 className="mt-0.5 font-display text-[1.35rem] sm:text-[1.45rem] font-bold text-[#111111]">
                        Select a Date &amp; Time
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-1.5">
                      <button
                        type="button"
                        onClick={prevMonth}
                        aria-label="Previous month"
                        className="grid h-9 w-9 min-h-[36px] min-w-[36px] place-items-center rounded-lg border border-[#e5e7eb] text-[#374151] transition-colors hover:bg-[#f3f4f6]"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="min-w-[115px] sm:min-w-[130px] text-center text-[13.5px] sm:text-[14px] font-bold text-[#111111]">
                        {monthName} {year}
                      </span>
                      <button
                        type="button"
                        onClick={nextMonth}
                        aria-label="Next month"
                        className="grid h-9 w-9 min-h-[36px] min-w-[36px] place-items-center rounded-lg border border-[#e5e7eb] text-[#374151] transition-colors hover:bg-[#f3f4f6]"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Weekday headers - SAT and SUN muted to indicate weekends */}
                  <div className="mt-6 sm:mt-7 grid grid-cols-7 gap-1 sm:gap-2 text-center font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-[#9ca3af]">
                    <div>MON</div>
                    <div>TUE</div>
                    <div>WED</div>
                    <div>THU</div>
                    <div>FRI</div>
                    <div className="text-[#cbd5e1]">SAT</div>
                    <div className="text-[#cbd5e1]">SUN</div>
                  </div>

                  {/* Calendar Grid */}
                  <div className="mt-2.5 grid grid-cols-7 gap-1 sm:gap-2">
                    {loadingSlots && slots.length === 0 ? (
                      Array.from({ length: 35 }).map((_, r) => (
                        <div key={`pulse-${r}`} className="h-9 sm:h-11 animate-pulse rounded-lg sm:rounded-xl bg-[#f3f4f6]" />
                      ))
                    ) : (
                      calendarDays.map((day, idx) => {
                        if (!day) {
                          return <div key={`empty-${idx}`} className="h-9 sm:h-11" />;
                        }

                        const dateObj = new Date(year, currentDate.getMonth(), day);
                        const dayOfWeek = dateObj.getDay(); // 0 = Sunday, 6 = Saturday
                        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const isPast = dateObj < today;

                        // In the real calendar API, Saturdays and Sundays have 0 slots.
                        // We strictly disable weekends under all conditions, as well as past dates or days with no available slots.
                        const hasSlots = availableDays.has(day);
                        const isEnabled = !isWeekend && !isPast && (slots.length === 0 || hasSlots);
                        const isSelected = selectedDay === day && isEnabled;

                        return (
                          <button
                            key={`day-${day}`}
                            type="button"
                            disabled={!isEnabled}
                            aria-disabled={!isEnabled}
                            aria-pressed={isSelected}
                            onClick={
                              isEnabled
                                ? () => {
                                    setSelectedDay(day);
                                    const daySlots = slotsByDay.get(day) ?? [];
                                    if (daySlots.length > 0) {
                                      setSelectedSlot(daySlots[0].startTime);
                                      setSelectedTime(formatTimeInTz(daySlots[0].startTime, userTz));
                                    } else {
                                      setSelectedSlot(null);
                                      setSelectedTime(null);
                                    }
                                  }
                                : undefined
                            }
                            className={`flex h-9 sm:h-11 items-center justify-center rounded-lg sm:rounded-xl font-sans text-[12px] sm:text-[13.5px] transition-all ${
                              !isEnabled
                                ? "cursor-not-allowed bg-transparent text-[#9ca3af]/40 font-normal select-none pointer-events-none"
                                : isSelected
                                ? "bg-[#2e3231] text-white shadow-xs font-semibold cursor-pointer ring-2 ring-[var(--brand)] ring-offset-2"
                                : "border border-transparent hover:border-[#e5e7eb] hover:bg-[#f9fafb] text-[#111827] font-medium cursor-pointer"
                            }`}
                          >
                            {day}
                          </button>
                        );
                      })
                    )}
                  </div>

                  {/* Time Slots when day is selected */}
                  {selectedDay && (
                    <div className="mt-6 border-t border-[#f0f0f0] pt-5">
                      <div className="flex items-center justify-between">
                        <span className="font-sans text-[12px] sm:text-[12.5px] font-semibold text-[#111111]">
                          Available times for {currentDate.toLocaleString("default", { month: "short" })} {selectedDay}:
                        </span>
                        <span className="inline-flex items-center gap-1 font-mono text-[10.5px] sm:text-[11px] text-[#6b7280]">
                          <Globe className="h-3 w-3 text-[#6b7280]" />
                          <span>{userTz}</span>
                        </span>
                      </div>

                      {currentDaySlots.length === 0 ? (
                        <div className="mt-3 rounded-xl border border-dashed border-[#e5e7eb] p-4 text-center text-[13px] text-[#6b7280]">
                          No open slots remaining for this date. Please pick another weekday.
                        </div>
                      ) : (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {currentDaySlots.map((s) => {
                            const timeLabel = formatTimeInTz(s.startTime, userTz);
                            const isSlotSelected = selectedSlot === s.startTime || selectedTime === timeLabel;
                            return (
                              <button
                                key={s.startTime}
                                type="button"
                                onClick={() => {
                                  setSelectedSlot(s.startTime);
                                  setSelectedTime(timeLabel);
                                }}
                                className={`rounded-lg px-3.5 py-2 text-[12.5px] sm:text-[13px] font-medium transition-all cursor-pointer min-h-[40px] ${
                                  isSlotSelected
                                    ? "border border-[var(--brand)] bg-[var(--brand)] text-white shadow-xs"
                                    : "border border-[#e5e7eb] bg-[#f9fafb] text-[#374151] hover:border-[#111111] hover:text-[#111111]"
                                }`}
                              >
                                {timeLabel}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Footer button */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-[#f0f0f0] pt-6">
                    <div className="text-[12.5px] text-[#6b7280]">
                      {selectedDay && selectedTime
                        ? `Selected: ${monthName} ${selectedDay}, ${year} at ${selectedTime}`
                        : "Select an available date & time slot."}
                    </div>
                    <button
                      type="button"
                      disabled={!selectedDay || !selectedTime}
                      onClick={handleDateConfirm}
                      className={`inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full px-6 py-2.5 text-[14px] font-medium transition-all ${
                        selectedDay && selectedTime
                          ? "bg-[#2e3231] text-white hover:bg-[var(--brand)] cursor-pointer"
                          : "bg-[#9ca3af] text-white opacity-80 cursor-not-allowed"
                      }`}
                    >
                      <span>Next: Who you are</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Who you are */}
              {step === 2 && (
                <form onSubmit={handleDetailsConfirm}>
                  <div>
                    <span className="text-[13px] font-medium text-[var(--brand-d)]">Step 2 of 3</span>
                    <h4 className="mt-0.5 font-display text-[1.45rem] font-bold text-[#111111]">
                      Your Details
                    </h4>
                    <p className="mt-1 text-[13px] text-[#6b7280]">
                      We’ll send meeting access details and a custom agenda to this email.
                    </p>
                  </div>

                  <div className="mt-6 space-y-4">
                    <div>
                      <label className="block text-[12px] font-semibold text-[#374151] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        autoComplete="name"
                        enterKeyHint="next"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins, RN"
                        className="w-full rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-[16px] sm:text-[14px] text-[#111111] outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#374151] mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        inputMode="email"
                        autoComplete="email"
                        enterKeyHint="next"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="s.jenkins@livingcare.org"
                        className="w-full rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-[16px] sm:text-[14px] text-[#111111] outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#374151] mb-1">
                        Healthcare Organization Name
                      </label>
                      <input
                        type="text"
                        name="organization"
                        autoComplete="organization"
                        enterKeyHint="next"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Regional Healthcare Consulting"
                        className="w-full rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-[16px] sm:text-[14px] text-[#111111] outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-semibold text-[#374151] mb-1">
                        Anything specific you want to see? (Optional)
                      </label>
                      <input
                        type="text"
                        name="notes"
                        enterKeyHint="done"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="e.g. PointClickCare sync, e-MAR exception routing"
                        className="w-full rounded-xl border border-[#e5e7eb] px-4 py-2.5 text-[16px] sm:text-[14px] text-[#111111] outline-none focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)]"
                      />
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-[#f0f0f0] pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="inline-flex min-h-[44px] items-center gap-1.5 py-2 text-[13px] font-medium text-[#6b7280] hover:text-[#111111] cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back to calendar</span>
                    </button>
                    <button
                      type="submit"
                      disabled={!name || !email || loading}
                      className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#2e3231] px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-[var(--brand)] cursor-pointer"
                    >
                      <span>Next: Select modules</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Module Selection & Final Book */}
              {step === 3 && (
                <div>
                  <div>
                    <span className="text-[13px] font-medium text-[var(--brand-d)]">Step 3 of 3</span>
                    <h4 className="mt-0.5 font-display text-[1.45rem] font-bold text-[#111111]">
                      Select Modules to Evaluate
                    </h4>
                    <p className="mt-1 text-[13px] text-[#6b7280]">
                      Pick the healthcare consulting workflows you would like demonstrated live.
                    </p>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {moduleOptions.map((mod) => {
                      const isChecked = selectedModules.includes(mod);
                      return (
                        <label
                          key={mod}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[var(--brand)] has-[:focus-visible]:ring-offset-2 ${
                            isChecked
                              ? "border-[var(--brand)] bg-[#FAF8F5] shadow-xs"
                              : "border-[#e5e7eb] hover:bg-[#f9fafb]"
                          }`}
                        >
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isChecked}
                            onChange={() => toggleModule(mod)}
                          />
                          <span className="text-[13.5px] font-medium text-[#111111]">{mod}</span>
                          <span
                            aria-hidden="true"
                            className={`grid h-5 w-5 place-items-center rounded-md border ${
                              isChecked
                                ? "border-[var(--brand)] bg-[var(--brand)] text-white"
                                : "border-[#d1d5db] bg-white"
                            }`}
                          >
                            {isChecked && <Check className="h-3.5 w-3.5" />}
                          </span>
                        </label>
                      );
                    })}
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-[#f0f0f0] pt-6">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="inline-flex min-h-[44px] items-center gap-1.5 py-2 text-[13px] font-medium text-[#6b7280] hover:text-[#111111] cursor-pointer"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      disabled={loading || selectedModules.length === 0}
                      onClick={handleFinalBook}
                      className="inline-flex min-h-[44px] w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-[#2e3231] px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-[var(--brand)] cursor-pointer"
                    >
                      <span>{loading ? "Scheduling..." : "Confirm & Book Walkthrough"}</span>
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Success Confirmation */}
              {step === 4 && (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--tint)] text-[var(--brand-d)]">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h4 className="mt-4 font-display text-[1.6rem] font-bold text-[#111111]">
                    Session Scheduled!
                  </h4>
                  <p className="mt-2 max-w-[40ch] text-[14px] text-[#4b5563]">
                    Thank you, {name}. A calendar invite and Google Meet link for{" "}
                    <strong>{formatFullDate(year, currentDate.getMonth(), selectedDay!)} at {selectedTime}</strong> have been
                    sent to <strong>{email}</strong>.
                  </p>

                  <div className="mt-8 rounded-xl border border-[#e5e7eb] bg-[#f9fafb] p-4 text-left text-[13px] text-[#374151]">
                    <div className="font-semibold text-[#111111]">Selected Modules:</div>
                    <ul className="mt-1.5 list-disc list-inside space-y-1 text-[#6b7280]">
                      {selectedModules.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                    }}
                    className="mt-8 text-[13px] font-medium text-[var(--brand-d)] underline hover:text-[#111111] cursor-pointer"
                  >
                    Schedule another time or modify
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
