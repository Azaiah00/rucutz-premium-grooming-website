"use client";

import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";
import { BookLink } from "./BookLink";
import { BUSINESS } from "@/data/business";

/** Thumb-reach booking bar on phones and tablets. Hidden inside the booking preview itself. */
export function MobileBookBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/book") || pathname.startsWith("/portal")) return null;
  return (
    <aside aria-label="Book an appointment" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/92 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md lg:hidden">
      <div className="mx-auto flex max-w-xl items-center gap-3">
        <a href={BUSINESS.phoneHref} className="btn btn-ghost min-h-[50px]! w-[50px] px-0!" aria-label={`Call RuCutz at ${BUSINESS.phone}`}>
          <Phone className="h-5 w-5" aria-hidden />
        </a>
        <BookLink className="min-h-[50px]! flex-1" label="Book your experience">
          Book · from $50
        </BookLink>
      </div>
    </aside>
  );
}
