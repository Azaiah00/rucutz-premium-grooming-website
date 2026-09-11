import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { breadcrumbSchema } from "@/lib/schema";

type Crumb = { name: string; path: string };

export function PageHero({ tag, title, intro, crumbs, children }: { tag: string; title: React.ReactNode; intro?: React.ReactNode; crumbs: Crumb[]; children?: React.ReactNode }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="grain relative overflow-hidden pb-16 pt-[calc(var(--header-h)+3rem)] md:pb-20 md:pt-[calc(var(--header-h)+4.5rem)]">
      <JsonLd data={breadcrumbSchema(all)} />
      <div className="pointer-events-none absolute -right-40 -top-20 h-[460px] w-[460px] rounded-full bg-gold/10 blur-[120px]" aria-hidden />
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <nav aria-label="Breadcrumb" className="rise mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-bone-mute">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1.5">
                {i > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden />}
                {i < all.length - 1 ? (
                  <Link href={c.path} className="inline-block py-2 hover:text-bone">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-bone-dim">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="spray-in tag mb-5 -rotate-2 text-[clamp(1.3rem,2.4vw,1.9rem)] text-gold" aria-hidden style={{ ["--d" as string]: "300ms" }}>
          {tag}
        </p>
        <h1 className="rise display max-w-5xl text-[clamp(3.2rem,9vw,7.4rem)]" style={{ ["--d" as string]: "100ms" }}>
          {title}
        </h1>
        {intro && (
          <div className="rise mt-7 max-w-2xl text-lg text-bone-dim md:text-xl" style={{ ["--d" as string]: "220ms" }}>
            {intro}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
