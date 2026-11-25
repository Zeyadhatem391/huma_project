function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-gray-200 ${className}`} />
  );
}

export default function DashboardSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-5 rounded-2xl border p-5 bg-white">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-2 w-full" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
        <div className="rounded-2xl border p-5 lg:col-span-6 bg-white">
          <div className="mb-6 flex justify-between">
            <Skeleton className="h-6 w-36" />
            <Skeleton className="h-5 w-14" />
          </div>
          <Skeleton className="h-[260px] w-full sm:h-[300px]" />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-6">
          <div className="space-y-5 rounded-2xl border p-5 bg-white">
            <Skeleton className="h-6 w-32" />
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="space-y-3 rounded-xl border p-3 bg-white">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>

          <div className="space-y-5 rounded-2xl border p-5 bg-white">
            <Skeleton className="h-6 w-28" />
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3 bg-white">
                <Skeleton className="h-11 w-11 shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="space-y-5 rounded-2xl border p-5 bg-white">
            <Skeleton className="h-6 w-28" />

            {Array.from({ length: 3 }).map((_, itemIndex) => (
              <div key={itemIndex} className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
