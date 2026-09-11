import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FeatureCard, MenuRow, ServiceMedia } from "@/components/ServiceBits";
import { BookLink } from "@/components/BookLink";
import { CtaBand } from "@/components/CtaBand";
import { SERVICES, FEATURED, ADDONS, fmtDuration } from "@/data/services";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Barber Services & Prices, Hollywood FL",
  description:
    "The full RuCutz menu with real prices: King Haircut $60, Distinguished Experience $120, Big Chop $100, edge-ups and teen cuts. Shampoo and hot towel included.",
  path: "/services/",
});

const GROUPS = [
  { id: "haircut", title: "Haircut Experiences", note: "Every cut: deep-cleansing shampoo + hot-towel face massage." },
  { id: "signature", title: "Signature Experiences", note: "The ritual, extended." },
  { id: "lineup", title: "Edge-Ups", note: "Line-up only. No fading included." },
  { id: "specialty", title: "Transformations & After Hours", note: "Built for the big moments." },
] as const;

export default function ServicesPage() {
  return (
    <>
      <PageHero
        tag="service menu"
        crumbs={[{ name: "Services", path: "/services/" }]}
        title={
          <>
            Every service is <span className="foil-text">an Experience.</span>
          </>
        }
        intro={
          <p>
            No bare-minimum cuts on this menu. Every haircut starts with a deep-cleansing shampoo and ends with a hot-towel face massage and razor detail. Prices
            below are Ru&apos;s live Square prices.
          </p>
        }
      >
        <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "320ms" }}>
          <BookLink label="Book any service" />
        </div>
      </PageHero>

      <section className="pb-8" aria-label="Signature services">
        <div className="mx-auto grid max-w-[1400px] gap-5 px-5 md:grid-cols-3 md:px-8">
          {FEATURED.map((s, i) => (
            <FeatureCard key={s.slug} s={s} index={i} as="h2" />
          ))}
        </div>
      </section>

      <section className="py-20" aria-label="Full menu">
        <div className="mx-auto max-w-[1400px] space-y-20 px-5 md:px-8">
          {GROUPS.map((g) => {
            const items = SERVICES.filter((s) => s.category === g.id);
            return (
              <div key={g.id} className="grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-16">
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <h2 className="reveal display text-[clamp(2.2rem,4vw,3.2rem)]">{g.title}</h2>
                  <p className="reveal mt-3 text-bone-dim">{g.note}</p>
                </div>
                <div className="divide-y divide-line border-y border-line">
                  {items.map((s) => (
                    <div key={s.slug} className="reveal grid gap-5 py-2 sm:grid-cols-[120px_1fr] sm:items-center sm:gap-7">
                      <ServiceMedia s={s} className="hidden aspect-square rounded-[3px] border border-line sm:block" sizes="120px" />
                      <div>
                        <MenuRow s={s} showSummary />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <h2 className="reveal display text-[clamp(2.2rem,4vw,3.2rem)]">Add-ons</h2>
              <p className="reveal mt-3 text-bone-dim">Stack them onto any Experience when you book.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {ADDONS.map((a) => (
                <article key={a.slug} className="reveal group overflow-hidden rounded-[3px] border border-line bg-ink-2">
                  <ServiceMedia s={a} className="aspect-[16/10]" sizes="(min-width: 640px) 30vw, 100vw" />
                  <div className="p-5">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="display text-2xl">{a.name}</h3>
                      <p className="display text-2xl text-gold">+${a.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-bone-mute">{fmtDuration(a.minutes)}</p>
                    <p className="mt-3 text-bone-dim">{a.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Pick your Experience." text="Book online 24/7 through Ru's Square page. Card on file holds your spot; a $45 fee applies to no-shows or cancellations inside 24 hours." />
    </>
  );
}
