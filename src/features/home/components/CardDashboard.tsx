import { ClipboardList, MoveUpRight } from "lucide-react";
import StatisticsCard from "./StatisticsCard";
import { DashboardOverview } from "../types/home";

export default function CardDashboard({ data }: { data: DashboardOverview }) {
  const stats = data.tasks;

  const progress = Math.min(100, Math.max(0, stats.completion_rate ?? 0));

  const radius = 80;
  const circumference = Math.PI * radius;

  const angle = 180 + (progress / 100) * 180;
  const needleLength = 55;

  const needleX = 100 + Math.cos((angle * Math.PI) / 180) * needleLength;

  const needleY = 100 + Math.sin((angle * Math.PI) / 180) * needleLength;
  return (
    <div className="grid gap-3 grid-cols-4">
      <StatisticsCard
        title="Pending Tasks"
        value={data.tasks.pending}
        total={data.tasks.total}
        icon={ClipboardList}
        iconColor="text-orange-500 bg-orange-100"
        barColor="bg-orange-500"
        percentage={data.tasks.pending_percentage}
        description="+9% from last month"
      />

      <StatisticsCard
        title="In Progress"
        value={data.tasks.in_progress}
        total={data.tasks.total}
        icon={ClipboardList}
        iconColor="text-blue-500 bg-blue-100"
        barColor="bg-blue-500"
        percentage={data.tasks.in_progress_percentage}
        description="+12% from last month"
      />

      <StatisticsCard
        title="Complated"
        value={data.tasks.completed}
        total={data.tasks.total}
        icon={ClipboardList}
        iconColor="text-green-500 bg-green-100"
        barColor="bg-green-500"
        percentage={data.tasks.completed_percentage}
        description="+16% from last month"
      />

      <div className="rounded-2xl border bg-white px-5 py-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-3">
            <p className="text-lg font-semibold ">Completion Rate</p>

            <span className="block text-3xl font-bold tracking-tight text-gray-900">
              {data.tasks.completion_rate}%
            </span>
          </div>

          <div className="w-[110px] shrink-0">
            <svg viewBox="0 0 200 115" className="w-full overflow-visible">
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="10"
                strokeLinecap="round"
              />

              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="#27272A"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(progress / 100) * circumference} ${circumference}`}
                className="transition-all duration-700 ease-out"
              />

              <line
                x1="100"
                y1="100"
                x2={needleX}
                y2={needleY}
                stroke="#27272A"
                strokeWidth="7"
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />

              <circle
                cx="100"
                cy="100"
                r="7"
                fill="white"
                stroke="#27272A"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-2">
          <MoveUpRight size={12} className="text-green-600" />
          +22% from last month
        </div>
      </div>
    </div>
  );
}
