
export default function ReportSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="h-4 w-28 rounded bg-gray-200" />
              <div className="h-10 w-10 rounded-xl bg-gray-100" />
            </div>

            <div className="mb-3 h-8 w-24 rounded bg-gray-200" />
            <div className="h-3 w-36 rounded bg-gray-100" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <div className="mb-6 flex items-center justify-between">
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="h-8 w-20 rounded-lg bg-gray-100" />
            </div>

            <div className="flex h-[260px] items-end gap-4 px-3">
              {Array.from({ length: 8 }).map((_, barIndex) => (
                <div
                  key={barIndex}
                  className="flex-1 rounded-t-md bg-gray-100"
                  style={{
                    height: `${30 + ((barIndex * 17) % 60)}%`,
                  }}
                />
              ))}
            </div>

            <div className="mt-4 flex justify-between">
              {Array.from({ length: 6 }).map((_, labelIndex) => (
                <div
                  key={labelIndex}
                  className="h-3 w-8 rounded bg-gray-100"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
