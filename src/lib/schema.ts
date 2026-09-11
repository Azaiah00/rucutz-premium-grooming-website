import { BUSINESS, HOURS, SITE_URL, BOOKING_URL } from "@/data/business";
import { MAIN_SERVICES, type Service } from "@/data/services";
import type { Faq } from "@/data/faqs";
import type { Article } from "@/data/journal";
import { photo, largest } from "@/lib/photos";

export const BUSINESS_ID = `${SITE_URL}/#business`;
const abs = (path: string) => `${SITE_URL}${path}`;

const openingHours = () => {
  const groups = new Map<string, string[]>();
  for (const h of HOURS) {
    if (!h.open || !h.close) continue;
    const k = `${h.open}-${h.close}`;
    groups.set(k, [...(groups.get(k) ?? []), h.day]);
  }
  return [...groups.entries()].map(([k, days]) => {
    const [opens, closes] = k.split("-");
    return {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: days.map((d) => `https://schema.org/${d}`),
      opens,
      closes,
    };
  });
};

/** Google has no BarberShop type; HairSalon + additionalType "Barber shop" is the correct pairing. */
export function businessSchema() {
  const a = BUSINESS.address;
  return {
    "@context": "https://schema.org",
    "@type": "HairSalon",
    "@id": BUSINESS_ID,
    additionalType: "https://en.wikipedia.org/wiki/Barber",
    name: BUSINESS.name,
    alternateName: ["RuCutz", "Rucutz Premium Grooming", "RuCutz Barber"],
    description:
      "Private-suite barber in Hollywood, FL. Heru \"Ru\" Ward cuts all textures by appointment only, and every haircut Experience includes a deep-cleansing shampoo, hot-towel face massage and precise razor work.",
    slogan: BUSINESS.tagline,
    url: SITE_URL,
    telephone: BUSINESS.phoneE164,
    email: BUSINESS.email,
    image: [abs("/og-image.jpg"), abs(largest(photo("hero-taper-beard"))), abs(largest(photo("ru-portrait")))],
    logo: abs("/brand/rucutz-logo.svg"),
    priceRange: BUSINESS.priceRange,
    currenciesAccepted: "USD",
    paymentAccepted: BUSINESS.paymentAccepted.join(", "),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${a.street}, ${a.suite}`,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
    hasMap: BUSINESS.googleProfileUrl,
    containedInPlace: { "@type": "Place", name: a.venue },
    openingHoursSpecification: openingHours(),
    areaServed: BUSINESS.serviceArea.map((c) => ({ "@type": "City", name: `${c}, FL` })),
    founder: { "@id": `${SITE_URL}/about/#ru` },
    employee: { "@id": `${SITE_URL}/about/#ru` },
    knowsAbout: ["Fades", "Tapers", "360 waves", "Beard grooming", "Big chops", "Locs to waves", "Hair enhancements", "Hot towel treatment", "All hair textures"],
    potentialAction: {
      "@type": "ReserveAction",
      target: { "@type": "EntryPoint", urlTemplate: BOOKING_URL, actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"] },
      result: { "@type": "Reservation", name: "Barber appointment" },
    },
    sameAs: [
      BUSINESS.social.instagram,
      BUSINESS.social.facebook,
      BUSINESS.social.x,
      BUSINESS.social.yelp,
      BUSINESS.social.salonLofts,
      BUSINESS.googleProfileUrl,
      BOOKING_URL,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "RuCutz Service Menu",
      itemListElement: MAIN_SERVICES.map((s) => offer(s)),
    },
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/about/#ru`,
    name: BUSINESS.owner,
    alternateName: "Ru",
    jobTitle: "Barber & Owner",
    worksFor: { "@id": BUSINESS_ID },
    image: abs(largest(photo("ru-portrait"))),
    sameAs: [BUSINESS.social.instagram, BUSINESS.social.salonLofts, BUSINESS.social.x],
    knowsAbout: ["Barbering", "Fades", "360 waves", "Big chops", "Men's grooming", "Fragrance"],
  };
}

function offer(s: Service) {
  return {
    "@type": "Offer",
    price: s.price,
    priceCurrency: "USD",
    url: s.hasPage ? abs(`/services/${s.slug}/`) : abs("/services/"),
    itemOffered: {
      "@type": "Service",
      name: s.name,
      description: s.summary,
      provider: { "@id": BUSINESS_ID },
    },
  };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": abs(`/services/${s.slug}/#service`),
    name: s.name,
    serviceType: "Barber service",
    description: s.summary,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: "Hollywood, FL" },
    image: s.photo ? abs(largest(photo(s.photo))) : undefined,
    offers: {
      "@type": "Offer",
      price: s.price,
      priceCurrency: "USD",
      url: BOOKING_URL,
      availability: "https://schema.org/InStock",
    },
  };
}

export function faqSchema(faqs: Pick<Faq, "q" | "a">[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function articleSchema(a: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: abs(largest(photo(a.photo))),
    datePublished: a.published,
    dateModified: a.published,
    // Byline stays with the business until Ru reviews and signs the articles (see ASSETS-OWED.md).
    author: { "@type": "Organization", "@id": BUSINESS_ID, name: BUSINESS.name },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: abs(`/journal/${a.slug}/`),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: BUSINESS.name,
    publisher: { "@id": BUSINESS_ID },
    inLanguage: "en-US",
  };
}
