import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GalleryGrid } from "@/components/GalleryGrid";
import { BookLink } from "@/components/BookLink";
import { CtaBand } from "@/components/CtaBand";
import { InstagramIcon } from "@/components/SocialIcons";
import { BUSINESS } from "@/data/business";
import { pageMeta } from "@/lib/meta";

export const metadata: Metadata = pageMeta({
  title: "Haircut Gallery: Fades, Waves & Big Chops",
  description:
    "Real cuts from Ru's chair in Hollywood, FL: skin fades, tapers, 360 waves, beard line-ups and locs-to-waves big chops, on every hair texture.",
  path: "/gallery/",
});

export default function GalleryPage() {
  return (
    <>
      <PageHero
        tag="fresh off the chair"
        crumbs={[{ name: "Gallery", path: "/gallery/" }]}
        title={
          <>
            The work <span className="foil-text">speaks.</span>
          </>
        }
        intro={
          <p>
            Every photo here is a real RuCutz client, pulled from Ru&apos;s Instagram and Yelp. Filter by what you&apos;re after, tap any photo to see it big,
            then bring a screenshot to your appointment.
          </p>
        }
      >
        <div className="rise mt-9 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "320ms" }}>
          <BookLink label="Book your experience" />
          <a href={BUSINESS.social.instagram} target="_blank" rel="noopener" className="btn btn-ghost">
            <InstagramIcon className="h-4 w-4" /> More on {BUSINESS.social.instagramHandle}
          </a>
        </div>
      </PageHero>
      <section className="pb-24" aria-label="Haircut photos">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <GalleryGrid />
        </div>
      </section>
      <CtaBand title="Want this look?" />
    </>
  );
}
