import { Button } from "@/components/ui/button";
import FilterMeeting from "@/features/meetings/components/FilterMeeting";
import MeetingNetwork from "@/features/meetings/components/MeetingNetwork";
import MonthMeeting from "@/features/meetings/components/MonthMeeting";
import { Plus } from "lucide-react";

export default function page() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">Meetings</h1>
        <Button className="flex gap-1 bg-blue-700 rounded-2xl h-10 w-32 cursor-pointer text-white">
          <p>Add Meeting</p>
          <Plus />
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <MonthMeeting />
        <FilterMeeting />
      </div>


      {/* <MeetingNetwork /> */}
    </div>
  );
}
