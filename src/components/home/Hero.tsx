import Link from "next/link";
import { Stars } from "../Stars";
import { Img } from "../Img";
import { Logo } from "../Brand";
import { BookLink } from "../BookLink";
import { OpenStatus } from "../OpenStatus";
import { BUSINESS } from "@/data/business";

export function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden pt-[var(--header-h)]" aria-labelledby="hero-title">
      {/* Mobile: the portrait sits behind the type */}
      <div className="absolute inset-0 -z-10 lg:hidden" aria-hidden>
        <Img k="hero-taper-beard" priority media="(max-width: 1023.98px)" sizes="100vw" className="object-[62%_20%] opacity-45" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
      </div>
      {/* Warm gold bloom */}
      <div className="pointer-events-none absolute -left-40 top-24 -z-10 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[120px]" aria-hidden />

      <div className="mx-auto grid min-h-[calc(100svh-var(--header-h))] max-w-[1400px] items-center gap-10 px-5 pb-14 pt-8 md:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-20">
        <div className="relative lg:col-span-7">
          <div className="rise mb-6 flex flex-wrap items-center gap-x-4 gap-y-2" style={{ ["--d" as string]: "80ms" }}>
            <OpenStatus />
            <span className="eyebrow text-bone-dim">By appointment only</span>
          </div>

          <div className="relative">
          <h1 id="hero-title">
            <span className="rise eyebrow mb-4 block text-gold" style={{ ["--d" as string]: "140ms" }}>
              Premium barber · Hollywood, FL
            </span>
            <span className="display block text-[clamp(3.9rem,12.5vw,8.6rem)]">
              <span className="rise block" style={{ ["--d" as string]: "220ms" }}>Precision.</span>
              <span className="rise block text-bone/90" style={{ ["--d" as string]: "320ms" }}>Detail.</span>
              <span className="rise block" style={{ ["--d" as string]: "420ms" }}>
                <span className="foil-text shimmer">Presence.</span>
              </span>
            </span>
          </h1>
          <p
            className="spray-in tag pointer-events-none relative z-10 mt-5 block -rotate-[3deg] text-left sm:-rotate-[5deg] lg:absolute lg:-bottom-8 lg:right-10 lg:mt-0 text-[clamp(1.05rem,2.3vw,1.85rem)] text-gold-lift drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
            aria-hidden
            style={{ ["--d" as string]: "1100ms" }}
          >
            welcome to the RuCutz experience
          </p>
          </div>

          <p className="rise mt-8 max-w-[34rem] lg:mt-16 text-lg text-bone-dim md:text-xl" style={{ ["--d" as string]: "560ms" }}>
            One barber. One client. A private suite where every cut starts at the shampoo bowl and finishes with a hot towel and razor-sharp detail.{" "}
            <span className="text-bone">Your image is an investment. Ru treats it like one.</span>
          </p>

          <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "660ms" }}>
            <BookLink label="Book your experience" />
            <Link href="/services/" className="btn btn-ghost">
              See the service menu
            </Link>
          </div>

          <ul className="rise mt-10 grid max-w-xl grid-cols-1 gap-4 text-sm sm:grid-cols-3" style={{ ["--d" as string]: "760ms" }}>
            <li className="flex items-center gap-3">
              <Stars className="h-3.5 w-auto text-gold" label="Rated 5 out of 5 on Google" />
              <a href={BUSINESS.googleReviewSearchUrl} target="_blank" rel="noopener" className="inline-block py-2 text-bone underline decoration-gold/40 underline-offset-4 hover:decoration-gold">
                5.0 on Google
              </a>
            </li>
            <li className="text-bone-dim">
              <span className="text-bone">Shampoo + hot towel</span> with every cut
            </li>
            <li className="text-bone-dim">
              <span className="text-bone">All textures</span>, all ages 10+
            </li>
          </ul>
        </div>

        {/* Portrait with the signature logo trace (photo is the background on mobile) */}
        <div className="relative lg:col-span-5">
          <div className="rise relative mx-auto max-w-[440px] lg:max-w-none lg:aspect-[4/5] lg:overflow-hidden lg:rounded-[3px] lg:border lg:border-line" style={{ ["--d" as string]: "200ms" }}>
            <div className="hero-zoom absolute inset-0 hidden lg:block">
              <Img k="hero-taper-beard" priority media="(min-width: 1024px)" sizes="40vw" className="object-[55%_25%]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 hidden h-1/2 bg-gradient-to-t from-ink via-ink/70 to-transparent lg:block" aria-hidden />
            <div className="relative lg:absolute lg:inset-x-8 lg:bottom-7">
              <Logo draw priority className="drop-shadow-[0_6px_24px_rgba(0,0,0,0.6)]" />
            </div>
          </div>
          <span className="pointer-events-none absolute -left-3 -top-3 hidden h-10 w-10 border-l border-t border-gold/70 lg:block" aria-hidden />
          <span className="pointer-events-none absolute -bottom-3 -right-3 hidden h-10 w-10 border-b border-r border-gold/70 lg:block" aria-hidden />
          <p className="eyebrow mt-6 hidden text-right text-bone-mute lg:block" aria-hidden>
            Salon Lofts Hollywood · Loft 13
          </p>
        </div>
      </div>
    </section>
  );
}
