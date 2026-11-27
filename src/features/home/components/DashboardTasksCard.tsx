import Link from "next/link";
import { formatDateTask } from "@/shared/utils/formatDate";
import { scrollbarClass } from "@/shared/utils/scrollbar";
import { DashboardTasksType } from "../api/getAllDataDashboard";

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
  return (
    <div className="group space-y-4 rounded-2xl border bg-white pt-5 pb-2 pl-5 shadow-sm">
      <div className="flex items-center justify-between pr-5">
        <h2 className="text-xl font-bold text-gray-900">Tasks</h2>

        <Link
          href="/dashboard/tasks"
          className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          View All
        </Link>
      </div>

      <div className={`mr-1.5 h-[300px] space-y-2 pr-2 ${scrollbarClass}`}>
        {data.items.map((task) => (
          <div
            key={task.id}
            className="block space-y-2 rounded-xl border border-gray-200 p-3 transition hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <h3 className="truncate font-semibold text-gray-900">
                {task.name}
              </h3>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold capitalize ${
                  priorityColors[
                    task.priority as keyof typeof priorityColors
                  ] ?? "bg-gray-100 text-gray-700"
                }`}
              >
                {task.priority}
              </span>
            </div>

            <div className="text-sm font-medium text-gray-500">
              Due: {formatDateTask(task.due_date)}
            </div>

            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500"
                style={{ width: `20%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
