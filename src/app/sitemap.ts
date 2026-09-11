import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/business";
import { PAGE_SERVICES } from "@/data/services";
import { ARTICLES } from "@/data/journal";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-09-11");
  const page = (path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/services/", 0.9, "monthly"),
    ...PAGE_SERVICES.map((s) => page(`/services/${s.slug}/`, 0.8)),
    page("/gallery/", 0.8, "weekly"),
    page("/about/", 0.7),
    page("/visit/", 0.8),
    page("/faq/", 0.7),
    page("/journal/", 0.6, "weekly"),
    ...ARTICLES.map((a) => page(`/journal/${a.slug}/`, 0.6)),
    page("/policies/", 0.4, "yearly"),
  ];
}
