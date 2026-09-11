import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { Marquee } from "@/components/home/Marquee";
import { Difference } from "@/components/home/Difference";
import { Ritual } from "@/components/home/Ritual";
import { MenuPreview } from "@/components/home/MenuPreview";
import { Transformation } from "@/components/home/Transformation";
import { MeetRu } from "@/components/home/MeetRu";
import { Reviews } from "@/components/Reviews";
import { GalleryTeaser } from "@/components/home/GalleryTeaser";
import { VisitBlock } from "@/components/VisitBlock";
import { FaqList } from "@/components/FaqList";
import { CtaBand } from "@/components/CtaBand";
import { SectionHead } from "@/components/SectionHead";
import { JsonLd } from "@/components/JsonLd";
import { HOME_FAQS } from "@/data/faqs";
import { faqSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "RuCutz Premium Grooming | Barber in Hollywood, FL",
  absoluteTitle: true,
  description:
    "Private-suite barber in Hollywood, FL. Fades, 360 waves, beards and big chops for every texture, by appointment. Every cut includes a shampoo, hot towel and razor detail.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={faqSchema(HOME_FAQS)} />
      <Hero />
      <Marquee />
      <Difference />
      <Ritual />
      <MenuPreview />
      <Transformation />
      <MeetRu />
      <Reviews />
      <GalleryTeaser />

      <section className="py-24 md:py-32" aria-labelledby="visit-title">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <SectionHead tag="pull up" id="visit-title" title={<>Hollywood, FL. <span className="foil-text">By appointment.</span></>} className="mb-12" />
          <VisitBlock />
        </div>
      </section>

      <section className="bg-ink-2 py-24 md:py-32" aria-labelledby="faq-title">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div>
            <SectionHead tag="real talk" id="faq-title" title={<>Questions, <span className="foil-text">answered.</span></>} />
            <Link href="/faq/" className="eyebrow reveal mt-8 inline-block py-2 text-gold underline decoration-gold/40 underline-offset-8 hover:decoration-gold">
              All questions
            </Link>
          </div>
          <FaqList items={HOME_FAQS} />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
