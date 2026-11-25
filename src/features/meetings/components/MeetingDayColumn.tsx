import CardMeeting from "./CardMeeting";

import { HOUR_HEIGHT, timeSlots } from "../utils/meetingUtils";
import { Meeting } from "../data/meeting";

interface Props {
  day: string;
  dayIndex: number;
  meetings: Meeting[];
}

export default function MeetingDayColumn({ dayIndex, meetings }: Props) {
  const dayMeetings = meetings.filter((meeting) => meeting.day === dayIndex);

  return (
    <div
      className="relative border-r last:border-r-0 border-gray-200/50"
      style={{
        height: timeSlots.length * HOUR_HEIGHT,
      }}
    >
      {timeSlots.map((hour) => (
        <div
          key={hour}
          className=""
          style={{ height: HOUR_HEIGHT }}
        />
      ))}

      {dayMeetings.map((meeting) => (
        <CardMeeting key={meeting.id} meeting={meeting} />
      ))}
    </div>
  );
}
