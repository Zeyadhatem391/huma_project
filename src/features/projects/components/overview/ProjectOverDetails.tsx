import { formatDateTask } from "@/shared/utils/formatDate";
import { ProjectOverview } from "../../types/project";
import { CalendarDays, Flag, ListTodo, TimerOff } from "lucide-react";

export default function ProjectOverDetails({
  project,
}: {
  project: ProjectOverview;
}) {
  const details = [
    {
      label: "Start Date",
      value: formatDateTask(project.due_date_indicator.start_date),
      icon: CalendarDays,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Deadline",
      value: formatDateTask(project.due_date_indicator.deadline),
      icon: TimerOff,
      iconBg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      label: "Priority",
      value: project.priority,
      icon: Flag,
      iconBg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      label: "Total Tasks",
      value: project.tasks_statistics.total,
      icon: ListTodo,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
  ];
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-5">
      <h2 className="font-semibold text-xl text-gray-900">Project Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {details.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="flex items-center gap-3 min-w-0">
              <div
                className={`shrink-0 rounded-xl p-3 ${item.iconBg} ${item.iconColor}`}
              >
                <Icon size={21} />
              </div>

              <div className="min-w-0 space-y-1">
                <p className="text-sm text-gray-500">{item.label}</p>

                <span className="block font-semibold text-gray-800 text-sm truncate">
                  {item.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
