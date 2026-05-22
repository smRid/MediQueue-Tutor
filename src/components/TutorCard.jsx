import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  MapPin,
  Monitor,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

const MODE_STYLES = {
  Online: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  Offline: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  Both: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
};

export default function TutorCard({ tutor }) {
  return (
    <article className="card-shine group flex h-full flex-col overflow-hidden rounded-3xl border border-white/60 bg-white/75 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-violet-500/10 dark:border-white/10 dark:bg-white/5">
      <div className="relative h-52 w-full overflow-hidden bg-violet-100/70 dark:bg-violet-950/30">
        {tutor.photo ? (
          <Image
            src={tutor.photo}
            alt={tutor.tutorName || "Tutor"}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Users className="h-16 w-16 text-violet-300 dark:text-violet-700" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

        <div className="absolute left-3 top-3">
          <span className="inline-flex items-center rounded-full bg-white/85 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-md ring-1 ring-white/70 dark:bg-black/35 dark:text-white dark:ring-white/10">
            {tutor.subject || "General"}
          </span>
        </div>

        {tutor.teachingMode && (
          <div className="absolute right-3 top-3">
            <span
              className={`chip text-[11px] ring-1 ring-white/60 ${
                MODE_STYLES[tutor.teachingMode] || MODE_STYLES.Both
              }`}
            >
              <Monitor className="h-3 w-3" />
              {tutor.teachingMode}
            </span>
          </div>
        )}

        <div className="absolute bottom-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
            <Zap className="h-3 w-3" />
            Open
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-semibold text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-300">
            <Sparkles className="h-3 w-3" />
            Verified
          </span>
          {tutor.totalSlot > 0 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2 py-0.5 font-semibold text-cyan-600 ring-1 ring-cyan-500/20 dark:text-cyan-300">
              <Users className="h-3 w-3" />
              {tutor.totalSlot} slots
            </span>
          )}
        </div>

        <h3 className="line-clamp-1 font-display text-lg font-bold text-foreground transition-colors group-hover:text-violet-600 dark:group-hover:text-violet-300">
          {tutor.tutorName}
        </h3>

        {tutor.institution && (
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
            {tutor.institution} {tutor.experience ? `- ${tutor.experience}` : ""}
          </p>
        )}

        <div className="mt-3 space-y-2 text-sm text-muted-foreground">
          {tutor.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-violet-500" />
              <span className="line-clamp-1">{tutor.location}</span>
            </div>
          )}
          {(tutor.availableDays || tutor.availableTime) && (
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-violet-500" />
              <span className="line-clamp-1">
                {tutor.availableDays} {tutor.availableTime}
              </span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-5">
          <div className="mb-4 h-px w-full bg-border/40 dark:bg-white/10" />
          <div className="flex items-center justify-between">
            <div className="gradient-text flex items-end gap-1 font-display text-2xl font-extrabold leading-none">
              {tutor.hourlyFee || 0}
              <span className="pb-0.5 text-sm font-bold">$</span>
              <span className="pb-0.5 text-xs font-normal text-muted-foreground">
                /hr
              </span>
            </div>

            <Link
              href={`/tutors/${tutor._id}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/5 px-4 py-2 text-sm font-semibold text-violet-700 transition-all hover:gap-2.5 hover:border-violet-500/60 hover:bg-violet-500/10 dark:text-violet-200"
            >
              Book
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
