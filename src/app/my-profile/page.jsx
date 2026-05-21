"use client";

import Image from "next/image";
import ProtectedPage from "@/components/ProtectedPage";
import { useSession } from "@/lib/auth-client";
import { CalendarDays, Mail, ShieldCheck, User } from "lucide-react";

export default function MyProfilePage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <ProtectedPage>
      <div className="container-x py-12">
        <section className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-medi-400 via-medi-500 to-medi-700 p-8 text-white sm:p-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="grid h-28 w-28 place-items-center overflow-hidden rounded-full bg-white ring-4 ring-white/70">
              {user?.image ? (
                <Image src={user.image} alt={user.name || "User"} width={112} height={112} className="h-full w-full object-cover" unoptimized />
              ) : (
                <span className="font-display text-5xl font-bold text-medi-700">
                  {(user?.name || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div>
              <span className="chip border border-white/30 bg-white/20">MediQueue Learner</span>
              <h1 className="mt-3 font-display text-4xl font-bold sm:text-5xl">{user?.name || "Student"}</h1>
              <p className="mt-2 flex items-center gap-2 text-white/90">
                <Mail className="h-4 w-4" /> {user?.email}
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <ProfileCard icon={User} label="Name" value={user?.name || "Not set"} />
          <ProfileCard icon={Mail} label="Email" value={user?.email || "Not set"} />
          <ProfileCard icon={ShieldCheck} label="Account" value={user?.emailVerified ? "Verified" : "Active"} />
        </div>

        <section className="card-medi mt-8 flex items-start gap-4 p-6">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-medi-100 text-medi-700 dark:bg-medi-900/30 dark:text-medi-300">
            <CalendarDays className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold">Manage your learning from one place</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Your private routes stay available after reloads, and every booking receives a digital session token.
            </p>
          </div>
        </section>
      </div>
    </ProtectedPage>
  );
}

function ProfileCard({ icon: Icon, label, value }) {
  return (
    <div className="card-medi p-6">
      <div className="flex items-center gap-2 text-medi-600 dark:text-medi-400">
        <Icon className="h-5 w-5" />
        <span className="font-bold">{label}</span>
      </div>
      <p className="mt-3 truncate font-semibold">{value}</p>
    </div>
  );
}
