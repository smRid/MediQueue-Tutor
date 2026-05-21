"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, Award, BookOpen, GraduationCap, Play, Sparkles } from "lucide-react";
import MarqueeHero from "./MarqueeHero";

const SLIDES = [
  {
    eyebrow: "Welcome to MediQueue",
    title: "Find your perfect tutor",
    subtitle: "Learn faster with expert guidance, flexible schedules, and focused sessions for every subject.",
    cta: { href: "/tutors", label: "Browse Tutors" },
    badge: { icon: Award, text: "Top Rated" },
    gradient: "from-violet-950/90 via-fuchsia-900/60 to-transparent",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1400&q=80",
  },
  {
    eyebrow: "Flexible Learning",
    title: "Book sessions that fit life",
    subtitle: "Choose online, offline, or hybrid tutoring and keep your learning plan moving without friction.",
    cta: { href: "/register", label: "Get Started" },
    badge: { icon: Sparkles, text: "New Feature" },
    gradient: "from-cyan-950/90 via-blue-900/60 to-transparent",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80",
  },
  {
    eyebrow: "30+ Subjects",
    title: "Master any subject with confidence",
    subtitle: "From mathematics to computer science, discover verified tutors who make hard topics click.",
    cta: { href: "/tutors", label: "Explore Subjects" },
    badge: { icon: GraduationCap, text: "Verified" },
    gradient: "from-rose-950/90 via-amber-900/55 to-transparent",
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=1400&q=80",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[560px] overflow-hidden md:h-[620px] lg:h-[680px]">
        {SLIDES.map((item, index) => {
          const Badge = item.badge.icon;
          const selected = active === index;
          return (
            <div
              key={item.title}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                selected ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={!selected}
            >
            <Image
              src={item.image}
              alt={`${item.title} featured image`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="h-full w-full object-cover"
              style={selected ? { animation: "hero-zoom 6s ease-out both" } : undefined}
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/75 to-transparent" />

            <div className="container-x relative z-10 flex h-full items-center">
              <div
                className="max-w-2xl text-white"
                style={selected ? { animation: "rise-in 0.7s ease-out both" } : undefined}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-md">
                  <BookOpen className="h-3.5 w-3.5" />
                  {item.eyebrow}
                </span>

                <h1 className="mt-6 font-display text-4xl font-black leading-tight drop-shadow-lg sm:text-5xl lg:text-6xl">
                  {item.title}
                </h1>

                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
                  {item.subtitle}
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link href={item.cta.href} className="btn-medi group px-7 py-3 text-base">
                    {item.cta.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <Link
                    href="/tutors"
                    className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
                  >
                    <Play className="h-4 w-4" />
                    Browse Tutors
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-white/80">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 backdrop-blur-md">
                    <Badge className="h-4 w-4 text-cyan-200" />
                    {item.badge.text}
                  </span>
                  <span>500+ tutors</span>
                  <span>30+ subjects</span>
                </div>
              </div>
            </div>
          </div>
          );
        })}

        <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-orange-500" : "w-2 bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold tracking-wider text-white/90">
            {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className="border-y border-white/50 bg-white/50 backdrop-blur-xl dark:border-white/10 dark:bg-white/5">
        <div className="overflow-hidden">
          <div className="marquee-track flex gap-12 whitespace-nowrap py-4 font-display text-2xl font-black gradient-text">
            <MarqueeHero />
          </div>
        </div>
      </div>
    </section>
  );
}
