"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TutorCard from "./TutorCard";
import { publicFetch } from "@/lib/api";

export default function AvailableTutors() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const data = await publicFetch("/tutors?limit=6");
        setTutors(data);
        setError("");
      } catch (err) {
        setTutors([]);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  return (
    <section className="container-x py-20">
      <div className="text-center">
        <span className="eyebrow">Available Tutors</span>
        <h2 className="section-title mt-3">
          Meet Our <span className="gradient-text">Expert Tutors</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Discover top-rated tutors ready to help you master any subject. Each
          tutor is verified and committed to your academic success.
        </p>
      </div>

      {loading ? (
        <div className="mt-12 flex flex-col items-center justify-center gap-4">
          <span className="loader-orbit" />
          <p className="text-sm font-semibold text-violet-600 dark:text-violet-300">
            Finding great tutors...
          </p>
        </div>
      ) : error ? (
        <div className="glass mx-auto mt-12 max-w-2xl rounded-3xl px-6 py-12 text-center">
          <h3 className="font-display text-2xl font-bold">Tutors are unavailable right now</h3>
          <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
            Please check the database connection, then refresh this page.
          </p>
        </div>
      ) : tutors.length === 0 ? (
        <div className="glass mx-auto mt-12 max-w-2xl rounded-3xl px-6 py-12 text-center">
          <p className="text-lg text-muted-foreground">
            No tutors available yet. Be the first to{" "}
            <Link href="/add-tutor" className="font-semibold text-violet-600 hover:underline">
              add a tutor
            </Link>
            !
          </p>
        </div>
      ) : (
        <>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/tutors" className="btn-ghost-medi group">
              See All Tutors
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </>
      )}
    </section>
  );
}
