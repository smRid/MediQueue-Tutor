import { ArrowLeft, BookOpen, Compass, Home, Sparkles } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="relative isolate overflow-hidden px-4 py-16 sm:py-24">
      <div className="pointer-events-none absolute -left-28 top-8 h-72 w-72 rounded-full bg-medi-100/60 blur-3xl dark:bg-medi-900/30" />
      <div className="pointer-events-none absolute -right-24 top-4 h-96 w-96 rounded-full bg-medi-200/60 blur-3xl dark:bg-medi-800/20" />
      <div className="pointer-events-none absolute right-8 top-24 hidden h-48 w-48 md:block">
        <div className="medi-glow absolute inset-0 animate-spin-slow rounded-full" />
        <div className="absolute inset-12 rounded-full bg-gradient-to-br from-medi-300 to-medi-600 shadow-2xl shadow-medi-500/20" />
      </div>

      <section className="container-x relative">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-border bg-card/60 p-5 shadow-[0_30px_80px_-45px_rgba(13,148,136,0.35)] backdrop-blur md:p-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-72 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-medi-400 via-medi-500 to-medi-700 p-8 text-white shadow-2xl shadow-medi-700/20">
              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[34px] border-white/20" />
              <div className="absolute -bottom-16 left-8 h-36 w-36 rounded-full bg-accent-300/40 blur-2xl" />
              <BookOpen className="absolute bottom-6 right-8 h-24 w-24 text-white/15" />

              <div className="relative z-10 flex h-full min-h-56 flex-col justify-between">
                <span className="chip bg-white/20 text-white ring-1 ring-white/30">
                  <Sparkles className="h-3.5 w-3.5" />
                  Page not found
                </span>
                <div>
                  <div className="font-display text-[7rem] font-bold leading-none tracking-tight sm:text-[9rem]">
                    404
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.25em] text-white/80">
                    <BookOpen className="h-4 w-4" />
                    MediQueue Lost &amp; Found
                  </div>
                </div>
              </div>
            </div>

            <div className="py-2 text-center lg:text-left">
              <span className="chip border border-medi-200 bg-medi-50 text-medi-700 dark:border-medi-800 dark:bg-medi-900/30 dark:text-medi-300">
                <Compass className="h-3.5 w-3.5" />
                Nothing here
              </span>

              <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                This page seems to have missed class.
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground lg:mx-0">
                The link may be broken, moved, or taking a study break somewhere
                else. Let&apos;s get you back to finding the perfect tutor for
                your next session.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link href="/" className="btn-medi">
                  <Home className="h-4 w-4" />
                  Go Home
                </Link>
                <Link href="/tutors" className="btn-ghost-medi">
                  Browse Tutors
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
