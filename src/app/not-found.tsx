import Link from "next/link";
import { ScissorsMark } from "@/components/Brand";
import { BookLink } from "@/components/BookLink";

export default function NotFound() {
  return (
    <section className="grain flex min-h-[80vh] items-center pt-[var(--header-h)]">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <ScissorsMark id="nf-mark" className="mx-auto h-24 w-auto" />
        <p className="tag mt-6 -rotate-2 text-2xl text-gold" aria-hidden>
          wrong chair
        </p>
        <h1 className="display mt-2 text-[clamp(3rem,9vw,6rem)]">This page got a big chop.</h1>
        <p className="mx-auto mt-5 max-w-md text-bone-dim">It isn&apos;t here anymore, but the menu, the gallery and Ru&apos;s booking page are.</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <BookLink label="Book your experience" />
          <Link href="/" className="btn btn-ghost">
            Back home
          </Link>
        </div>
      </div>
    </section>
  );
}
