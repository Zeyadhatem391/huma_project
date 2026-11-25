import { Clock, Plus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatTime, getMeetingPosition } from "../utils/meetingUtils";
import { Meeting } from "../data/meeting";

interface Props {
  meeting: Meeting;
}

export default function CardMeeting({ meeting }: Props) {
  const position = getMeetingPosition(meeting.start, meeting.end);

  // Mock attendees
  const attendees = ["Ahmed", "Mohamed", "Sara"];

  return (
    <div
      className="absolute left-1 right-1 rounded-lg bg-white p-2  transition-all hover:z-10 hover:shadow-md"
      style={{
        top: position.top,
        height: position.height,
      }}
    >
      <h4 className="truncate text-xs font-bold">{meeting.title}</h4>

      <div className="mt-1 flex items-center gap-1 text-[10px] text-blue-700">
        <Clock size={11} />
        {formatTime(meeting.start)} - {formatTime(meeting.end)}
      </div>

      {position.height >= 65 && (
        <div className="mt-2 flex items-center justify-between gap-1">
          <div className="flex -space-x-2">
            {attendees.slice(0, 3).map((name) => (
              <Avatar key={name} className="h-6 w-6 border-2 border-blue-50">
                <AvatarFallback className="bg-blue-200 text-[9px] font-semibold text-blue-800">
                  {name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>

          <button className="flex items-center gap-1 rounded-md bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white transition-colors hover:bg-blue-700">
            <Plus size={12} />
            Join
          </button>
        </div>
      )}
    </div>
  );
}
