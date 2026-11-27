"use client";

import { ProjectOverview } from "../../api/getProjectOverview";


interface ProjectProgressProps {
  project: ProjectOverview;
}

export default function ProjectProgress({ project }: ProjectProgressProps) {
  const stats = project.tasks_statistics;

  const progress = Math.min(100, Math.max(0, stats.completed_percentage ?? 0));

  const total = stats.total;
  const radius = 80;
  const circumference = Math.PI * radius;

  const angle = 180 + (progress / 100) * 180;
  const needleLength = 55;

  const needleX = 100 + Math.cos((angle * Math.PI) / 180) * needleLength;

  const needleY = 100 + Math.sin((angle * Math.PI) / 180) * needleLength;

  const taskItems = [
    {
      label: "Pending tasks",
      value: stats.pending,
      color: "bg-gray-300",
    },
    {
      label: "In progress tasks",
      value: stats.in_progress,
      color: "bg-blue-600",
    },
    {
      label: "Completed tasks",
      value: stats.completed,
      color: "bg-green-600",
    },
  ];

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-5">
      <h2 className="font-semibold text-xl text-gray-900">Project Progress</h2>

      <div className="flex flex-col items-center">
        <div className="w-full max-w-[220px]">
          <svg viewBox="0 0 200 115" className="w-full overflow-visible">
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="9"
              strokeLinecap="round"
            />

            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#27272A"
              strokeWidth="9"
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
              strokeWidth="8"
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

        <p className="text-lg font-semibold text-gray-900 -mt-1">
          {progress.toFixed(0)}%
        </p>

        <p className="text-sm text-gray-500">Project Completed</p>
      </div>

      <div className="grid grid-cols-3 gap-2 pt-1">
        {taskItems.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1 min-w-0"
          >
            <p className="text-base font-semibold text-gray-900">
              {item.value}
              <span className="text-gray-400 font-normal">/{total}</span>
            </p>

            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-2 shrink-0 rounded-full ${item.color}`} />

              <p className="text-sm text-gray-500 whitespace-nowrap">
                {item.label}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
