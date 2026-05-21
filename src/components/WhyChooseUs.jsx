import { Award, BookOpen, Clock, ShieldCheck } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "500+ Verified Tutors",
    description:
      "Every tutor is thoroughly vetted and verified for quality teaching and subject expertise.",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description:
      "Book sessions that fit your schedule. Choose from morning, afternoon, or evening slots.",
  },
  {
    icon: BookOpen,
    title: "30+ Subjects",
    description:
      "From mathematics to computer science, find expert tutors for any subject you need.",
  },
  {
    icon: Award,
    title: "Satisfaction Guaranteed",
    description:
      "Join thousands of students who have achieved their academic goals with our tutors.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="container-x py-20">
      <div className="text-center">
        <span className="eyebrow">Why Choose Us</span>
        <h2 className="section-title mt-3">
          The <span className="gradient-text">Smarter Way</span> to Learn
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          MediQueue makes it easy to connect with the right tutor and start
          learning faster than ever before.
        </p>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((f, i) => (
          <div
            key={f.title}
            className="card-shine card-medi group p-6 text-center"
            style={{ animation: "rise-in 0.55s ease-out both", animationDelay: `${i * 90}ms` }}
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 text-white shadow-lg shadow-violet-500/20 transition-transform group-hover:scale-105">
              <f.icon className="h-7 w-7" />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-foreground">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
