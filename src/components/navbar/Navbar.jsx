"use client";

import { BookOpen, CalendarCheck, GraduationCap, Home, Info, LogOut, Menu, Moon, PlusCircle, Sun, User, Users, X, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { signOut, useSession } from "@/lib/auth-client";
import { useTheme } from "@/context/ThemeContext";

const PUBLIC_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/tutors", label: "Tutors", icon: GraduationCap },
  { href: "/about", label: "About", icon: Info },
];

const PRIVATE_NAV = [
  { href: "/add-tutor", label: "Add Tutor", icon: PlusCircle },
  { href: "/my-tutors", label: "My Tutors", icon: Users },
  { href: "/my-booked-sessions", label: "Booked Sessions", icon: CalendarCheck },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [cachedUser, setCachedUser] = useState(session?.user);

  useEffect(() => {
    if (session?.user) {
      setCachedUser(session.user);
    } else if (!isPending) {
      setCachedUser(null);
    }
  }, [session?.user, isPending]);

  const displayUser = session?.user || cachedUser;
  const showSkeleton = isPending && !displayUser;

  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut();
    toast.success("See you soon!");
    setOpen(false);
    setDropdownOpen(false);
    router.push("/");
    router.refresh();
  };

  const allNav = displayUser
    ? [...PUBLIC_NAV, ...PRIVATE_NAV]
    : PUBLIC_NAV;

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled
          ? "border-white/40 bg-background/75 shadow-sm shadow-violet-500/5 backdrop-blur-xl dark:border-white/10"
          : "border-transparent bg-background/45 backdrop-blur-md"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-500 to-cyan-400 shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-105">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">
                <BookOpen className="h-5 w-5 text-white" strokeWidth={2.6} />
              </span>
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl font-extrabold tracking-tight text-foreground">
                Medi<span className="gradient-text">Queue</span>
              </span>
              <span className="block text-[10px] uppercase tracking-[0.28em] text-violet-600 dark:text-violet-300">
                Tutor Booking
              </span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {allNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`group relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                    isActive(item.href)
                      ? "bg-violet-500/10 text-violet-700 shadow-sm shadow-violet-500/10 ring-1 ring-violet-500/20 dark:text-violet-200"
                      : "text-foreground/70 hover:bg-violet-500/10 hover:text-foreground"
                  }`}
                >
                  {isActive(item.href) && (
                    <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10" />
                  )}
                  <item.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Right */}
        <div className="hidden items-center gap-2 lg:flex">
          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white/60 text-foreground/70 ring-1 ring-violet-500/15 backdrop-blur-xl transition hover:bg-violet-500/10 hover:text-violet-600 hover:ring-violet-500/35 dark:bg-white/5"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>

          {showSkeleton ? (
            <div className="h-10 w-24 animate-pulse rounded-full bg-medi-100/60 dark:bg-medi-900/30" />
          ) : displayUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                className="flex cursor-pointer items-center gap-2 rounded-full bg-white/60 py-1 pl-1 pr-3 ring-1 ring-violet-500/15 backdrop-blur-xl transition hover:ring-violet-500/35 dark:bg-white/5"
                title={displayUser.name}
              >
                <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-400 text-white ring-2 ring-white/70 dark:ring-white/10">
                  {displayUser.image ? (
                    <Image
                      src={displayUser.image}
                      alt={displayUser.name || "user"}
                      width={32}
                      height={32}
                      unoptimized
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="font-bold">
                      {(displayUser.name || "U").charAt(0).toUpperCase()}
                    </span>
                  )}
                </span>
                <span className="max-w-[120px] truncate text-sm font-semibold text-foreground">
                  {displayUser.name?.split(" ")[0] || "User"}
                </span>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="glass absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl p-1 shadow-xl">
                    <Link
                      href="/my-profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-violet-500/10"
                    >
                      <User className="h-4 w-4" /> My Profile
                    </Link>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex w-full cursor-pointer items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-500/10 dark:text-red-300"
                    >
                      <LogOut className="h-4 w-4" /> Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="btn-ghost-medi !px-5 !py-2 !text-sm"
              >
                Login
              </Link>
              <Link href="/register" className="btn-medi !px-5 !py-2 !text-sm">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile buttons */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white/60 ring-1 ring-violet-500/15 backdrop-blur-xl dark:bg-white/5"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full bg-white/60 p-2 ring-1 ring-violet-500/15 backdrop-blur-xl dark:bg-white/5"
            aria-label="Open menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <div
        className={`overflow-hidden border-t border-white/30 bg-background/85 backdrop-blur-xl transition-all duration-300 ease-out dark:border-white/10 lg:hidden ${
          open
            ? "max-h-[600px] translate-y-0 opacity-100"
            : "max-h-0 -translate-y-2 opacity-0"
        }`}
      >
        <div className="container-x space-y-2 pb-4">
          {allNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 font-semibold transition-all duration-300 ${
                isActive(item.href)
                  ? "bg-violet-500/10 text-violet-700 shadow-sm shadow-violet-500/10 ring-1 ring-violet-500/20 dark:text-violet-200"
                  : "glass text-foreground hover:-translate-y-0.5"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}

          {displayUser ? (
            <>
              <Link
                href="/my-profile"
                onClick={() => setOpen(false)}
                className="glass block rounded-2xl px-4 py-3 font-semibold text-foreground"
              >
                My Profile
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="btn-ghost-medi w-full justify-center !border-red-200 !text-red-600 dark:!border-red-900 dark:!text-red-400"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="btn-ghost-medi justify-center"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="btn-medi justify-center"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
