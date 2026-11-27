"use client";

import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import useGetAllMeeting from "../hook/useGetAllMeeting";
import MeetingCard from "./MeetingCard";
import MeetingCalendarSkeleton from "../../../shared/skeleton/MeetingCalendarSkeleton";
import { Meeting } from "../api/getAllMeeting";

function getDays() {
  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);

    return {
      key: date.toDateString(),
      label:
        index === 0
          ? "Today"
          : date.toLocaleDateString("en-US", { weekday: "short" }),
      date: date.getDate(),
      isToday: index === 0,
    };
  });
}

function getStartDate(meeting: Meeting) {
  return new Date(`${meeting.meeting_date.slice(0, 10)}T${meeting.start_time}`);
}

export default function MeetingsGrid() {
  const { data, isPending, isError, refetch } = useGetAllMeeting();

  if (isPending) {
    return <MeetingCalendarSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-200 py-16">
        <p className="text-sm text-red-600">Failed to load meetings</p>
        <Button variant="outline" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  const days = getDays();
  const dayKeys = new Set(days.map((day) => day.key));

  const slots = new Map<string, Meeting[]>();
  const hours = new Set([9, 10, 11, 12, 13]);

  [...(data.data.data ?? [])]
    .sort((a, b) => getStartDate(a).getTime() - getStartDate(b).getTime())
    .forEach((meeting) => {
      const start = getStartDate(meeting);
      const dayKey = start.toDateString();

      if (!dayKeys.has(dayKey)) return;

      const hour = start.getHours();
      const key = `${dayKey}-${hour}`;

      hours.add(hour);
      slots.set(key, [...(slots.get(key) ?? []), meeting]);
    });

  const sortedHours = [...hours].sort((a, b) => a - b);

  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-gray-200">
      <div className="grid min-w-[960px] grid-cols-6">
        <div className="flex h-10 items-center justify-center border-b border-gray-200 text-sm font-medium text-gray-900">
          Time
        </div>

        {days.map((day) => (
          <div
            key={day.key}
            className={`flex h-10 flex-col items-center justify-center border-l border-gray-200 text-sm font-medium leading-4 text-gray-900 ${
              day.isToday ? "bg-[#E5EFFF]" : "border-b"
            }`}
          >
            <span>{day.label}</span>
            <span>{day.date}</span>
          </div>
        ))}

        {sortedHours.map((hour) => (
          <Fragment key={hour}>
            <div className="flex min-h-[137px] items-center justify-center border-b border-gray-200 text-sm font-semibold text-gray-900">
              {hour}:00
            </div>

            {days.map((day) => {
              const meetings = slots.get(`${day.key}-${hour}`);

              return (
                <div
                  key={day.key}
                  className={`flex min-h-[137px] min-w-0 flex-col items-center justify-center gap-2 border-l border-gray-200 p-2 ${
                    day.isToday ? "bg-[#E5EFFF]" : "border-b"
                  }`}
                >
                  {meetings
                    ? meetings.map((meeting) => (
                        <MeetingCard key={meeting.id} meeting={meeting} />
                      ))
                    : !day.isToday && (
                        <div className="text-center text-sm font-medium text-gray-900">
                          <p>{day.label}</p>
                          <p>{day.date}</p>
                        </div>
                      )}
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
