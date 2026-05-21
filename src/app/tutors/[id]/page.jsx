"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { CalendarDays, Clock, DollarSign, Loader2, MapPin, Monitor, Ticket, Users } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProtectedPage from "@/components/ProtectedPage";
import { apiFetch } from "@/lib/api";
import { useSession } from "@/lib/auth-client";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({ studentName: "", phone: "" });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    apiFetch(`/tutors/${id}`)
      .then(setTutor)
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (session?.user?.name) {
      setBooking((prev) => ({ ...prev, studentName: session.user.name }));
    }
  }, [session?.user?.name]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!booking.studentName || !booking.phone) {
      toast.error("Student name and phone are required.");
      return;
    }
    setBookingLoading(true);
    try {
      const data = await apiFetch("/bookings", {
        method: "POST",
        body: JSON.stringify({
          tutorId: tutor._id,
          tutorName: tutor.tutorName,
          studentName: booking.studentName,
          phone: booking.phone,
        }),
      });
      toast.success(`Session booked. Token: ${data.token}`);
      router.push("/my-booked-sessions");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <ProtectedPage>
      <div className="container-x py-12">
        {loading ? (
          <div className="flex min-h-[360px] items-center justify-center">
            <Loader2 className="h-9 w-9 animate-spin text-medi-500" />
          </div>
        ) : !tutor ? (
          <div className="card-medi py-16 text-center">Tutor not found.</div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <section className="card-medi overflow-hidden">
              <div className="relative h-[360px] bg-medi-100 dark:bg-medi-900/30">
                {tutor.photo ? (
                  <Image src={tutor.photo} alt={tutor.tutorName} fill className="object-cover" unoptimized />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <Users className="h-20 w-20 text-medi-300" />
                  </div>
                )}
              </div>
              <div className="p-6 sm:p-8">
                <span className="chip bg-medi-600 text-white">{tutor.subject}</span>
                <h1 className="mt-4 font-display text-4xl font-bold">{tutor.tutorName}</h1>
                <p className="mt-2 text-muted-foreground">{tutor.institution} • {tutor.experience}</p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Info icon={Clock} label="Availability" value={`${tutor.availableDays} ${tutor.availableTime}`} />
                  <Info icon={CalendarDays} label="Session Starts" value={new Date(tutor.sessionStartDate).toLocaleDateString()} />
                  <Info icon={DollarSign} label="Hourly Fee" value={`$${tutor.hourlyFee}/hr`} />
                  <Info icon={MapPin} label="Location" value={tutor.location} />
                  <Info icon={Monitor} label="Teaching Mode" value={tutor.teachingMode} />
                  <Info icon={Ticket} label="Available Slots" value={tutor.totalSlot > 0 ? `${tutor.totalSlot} slots` : "No available slots left"} />
                </div>
              </div>
            </section>

            <section className="card-medi self-start p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold">Book Session</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your email and tutor information are attached automatically to the digital session token.
              </p>

              <form onSubmit={handleBooking} className="mt-6 space-y-4">
                <Field label="Student Name" value={booking.studentName} onChange={(e) => setBooking((p) => ({ ...p, studentName: e.target.value }))} />
                <Field label="Phone" value={booking.phone} onChange={(e) => setBooking((p) => ({ ...p, phone: e.target.value }))} />
                <ReadOnly label="Tutor ID" value={tutor._id} />
                <ReadOnly label="Tutor Name" value={tutor.tutorName} />
                <ReadOnly label="Student Email" value={session?.user?.email || ""} />
                <ReadOnly label="Book Status" value="booked after successful booking" />
                <button type="submit" disabled={bookingLoading || Number(tutor.totalSlot) <= 0} className="btn-medi w-full justify-center disabled:opacity-60">
                  {bookingLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Book Session"}
                </button>
                {Number(tutor.totalSlot) <= 0 && (
                  <p className="rounded-2xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700 dark:border-red-900 dark:bg-red-900/20 dark:text-red-300">
                    No available slots left.
                  </p>
                )}
              </form>
            </section>
          </div>
        )}
      </div>
    </ProtectedPage>
  );
}

function Info({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-border bg-background/70 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-medi-600 dark:text-medi-400">
        <Icon className="h-4 w-4" /> {label}
      </div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input {...props} className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-medi-400" />
    </label>
  );
}

function ReadOnly({ label, value }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input value={value} readOnly className="mt-1 w-full rounded-2xl border border-border bg-muted px-4 py-3 text-muted-foreground outline-none" />
    </label>
  );
}
