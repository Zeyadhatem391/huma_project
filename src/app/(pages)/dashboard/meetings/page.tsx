import AddMeeting from "@/features/meetings/components/AddMeeting";
import FilterMeeting from "@/features/meetings/components/FilterMeeting";
import MeetingsGrid from "@/features/meetings/components/MeetingsGrid";
import MonthMeeting from "@/features/meetings/components/MonthMeeting";

export default function page() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Meetings</h1>
        <AddMeeting />
      </div>

      <div className="flex justify-between items-center">
        <MonthMeeting />
        <FilterMeeting />
      </div>

      <MeetingsGrid />
    </div>
  );
}
