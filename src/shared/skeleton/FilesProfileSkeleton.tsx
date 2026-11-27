export default function FilesProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex h-24 animate-pulse items-center gap-4 rounded-xl border border-gray-200 bg-white py-3 pl-5 pr-4"
        >
          <div className="h-9 w-8 shrink-0 rounded bg-gray-200" />

          <div className="min-w-0 flex-1 space-y-2">
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-100" />

            <div className="flex gap-2">
              <div className="h-3 w-12 rounded bg-gray-100" />
              <div className="h-3 w-16 rounded bg-gray-100" />
            </div>
          </div>

          <div className="h-9 w-9 shrink-0 rounded-lg bg-gray-100" />
        </div>
      ))}
    </div>
  );
}
