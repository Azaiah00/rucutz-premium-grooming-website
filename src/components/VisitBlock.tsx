"use client";

import { MapPin, Phone, MessageSquare, Navigation, Car } from "lucide-react";
import { BUSINESS, HOURS, fmtTime } from "@/data/business";
import { useOpenState } from "./OpenStatus";
import { BookLink } from "./BookLink";
import { cn } from "@/lib/cn";

export function HoursTable({ className }: { className?: string }) {
  const s = useOpenState();
  // Display Monday-first.
  const order = [1, 2, 3, 4, 5, 6, 0];
  return (
    <table className={cn("w-full text-left", className)}>
      <caption className="sr-only">RuCutz Premium Grooming hours</caption>
      <tbody>
        {order.map((i) => {
          const h = HOURS[i];
          const today = s?.todayIdx === i;
          return (
            <tr key={h.day} className={cn("border-b border-line/70", today && "text-gold-lift")}>
              <th scope="row" className="py-3 pr-4 font-medium">
                {h.day}
                {today && <span className="eyebrow ml-3 text-[0.75rem] text-gold">Today</span>}
              </th>
              <td className={cn("py-3 text-right tabular-nums", today ? "text-gold-lift" : "text-bone")}>
                {h.open && h.close ? `${fmtTime(h.open)} – ${fmtTime(h.close)}` : "Closed"}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export function VisitBlock({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  const H = headingLevel;
  const s = useOpenState();
  const a = BUSINESS.address;
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <div className="reveal relative flex flex-col overflow-hidden rounded-[3px] border border-line bg-ink-3">
        <div className="relative p-7 md:p-10">
          <H className="display text-[clamp(2.2rem,4.5vw,3.4rem)]">
            Pull up to <span className="foil-text">Loft 13.</span>
          </H>
          <address className="mt-6 space-y-1 text-lg not-italic text-bone">
            <span className="block">{a.venue}, {a.suite}</span>
            <span className="block">{a.street}</span>
            <span className="block">{a.city}, {a.region} {a.postalCode}</span>
          </address>
          <ul className="mt-6 space-y-3 text-bone-dim">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
              North side of Sheridan St, just west of N 46th Ave, next to LongHorn Steakhouse.
            </li>
            <li className="flex gap-3">
              <Car className="mt-1 h-4 w-4 shrink-0 text-gold" aria-hidden />
              Park in the shared lot. Salon Lofts is on the ground floor; find Loft 13 inside.
            </li>
          </ul>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener" className="btn btn-gold">
              <Navigation className="h-4 w-4" aria-hidden /> Get directions
            </a>
            <a href={BUSINESS.phoneHref} className="btn btn-ghost">
              <Phone className="h-4 w-4" aria-hidden /> Call
            </a>
            <a href={BUSINESS.smsHref} className="btn btn-ghost">
              <MessageSquare className="h-4 w-4" aria-hidden /> Text Ru
            </a>
          </div>
        </div>
        {/* Stylised street map: Sheridan St, N 46th Ave and the pin. Tapping it opens live directions. */}
        <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener" className="group relative mt-auto block border-t border-line" aria-label="Open directions to 4921 Sheridan St in Google Maps">
          <svg viewBox="0 0 640 200" className="block h-auto w-full" aria-hidden>
            <defs>
              <pattern id="mapgrid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M32 0H0V32" fill="none" stroke="#26221c" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="640" height="200" fill="#12100d" />
            <rect width="640" height="200" fill="url(#mapgrid)" />
            <path d="M0 44 C180 34 360 60 640 50" stroke="#332d24" strokeWidth="5" fill="none" />
            <text x="18" y="32" fill="#8f8677" fontSize="10" fontFamily="sans-serif" letterSpacing="2">ST ANDREWS RD</text>
            <path d="M520 0 V200" stroke="#8f8677" strokeWidth="7" />
            <text x="532" y="26" fill="#f2ece1" fontSize="11" fontFamily="sans-serif" letterSpacing="2">N 46TH AVE</text>
            <path d="M0 168 H640" stroke="#b8ae9f" strokeWidth="12" />
            <text x="18" y="192" fill="#f2ece1" fontSize="12" fontFamily="sans-serif" letterSpacing="3">SHERIDAN ST</text>
            <text x="566" y="192" fill="#8f8677" fontSize="10" fontFamily="sans-serif" letterSpacing="1.5">I-95 →</text>
            <rect x="300" y="84" width="170" height="46" rx="2" fill="#1b1814" stroke="#332d24" />
            <text x="314" y="112" fill="#8f8677" fontSize="10" fontFamily="sans-serif" letterSpacing="1.5">SALON LOFTS</text>
            <circle cx="430" cy="106" r="30" fill="#d8a848" opacity="0.14" />
            <path d="M430 76c-12 0-21 9-21 21 0 15 21 36 21 36s21-21 21-36c0-12-9-21-21-21Z" fill="#d8a848" />
            <circle cx="430" cy="97" r="7" fill="#0b0a08" />
            <text x="396" y="152" fill="#f6d77f" fontSize="11" fontWeight="700" fontFamily="sans-serif" letterSpacing="2">LOFT 13</text>
          </svg>
          <span className="eyebrow absolute bottom-3 right-3 rounded-sm bg-ink/90 px-2.5 py-1.5 text-[0.65rem] text-gold opacity-0 transition-opacity group-hover:opacity-100">Open in Maps</span>
        </a>
      </div>

      <div className="reveal rounded-[3px] border border-line bg-ink-2 p-7 md:p-10" style={{ ["--d" as string]: "120ms" }}>
        <div className="flex items-center justify-between gap-4">
          <p className="eyebrow text-gold">Hours</p>
          <p className={cn("text-sm font-semibold", s?.open ? "text-[#6bd68c]" : "text-bone-dim")}>{s?.label ?? "Open 6 days"}</p>
        </div>
        <HoursTable className="mt-4" />
        <p className="mt-5 text-sm text-bone-mute">
          By appointment only. Need a time outside these hours? Before / After Hours appointments are available by request.
        </p>
        <BookLink className="mt-7 w-full" label="Book your experience" />
      </div>
    </div>
  );
}
