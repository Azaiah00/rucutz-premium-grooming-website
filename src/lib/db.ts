/**
 * DEMO data layer for the booking-portal preview. Everything here is mock data held in memory.
 * The UI only talks to these functions, so going live is a backend swap, not a redesign:
 *   // TODO: Supabase (clients, appointments, photo timeline) or Square Bookings API
 *   // TODO: Stripe / Square card-on-file for deposits and the $45 no-show fee
 */
import { HOURS } from "@/data/business";
import { SERVICES, type Service } from "@/data/services";

export type Slot = { iso: string; label: string; taken: boolean };
export type Appointment = {
  id: string;
  client: string;
  serviceSlug: string;
  addOns: string[];
  start: string; // "HH:MM"
  status: "confirmed" | "in-chair" | "done" | "no-show-protected";
  total: number;
  note?: string;
};
export type Client = {
  id: string;
  name: string;
  visits: number;
  lastVisit: string; // ISO date
  usual: string; // service slug
  rhythmWeeks: number;
  spend: number;
  tier: "Crown" | "Regular" | "New";
  journey: { date: string; photo: string; note: string }[];
};

// Deterministic PRNG so the demo looks the same on every render (no hydration drift).
function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const pad = (n: number) => String(n).padStart(2, "0");
const toMin = (t: string) => Number(t.slice(0, 2)) * 60 + Number(t.slice(3, 5));
const fmt = (m: number) => {
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${h % 12 === 0 ? 12 : h % 12}:${pad(mm)} ${h >= 12 ? "PM" : "AM"}`;
};

/** Next N open days (Florida hours), skipping Sundays automatically. */
export function openDays(from: Date, count = 14) {
  const out: { date: Date; iso: string; dow: number }[] = [];
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  while (out.length < count) {
    d.setDate(d.getDate() + 1);
    const dow = d.getDay();
    if (HOURS[dow].open) out.push({ date: new Date(d), iso: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`, dow });
  }
  return out;
}

/** Hours-aware availability: slots every 15 min that fit the full appointment before close. */
export function slotsFor(dayIso: string, dow: number, minutes: number): Slot[] {
  const h = HOURS[dow];
  if (!h.open || !h.close) return [];
  const open = toMin(h.open);
  const close = toMin(h.close);
  const rand = seeded(Number(dayIso.replace(/-/g, "")) + minutes);
  const out: Slot[] = [];
  for (let m = open; m + minutes <= close; m += 15) {
    out.push({ iso: `${dayIso}T${pad(Math.floor(m / 60))}:${pad(m % 60)}`, label: fmt(m), taken: rand() < 0.42 });
  }
  return out;
}

export const services = () => SERVICES;
export const byId = (slug: string): Service | undefined => SERVICES.find((s) => s.slug === slug);

// ---------- Owner-side demo data ----------
export const TODAY: Appointment[] = [
  { id: "a1", client: "Marcus T.", serviceSlug: "king-haircut-experience", addOns: ["signature-scent"], start: "10:00", status: "done", total: 70 },
  { id: "a2", client: "Andre W.", serviceSlug: "the-distinguished-experience", addOns: [], start: "11:00", status: "done", total: 120, note: "Wedding Saturday" },
  { id: "a3", client: "Jordan P. (15)", serviceSlug: "prince-haircut-experience", addOns: [], start: "12:30", status: "in-chair", total: 50, note: "Wants a part design" },
  { id: "a4", client: "Chris L.", serviceSlug: "ultimate-edge-up", addOns: ["eyebrows"], start: "13:30", status: "confirmed", total: 55 },
  { id: "a5", client: "D. Robinson", serviceSlug: "big-chop-transformation", addOns: [], start: "14:15", status: "confirmed", total: 100, note: "Locs → waves" },
  { id: "a6", client: "Kevin M.", serviceSlug: "king-haircut-massage-chair", addOns: ["extra-hot-towel"], start: "15:45", status: "confirmed", total: 95 },
  { id: "a7", client: "Tyrell B.", serviceSlug: "king-haircut-enhancements", addOns: [], start: "17:00", status: "no-show-protected", total: 45, note: "Card on file charged $45" },
];

export const CLIENTS: Client[] = [
  { id: "c1", name: "Marcus T.", visits: 31, lastVisit: "2026-09-10", usual: "king-haircut-experience", rhythmWeeks: 2, spend: 1920, tier: "Crown", journey: [
    { date: "2026-06-02", photo: "g14", note: "Waves connecting at the crown" },
    { date: "2026-07-14", photo: "g23", note: "Dropped the taper a half-guard" },
    { date: "2026-09-10", photo: "g32", note: "Deepest the pattern has been" },
  ] },
  { id: "c2", name: "D. Robinson", visits: 1, lastVisit: "2026-08-12", usual: "big-chop-transformation", rhythmWeeks: 3, spend: 100, tier: "New", journey: [
    { date: "2026-08-12", photo: "bigchop-before", note: "Before the chop" },
    { date: "2026-08-12", photo: "bigchop-after", note: "Locs → low cut, waves started" },
  ] },
  { id: "c3", name: "Andre W.", visits: 12, lastVisit: "2026-08-20", usual: "the-distinguished-experience", rhythmWeeks: 3, spend: 1380, tier: "Regular", journey: [
    { date: "2026-08-20", photo: "g12", note: "Beard sculpt for the rehearsal dinner" },
  ] },
  { id: "c4", name: "Chris L.", visits: 8, lastVisit: "2026-08-06", usual: "ultimate-edge-up", rhythmWeeks: 2, spend: 420, tier: "Regular", journey: [] },
  { id: "c5", name: "Kevin M.", visits: 19, lastVisit: "2026-07-29", usual: "king-haircut-massage-chair", rhythmWeeks: 3, spend: 1510, tier: "Crown", journey: [] },
];

/** Retention hook: who is past their normal rhythm and should get a rebook nudge. */
export function dueForRebook(now = new Date("2026-09-11T12:00:00")) {
  return CLIENTS.map((c) => {
    const days = Math.round((now.getTime() - new Date(c.lastVisit + "T12:00:00").getTime()) / 86400000);
    return { ...c, days, overdue: days - c.rhythmWeeks * 7 };
  })
    .filter((c) => c.overdue > 0)
    .sort((a, b) => b.overdue - a.overdue);
}
