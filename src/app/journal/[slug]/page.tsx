import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Img } from "@/components/Img";
import { BookLink } from "@/components/BookLink";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { ARTICLES, articleBySlug } from "@/data/journal";
import { serviceBySlug } from "@/data/services";
import { articleSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";
import { photo, largest } from "@/lib/photos";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};
  return pageMeta({ title: a.metaTitle ?? a.title, description: a.description, path: `/journal/${a.slug}/`, image: largest(photo(a.photo)), type: "article" });
}

export default async function ArticlePage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();
  const others = ARTICLES.filter((x) => x.slug !== a.slug);
  return (
    <>
      <JsonLd data={articleSchema(a)} />
      <PageHero
        tag={a.kicker.toLowerCase()}
        crumbs={[
          { name: "Journal", path: "/journal/" },
          { name: a.title, path: `/journal/${a.slug}/` },
        ]}
        title={a.title}
      >
        <p className="rise mt-6 text-sm text-bone-mute" style={{ ["--d" as string]: "260ms" }}>
          From the RuCutz chair · {a.readMinutes} min read ·{" "}
          <time dateTime={a.published}>{new Date(a.published + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>
        </p>
      </PageHero>

      <article className="pb-24">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <div className="reveal aspect-[16/10] overflow-hidden rounded-[3px] border border-line">
            <Img k={a.photo} sizes="(min-width: 768px) 720px, 100vw" />
          </div>
          <div className="reveal mt-10 rounded-[3px] border border-gold/40 bg-gold/5 p-6">
            <p className="eyebrow text-gold">The short answer</p>
            <p className="mt-3 text-lg text-bone">{a.answer}</p>
          </div>
          <div className="prose-ru mt-10 text-lg">
            {a.body.map((b, i) => {
              if (b.type === "p") return <p key={i}>{b.text}</p>;
              if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
              if (b.type === "ul")
                return (
                  <ul key={i}>
                    {b.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                );
              if (b.type === "quote")
                return (
                  <figure key={i} className="my-10 border-l-2 border-gold pl-6">
                    <blockquote className="tag text-2xl leading-snug text-gold-lift">&ldquo;{b.text}&rdquo;</blockquote>
                    <figcaption className="mt-3 text-sm text-bone-mute">{b.cite}</figcaption>
                  </figure>
                );
              const svc = b.service ? serviceBySlug(b.service) : undefined;
              return (
                <div key={i} className="my-12 flex flex-col gap-5 rounded-[3px] border border-line bg-ink-2 p-7 sm:flex-row sm:items-center sm:justify-between">
                  <p className="display text-2xl text-bone">{b.text}</p>
                  <BookLink label={svc ? `Book the ${svc.name}` : "Book your experience"} className="shrink-0">
                    {svc ? `Book · $${svc.price}` : "Book now"}
                  </BookLink>
                </div>
              );
            })}
          </div>

          <aside className="mt-16 border-t border-line pt-10" aria-labelledby="more-reads">
            <h2 id="more-reads" className="eyebrow text-bone-mute">
              Keep reading
            </h2>
            <ul className="mt-5 space-y-4">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/journal/${o.slug}/`} className="display text-2xl text-bone hover:text-gold-lift">
                    {o.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </article>
      <CtaBand />
    </>
  );
}
