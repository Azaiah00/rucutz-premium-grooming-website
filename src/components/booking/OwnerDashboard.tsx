"use client";

import { useState } from "react";
import { CalendarDays, DollarSign, Users, ShieldCheck, Bell, Scissors, Camera } from "lucide-react";
import { TODAY, CLIENTS, dueForRebook, byId } from "@/lib/db";
import { Img } from "../Img";
import { cn } from "@/lib/cn";

const STATUS: Record<string, { label: string; cls: string }> = {
  done: { label: "Done", cls: "bg-line text-bone-dim" },
  "in-chair": { label: "In the chair", cls: "bg-gold text-ink" },
  confirmed: { label: "Confirmed", cls: "border border-gold/60 text-gold" },
  "no-show-protected": { label: "No-show · $45 collected", cls: "border border-bone-mute/60 text-bone-dim" },
};

const fmt12 = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
};

export function OwnerDashboard() {
  const [tab, setTab] = useState<"today" | "clients" | "rebook">("today");
  const [clientId, setClientId] = useState(CLIENTS[0].id);
  const revenue = TODAY.reduce((t, a) => t + a.total, 0);
  const due = dueForRebook();
  const client = CLIENTS.find((c) => c.id === clientId)!;

  const kpis = [
    { icon: CalendarDays, label: "Booked today", value: String(TODAY.length) },
    { icon: DollarSign, label: "Today's revenue", value: `$${revenue}` },
    { icon: Bell, label: "Due for a rebook", value: String(due.length) },
    { icon: ShieldCheck, label: "No-show fees saved (30d)", value: "$135" },
  ];

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <div key={k.label} className="rounded-[3px] border border-line bg-ink-2 p-5">
            <k.icon className="h-5 w-5 text-gold" aria-hidden />
            <p className="display mt-3 text-4xl">{k.value}</p>
            <p className="text-sm text-bone-mute">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex gap-2" role="tablist" aria-label="Dashboard views">
        {([
          ["today", "Today's chair"],
          ["rebook", "Rebook radar"],
          ["clients", "Client journeys"],
        ] as const).map(([id, label]) => (
          <button key={id} role="tab" aria-selected={tab === id} type="button" onClick={() => setTab(id)} className={cn("min-h-11 rounded-full border px-4 text-sm font-semibold", tab === id ? "border-gold bg-gold text-ink" : "border-line text-bone-dim hover:text-bone")}>
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6" role="tabpanel">
        {tab === "today" && (
          <ol className="divide-y divide-line rounded-[3px] border border-line">
            {TODAY.map((a) => {
              const s = byId(a.serviceSlug);
              return (
                <li key={a.id} className="grid gap-2 p-5 sm:grid-cols-[90px_1fr_auto] sm:items-center sm:gap-6">
                  <span className="display text-2xl text-gold">{fmt12(a.start)}</span>
                  <span>
                    <span className="block font-semibold text-bone">{a.client}</span>
                    <span className="block text-sm text-bone-dim">
                      {s?.name}
                      {a.addOns.length > 0 && ` + ${a.addOns.map((x) => byId(x)?.name).join(", ")}`}
                      {a.note && <span className="text-bone-mute"> · {a.note}</span>}
                    </span>
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-bone">${a.total}</span>
                    <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", STATUS[a.status].cls)}>{STATUS[a.status].label}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        )}

        {tab === "rebook" && (
          <div className="grid gap-4 md:grid-cols-2">
            {due.map((c) => (
              <div key={c.id} className="rounded-[3px] border border-line bg-ink-2 p-5">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-bone">{c.name}</p>
                  <span className="rounded-full border border-gold/60 px-3 py-1 text-xs font-semibold text-gold">{c.overdue} days past rhythm</span>
                </div>
                <p className="mt-2 text-sm text-bone-dim">
                  Usually every {c.rhythmWeeks} weeks · {byId(c.usual)?.short} · last visit {c.days} days ago
                </p>
                <button type="button" className="btn btn-ghost mt-4 min-h-10! w-full text-xs!">
                  <Bell className="h-4 w-4" aria-hidden /> Send rebook text (demo)
                </button>
              </div>
            ))}
          </div>
        )}

        {tab === "clients" && (
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <ul className="space-y-2">
              {CLIENTS.map((c) => (
                <li key={c.id}>
                  <button type="button" onClick={() => setClientId(c.id)} className={cn("flex w-full items-center justify-between rounded-[3px] border px-4 py-3 text-left", c.id === clientId ? "border-gold bg-gold/5" : "border-line hover:border-gold/50")}>
                    <span>
                      <span className="block font-semibold text-bone">{c.name}</span>
                      <span className="text-xs text-bone-mute">{c.visits} visits · ${c.spend}</span>
                    </span>
                    <span className="text-xs font-semibold text-gold">{c.tier}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="rounded-[3px] border border-line bg-ink-2 p-6">
              <p className="eyebrow flex items-center gap-2 text-gold"><Camera className="h-4 w-4" aria-hidden /> Photo journey · {client.name}</p>
              {client.journey.length ? (
                <ol className="mt-5 grid gap-4 sm:grid-cols-3">
                  {client.journey.map((j) => (
                    <li key={j.date + j.photo}>
                      <div className="aspect-[4/5] overflow-hidden rounded-[3px] border border-line">
                        <Img k={j.photo} sizes="200px" />
                      </div>
                      <p className="mt-2 text-xs text-bone-mute">{new Date(j.date + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</p>
                      <p className="text-sm text-bone">{j.note}</p>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="mt-5 flex items-center gap-2 text-bone-dim"><Scissors className="h-4 w-4 text-gold" aria-hidden /> No photos yet. Snap one after the next cut and it syncs to the client&apos;s account.</p>
              )}
              <p className="mt-6 flex items-center gap-2 text-sm text-bone-mute"><Users className="h-4 w-4" aria-hidden /> Clients see the same timeline in their own account.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
