export function BlogSkeleton() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse px-4 py-16 sm:px-6 lg:px-8">
      <div className="h-10 w-2/3 max-w-md rounded-lg bg-line" />
      <div className="mt-4 h-4 w-full max-w-xl rounded bg-line" />
      <div className="mt-4 h-4 w-3/4 max-w-lg rounded bg-line" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
