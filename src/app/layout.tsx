import type { Metadata, Viewport } from "next";
import "./globals.css";
import { shoulders, barlow, rockSalt } from "@/lib/fonts";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { MobileBookBar } from "@/components/MobileBookBar";
import { ScratchOffer } from "@/components/ScratchOffer";
import { SmoothScroll, RevealObserver, RouteScrollReset } from "@/components/Motion";
import { JsonLd } from "@/components/JsonLd";
import { businessSchema, websiteSchema } from "@/lib/schema";
import { BUSINESS, SITE_URL } from "@/data/business";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RuCutz Premium Grooming | Barber in Hollywood, FL",
    template: "%s | RuCutz",
  },
  description:
    "Private-suite barber in Hollywood, FL. Fades, 360 waves, beards and big chops for every texture, by appointment. Every cut includes a shampoo, hot towel and razor detail.",
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.owner }],
  creator: BUSINESS.name,
  formatDetection: { telephone: true, address: true, email: true },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Hollywood",
    "geo.position": `${BUSINESS.geo.lat};${BUSINESS.geo.lng}`,
    ICBM: `${BUSINESS.geo.lat}, ${BUSINESS.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a08",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-US" className={`${shoulders.variable} ${barlow.variable} ${rockSalt.variable}`}>
      <body>
        <JsonLd data={[businessSchema(), websiteSchema()]} />
        <SmoothScroll />
        <RevealObserver />
        <RouteScrollReset />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBookBar />
        <ScratchOffer />
      </body>
    </html>
  );
}
