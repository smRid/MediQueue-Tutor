import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center relative overflow-hidden">
      {/* Optional faint background gradient in the top right to match the image's subtle vibe */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-violet-500/5 blur-[100px]" />
      
      <h1 className="text-[10rem] sm:text-[12rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-600 to-pink-500">
        404
      </h1>
      <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground font-display">
        This page wandered off the curriculum
      </h2>
      <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-md mx-auto">
        The page you're looking for doesn't exist, or it may have been moved.
      </p>
      
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link 
          href="/" 
          className="rounded-full bg-gradient-to-r from-fuchsia-600 to-pink-500 px-8 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          Back to home
        </Link>
        <Link 
          href="/tutors" 
          className="rounded-full border border-gray-600 dark:border-gray-400 px-8 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Explore courses
        </Link>
      </div>
    </main>
  );
}
