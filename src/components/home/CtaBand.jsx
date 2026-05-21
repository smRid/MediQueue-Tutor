"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowRight, HiSparkles, HiRocketLaunch } from "react-icons/hi2";

export default function CtaBand() {
  return (
    <section className="px-4 py-16 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6 }}
        className="relative isolate z-0 mx-auto max-w-7xl overflow-hidden rounded-[2rem] p-10 text-white shadow-2xl shadow-violet-500/20 md:p-14"
      >
        {/* Animated gradient base */}
        <div
          className="absolute inset-0 -z-10 animate-gradient-x bg-size-200"
          style={{
            backgroundImage:
              "linear-gradient(120deg, #6d28d9, #c026d3, #db2777, #0891b2, #6d28d9)",
          }}
        />

        {/* Soft grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Decorative blobs */}
        <motion.div
          aria-hidden
          animate={{ y: [0, -16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -top-8 -right-8 h-48 w-48 rounded-full bg-white/10 blur-2xl"
        />
        <motion.div
          aria-hidden
          animate={{ y: [0, 14, 0] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="pointer-events-none absolute -bottom-10 -left-6 h-56 w-56 rounded-full bg-white/10 blur-2xl"
        />

        {/* Content */}
        <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
              <HiSparkles className="h-3.5 w-3.5" />
              Ready when you are
            </span>
            <h2 className="mt-4 font-display text-3xl font-black leading-tight drop-shadow-md sm:text-4xl md:text-5xl">
              Start learning today.
              <br />
              <span className="text-white/80">Future-you says thanks.</span>
            </h2>
            <p className="mt-4 max-w-xl text-base text-white/85 md:text-lg">
              Join 100,000+ learners turning curiosity into skills. First
              course on us — no credit card, no catch.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/tutors"
                className="btn btn-lg rounded-full border-none bg-white px-7 text-slate-900 shadow-lg hover:-translate-y-0.5 hover:bg-white hover:shadow-xl"
              >
                <HiRocketLaunch className="h-5 w-5 text-violet-500" />
                Explore Tutors
              </Link>
              <Link
                href="/register"
                className="btn btn-lg rounded-full border-white/50 bg-white/10 text-white backdrop-blur-md hover:border-white hover:bg-white/20"
              >
                Create free account
                <HiArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-4 text-xs text-white/70">
              Cancel anytime · 30-day money-back guarantee · Lifetime access
            </p>
          </div>

          {/* Right: floating stat tile */}
          <div className="relative hidden md:block">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="ml-auto w-fit rounded-3xl border border-white/25 bg-white/10 p-6 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[
                    "https://randomuser.me/api/portraits/women/44.jpg",
                    "https://randomuser.me/api/portraits/men/32.jpg",
                    "https://randomuser.me/api/portraits/men/52.jpg",
                    "https://randomuser.me/api/portraits/women/68.jpg",
                  ].map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="h-9 w-9 rounded-full ring-2 ring-white object-cover"
                    />
                  ))}
                </div>
                <div>
                  <p className="font-display text-2xl font-extrabold">
                    100K+
                  </p>
                  <p className="text-xs text-white/80">
                    learners already enrolled
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <span key={i} className="text-amber-300">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-white/80">
                  4.9 average from 38,420 reviews
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
