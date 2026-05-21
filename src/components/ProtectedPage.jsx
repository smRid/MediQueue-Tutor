"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function ProtectedPage({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isPending, pathname, router, session?.user]);

  if (isPending || !session?.user) {
    return (
      <div className="container-x flex min-h-[50vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="loader-orbit" />
          <p className="text-sm font-semibold text-violet-600 dark:text-violet-300">
            Checking your session...
          </p>
        </div>
      </div>
    );
  }

  return children;
}
