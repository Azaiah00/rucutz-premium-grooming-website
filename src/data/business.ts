/**
 * Single source of truth for RuCutz Premium Grooming facts.
 * Every value here was verified on 2026-09-11 against Ru's own listings
 * (Square Appointments, Google Business Profile, Salon Lofts profile, Instagram).
 * See RESEARCH-DOSSIER.md for sources and the conflicts that still need Ru's sign-off.
 */

// Netlify sets URL at build time; override with NEXT_PUBLIC_SITE_URL when the custom domain goes live.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.URL ??
  "https://www.rucutzpremiumgrooming.com";

export const BOOKING_URL =
  "https://book.squareup.com/appointments/evvnhmmwsq6wf1/location/L0RBE6MPVT4PF/services";

export const BUSINESS = {
  name: "RuCutz Premium Grooming",
  shortName: "RuCutz",
  owner: "Heru Ward",
  ownerNickname: "Ru",
  tagline: "Precision. Detail. Presence.",
  // Ru's own words from his current site and Instagram bio.
  mottos: [
    "Rucutz, where quality is prioritized",
    "Built on Precision & Consistency",
    "Your image is an investment",
  ],
  phone: "(757) 434-6004",
  phoneE164: "+17574346004",
  phoneHref: "tel:+17574346004",
  smsHref: "sms:+17574346004",
  email: "rucutz98@gmail.com",
  address: {
    venue: "Salon Lofts Hollywood",
    suite: "Loft 13",
    street: "4921 Sheridan St",
    city: "Hollywood",
    region: "FL",
    postalCode: "33021",
    country: "US",
  },
  // Google Maps pin for 4921 Sheridan St (north side of Sheridan, just west of N 46th Ave).
  geo: { lat: 26.0335853, lng: -80.193955 },
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=4921+Sheridan+St+Loft+13+Hollywood+FL+33021",
  googleProfileUrl: "https://www.google.com/maps?cid=14890172086332869566",
  googleReviewSearchUrl:
    "https://www.google.com/search?q=RuCutz+Premium+Grooming+Hollywood+FL#lrd=0x84b66565b2d75089:0xcea4849efa4ecbbe,1",
  googlePlaceId: "ChIJiVDXsmVltoQRvstO-p6EpM4",
  googleWriteReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJiVDXsmVltoQRvstO-p6EpM4",
  rating: { value: 5.0, count: 13, source: "Google" },
  priceRange: "$$",
  paymentAccepted: ["Visa", "Mastercard", "American Express", "Discover", "Apple Pay", "Google Pay", "Cash App"],
  social: {
    instagram: "https://www.instagram.com/rucutz_/",
    instagramHandle: "@rucutz_",
    facebook: "https://www.facebook.com/heru.ward.1",
    x: "https://twitter.com/heruward",
    yelp: "https://www.yelp.com/biz/rucutz-premium-grooming-hollywood-2",
    salonLofts: "https://salonlofts.com/heru_ward",
  },
  partner: {
    name: "Kay Pro Styles",
    focus: "locs and natural hair",
    instagram: "https://www.instagram.com/kayprostyles/",
    site: "https://www.kayprostyles.com/",
  },
  serviceArea: [
    "Hollywood",
    "Pembroke Pines",
    "Miramar",
    "Davie",
    "Cooper City",
    "Dania Beach",
    "Hallandale Beach",
    "Fort Lauderdale",
    "Miami Gardens",
    "Aventura",
  ],
} as const;

/** 0 = Sunday … 6 = Saturday. Times are 24h, America/New_York. Source: Google Business Profile. */
export type DayHours = { day: string; short: string; open: string | null; close: string | null };

export const HOURS: DayHours[] = [
  { day: "Sunday", short: "Sun", open: null, close: null },
  { day: "Monday", short: "Mon", open: "12:00", close: "18:00" },
  { day: "Tuesday", short: "Tue", open: "12:00", close: "18:00" },
  { day: "Wednesday", short: "Wed", open: "12:00", close: "18:00" },
  { day: "Thursday", short: "Thu", open: "10:00", close: "19:00" },
  { day: "Friday", short: "Fri", open: "10:00", close: "19:00" },
  { day: "Saturday", short: "Sat", open: "10:00", close: "16:00" },
];

export function fmtTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hr}:${String(m).padStart(2, "0")} ${suffix}` : `${hr} ${suffix}`;
}

/** Grouped for display: "Mon–Wed 12 PM–6 PM" etc. */
export const HOURS_GROUPED = [
  { label: "Mon – Wed", value: "12 PM – 6 PM" },
  { label: "Thu – Fri", value: "10 AM – 7 PM" },
  { label: "Saturday", value: "10 AM – 4 PM" },
  { label: "Sunday", value: "Closed" },
];

export const POLICIES = {
  noShowFee: 45,
  noShowWindowHours: 24,
  afterHoursNote:
    "After-hours appointments are by request only. Call or text first with your name and the service you want; a deposit is required.",
};
