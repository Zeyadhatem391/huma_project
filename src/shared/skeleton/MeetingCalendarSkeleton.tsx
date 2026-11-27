import { Fragment } from "react";

export default function MeetingCalendarSkeleton() {
  const days = Array.from({ length: 5 });
  const hours = Array.from({ length: 7 }, (_, i) => i + 9);

  return (
    <div className="w-full animate-pulse overflow-x-auto rounded-2xl border border-gray-200 bg-white">
      <div className="grid min-w-[960px] grid-cols-6">
        {/* Header */}
        <div className="flex h-10 items-center justify-center border-b border-gray-200">
          <div className="h-4 w-10 rounded bg-gray-200" />
        </div>

        {days.map((_, index) => (
          <div
            key={index}
            className="flex h-10 flex-col items-center justify-center gap-1 border-b border-l border-gray-200"
          >
            <div className="h-3 w-16 rounded bg-gray-200" />
            <div className="h-3 w-6 rounded bg-gray-100" />
          </div>
        ))}

        {/* Calendar Rows */}
        {hours.map((hour) => (
          <Fragment key={hour}>
            {/* Time */}
            <div className="flex min-h-[137px] items-center justify-center border-b border-gray-200">
              <div className="h-4 w-10 rounded bg-gray-200" />
            </div>

            {/* Day Slots */}
            {days.map((_, index) => (
              <div
                key={index}
                className={`flex min-h-[137px] flex-col items-center justify-center gap-3 border-l border-b border-gray-200 p-3 ${
                  index === 1 ? "bg-[#E5EFFF]/50" : ""
                }`}
              >
                {index % 2 === 0 ? (
                  <>
                    <div className="w-full space-y-2 rounded-xl border border-gray-100 p-3">
                      <div className="h-3 w-3/4 rounded bg-gray-200" />
                      <div className="h-3 w-1/2 rounded bg-gray-100" />
                      <div className="h-2 w-2/3 rounded bg-gray-100" />
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <div className="h-3 w-16 rounded bg-gray-100" />
                    <div className="mx-auto h-3 w-8 rounded bg-gray-100" />
                  </div>
                )}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
}