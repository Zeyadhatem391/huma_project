import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectTableSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Table Header */}
      <div className="flex items-center gap-4 border-b border-gray-200 bg-gray-50 px-5 py-4">
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className="h-4 flex-1 bg-gray-200" />
        ))}
      </div>

      {/* Table Rows */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border-b border-gray-100 px-5 py-5 last:border-0"
        >
          <Skeleton className="h-4 w-8 shrink-0 bg-gray-200" />

          <div className="flex flex-1 items-center gap-3">
            <Skeleton className="h-9 w-9 shrink-0 rounded-lg bg-gray-200" />
            <Skeleton className="h-4 w-28 bg-gray-200" />
          </div>

          <Skeleton className="h-4 flex-1 bg-gray-200" />

          <Skeleton className="h-6 w-20 rounded-full bg-gray-200" />

          <Skeleton className="h-4 flex-1 bg-gray-200" />

          <div className="flex flex-1 items-center -space-x-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-8 w-8 rounded-full border-2 border-white bg-gray-200"
              />
            ))}
          </div>

          <Skeleton className="h-8 w-8 rounded-md bg-gray-200" />
        </div>
      ))}
    </div>
  );
}
