import { days, meetings } from "../data/meeting";

import MeetingDayColumn from "./MeetingDayColumn";

import { HOUR_HEIGHT, formatTime, timeSlots } from "../utils/meetingUtils";

export default function MeetingNetwork() {
  return (
    <div className="overflow-hidden rounded-2xl shadow">
      <div className="overflow-x-auto">
        <div className="min-w-[1200px]">
          {/* Days Header */}
          <div className="grid grid-cols-[85px_repeat(7,minmax(0,1fr))] border-b bg-gray-50">
            <div className="flex h-16 items-center justify-center border-r text-sm font-semibold text-gray-500">
              Time
            </div>

            {days.map((day) => (
              <div
                key={day}
                className="flex h-16 items-center justify-center border-r text-sm font-semibold text-gray-700 last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Body */}
          <div className="grid grid-cols-[85px_repeat(7,minmax(0,1fr))]">
            {/* Time Column */}
            <div className="border-r bg-gray-50/50">
              {timeSlots.map((hour) => (
                <div
                  key={hour}
                  className="flex justify-center border-b pt-2 text-xs font-medium text-gray-500"
                  style={{ height: HOUR_HEIGHT }}
                >
                  {formatTime(`${String(hour).padStart(2, "0")}:00`)}
                </div>
              ))}
            </div>

            {/* Days Columns */}
            {days.map((day, dayIndex) => (
              <MeetingDayColumn
                key={day}
                day={day}
                dayIndex={dayIndex}
                meetings={meetings}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
