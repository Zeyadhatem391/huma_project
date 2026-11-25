import Link from "next/link";
import type { DashboardTasks as DashboardTasksType } from "../types/home";
import { formatDateTask } from "@/shared/utils/formatDate";

const priorityColors = {
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-orange-100 text-orange-700",
  critical: "bg-red-100 text-red-700",
};

export default function DashboardTasksCard({
  data,
}: {
  data: DashboardTasksType;
}) {
  const tasks = data.items.slice(2, 5);

  return (
    <div className="space-y-4 rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Tasks</h2>

        <Link
          href="/dashboard/tasks"
          className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          View All
        </Link>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => (
          <Link
            key={task.id}
            href={`/dashboard/tasks/${task.id}`}
            className="block rounded-xl border space-y-2 border-gray-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="truncate font-semibold text-gray-900">
                {task.name}
              </h3>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                  priorityColors[task.priority]
                }`}
              >
                {task.priority}
              </span>
            </div>

            <div className="font-medium text-gray-500 text-sm">
              Due: {formatDateTask(task.due_date)}
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full transition-all duration-500 bg-blue-600"
                style={{ width: `20%` }}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
