import { Fragment } from "react";

export default function MeetingSkeleton() {
  return (
    <div className="animate-pulse space-y-6">
      {/* Meeting Header */}
      <div className="space-y-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 rounded bg-white" />
          <div className="size-3 rounded bg-white" />
          <div className="h-4 w-40 rounded bg-white" />
        </div>

        {/* Title */}
        <div className="h-9 w-2/3 max-w-md rounded-lg bg-white" />
      </div>

      {/* Meeting Info */}
      <div className="mt-3 flex flex-wrap items-center gap-4">
        {/* Project */}
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-white" />
          <div className="h-4 w-36 rounded bg-white" />
        </div>

        {/* Avatars */}
        <div className="flex -space-x-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="size-8 rounded-full border-2 border-white bg-white"
            />
          ))}
        </div>

        {/* Date */}
        <div className="h-4 w-32 rounded bg-white" />

        {/* Time */}
        <div className="h-4 w-28 rounded bg-white" />
      </div>

      {/* Meeting Video */}
      <div className="relative aspect-video overflow-hidden rounded-3xl bg-white lg:aspect-[751/323]">
        <div className="absolute left-1/2 top-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300" />
      </div>

      {/* Meeting Tabs */}
      <div className="space-y-5">
        {/* Tabs List */}
        <div className="flex gap-6 border-b border-gray-200 pb-2">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className={`h-8 w-20 rounded-t-lg ${
                index === 0 ? "bg-white" : "bg-gray-100"
              }`}
            />
          ))}
        </div>

        {/* Summary Content */}
        <div className="space-y-4">
          <div className="h-7 w-64 rounded bg-white" />

          <div className="h-6 w-32 rounded bg-white" />

          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="size-2 rounded-full bg-gray-300" />
                <div
                  className={`h-4 rounded bg-gray-100 ${
                    index % 2 === 0 ? "w-3/4" : "w-1/2"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}