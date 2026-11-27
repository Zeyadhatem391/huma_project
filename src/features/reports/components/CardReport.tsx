import { ProjectReportSummary } from "../api/getProjectReport";
import { TaskReportSummary } from "../api/getTaskReport";
import { TeamReportSummary } from "../api/getTeamReport";

interface Props {
  project: ProjectReportSummary;
  task: TaskReportSummary;
  team: TeamReportSummary;
  description?: string;
}

export default function CardReport({
  project,
  task,
  team,
  description = "From last month",
}: Props) {
  return (
    <div className="grid gap-4 grid-cols-3">
      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md ">
        <h2 className="text-2xl font-bold text-gray-800">
          Task Completion Rate
        </h2>

        <div className="mt-4">
          <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {task.completion_rate} %
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1 text-sm">
          <span className="font-semibold text-green-600 text-xs">+3%</span>

          <p className="text-gray-500">{description}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md ">
        <h2 className="text-2xl font-bold text-gray-800">
          Projects Completion Rate
        </h2>

        <div className="mt-4">
          <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {project.average_completion_rate} %
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1 text-sm">
          <span className="font-semibold text-green-600 text-xs">+6%</span>

          <p className="text-gray-500">{description}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-sm transition-shadow hover:shadow-md ">
        <h2 className="text-2xl font-bold text-gray-800">
          Teams Activity Rate
        </h2>

        <div className="mt-4">
          <p className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {team.total_members} %
          </p>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-1 text-sm">
          <span className="font-semibold text-red-600 text-xs">-4%</span>

          <p className="text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
