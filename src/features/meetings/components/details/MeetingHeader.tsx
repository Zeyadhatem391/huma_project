import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  Clock,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { formatDate } from "@/shared/utils/formatDate";
import { Meeting } from "../../api/getAllMeeting";



export default function MeetingHeader({ meeting }: { meeting: Meeting }) {
  const avatars = meeting.participants ?? [];
  return (
    <div>
      <div className="space-y-4">
        <div className="flex gap-1.5 items-center">
          <Link
            href="/dashboard/meetings"
            className="text-gray-600 cursor-pointer hover:text-base"
          >
            Meetings
          </Link>
          <ChevronRight size={14} />
          <p className="font-semibold">{meeting.title}</p>
        </div>
        <h1 className="text-3xl font-bold">{meeting.title}</h1>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-gray-700">
        <div className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-purple-100 text-purple-700">
            <BriefcaseBusiness className="size-4" />
          </span>
          <span className="text-sm text-gray-900">{meeting.project.name}</span>
        </div>

        <div className="flex -space-x-2">
          {avatars.map((avatar) => (
            <Avatar key={avatar.id} className="size-8 border-2 border-gray-300">
              <AvatarImage
                src={avatar.avatar_url || "https://i.pravatar.cc/64?img=11"}
                alt={avatar.name}
              />
              <AvatarFallback>alt={avatar.name.slice(1)}</AvatarFallback>
            </Avatar>
          ))}
        </div>

        <span className="flex items-center gap-2">
          <CalendarDays className="size-4" />
          {formatDate(meeting.meeting_date)}
        </span>

        <span className="flex items-center gap-2">
          <Clock className="size-4" />
          {meeting.start_time.slice(0, 5)} - {meeting.end_time.slice(0, 5)}
        </span>
      </div>
    </div>
  );
}
