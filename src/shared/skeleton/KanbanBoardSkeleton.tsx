export default function KanbanBoardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-2xl bg-white">
          {/* Header */}
          <div className="flex items-center justify-between bg-white p-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 animate-pulse rounded-full bg-gray-200" />
              <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200" />
              <div className="h-3 w-6 animate-pulse rounded-md bg-gray-100" />
            </div>

            <div className="h-5 w-5 animate-pulse rounded-md bg-gray-200" />
          </div>

          {/* Tasks */}
          <div className="space-y-5 px-4 py-6">
            <div className="h-10 w-full animate-pulse rounded-full border-2 border-dashed border-gray-200 bg-white" />

            {Array.from({ length: 2 }).map((_, taskIndex) => (
              <div
                key={taskIndex}
                className="space-y-4 rounded-xl border border-gray-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="h-5 w-16 animate-pulse rounded-full bg-gray-100" />
                  <div className="h-5 w-5 animate-pulse rounded-md bg-gray-100" />
                </div>

                <div className="space-y-2">
                  <div className="h-4 w-3/4 animate-pulse rounded-md bg-gray-200" />
                  <div className="h-3 w-full animate-pulse rounded-md bg-gray-100" />
                  <div className="h-3 w-1/2 animate-pulse rounded-md bg-gray-100" />
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-3">
                  <div className="h-7 w-7 animate-pulse rounded-full bg-gray-200" />
                  <div className="h-3 w-20 animate-pulse rounded-md bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}