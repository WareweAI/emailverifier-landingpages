export function GuidesSkeleton() {
  return (
    <div className="site-container animate-pulse py-12 lg:py-16">
      <div className="h-4 w-24 rounded bg-line" />
      <div className="mt-4 h-10 w-2/3 max-w-md rounded-lg bg-line" />
      <div className="mt-4 h-4 w-full max-w-xl rounded bg-line" />
      <div className="mt-8 h-11 max-w-xl rounded-[var(--radius-control)] bg-line" />

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-40 rounded-2xl border border-line bg-surface"
          />
        ))}
      </div>

      <div className="mt-12 flex gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-11 w-28 rounded-lg bg-line" />
        ))}
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface md:flex">
        <div className="aspect-[16/10] bg-line md:w-1/2" />
        <div className="flex-1 space-y-3 p-6 md:p-8">
          <div className="h-3 w-24 rounded bg-line" />
          <div className="h-6 w-3/4 rounded bg-line" />
          <div className="h-4 w-full rounded bg-line" />
          <div className="h-4 w-5/6 rounded bg-line" />
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-line bg-surface"
          >
            <div className="aspect-[16/10] bg-line" />
            <div className="space-y-3 p-6">
              <div className="h-3 w-24 rounded bg-line" />
              <div className="h-5 w-full rounded bg-line" />
              <div className="h-4 w-5/6 rounded bg-line" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
