import { HOURS, fmtTime } from "@/data/business";

/** Current wall-clock time in Hollywood, FL regardless of the visitor's timezone. */
function nowInFlorida(d = new Date()) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(d);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const dayIdx = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const h = Number(get("hour")) % 24;
  return { dayIdx, minutes: h * 60 + Number(get("minute")) };
}

const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

export type OpenState = { open: boolean; label: string; todayIdx: number };

export function openState(d = new Date()): OpenState {
  const { dayIdx, minutes } = nowInFlorida(d);
  const today = HOURS[dayIdx];
  if (today.open && today.close && minutes >= toMin(today.open) && minutes < toMin(today.close)) {
    return { open: true, label: `Open now · until ${fmtTime(today.close)}`, todayIdx: dayIdx };
  }
  // Find the next opening.
  for (let i = 0; i < 8; i++) {
    const idx = (dayIdx + i) % 7;
    const day = HOURS[idx];
    if (!day.open) continue;
    if (i === 0 && minutes >= toMin(day.open)) continue;
    const when = i === 0 ? "today" : i === 1 ? "tomorrow" : day.day;
    return { open: false, label: `Closed · opens ${when} ${fmtTime(day.open)}`, todayIdx: dayIdx };
  }
  return { open: false, label: "Closed", todayIdx: dayIdx };
}
