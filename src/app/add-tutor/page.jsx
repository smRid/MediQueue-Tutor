"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ProtectedPage from "@/components/ProtectedPage";
import TutorForm from "@/components/TutorForm";
import { apiFetch } from "@/lib/api";

export default function AddTutorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (payload) => {
    setLoading(true);
    try {
      await apiFetch("/tutors", {
        method: "POST",
        body: JSON.stringify({ ...payload, createdAt: new Date().toISOString() }),
      });
      toast.success("Tutor added successfully.");
      router.push("/my-tutors");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedPage>
      <div className="container-x py-12">
        <div className="mb-8 max-w-3xl">
          <span className="eyebrow">Tutor Listing</span>
          <h1 className="section-title mt-3">Add Tutor</h1>
          <p className="mt-3 text-muted-foreground">
            Publish your available teaching slot so students can book sessions without manual scheduling.
          </p>
        </div>

        <section className="card-medi p-6 sm:p-8">
          <TutorForm submitLabel="Submit Tutor" onSubmit={handleSubmit} loading={loading} />
        </section>
      </div>
    </ProtectedPage>
  );
}
