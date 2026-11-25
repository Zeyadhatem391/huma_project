export default function ProjectTeamsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border bg-white shadow-sm animate-pulse"
        >
          {/* Header */}
          <div className="border-b bg-gray-100 px-5 py-6 space-y-2">
            <div className="h-5 w-32 rounded bg-gray-300" />
            <div className="h-3 w-20 rounded bg-gray-200" />
          </div>

          {/* Members Header */}
          <div className="flex justify-between px-5 pt-4">
            <div className="h-3 w-12 rounded bg-gray-200" />
            <div className="h-3 w-12 rounded bg-gray-200" />
          </div>

          {/* Members */}
          <div className="space-y-5 p-5">
            {Array.from({ length: 3 }).map((_, memberIndex) => (
              <div key={memberIndex} className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-full bg-gray-200" />

                <div className="min-w-0 flex-1 space-y-2">
                  <div className="flex justify-between gap-3">
                    <div className="h-3 w-24 rounded bg-gray-200" />
                    <div className="h-3 w-8 rounded bg-gray-200" />
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="h-2 flex-1 rounded-full bg-gray-200" />
                    <div className="h-3 w-8 rounded bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}