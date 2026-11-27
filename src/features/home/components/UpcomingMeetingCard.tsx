import Link from "next/link";
import { formatDateTask, formatMeetingTime } from "@/shared/utils/formatDate";
import { scrollbarClass } from "@/shared/utils/scrollbar";
import { CalendarDays } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardUpcomingMeetings } from "../api/getAllDataDashboard";

export default function UpcomingMeetingCard({
  data,
}: {
  data: DashboardUpcomingMeetings;
}) {
  return (
    <div className="group space-y-4 rounded-2xl border bg-white py-5 pl-5 shadow-sm">
      <div className="flex items-center justify-between pr-5">
        <h2 className="text-xl font-bold text-gray-900">Upcoming Meetings</h2>

        <Link
          href="/dashboard/meetings"
          className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          View All
        </Link>
      </div>

      <div className={`mr-1.5 h-[306px] space-y-3 pr-2 ${scrollbarClass}`}>
        {data.items.map((meeting) => (
          <Link
            key={meeting.id}
            href={`/dashboard/meetings/${meeting.id}`}
            className="block space-y-3 rounded-xl border border-gray-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="truncate font-semibold text-gray-900">
                {meeting.title}
              </h3>

              <div className="flex shrink-0 items-center gap-1.5 text-xs text-gray-500">
                <CalendarDays size={15} />
                {formatDateTask(meeting.date)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {meeting.participants.slice(0, 5).map((participant) => (
                  <Avatar
                    key={participant.id}
                    className="h-8 w-8 border-2 border-white"
                  >
                    <AvatarImage
                      src={participant.avatar_url ?? undefined}
                      alt={participant.name}
                    />
                    <AvatarFallback className="bg-blue-100 text-xs font-semibold text-blue-600">
                      {participant.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <span className="text-xs">
                {formatMeetingTime(meeting.start_time)} -{" "}
                {formatMeetingTime(meeting.end_time)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
