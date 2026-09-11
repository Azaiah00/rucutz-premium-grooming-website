import Link from "next/link";
import { Img } from "../Img";
import { Ankh } from "../Brand";

export function MeetRu() {
  return (
    <section className="grain relative py-24 md:py-32" aria-labelledby="ru-title">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 px-5 md:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-5">
          <div className="reveal relative aspect-[4/5] overflow-hidden rounded-[3px] border border-line">
            <Img k="ru-portrait" sizes="(min-width: 1024px) 38vw, 100vw" className="object-[50%_30%]" />
          </div>
          <div className="reveal absolute -bottom-6 -right-2 max-w-[250px] rounded-[3px] border border-line bg-ink/95 p-5 backdrop-blur md:-right-8" style={{ ["--d" as string]: "200ms" }}>
            <p className="tag text-lg leading-snug text-gold-lift">&ldquo;Your confidence when you leave my chair is my greatest review.&rdquo;</p>
            <p className="eyebrow mt-3 text-bone-mute">Ru, on Instagram</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p className="spray tag mb-5 -rotate-2 text-[clamp(1.3rem,2.4vw,1.9rem)] text-gold" aria-hidden>
            meet ru
          </p>
          <h2 id="ru-title" className="reveal display text-[clamp(2.8rem,6.5vw,5.4rem)]">
            Heru Ward. <span className="foil-text">Built on precision &amp; consistency.</span>
          </h2>
          <div className="reveal mt-7 max-w-2xl space-y-5 text-lg text-bone-dim">
            <p>
              Ru picked up the clippers at 18, cutting his own hair and a few college friends. Word got around campus, then around town, and a hobby turned into
              barber school, a license, and a craft he hasn&apos;t put down since.
            </p>
            <p>
              When he moved from Virginia to South Florida, he started from zero, no clientele and no connections, and rebuilt his book in Hollywood one
              chair-side conversation at a time. Clients stay for the cut. They come back for the company.
            </p>
          </div>
          <dl className="reveal mt-10 grid max-w-2xl grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-3">
            <div>
              <dt className="eyebrow text-bone-mute">Licensed</dt>
              <dd className="display mt-1 text-3xl text-bone">Barber</dd>
            </div>
            <div>
              <dt className="eyebrow text-bone-mute">Cutting since</dt>
              <dd className="display mt-1 text-3xl text-bone">Age 18</dd>
            </div>
            <div>
              <dt className="eyebrow text-bone-mute">Specialty</dt>
              <dd className="display mt-1 text-3xl text-bone">All textures</dd>
            </div>
          </dl>
          <div className="reveal mt-10 flex items-center gap-5">
            <Ankh id="ru-ankh" className="h-12 w-auto" />
            <Link href="/about/" className="eyebrow inline-block py-2 text-gold underline decoration-gold/40 underline-offset-8 hover:decoration-gold">
              Read Ru&apos;s story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
