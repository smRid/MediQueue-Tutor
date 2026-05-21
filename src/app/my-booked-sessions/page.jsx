"use client";

import { Loader2, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProtectedPage from "@/components/ProtectedPage";
import { apiFetch } from "@/lib/api";

export default function MyBookedSessionsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiFetch("/my-bookings")
      .then(setBookings)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, []);

  const cancelBooking = async () => {
    setSaving(true);
    try {
      await apiFetch(`/my-bookings/${cancelTarget._id}`, { method: "PATCH" });
      toast.success("Booking cancelled successfully.");
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === cancelTarget._id ? { ...booking, status: "cancelled" } : booking,
        ),
      );
      setCancelTarget(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ProtectedPage>
      <div className="container-x py-12">
        <div className="mb-8">
          <span className="eyebrow">Learning Schedule</span>
          <h1 className="section-title mt-3">My Booked Sessions</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">Review your booked tutors, session tokens, and cancellation status.</p>
        </div>

        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <Loader2 className="h-9 w-9 animate-spin text-medi-500" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="card-medi py-16 text-center">
            <h2 className="font-display text-2xl font-bold">No booked sessions yet</h2>
            <p className="mt-2 text-muted-foreground">Browse tutors and book your first learning session.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[880px] text-left text-sm">
                <thead className="bg-muted text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-4">Tutor Name</th>
                    <th className="px-5 py-4">Student Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Token</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-5 py-4 font-semibold">{booking.tutorName}</td>
                      <td className="px-5 py-4">{booking.studentName}</td>
                      <td className="px-5 py-4">{booking.studentEmail}</td>
                      <td className="px-5 py-4 font-mono text-xs">{booking.token}</td>
                      <td className="px-5 py-4">
                        <span className={`chip ${booking.status === "cancelled" ? "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-300" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300"}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <button disabled={booking.status === "cancelled"} onClick={() => setCancelTarget(booking)} className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 font-semibold text-red-600 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900 dark:text-red-400">
                          <XCircle className="h-4 w-4" /> Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {cancelTarget && (
          <div className="fixed inset-0 z-[80] grid place-items-center bg-black/50 p-4">
            <section className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl">
              <h2 className="font-display text-2xl font-bold">Cancel Booking</h2>
              <p className="mt-3 text-muted-foreground">Cancel your session with {cancelTarget.tutorName}? The booking status will be updated immediately.</p>
              <div className="mt-6 flex justify-end gap-3">
                <button onClick={() => setCancelTarget(null)} className="btn-ghost-medi !py-2">Keep Booking</button>
                <button onClick={cancelBooking} disabled={saving} className="rounded-full bg-red-600 px-6 py-2 font-semibold text-white disabled:opacity-60">
                  {saving ? "Cancelling..." : "Confirm"}
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </ProtectedPage>
  );
}
