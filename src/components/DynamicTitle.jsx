"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const ROUTE_TITLES = {
  "/": "Home",
  "/tutors": "Browse Tutors",
  "/add-tutor": "Add Tutor",
  "/my-tutors": "My Tutors",
  "/my-booked-sessions": "My Bookings",
  "/login": "Sign In",
  "/register": "Create Account",
  "/my-profile": "My Profile",
};

export default function DynamicTitle() {
  const pathname = usePathname();

  useEffect(() => {
    const base = "MediQueue";

    if (pathname.startsWith("/tutors/")) {
      document.title = `Tutor Details | ${base}`;
      return;
    }

    const title = ROUTE_TITLES[pathname];
    document.title = title ? `${title} | ${base}` : base;
  }, [pathname]);

  return null;
}
