export default function HomeLoading() {
  return (
    <div className="container-x flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="loader-orbit" />
        <p className="text-sm font-semibold text-violet-600 dark:text-violet-300">
          Loading...
        </p>
      </div>
    </div>
  );
}
