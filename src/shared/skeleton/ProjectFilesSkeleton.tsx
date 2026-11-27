export function ProjectFilesSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white py-3 pl-5 pr-4"
        >
          <div className="flex min-w-0 items-center gap-4">
            <div className="h-9 w-8 shrink-0 animate-pulse rounded-md bg-white" />

            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-white" />

              <div className="h-3 w-24 animate-pulse rounded bg-white" />

              <div className="flex items-center gap-2">
                <div className="h-3 w-12 animate-pulse rounded bg-white" />
                <div className="h-3 w-3 animate-pulse rounded-full bg-white" />
                <div className="h-3 w-16 animate-pulse rounded bg-white" />
              </div>
            </div>
          </div>

          <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-white" />
        </div>
      ))}
    </div>
  );
}