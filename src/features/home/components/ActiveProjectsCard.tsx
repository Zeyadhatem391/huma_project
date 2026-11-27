import { PanelsTopLeft } from "lucide-react";
import Link from "next/link";
import { scrollbarClass } from "@/shared/utils/scrollbar";
import { DashboardActiveProject } from "../api/getAllDataDashboard";

const projectColors = [
  {
    icon: "bg-green-100 text-green-600",
    progress: "bg-green-500",
  },
  {
    icon: "bg-purple-100 text-purple-600",
    progress: "bg-purple-500",
  },
];

export default function ActiveProjectsCard({
  data,
}: {
  data: DashboardActiveProject;
}) {
  return (
    <div className="group space-y-4 rounded-2xl border bg-white py-5 pl-5 shadow-sm">
      <div className="flex items-center justify-between pr-5">
        <h2 className="text-xl font-bold text-gray-900">Active Projects</h2>

        <Link
          href="/dashboard/projects"
          className="text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          View All
        </Link>
      </div>

      <div className={`mr-1.5 h-[300px] space-y-2 pr-2 ${scrollbarClass}`}>
        {data.items.map((project, index) => {
          const colors = projectColors[index % projectColors.length];

          const progress = Math.min(100, Math.max(0, project.progress));

          return (
            <Link
              key={project.id}
              href={`dashboard/projects/${project.id}`}
              className="block space-y-3 rounded-xl border border-gray-200 p-3 transition-colors hover:border-gray-300"
            >
              <div className="flex items-center gap-3">
                <div className={`rounded-full p-2.5 ${colors.icon}`}>
                  <PanelsTopLeft size={20} />
                </div>

                <h3 className="font-semibold text-gray-900">{project.name}</h3>
              </div>

              <div className="space-y-2">
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${colors.progress}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <span className="text-xs font-medium text-gray-600">
                  Tasks: {project.tasks_completed ?? 0}/
                  {project.tasks_total ?? 0}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
