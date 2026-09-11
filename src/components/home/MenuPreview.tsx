import Link from "next/link";
import { FeatureCard, MenuRow } from "../ServiceBits";
import { BookLink } from "../BookLink";
import { FEATURED, MAIN_SERVICES, ADDONS } from "@/data/services";

export function MenuPreview() {
  const rest = MAIN_SERVICES.filter((s) => !s.featured);
  return (
    <section className="grain relative py-24 md:py-32" aria-labelledby="menu-title" id="menu">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            {/* Ru's own hand-lettered header style from his Square site, carried over on purpose */}
            <h2 id="menu-title" className="spray tag -rotate-2 pb-2 text-[clamp(3rem,8vw,6.4rem)] leading-[1.1] text-gold lg:whitespace-nowrap">
              Service Menu
            </h2>
            <p className="reveal mt-8 max-w-xl text-lg text-bone-dim">
              Every service is an <span className="text-bone">Experience</span>: a deep-cleansing shampoo and a hot-towel face massage come standard. Prices
              match Ru&apos;s live booking page, so what you see is what you book.
            </p>
          </div>
          <BookLink variant="ghost" label="Book any service" className="self-start lg:self-end">
            Book any service
          </BookLink>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {FEATURED.map((s, i) => (
            <FeatureCard key={s.slug} s={s} index={i} />
          ))}
        </div>

        <div className="mt-16 grid gap-x-16 md:grid-cols-2">
          {rest.map((s) => (
            <div key={s.slug} className="reveal border-b border-line">
              <MenuRow s={s} />
            </div>
          ))}
        </div>

        <div className="reveal mt-12 rounded-[3px] border border-line bg-ink-2 p-6 md:p-8">
          <p className="eyebrow text-gold">Add-ons</p>
          <ul className="mt-4 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
            {ADDONS.map((a) => (
              <li key={a.slug} className="flex items-baseline justify-between gap-3 border-b border-line/60 pb-3">
                <span className="text-bone">{a.name}</span>
                <span className="font-semibold text-gold">+${a.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="reveal mt-10 text-center">
          <Link href="/services/" className="eyebrow inline-block py-2 text-gold underline decoration-gold/40 underline-offset-8 hover:decoration-gold">
            See every Experience in detail
          </Link>
        </p>
      </div>
    </section>
  );
}
