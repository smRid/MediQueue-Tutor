"use client";

import { Loader2 } from "lucide-react";
import { useState } from "react";

export const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "Computer Science",
  "Economics",
  "Accounting",
];

const initialValues = {
  tutorName: "",
  photo: "",
  subject: "Mathematics",
  availableDays: "",
  availableTime: "",
  hourlyFee: "",
  totalSlot: "",
  sessionStartDate: "",
  institution: "",
  experience: "",
  location: "",
  teachingMode: "Online",
};

export default function TutorForm({ defaultValues, submitLabel = "Submit", onSubmit, loading }) {
  const [form, setForm] = useState({ ...initialValues, ...defaultValues });

  const update = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      hourlyFee: Number(form.hourlyFee),
      totalSlot: Number(form.totalSlot),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
      <Field label="Tutor Name" name="tutorName" value={form.tutorName} onChange={update} required />
      <Field label="Photo URL" name="photo" value={form.photo} onChange={update} placeholder="https://..." />

      <label className="block">
        <span className="text-sm font-semibold">Subject / Category</span>
        <select name="subject" value={form.subject} onChange={update} className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-medi-400">
          {SUBJECTS.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </label>

      <Field label="Available Days" name="availableDays" value={form.availableDays} onChange={update} placeholder="Sun - Thu" required />
      <Field label="Available Time Slot" name="availableTime" value={form.availableTime} onChange={update} placeholder="5:00 PM - 8:00 PM" required />
      <Field label="Hourly Fee" name="hourlyFee" type="number" min="0" value={form.hourlyFee} onChange={update} required />
      <Field label="Total Slot" name="totalSlot" type="number" min="0" value={form.totalSlot} onChange={update} required />
      <Field label="Session Start Date" name="sessionStartDate" type="date" value={form.sessionStartDate} onChange={update} required />
      <Field label="Institution" name="institution" value={form.institution} onChange={update} required />
      <Field label="Experience" name="experience" value={form.experience} onChange={update} placeholder="5 years" required />
      <Field label="Location" name="location" value={form.location} onChange={update} placeholder="Dhanmondi, Dhaka" required />

      <label className="block">
        <span className="text-sm font-semibold">Teaching Mode</span>
        <select name="teachingMode" value={form.teachingMode} onChange={update} className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none focus:border-medi-400">
          <option>Online</option>
          <option>Offline</option>
          <option>Both</option>
        </select>
      </label>

      <div className="md:col-span-2">
        <button type="submit" disabled={loading} className="btn-medi w-full justify-center disabled:opacity-60 md:w-auto">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : submitLabel}
        </button>
      </div>
    </form>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <input
        {...props}
        className="mt-1 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-medi-400 focus:ring-4 focus:ring-medi-200/45"
      />
    </label>
  );
}
