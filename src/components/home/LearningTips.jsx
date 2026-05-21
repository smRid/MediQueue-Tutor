"use client";

import { motion } from "framer-motion";
import {
  FiTarget,
  FiRepeat,
  FiTool,
  FiMessageCircle,
  FiCoffee,
} from "react-icons/fi";
import { HiLightBulb, HiSparkles } from "react-icons/hi2";

export const learningTips = [
  {
    id: 1,
    title: "Set one clear goal per week",
    description:
      "Vague intentions die quietly. A single, measurable weekly goal turns 'learn React' into 'ship a todo app by Friday'.",
    icon: "Target",
  },
  {
    id: 2,
    title: "Practice small and often",
    description:
      "30 focused minutes a day beats a 5-hour weekend cram. Spaced repetition is how the brain actually keeps things.",
    icon: "Repeat",
  },
  {
    id: 3,
    title: "Build, don't just take notes",
    description:
      "Knowledge sticks when it's used. Rebuild every concept you learn into the smallest possible project.",
    icon: "Hammer",
  },
  {
    id: 4,
    title: "Teach what you learn",
    description:
      "If you can explain it to a friend in plain language, you understand it. If you can't, you've found your next study target.",
    icon: "MessageCircle",
  },
  {
    id: 5,
    title: "Treat mistakes as data",
    description:
      "Every bug, every wrong answer, every failed deploy is a free lesson. Write down what surprised you and why.",
    icon: "Lightbulb",
  },
  {
    id: 6,
    title: "Schedule deliberate breaks",
    description:
      "Insight tends to arrive on the walk, not at the desk. Step away on purpose; come back sharper.",
    icon: "Coffee",
  },
];

const iconMap = {
  Target: FiTarget,
  Repeat: FiRepeat,
  Hammer: FiTool,
  MessageCircle: FiMessageCircle,
  Lightbulb: HiLightBulb,
  Coffee: FiCoffee,
};

const gradients = [
  "from-violet-500 to-fuchsia-500",
  "from-fuchsia-500 to-rose-500",
  "from-amber-500 to-orange-500",
  "from-emerald-500 to-cyan-500",
  "from-cyan-500 to-blue-500",
  "from-blue-500 to-indigo-500",
];

export default function LearningTips() {
  return (
    <section id="learning-tips" className="relative py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_2fr]">
          {/* Left: sticky intro */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-600 ring-1 ring-violet-500/20 dark:text-violet-300">
                <HiSparkles className="h-3.5 w-3.5" />
                Learning Playbook
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
                Study smarter,{" "}
                <span className="gradient-text">not harder</span>
              </h2>
              <p className="mt-4 text-base text-foreground/70 md:text-lg">
                Six habits we lean on across every course. Small, boring, and
                wildly effective when you stack them.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="glass mt-8 rounded-2xl p-5"
            >
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-white shadow-md">
                  <HiLightBulb className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                    Did you know?
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/80">
                    Reviewing new material within 24 hours boosts retention by
                    up to{" "}
                    <span className="font-bold text-violet-600 dark:text-violet-400">70%</span>. One
                    coffee-sized review session can save you a weekend of
                    re-learning.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: tips grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {learningTips.map((tip, i) => {
              const Icon = iconMap[tip.icon] || HiSparkles;
              const gradient = gradients[i % gradients.length];
              return (
                <motion.article
                  key={tip.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background/80 p-6 shadow-sm backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-violet-500/10"
                >
                  {/* faint number */}
                  <span className="pointer-events-none absolute right-4 top-3 font-display text-5xl font-black text-foreground/5">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* icon tile */}
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="relative mt-4 font-display text-lg font-bold leading-snug">
                    {tip.title}
                  </h3>
                  <p className="relative mt-2 text-sm leading-relaxed text-foreground/70">
                    {tip.description}
                  </p>

                  {/* bottom hover accent */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r ${gradient} transition-transform duration-500 group-hover:scale-x-100`}
                  />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
