export default function ProfileSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <div className="size-20 shrink-0 rounded-full bg-white" />

          <div className="space-y-3">
            <div className="h-7 w-40 rounded-lg bg-white" />

            <div className="flex flex-wrap gap-3">
              <div className="h-5 w-32 rounded bg-white" />
              <div className="h-5 w-36 rounded bg-white" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-6 rounded-2xl bg-white p-5 shadow"
            >
              <div className="flex flex-col gap-4">
                <div className="h-4 w-28 rounded bg-white" />
                <div className="h-7 w-12 rounded bg-white" />
              </div>

              <div className="size-14 shrink-0 rounded-full bg-white" />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex gap-4 border-b pb-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-9 w-24 rounded-lg bg-white" />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-24 rounded-xl border border-gray-100 bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
