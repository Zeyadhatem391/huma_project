import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MonthMeeting() {
  return (
    <div className="flex gap-4 items-center">
      <ChevronLeft size={20} className="cursor-pointer" />
      <p className="font-semibold">December 2025</p>
      <ChevronRight size={20} className="cursor-pointer" />
    </div>
  );
}
