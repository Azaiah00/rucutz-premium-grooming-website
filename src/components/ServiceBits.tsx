import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { Img } from "./Img";
import { PhotoSlot } from "./PhotoSlot";
import { type Service, fmtDuration } from "@/data/services";
import { cn } from "@/lib/cn";

export function ServiceMedia({ s, className, sizes }: { s: Service; className?: string; sizes?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-ink-3", className)}>
      {s.photo ? (
        <Img k={s.photo} sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"} className="transition-transform duration-[1.2s] ease-[var(--ease-cut)] group-hover:scale-[1.06]" />
      ) : (
        <PhotoSlot brief={s.photoBrief ?? s.name} />
      )}
    </div>
  );
}

/** Big photo card for signature services. */
export function FeatureCard({ s, index, as: H = "h3" }: { s: Service; index: number; as?: "h2" | "h3" }) {
  return (
    <article className="reveal group relative flex flex-col overflow-hidden rounded-[3px] border border-line bg-ink-2" style={{ ["--d" as string]: `${index * 110}ms` }}>
      <ServiceMedia s={s} className="aspect-[4/5]" />
      <div className="absolute inset-x-0 bottom-0 top-1/3 bg-gradient-to-t from-ink via-ink/85 to-transparent" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
        <p className="tag text-lg text-gold">{s.tagline}</p>
        <H className="display mt-2 text-[2.4rem] leading-[0.9] md:text-[2.7rem]">
          <Link href={`/services/${s.slug}/`} className="after:absolute after:inset-0 after:content-['']">
            {s.short}
          </Link>
        </H>
        <div className="mt-4 flex items-center justify-between gap-4 border-t border-line/80 pt-4">
          <p className="flex items-center gap-2 text-sm text-bone-dim">
            <Clock className="h-4 w-4 text-gold" aria-hidden />
            {fmtDuration(s.minutes)}
          </p>
          <p className="display text-3xl foil-text">${s.price}</p>
        </div>
      </div>
    </article>
  );
}

/** Menu row: name, dotted leader, price. Reads like a printed barbershop board. */
export function MenuRow({ s, showSummary = false }: { s: Service; showSummary?: boolean }) {
  const inner = (
    <>
      <div className="flex items-baseline gap-3">
        <h3 className="display text-[1.55rem] leading-none text-bone transition-colors group-hover:text-gold-lift md:text-[1.75rem]">{s.name}</h3>
        <span className="mb-1 min-w-6 flex-1 border-b border-dotted border-bone-mute/50" aria-hidden />
        <span className="display text-[1.55rem] leading-none text-gold md:text-[1.75rem]">${s.price}</span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-bone-mute">
        <span className="inline-flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" aria-hidden /> {fmtDuration(s.minutes)}
        </span>
        {showSummary && <span className="text-bone-dim">{s.tagline}</span>}
        {s.hasPage && (
          <span className="inline-flex items-center gap-1 text-gold opacity-0 transition-opacity group-hover:opacity-100">
            Details <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        )}
      </div>
    </>
  );
  return s.hasPage ? (
    <Link href={`/services/${s.slug}/`} className="group block py-5">
      {inner}
    </Link>
  ) : (
    <div className="group py-5">{inner}</div>
  );
}
