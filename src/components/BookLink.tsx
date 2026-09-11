import { ArrowUpRight } from "lucide-react";
import { BOOKING_URL } from "@/data/business";
import { cn } from "@/lib/cn";

type Props = {
  children?: React.ReactNode;
  className?: string;
  variant?: "gold" | "ghost" | "bare";
  label?: string; // accessible context, e.g. "Book the King Haircut Experience"
  icon?: boolean;
};

/** Every booking CTA goes to Ru's live Square page, so the site books real appointments on day one. */
export function BookLink({ children = "Book your experience", className, variant = "gold", label, icon = true }: Props) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener"
      aria-label={label ? `${label} (opens Ru's Square booking page in a new tab)` : undefined}
      data-cta="book"
      className={cn(variant !== "bare" && "btn", variant === "gold" && "btn-gold", variant === "ghost" && "btn-ghost", className)}
    >
      <span>{children}</span>
      {icon && <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />}
    </a>
  );
}
