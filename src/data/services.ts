/**
 * Ru's full menu, taken from his live Square Appointments page on 2026-09-11.
 * Names, prices, durations and "includes" lists are his; summaries/benefit copy are ours.
 * If Ru changes a price in Square, change it here too (see ASSETS-OWED.md).
 */

export type ServiceCategory = "signature" | "haircut" | "lineup" | "specialty" | "addon";

export type Service = {
  slug: string;
  name: string; // exactly as Ru lists it
  short: string; // compact display name
  price: number;
  minutes: number;
  category: ServiceCategory;
  photo?: string; // key in photos.json
  photoBrief?: string; // shot brief when we have no real photo yet
  tagline: string;
  summary: string;
  includes: string[]; // Ru's own inclusion list, lightly cleaned
  bestFor: string[];
  note?: string;
  featured?: boolean;
  hasPage: boolean;
  keywords: string[];
  faq?: { q: string; a: string }[];
};

const CORE = {
  shampoo:
    "A thorough deep-cleansing shampoo for a clean, fresh surface to work on, which also helps the cut last longer and look better",
  towel:
    "A deep-tissue hot-towel face massage for elite relaxation and to lift away excess sweat, oil and grime",
  razor: "Precise razor work on the hairline and facial hair",
  enhance:
    "Semi-permanent fiber enhancements for extra definition, great for nights out, weddings, major events and photoshoots",
};

export const SERVICES: Service[] = [
  {
    slug: "king-haircut-experience",
    name: "King Haircut Experience",
    short: "King Haircut",
    price: 60,
    minutes: 45,
    category: "haircut",
    photo: "svc-king",
    tagline: "The cut that built the chair.",
    summary:
      "Any haircut you want, fade, taper, low cut, waves or a full shape-up, delivered the RuCutz way: shampooed first, finished with a hot towel and razor-sharp detail. It is the service Ru built his reputation on.",
    includes: ["A haircut of your choice", CORE.shampoo, CORE.towel, CORE.razor],
    bestFor: ["Fades & tapers", "360 waves", "Low cuts", "Regular upkeep every 2–3 weeks"],
    featured: true,
    hasPage: true,
    keywords: ["men's haircut Hollywood FL", "fade haircut Hollywood", "barber Hollywood FL"],
    faq: [
      {
        q: "How much is a haircut at RuCutz?",
        a: "The King Haircut Experience is $60 and takes about 45 minutes. It includes a deep-cleansing shampoo, a hot-towel face massage and razor detail on the hairline and beard, not just the cut.",
      },
      {
        q: "Does the King Haircut include a beard trim?",
        a: "Yes. Precise razor work on the hairline and facial hair is part of every King Haircut Experience.",
      },
    ],
  },
  {
    slug: "the-distinguished-experience",
    name: "The Distinguished Experience",
    short: "The Distinguished",
    price: 120,
    minutes: 80,
    category: "signature",
    photo: "ritual-razor",
    tagline: "The full ritual. Eighty minutes that are entirely yours.",
    summary:
      "Ru's top-shelf package for the man who wants to look and feel his very best. Every step of the RuCutz ritual, a full-back deep-tissue massage-chair session, essential-oil hot towels and a finishing spray of extrait-de-parfum from the house of EK Lemeilleur. Book it before a big day, or just because.",
    includes: [
      "Haircut of choice",
      "Deep-conditioning shampoo service",
      "Deep-tissue full-back massage chair",
      "Hot towel infused with essential oils",
      "Deep-tissue facial massage",
      "Hair enhancements (optional)",
      "Your choice of Signature Scent in extrait-de-parfum concentration from the house of EK Lemeilleur",
    ],
    bestFor: ["Weddings & big events", "Birthdays", "Gifting", "A real reset"],
    featured: true,
    hasPage: true,
    keywords: ["luxury barber Hollywood FL", "hot towel barber Hollywood FL", "barber spa experience Broward"],
    faq: [
      {
        q: "What is the Distinguished Experience?",
        a: "It is RuCutz Premium Grooming's most complete service: a haircut of your choice, deep-conditioning shampoo, massage-chair session, essential-oil hot towel, facial massage, optional enhancements and a Signature Scent finish. It costs $120 and runs about 80 minutes.",
      },
    ],
  },
  {
    slug: "king-haircut-massage-chair",
    name: "King Haircut + Massage Chair Experience",
    short: "King + Massage Chair",
    price: 75,
    minutes: 55,
    category: "signature",
    photo: "client-laugh",
    tagline: "Your cut, plus a full-back deep-tissue session.",
    summary:
      "The King Haircut Experience with a heated, deep-tissue massage-chair session added on. Come in carrying the week on your shoulders; leave with it gone and a fresh cut on top.",
    includes: [
      "A haircut of your choice",
      "Full-back deep-tissue massage-chair therapy with a heated seat",
      CORE.shampoo,
      CORE.towel,
    ],
    bestFor: ["Stress relief", "Long work weeks", "Treating yourself"],
    hasPage: true,
    keywords: ["haircut and massage Hollywood FL", "barber massage chair Broward"],
  },
  {
    slug: "king-haircut-enhancements",
    name: "King Haircut Experience + Enhancements",
    short: "King + Enhancements",
    price: 75,
    minutes: 50,
    category: "haircut",
    photo: "waves-temple",
    tagline: "Every edge, amplified.",
    summary:
      "The full King Haircut Experience plus semi-permanent fiber enhancements that sharpen your hairline and fill density for a camera-ready finish. The move before a wedding, a shoot or a night that matters.",
    includes: ["A haircut of your choice", CORE.enhance, CORE.shampoo, CORE.towel, CORE.razor],
    bestFor: ["Events & photoshoots", "Thinning edges", "Maximum definition"],
    note: "Enhancements are semi-permanent fibers: they wash out and are not a tattoo or dye.",
    hasPage: true,
    keywords: ["hair enhancements barber Hollywood FL", "hairline enhancement Broward"],
    faq: [
      {
        q: "What are barber hair enhancements?",
        a: "Enhancements are semi-permanent hair fibers applied after the cut to sharpen the hairline and add visible density. At RuCutz they are an optional add-on and wash out, so they are not permanent dye or a tattoo.",
      },
    ],
  },
  {
    slug: "big-chop-transformation",
    name: "Big Chops / Major Transformations Experience",
    short: "Big Chop Transformation",
    price: 100,
    minutes: 75,
    category: "specialty",
    photo: "bigchop-after",
    tagline: "Not a haircut. A rebirth.",
    summary:
      "Saying goodbye to your locs, a long afro or matted hair? This is the appointment built for it: time to wash, detangle and even everything out before a single cut, so your new look starts on a clean, healthy scalp. Locs to waves is a transformation Ru has done again and again.",
    includes: ["Hair wash + conditioning", "Detangling", "Hot-towel massage", "Razor work"],
    bestFor: ["Cutting off locs", "Long afros", "Matted or neglected hair", "A total image change"],
    featured: true,
    hasPage: true,
    keywords: ["big chop barber Hollywood FL", "cut off locs barber", "locs to waves", "loc removal haircut Broward"],
    faq: [
      {
        q: "Can RuCutz cut off my locs?",
        a: "Yes. Book the Big Chops / Major Transformations Experience ($100, about 75 minutes). It includes a wash and conditioning, detangling, a hot-towel massage and razor work, so the new cut is done on clean, detangled hair.",
      },
      {
        q: "How long after a big chop can I start waves?",
        a: "You can start brushing and training waves as soon as the cut is done. Ru will set the length and pattern at the chop and tell you what to do between visits; how fast waves connect depends on your texture and how consistently you brush.",
      },
    ],
  },
  {
    slug: "queen-haircut-experience",
    name: "Queen Haircut Experience",
    short: "Queen Haircut",
    price: 60,
    minutes: 45,
    category: "haircut",
    photoBrief: "A woman's short tapered cut or big chop, finished in the suite, three-quarter profile, natural light.",
    tagline: "Short cuts, done with the same precision.",
    summary:
      "Short cuts, tapers and shape-ups for women, on any texture. The same deep-cleansing shampoo and hot-towel face massage as every RuCutz Experience, with detail work that respects your hair.",
    includes: ["A haircut of your choice", CORE.shampoo, CORE.towel],
    bestFor: ["Short tapered cuts", "Shape-ups", "Starting fresh"],
    hasPage: true,
    keywords: ["women's barber Hollywood FL", "women's fade haircut Broward", "short natural haircut women Hollywood"],
  },
  {
    slug: "prince-haircut-experience",
    name: "Prince Haircut Experience (Ages 10–17)",
    short: "Prince Haircut (10–17)",
    price: 50,
    minutes: 45,
    category: "haircut",
    photo: "svc-prince",
    tagline: "Build his confidence early.",
    summary:
      "The full Experience, sized for young men 10 to 17: a cut of his choice, shampoo, hot-towel face massage and razor-sharp hairline, plus a complimentary design if he wants one. Good habits and a good barber start young.",
    includes: [
      "A haircut of your choice",
      CORE.shampoo,
      CORE.towel,
      CORE.razor,
      "Complimentary design of choice, if desired",
    ],
    bestFor: ["Back-to-school", "Picture day", "Teen fades & waves", "Designs"],
    hasPage: true,
    keywords: ["kids haircut Hollywood FL", "teen barber Hollywood", "boys fade haircut Broward"],
  },
  {
    slug: "ultimate-edge-up",
    name: "The Ultimate Edgeup Experience",
    short: "Ultimate Edge Up",
    price: 50,
    minutes: 30,
    category: "lineup",
    photo: "svc-edgeup",
    tagline: "Sharp in thirty minutes.",
    summary:
      "Between cuts and need your lines crisp again? A precise razor edge-up on the hairline and facial hair, with the same shampoo and hot towel you get with a full Experience.",
    includes: [CORE.shampoo, CORE.towel, CORE.razor],
    bestFor: ["Between full cuts", "Beards & low cuts", "Quick refresh"],
    note: "This service does not include any fading. It is an edge-up / tape-up only.",
    hasPage: true,
    keywords: ["edge up Hollywood FL", "line up barber Hollywood", "shape up Broward"],
  },
  {
    slug: "edge-up-enhancements",
    name: "Ultimate Edge Up + Enhancements Experience",
    short: "Edge Up + Enhancements",
    price: 65,
    minutes: 50,
    category: "lineup",
    photo: "svc-edgeup-enh",
    tagline: "The line-up, turned all the way up.",
    summary:
      "The Ultimate Edge Up with semi-permanent fiber enhancements for extra definition. Crisp lines, fuller-looking density, ready for the camera.",
    includes: [CORE.enhance, CORE.shampoo, CORE.towel, CORE.razor],
    bestFor: ["Events", "Photos & video", "Extra pop between cuts"],
    note: "No fading included. Edge-up / tape-up with enhancements only.",
    hasPage: true,
    keywords: ["line up with enhancements Hollywood FL", "hairline enhancement barber"],
  },
  {
    slug: "after-hours",
    name: "Before / After Hours Services",
    short: "Before / After Hours",
    price: 100,
    minutes: 60,
    category: "specialty",
    photo: "svc-afterhours",
    tagline: "Quality guaranteed, no matter the time.",
    summary:
      "Early flight, late event, a schedule that doesn't fit 10 to 7? Ru opens the chair outside regular hours by request. Call or text (757) 434-6004 with your name and desired service first to confirm he's available. Serious inquiries only; a deposit is required.",
    includes: ["Any service, outside regular business hours", "Private suite, no one else booked around you"],
    bestFor: ["Early mornings", "Late nights", "Wedding days", "Travel days"],
    note: "Call or text before booking. A deposit is required.",
    hasPage: true,
    keywords: ["after hours barber Hollywood FL", "early morning barber Broward", "late night barber Hollywood"],
  },
  // --- add-ons (menu only) ---
  {
    slug: "signature-scent",
    name: "Signature Scent",
    short: "Signature Scent",
    price: 10,
    minutes: 5,
    category: "addon",
    photo: "ritual-scent",
    tagline: "Leave smelling like you meant it.",
    summary:
      "Level up your scent game with a few sprays of a signature blended parfum of your choice at the end of your appointment.",
    includes: ["A few sprays of a signature blended parfum of your choice"],
    bestFor: ["Date night", "Any day"],
    hasPage: false,
    keywords: [],
  },
  {
    slug: "hairwash-therapy",
    name: "Hairwash Therapy",
    short: "Hairwash Therapy",
    price: 35,
    minutes: 20,
    category: "addon",
    photo: "ritual-wash",
    tagline: "Between cuts, still deserve the bowl.",
    summary:
      "For anyone between haircuts who loves the refreshing feel of a solid hair wash. A self-care option that supports the overall health of your hair and scalp.",
    includes: ["A full scalp-refreshing hair wash"],
    bestFor: ["Between cuts", "Scalp care"],
    hasPage: false,
    keywords: [],
  },
  {
    slug: "extra-hot-towel",
    name: "Extra Hot Towel",
    short: "Extra Hot Towel",
    price: 20,
    minutes: 10,
    category: "addon",
    photo: "ritual-towel",
    tagline: "Stay under a little longer.",
    summary:
      "Love the hot-towel massage that comes with your cut? Add this to extend it.",
    includes: ["An extended hot-towel massage"],
    bestFor: ["Relaxation"],
    hasPage: false,
    keywords: [],
  },
  {
    slug: "eyebrows",
    name: "Eyebrows",
    short: "Eyebrows",
    price: 5,
    minutes: 5,
    category: "addon",
    photo: "brows-lineup",
    tagline: "Structure for the whole face.",
    summary: "Brows looking bushy? Add structure to your eyebrows and face.",
    includes: ["Eyebrow cleanup and shaping"],
    bestFor: ["Clean finish"],
    hasPage: false,
    keywords: [],
  },
];

export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const PAGE_SERVICES = SERVICES.filter((s) => s.hasPage);
export const ADDONS = SERVICES.filter((s) => s.category === "addon");
export const FEATURED = SERVICES.filter((s) => s.featured);
export const MAIN_SERVICES = SERVICES.filter((s) => s.category !== "addon");

export const fmtDuration = (m: number) =>
  m >= 60 ? `${Math.floor(m / 60)} hr${m % 60 ? ` ${m % 60} min` : ""}` : `${m} min`;
