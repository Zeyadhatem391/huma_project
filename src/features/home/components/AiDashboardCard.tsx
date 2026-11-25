import { RobotIcon } from "@/assets/icons/IconRobot";
import { SendHorizontal } from "lucide-react";

export default function AiDashboardCard() {
  return (
    <div className="relative flex h-[414px] w-[310px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-[#EEF3FD] via-white to-white p-5 shadow-sm">
      <h2 className="text-[22px] font-medium text-[#14151A]">Ask AI</h2>

      <div className="flex flex-1 flex-col items-center justify-center gap-5 pb-4">
        <RobotIcon />
        <p className="text-[17px] text-[#14151A]">ask me anything about…</p>
      </div>

      <div className="relative h-[135px] rounded-2xl bg-[#F6F7F9] p-4">
        <textarea
          placeholder="ask me anything about…"
          className="h-full w-full resize-none bg-transparent text-[14px] text-[#14151A] placeholder:text-[#14151A] focus:outline-none"
        />
        <button
          type="button"
          className="absolute bottom-4 cursor-pointer right-4 transition-opacity hover:opacity-70"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
    </div>
  );
}
