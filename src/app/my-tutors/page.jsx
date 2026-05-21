"use client";

import { Edit, Loader2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProtectedPage from "@/components/ProtectedPage";
import TutorForm from "@/components/TutorForm";
import { apiFetch } from "@/lib/api";

export default function MyTutorsPage() {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadTutors = () => {
    setLoading(true);
    apiFetch("/my-tutors")
      .then(setTutors)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(loadTutors, []);

  const updateTutor = async (payload) => {
    setSaving(true);
    try {
      await apiFetch(`/my-tutors/${editing._id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
      });
      toast.success("Tutor updated successfully.");
      setEditing(null);
      loadTutors();
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteTutor = async () => {
    setSaving(true);
    try {
      await apiFetch(`/my-tutors/${deleting._id}`, { method: "DELETE" });
      toast.success("Tutor deleted successfully.");
      setDeleting(null);
      setTutors((prev) => prev.filter((tutor) => tutor._id !== deleting._id));
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedPage>
      <div className="container-x py-12">
        <Header />

        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <Loader2 className="h-9 w-9 animate-spin text-medi-500" />
          </div>
        ) : tutors.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-4">Tutor</th>
                    <th className="px-5 py-4">Subject</th>
                    <th className="px-5 py-4">Schedule</th>
                    <th className="px-5 py-4">Fee</th>
                    <th className="px-5 py-4">Slots</th>
                    <th className="px-5 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {tutors.map((tutor) => (
                    <tr key={tutor._id}>
                      <td className="px-5 py-4 font-semibold">{tutor.tutorName}</td>
                      <td className="px-5 py-4">{tutor.subject}</td>
                      <td className="px-5 py-4">{tutor.availableDays} {tutor.availableTime}</td>
                      <td className="px-5 py-4">${tutor.hourlyFee}/hr</td>
                      <td className="px-5 py-4">{tutor.totalSlot}</td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setEditing(tutor)} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:bg-medi-50 dark:hover:bg-medi-900/20" aria-label="Update tutor">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button onClick={() => setDeleting(tutor)} className="grid h-9 w-9 place-items-center rounded-full border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-900/20" aria-label="Delete tutor">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {editing && (
          <Modal title="Update Tutor" onClose={() => setEditing(null)}>
            <TutorForm defaultValues={editing} submitLabel="Save Changes" onSubmit={updateTutor} loading={saving} />
          </Modal>
        )}

        {deleting && (
          <Modal title="Delete Tutor" onClose={() => setDeleting(null)}>
            <p className="text-muted-foreground">
              Delete {deleting.tutorName}? Students will no longer be able to book this tutor listing.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setDeleting(null)} className="btn-ghost-medi !py-2">Keep Tutor</button>
              <button onClick={deleteTutor} disabled={saving} className="rounded-full bg-red-600 px-6 py-2 font-semibold text-white disabled:opacity-60">
                {saving ? "Deleting..." : "Delete"}
              </button>
            </div>
          </Modal>
        )}
      </div>
    </ProtectedPage>
  );
}

function Header() {
  return (
    <div className="mb-8">
      <span className="eyebrow">Private Dashboard</span>
      <h1 className="section-title mt-3">My Tutors</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">Update availability, pricing, or remove tutor listings from one organized table.</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="card-medi py-16 text-center">
      <h2 className="font-display text-2xl font-bold">You have not added any tutors yet</h2>
      <p className="mt-2 text-muted-foreground">Create your first tutor listing to start accepting bookings.</p>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/50 p-4">
      <section className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="rounded-full border border-border px-4 py-2 font-semibold">Close</button>
        </div>
        {children}
      </section>
    </div>
  );
}
