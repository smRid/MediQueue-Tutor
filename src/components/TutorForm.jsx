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

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const initialValues = {
  tutorName: "",
  photo: "",
  subject: "Mathematics",
  availableDays: [],
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
  const [form, setForm] = useState(() => {
    const initial = { ...initialValues, ...defaultValues };
    if (typeof initial.availableDays === "string") {
      initial.availableDays = initial.availableDays
        ? initial.availableDays.split(",").map((d) => d.trim())
        : [];
    }
    return initial;
  });

  const update = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleDay = (day) => {
    setForm((prev) => {
      const days = prev.availableDays || [];
      if (days.includes(day)) {
        return { ...prev, availableDays: days.filter((d) => d !== day) };
      }
      return { ...prev, availableDays: [...days, day] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      // Pass availableDays as string or array based on backend needs, string is safer for simple DBs
      availableDays: Array.isArray(form.availableDays) ? form.availableDays.join(", ") : form.availableDays,
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

      <div className="block">
        <span className="text-sm font-semibold mb-2 block">
          Available Days <span className="text-red-500">*</span>
        </span>
        <div className="flex flex-wrap gap-2">
          {DAYS.map((day) => {
            const isSelected = form.availableDays.includes(day);
            return (
              <label
                key={day}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer transition-colors ${
                  isSelected
                    ? "border-medi-400 bg-medi-50/50 text-medi-900 dark:bg-medi-900/20 dark:text-medi-100"
                    : "border-border bg-background hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-medi-500 focus:ring-medi-400 cursor-pointer"
                  checked={isSelected}
                  onChange={() => toggleDay(day)}
                />
                <span className="text-sm font-medium">{day}</span>
              </label>
            );
          })}
        </div>
      </div>

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
