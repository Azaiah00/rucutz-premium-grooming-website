"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { Check, Clock, ChevronLeft, ArrowRight, CalendarDays, ShieldCheck, Lock } from "lucide-react";
import { services, byId, openDays, slotsFor } from "@/lib/db";
import { fmtDuration, type Service } from "@/data/services";
import { BookLink } from "../BookLink";
import { POLICIES } from "@/data/business";
import { cn } from "@/lib/cn";

const STEPS = ["Experience", "Add-ons", "Date & time", "Your details", "Confirm"];
const useIsClient = () => useSyncExternalStore(() => () => {}, () => true, () => false);

export function Booker() {
  const isClient = useIsClient();
  const [step, setStep] = useState(0);
  const [svc, setSvc] = useState<string | null>(null);
  const [addOns, setAddOns] = useState<string[]>([]);
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [done, setDone] = useState(false);

  const all = services();
  const main = all.filter((s) => s.category !== "addon");
  const extras = all.filter((s) => s.category === "addon");
  const chosen = svc ? byId(svc) : undefined;
  const chosenAddOns = addOns.map((a) => byId(a)).filter(Boolean) as Service[];
  const total = (chosen?.price ?? 0) + chosenAddOns.reduce((t, a) => t + a.price, 0);
  const minutes = (chosen?.minutes ?? 0) + chosenAddOns.reduce((t, a) => t + a.minutes, 0);

  const days = useMemo(() => (isClient ? openDays(new Date(), 14) : []), [isClient]);
  const dayObj = days.find((d) => d.iso === day);
  const slots = useMemo(() => (dayObj && minutes ? slotsFor(dayObj.iso, dayObj.dow, minutes) : []), [dayObj, minutes]);

  const canNext = [!!svc, true, !!slot, form.name.trim().length > 1 && /\d{3}.*\d{4}/.test(form.phone), true][step];
  const slotLabel = slots.find((s) => s.iso === slot)?.label;
  const dayLabel = dayObj?.date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  if (done) {
    return (
      <div className="rounded-[3px] border border-gold/50 bg-ink-2 p-8 text-center md:p-14">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink">
          <Check className="h-8 w-8" aria-hidden />
        </div>
        <h2 className="display mt-6 text-5xl">You&apos;re locked in.</h2>
        <p className="mx-auto mt-4 max-w-md text-bone-dim">
          {chosen?.name} · {dayLabel} at {slotLabel}. In the live version, a text and email confirmation go out now, with a reminder 24 hours before.
        </p>
        <p className="eyebrow mt-6 text-gold">Demo only · nothing was booked</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <BookLink label="Book for real on Square">Book for real on Square</BookLink>
          <button type="button" className="btn btn-ghost" onClick={() => { setDone(false); setStep(0); setSvc(null); setAddOns([]); setDay(null); setSlot(null); }}>
            Start over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="min-w-0">
        {/* Progress */}
        <ol className="flex gap-2" aria-label="Booking progress">
          {STEPS.map((s, i) => (
            <li key={s} className="flex-1">
              <span className={cn("block h-1 rounded-full transition-colors", i <= step ? "bg-gold" : "bg-line")} />
              <span className={cn("mt-2 hidden text-xs font-semibold uppercase tracking-wider sm:block", i === step ? "text-gold" : "text-bone-mute")}>
                {i + 1}. {s}
              </span>
            </li>
          ))}
        </ol>
        <p className="sr-only" aria-live="polite">
          Step {step + 1} of {STEPS.length}: {STEPS[step]}
        </p>

        <div className="mt-8">
          {step === 0 && (
            <fieldset>
              <legend className="display text-4xl">Choose your Experience</legend>
              <div className="mt-6 grid gap-3">
                {main.map((s) => (
                  <label key={s.slug} className={cn("flex cursor-pointer items-center justify-between gap-4 rounded-[3px] border p-5 transition-colors", svc === s.slug ? "border-gold bg-gold/5" : "border-line hover:border-gold/50")}>
                    <span className="flex items-center gap-4">
                      <input type="radio" name="svc" value={s.slug} checked={svc === s.slug} onChange={() => { setSvc(s.slug); setSlot(null); }} className="h-6 w-6 shrink-0 accent-[#d8a848]" />
                      <span>
                        <span className="block font-semibold text-bone">{s.name}</span>
                        <span className="flex items-center gap-1.5 text-sm text-bone-mute"><Clock className="h-3.5 w-3.5" aria-hidden /> {fmtDuration(s.minutes)}</span>
                      </span>
                    </span>
                    <span className="display text-2xl text-gold">${s.price}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="display text-4xl">Level it up?</legend>
              <p className="mt-2 text-bone-dim">Optional. Skip if you&apos;re good.</p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {extras.map((a) => {
                  const on = addOns.includes(a.slug);
                  return (
                    <label key={a.slug} className={cn("flex cursor-pointer items-start justify-between gap-4 rounded-[3px] border p-5 transition-colors", on ? "border-gold bg-gold/5" : "border-line hover:border-gold/50")}>
                      <span className="flex gap-4">
                        <input type="checkbox" checked={on} onChange={() => { setAddOns((x) => (on ? x.filter((y) => y !== a.slug) : [...x, a.slug])); setSlot(null); }} className="mt-0.5 h-6 w-6 shrink-0 accent-[#d8a848]" />
                        <span>
                          <span className="block font-semibold text-bone">{a.name}</span>
                          <span className="block text-sm text-bone-mute">{a.summary}</span>
                        </span>
                      </span>
                      <span className="font-semibold text-gold">+${a.price}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <div>
              <h2 className="display text-4xl">Pick a time</h2>
              <p className="mt-2 text-bone-dim">Only times that fit your full {fmtDuration(minutes)} before closing are shown.</p>
              <div className="mt-6 flex gap-2 overflow-x-auto pb-2" role="listbox" aria-label="Choose a day">
                {days.map((d) => (
                  <button
                    key={d.iso}
                    type="button"
                    role="option"
                    aria-selected={day === d.iso}
                    onClick={() => { setDay(d.iso); setSlot(null); }}
                    className={cn("flex min-w-[72px] flex-col items-center rounded-[3px] border px-3 py-3 transition-colors", day === d.iso ? "border-gold bg-gold text-ink" : "border-line text-bone hover:border-gold/50")}
                  >
                    <span className="text-xs font-semibold uppercase">{d.date.toLocaleDateString("en-US", { weekday: "short" })}</span>
                    <span className="display text-2xl">{d.date.getDate()}</span>
                    <span className="text-xs">{d.date.toLocaleDateString("en-US", { month: "short" })}</span>
                  </button>
                ))}
              </div>
              {day ? (
                <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
                  {slots.map((s) => (
                    <button
                      key={s.iso}
                      type="button"
                      disabled={s.taken}
                      onClick={() => setSlot(s.iso)}
                      aria-pressed={slot === s.iso}
                      className={cn(
                        "min-h-11 rounded-[3px] border text-sm font-semibold transition-colors",
                        s.taken ? "cursor-not-allowed border-line/40 text-bone-mute/50 line-through" : slot === s.iso ? "border-gold bg-gold text-ink" : "border-line text-bone hover:border-gold/60",
                      )}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="mt-6 flex items-center gap-2 text-bone-mute"><CalendarDays className="h-4 w-4" aria-hidden /> Choose a day to see open times.</p>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="display text-4xl">Your details</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {([
                  ["name", "Full name", "text", "name"],
                  ["phone", "Mobile number", "tel", "tel"],
                  ["email", "Email (optional)", "email", "email"],
                ] as const).map(([k, label, type, ac]) => (
                  <label key={k} className={cn("block", k === "email" && "sm:col-span-2")}>
                    <span className="mb-2 block text-sm font-semibold text-bone">{label}</span>
                    <input
                      type={type}
                      autoComplete={ac}
                      value={form[k]}
                      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                      className="min-h-12 w-full rounded-[3px] border border-line bg-ink-3 px-4 text-bone placeholder:text-bone-mute focus:border-gold focus:outline-none"
                    />
                  </label>
                ))}
                <label className="block sm:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-bone">Anything Ru should know? (optional)</span>
                  <textarea value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} rows={3} placeholder="The look you want, an event date, a promo code…" className="w-full rounded-[3px] border border-line bg-ink-3 px-4 py-3 text-bone placeholder:text-bone-mute focus:border-gold focus:outline-none" />
                </label>
              </div>
              <div className="mt-6 flex gap-3 rounded-[3px] border border-line bg-ink-2 p-5 text-sm text-bone-dim">
                <Lock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <p>
                  Card on file (demo): in the live version a card holds your spot and is only charged the ${POLICIES.noShowFee} fee for a no-show or a cancellation inside {POLICIES.noShowWindowHours} hours.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="display text-4xl">Look right?</h2>
              <dl className="mt-6 divide-y divide-line rounded-[3px] border border-line">
                {[
                  ["Experience", chosen?.name],
                  ["Add-ons", chosenAddOns.map((a) => a.name).join(", ") || "None"],
                  ["When", `${dayLabel} · ${slotLabel}`],
                  ["Name", form.name],
                  ["Phone", form.phone],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-6 px-5 py-4">
                    <dt className="text-bone-mute">{k}</dt>
                    <dd className="text-right text-bone">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </div>

        <div className="mt-10 flex items-center justify-between gap-3">
          <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className={cn("btn btn-ghost", step === 0 && "invisible")}>
            <ChevronLeft className="h-4 w-4" aria-hidden /> Back
          </button>
          {step < 4 ? (
            <button type="button" disabled={!canNext} onClick={() => setStep((s) => s + 1)} className="btn btn-gold disabled:cursor-not-allowed disabled:opacity-40">
              {step === 1 && addOns.length === 0 ? "Skip" : "Continue"} <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          ) : (
            <button type="button" onClick={() => setDone(true)} className="btn btn-gold">
              Confirm (demo) <Check className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>
      </div>

      {/* Always-visible running total */}
      <aside className="h-fit rounded-[3px] border border-line bg-ink-2 p-6 lg:sticky lg:top-28" aria-label="Your appointment">
        <p className="eyebrow text-gold">Your appointment</p>
        <ul className="mt-4 space-y-3 text-sm">
          <li className="flex justify-between gap-3">
            <span className="text-bone">{chosen?.name ?? "Choose an Experience"}</span>
            <span className="text-bone">{chosen ? `$${chosen.price}` : ""}</span>
          </li>
          {chosenAddOns.map((a) => (
            <li key={a.slug} className="flex justify-between gap-3 text-bone-dim">
              <span>+ {a.name}</span>
              <span>${a.price}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5 flex items-end justify-between border-t border-line pt-5">
          <span className="flex items-center gap-1.5 text-sm text-bone-mute"><Clock className="h-4 w-4" aria-hidden /> {minutes ? fmtDuration(minutes) : "—"}</span>
          <span className="display text-4xl text-gold">${total}</span>
        </div>
        {slotLabel && <p className="mt-3 text-sm text-bone">{dayLabel} · {slotLabel}</p>}
        <p className="mt-5 flex gap-2 text-xs text-bone-mute"><ShieldCheck className="h-4 w-4 shrink-0 text-gold" aria-hidden /> Shampoo + hot towel included with every cut.</p>
      </aside>
    </div>
  );
}
