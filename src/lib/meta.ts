import type { Metadata } from "next";
import { BUSINESS, SITE_URL } from "@/data/business";

type Args = { title: string; description: string; path: string; image?: string; absoluteTitle?: boolean; type?: "website" | "article" };

export function pageMeta({ title, description, path, image = "/og-image.jpg", absoluteTitle, type = "website" }: Args): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url,
      siteName: BUSINESS.name,
      title: absoluteTitle ? title : `${title} | ${BUSINESS.name}`,
      description,
      locale: "en_US",
      images: [{ url: image, width: image === "/og-image.jpg" ? 1200 : undefined, height: image === "/og-image.jpg" ? 630 : undefined, alt: `${BUSINESS.name}, Hollywood FL barber` }],
    },
    twitter: { card: "summary_large_image", title: absoluteTitle ? title : `${title} | ${BUSINESS.name}`, description, images: [image] },
  };
}
