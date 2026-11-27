import Link from "next/link";
import { Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Meeting } from "../api/getAllMeeting";

export default function MeetingCard({ meeting }: { meeting: Meeting }) {
  const participants = meeting.participants ?? [];
  const visible = participants.slice(0, 2);
  const extraCount = participants.length - visible.length;

  return (
    <article className="relative w-full rounded-2xl border border-gray-100 bg-white p-2.5 text-left transition hover:shadow-md">
      <Link
        href={`/dashboard/meetings/${meeting.id}`}
        aria-label={meeting.title}
        className="absolute inset-0 rounded-2xl"
      />

      <h3 className="truncate text-sm font-normal text-gray-900">
        {meeting.title}
      </h3>

      <p className="mt-1 text-xs text-gray-600">
        {meeting.start_time} - {meeting.end_time.slice(0, 5)}
      </p>

      <div className="mt-4 flex items-center justify-between gap-1">
        <div className="flex -space-x-2">
          {visible.map((user) => (
            <Avatar key={user.id} className="size-8 border-2 border-gray-300">
              <AvatarImage
                src={user.avatar_url || undefined}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-blue-100 text-xs font-semibold text-blue-700">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}

          {extraCount > 0 && (
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[11px] font-semibold text-slate-500">
              +{extraCount}
            </span>
          )}
        </div>

        {meeting.meeting_link && (
          <Button
            asChild
            variant="ghost"
            className="relative z-10 h-8 shrink-0 gap-1.5 rounded-lg px-1.5 text-xs font-normal text-gray-700"
          >
            <a
              href={meeting.meeting_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join
              <Plus className="size-4" />
            </a>
          </Button>
        )}
      </div>
    </article>
  );
}
