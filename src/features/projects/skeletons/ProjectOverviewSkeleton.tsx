import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectOverviewSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-6">
        <div className="space-y-4 bg-white">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-4 w-40" />
          </div>

          <Skeleton className="h-9 w-64" />
        </div>

        <div className="w-[420px] rounded-2xl border bg-white p-5 shadow-sm space-y-4">
          <Skeleton className="h-5 w-20" />

          <Skeleton className="h-2 w-full rounded-full" />

          <div className="flex justify-between gap-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <div className="flex gap-6 border-b pb-3">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-20" />
        </div>

        <Skeleton className="h-48 w-full rounded-2xl" />
      </div>
    </div>
  );
}
