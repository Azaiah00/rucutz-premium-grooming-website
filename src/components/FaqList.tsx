import { Plus } from "lucide-react";
import type { Faq } from "@/data/faqs";

/** Native <details> accordion: accessible, works without JS, and answers stay in the HTML for crawlers. */
export function FaqList({ items }: { items: Pick<Faq, "q" | "a">[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group reveal">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-lg font-semibold text-bone transition-colors group-hover:text-gold-lift md:text-xl">{f.q}</h3>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-gold transition-transform duration-500 group-open:rotate-45">
              <Plus className="h-4 w-4" aria-hidden />
            </span>
          </summary>
          <p className="max-w-3xl pb-7 pr-12 text-bone-dim">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
