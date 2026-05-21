"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import TutorCard from "@/components/TutorCard";
import { publicFetch } from "@/lib/api";

export default function TutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (search.trim()) params.set("search", search.trim());
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    return params.toString();
  }, [endDate, search, startDate]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    publicFetch(`/tutors${query ? `?${query}` : ""}`)
      .then((data) => active && setTutors(data))
      .catch(() => active && setTutors([]))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [query]);

  return (
    <div className="container-x py-12">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="eyebrow">Browse Tutors</span>
          <h1 className="section-title mt-3">
            Find a <span className="gradient-text">Tutor</span>
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Search by tutor name or filter by listing date to find a session that fits your learning plan.
          </p>
        </div>

        <div className="glass grid gap-3 rounded-3xl p-4 sm:grid-cols-3 lg:min-w-[620px]">
          <label className="relative sm:col-span-3 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-violet-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tutor name"
              className="w-full rounded-full border border-white/60 bg-white/75 py-3 pl-10 pr-4 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-white/5"
            />
          </label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="rounded-full border border-white/60 bg-white/75 px-4 py-3 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-white/5" />
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="rounded-full border border-white/60 bg-white/75 px-4 py-3 outline-none transition focus:border-violet-400 dark:border-white/10 dark:bg-white/5" />
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-[260px] flex-col items-center justify-center gap-4">
          <span className="loader-orbit" />
          <p className="text-sm font-semibold text-violet-600 dark:text-violet-300">
            Loading tutors...
          </p>
        </div>
      ) : tutors.length === 0 ? (
        <div className="glass rounded-3xl py-16 text-center">
          <h2 className="font-display text-2xl font-bold">No tutors matched your search</h2>
          <p className="mt-2 text-muted-foreground">Try a different name or date range.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
}
