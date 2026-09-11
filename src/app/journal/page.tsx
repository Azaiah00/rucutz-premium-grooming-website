import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Img } from "@/components/Img";
import { CtaBand } from "@/components/CtaBand";
import { ARTICLES } from "@/data/journal";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "The Journal: Waves, Big Chops & Grooming",
  description: "Grooming guides from a Hollywood, FL barber: how to get 360 waves, what to expect from a big chop, and why every cut should start at the shampoo bowl.",
  path: "/journal/",
});

export default function JournalIndex() {
  return (
    <>
      <PageHero
        tag="the journal"
        crumbs={[{ name: "Journal", path: "/journal/" }]}
        title={
          <>
            Game from <span className="foil-text">the chair.</span>
          </>
        }
        intro={<p>Guides for the questions clients ask Ru every week. Read up, then book.</p>}
      />
      <section className="pb-24">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-5 md:grid-cols-3 md:px-8">
          {ARTICLES.map((a, i) => (
            <article key={a.slug} className="reveal group relative overflow-hidden rounded-[3px] border border-line bg-ink-2" style={{ ["--d" as string]: `${i * 90}ms` }}>
              <div className="aspect-[4/3] overflow-hidden">
                <Img k={a.photo} sizes="(min-width: 768px) 33vw, 100vw" className="transition-transform duration-[1.2s] group-hover:scale-105" />
              </div>
              <div className="p-6">
                <p className="eyebrow text-gold">{a.kicker} · {a.readMinutes} min read</p>
                <h2 className="display mt-3 text-[1.9rem] leading-[0.95]">
                  <Link href={`/journal/${a.slug}/`} className="after:absolute after:inset-0 after:content-['']">
                    {a.title}
                  </Link>
                </h2>
                <p className="mt-3 text-bone-dim">{a.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
