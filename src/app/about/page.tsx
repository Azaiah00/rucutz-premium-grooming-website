import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Img } from "@/components/Img";
import { Ankh } from "@/components/Brand";
import { BookLink } from "@/components/BookLink";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { InstagramIcon } from "@/components/SocialIcons";
import { BUSINESS } from "@/data/business";
import { personSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Meet Ru: Heru Ward, Barber & Owner",
  description:
    "Heru \"Ru\" Ward started cutting at 18, went to barber school and rebuilt his clientele from zero after moving to Hollywood, FL. Meet the barber behind RuCutz.",
  path: "/about/",
});

const WORDS = [
  { q: "Your Haircut Is A Statement Piece!", note: "On why a cut is worth investing in, like clothes, jewelry or fragrance." },
  { q: "It is my mission to ensure each client leaves my chair feeling confident and ready to conquer the world.", note: "On what every appointment is for." },
  { q: "The shampoo process is non negotiable, intentional and included in every service.", note: "On the step most shops skip." },
  { q: "Precision. Detail. Presence.", note: "On the RuCutz experience, in three words." },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personSchema()} />
      <PageHero
        tag="meet ru"
        crumbs={[{ name: "Meet Ru", path: "/about/" }]}
        title={
          <>
            The hands behind <span className="foil-text">the cut.</span>
          </>
        }
        intro={<p>Heru Ward. Everybody calls him Ru. Licensed barber, owner of RuCutz Premium Grooming, and the only person who will ever cut your hair here.</p>}
      />

      <section className="pb-24" aria-labelledby="story-title">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="reveal aspect-[4/5] overflow-hidden rounded-[3px] border border-line lg:sticky lg:top-28">
              <Img k="ru-portrait" sizes="(min-width: 1024px) 38vw, 100vw" className="object-[50%_30%]" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <h2 id="story-title" className="reveal display text-[clamp(2.4rem,5vw,3.8rem)]">
              From campus <span className="foil-text">to Loft 13.</span>
            </h2>
            <div className="reveal mt-8 space-y-6 text-lg text-bone-dim">
              <p>
                Ru started barbering at 18. It began small: cutting his own hair, then a few college friends. That soon turned into a big share of the campus
                and plenty of locals who had heard about the guy with the clippers.
              </p>
              <p>
                That was enough to take it seriously. He enrolled in barber school, got licensed, and hasn&apos;t looked back. For Ru, barbering became a way to
                express creativity, and a source of peace and relaxation for him and for the people in his chair.
              </p>
              <p>
                Then came the hard part. Ru and his partner Kay moved from Virginia to South Florida and started over with no clientele and no connections. They
                rebuilt from zero, one conversation and one cut at a time, until the book filled back up in Hollywood.
              </p>
              <p className="text-bone">
                That is why the standard never slips. Every client is someone who chose him, and he treats every appointment like it matters, because it does.
              </p>
            </div>

            <div className="reveal mt-12 grid gap-4 sm:grid-cols-2">
              <div className="aspect-[4/5] overflow-hidden rounded-[3px] border border-line">
                <Img k="ru-at-work" sizes="(min-width: 640px) 30vw, 100vw" />
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-[3px] border border-line">
                <Img k="ru-cutting" sizes="(min-width: 640px) 30vw, 100vw" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink-2 py-24" aria-labelledby="words-title">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="spray tag -rotate-2 text-[clamp(1.3rem,2.4vw,1.9rem)] text-gold" aria-hidden>
            in his words
          </p>
          <h2 id="words-title" className="reveal display mt-3 text-[clamp(2.4rem,5vw,3.8rem)]">
            What Ru <span className="foil-text">believes.</span>
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {WORDS.map((w, i) => (
              <figure key={w.q} className="reveal rounded-[3px] border border-line bg-ink-3/70 p-7" style={{ ["--d" as string]: `${i * 80}ms` }}>
                <blockquote className="tag text-xl leading-snug text-gold-lift md:text-2xl">&ldquo;{w.q}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm text-bone-mute">{w.note} From Ru&apos;s Instagram.</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" aria-labelledby="suite-title">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="suite-title" className="reveal display text-[clamp(2.4rem,5vw,3.8rem)]">
              The suite. <span className="foil-text">The standard.</span>
            </h2>
            <ul className="reveal mt-8 space-y-5 text-lg text-bone-dim">
              <li>
                <span className="text-bone">A private suite inside Salon Lofts Hollywood.</span> Clean, sanitary and personal: a place to decompress, not a
                crowded shop floor.
              </li>
              <li>
                <span className="text-bone">All textures.</span> Waves, coils, curls, locs and straight hair, on men, women and teens.
              </li>
              <li>
                <span className="text-bone">Products Ru trusts:</span> Influance Hair Care, L3VEL3 styling powder and Nairobi Professional.
              </li>
              <li>
                <span className="text-bone">A fragrance guy.</span> Ask about the Signature Scent. Ru reviews scents on his Instagram for a reason.
              </li>
            </ul>
            <div className="reveal mt-10 flex flex-col gap-3 sm:flex-row">
              <BookLink label="Book with Ru" />
              <a href={BUSINESS.social.instagram} target="_blank" rel="noopener" className="btn btn-ghost">
                <InstagramIcon className="h-4 w-4" /> Follow {BUSINESS.social.instagramHandle}
              </a>
            </div>
          </div>

          {/* Small partner mention, per the one-stop-shop line in Ru's Instagram bio */}
          <aside className="reveal self-start overflow-hidden rounded-[3px] border border-line bg-ink-2" aria-labelledby="kay-title">
            <div className="aspect-[16/11] overflow-hidden">
              <Img k="ru-kay" sizes="(min-width: 1024px) 45vw, 100vw" className="object-[50%_30%]" />
            </div>
            <div className="p-7">
              <div className="flex items-center gap-3">
                <Ankh id="kay-ankh" className="h-8 w-auto" />
                <p className="eyebrow text-gold">The one-stop shop</p>
              </div>
              <h3 id="kay-title" className="display mt-3 text-3xl">Locs or natural hair? Meet Kay.</h3>
              <p className="mt-3 text-bone-dim">
                Ru&apos;s partner Kay of <span className="text-bone">{BUSINESS.partner.name}</span> handles {BUSINESS.partner.focus}. Cut with Ru, style with Kay.
              </p>
              <div className="mt-5 flex flex-wrap gap-4">
                <a href={BUSINESS.partner.instagram} target="_blank" rel="noopener" className="eyebrow inline-block py-2 text-gold underline decoration-gold/40 underline-offset-8 hover:decoration-gold">
                  @kayprostyles
                </a>
                <a href={BUSINESS.partner.site} target="_blank" rel="noopener" className="eyebrow inline-block py-2 text-gold underline decoration-gold/40 underline-offset-8 hover:decoration-gold">
                  kayprostyles.com
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-t border-line py-16">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center md:px-8">
          <p className="display text-[clamp(1.8rem,3.5vw,2.6rem)]">See what six steps look like.</p>
          <Link href="/#ritual" className="btn btn-ghost">
            The RuCutz ritual
          </Link>
        </div>
      </section>

      <CtaBand title="Sit in Ru's chair." />
    </>
  );
}
