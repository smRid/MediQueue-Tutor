"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowRight,
  BookOpen,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const socials = [
  {
    href: "https://twitter.com",
    label: "Twitter",
    path: "M13.5 10.6 21.2 2h-1.9l-6.7 7.5L7.2 2H2l8 11.2L2.3 22h1.9l6.7-7.7 5.7 7.7H22l-8.5-11.4Zm-2.4 2.7-.8-1.1L4.7 3.4h1.7l5 7 .8 1.1 6 9.2h-1.7l-5.4-7.4Z",
  },
  {
    href: "https://github.com",
    label: "GitHub",
    path: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.6 1.1 1.6 1.1.9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.7-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1.1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1.1a9.6 9.6 0 0 1 5.2 0c2-1.4 2.8-1.1 2.8-1.1.6 1.4.2 2.4.1 2.7.7.7 1.1 1.6 1.1 2.7 0 3.8-2.3 4.7-4.5 4.9.4.3.8 1 .8 2.1V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z",
  },
  {
    href: "https://linkedin.com",
    label: "LinkedIn",
    path: "M6.9 8.8H3.6V20h3.3V8.8ZM5.3 7.3a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8ZM20.4 20h-3.3v-5.5c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V20H9.9V8.8H13v1.5h.1c.4-.8 1.5-1.8 3.1-1.8 3.4 0 4 2.2 4 5V20Z",
  },
  {
    href: "https://youtube.com",
    label: "YouTube",
    path: "M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4L15.8 12l-6.2 3.6Z",
  },
];

const exploreLinks = [
  { href: "/", label: "Home" },
  { href: "/tutors", label: "Browse Tutors" },
  { href: "/add-tutor", label: "Become a Tutor" },
  { href: "/my-profile", label: "My Profile" },
];

const subjectLinks = ["Mathematics", "Physics", "Chemistry", "Computer Science"];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubscribe = async (event) => {
    event.preventDefault();
    if (!email.trim()) return;
    setBusy(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    toast.success("Thanks! You're on the list.");
    setEmail("");
    setBusy(false);
  };

  return (
    <footer className="relative mt-24 border-t border-white/50 bg-white/40 backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 shadow-lg shadow-violet-500/20">
                <BookOpen className="h-5 w-5 text-white" />
              </span>
              <span className="font-display text-xl font-extrabold tracking-tight">
                Medi<span className="gradient-text">Queue</span>
              </span>
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Learn with expert tutors, flexible booking, and a study flow that
              keeps your next session within reach.
            </p>
            <div className="flex items-center gap-2 pt-1">
              {socials.map(({ href, path, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-white/60 text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-violet-400/60 hover:text-violet-600 hover:shadow-md dark:border-white/10 dark:bg-white/5 dark:hover:text-violet-300"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground/80">
              Explore
            </h3>
            <ul className="mt-4 space-y-2.5">
              {exploreLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-violet-600 dark:hover:text-violet-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground/80">
              Subjects
            </h3>
            <ul className="mt-4 space-y-2.5">
              {subjectLinks.map((subject) => (
                <li key={subject}>
                  <Link
                    href="/tutors"
                    className="text-sm text-muted-foreground transition-colors hover:text-violet-600 dark:hover:text-violet-300"
                  >
                    {subject}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground/80">
              Stay in the loop
            </h3>
            <p className="text-sm text-muted-foreground">
              Tutor updates, study tips, and booking reminders straight to your inbox.
            </p>
            <form onSubmit={onSubscribe} className="flex items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-10 w-full rounded-full border border-white/60 bg-white/70 px-4 text-sm outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-white/5"
              />
              <button
                type="submit"
                disabled={busy}
                aria-label="Subscribe"
                className="btn-medi h-10 w-10 shrink-0 !px-0 !py-0"
              >
                {busy ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 
                  border-white/40 border-t-white" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </button>
            </form>

            <ul className="space-y-2 pt-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-violet-500" />
                support@mediqueue.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-violet-500" />
                +880 1700 000000
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-violet-500" />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-3 border-t border-white/50 pt-6 text-sm text-muted-foreground dark:border-white/10 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold gradient-text">MediQueue</span>.
            Crafted for lifelong learners.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-300">
              Privacy
            </Link>
            <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-300">
              Terms
            </Link>
            <Link href="/" className="hover:text-violet-600 dark:hover:text-violet-300">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
