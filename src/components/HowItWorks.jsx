import { Calendar, Rocket, Search } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    num: "1",
    title: "Browse & Find",
    description:
      "Search through our verified tutors by subject, availability, and location to find the perfect match.",
  },
  {
    icon: Calendar,
    num: "2",
    title: "Book a Session",
    description:
      "Choose your preferred time slot and book your learning session instantly with just a few clicks.",
  },
  {
    icon: Rocket,
    num: "3",
    title: "Start Learning",
    description:
      "Join your session and begin your journey to academic excellence with expert guidance.",
  },
];

export default function HowItWorks() {
  return (
    <section className="container-x py-20">
      <div className="text-center">
        <span className="eyebrow">Simple Process</span>
        <h2 className="section-title mt-3">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Getting started with MediQueue is easy. Follow these three simple
          steps to begin your learning journey.
        </p>
      </div>

      <div className="relative mt-14 grid gap-8 md:grid-cols-3">
        {/* Connecting line */}
        <div className="absolute left-[16.6%] right-[16.6%] top-16 hidden h-0.5 bg-gradient-to-r from-violet-200 via-fuchsia-300 to-cyan-200 dark:from-violet-900 dark:via-fuchsia-800 dark:to-cyan-900 md:block" />

        {STEPS.map((step, index) => (
          <div
            key={step.num}
            className="relative text-center"
            style={{ animation: "rise-in 0.55s ease-out both", animationDelay: `${index * 120}ms` }}
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-violet-500/30 ring-4 ring-background">
              <span className="font-display text-xl font-bold">{step.num}</span>
            </div>

            <div className="card-shine card-medi mt-6 p-6">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-violet-500/10 text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-300">
                <step.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
