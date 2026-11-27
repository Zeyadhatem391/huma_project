import { scrollbarClass } from "@/shared/utils/scrollbar";
import { DashboardTeams } from "../api/getAllDataDashboard";

export default function DashboardTeamsCard({ data }: { data: DashboardTeams }) {
  return (
    <div className="group space-y-4 rounded-2xl border bg-white py-5 pl-5 shadow-sm">
      <div className="space-y-3 pr-5">
        <h2 className="text-xl font-bold text-gray-900">Teams</h2>

        <div className="flex items-center justify-between px-1 text-sm font-semibold text-gray-800">
          <span>Name</span>
          <span>Tasks</span>
        </div>
      </div>

      <div className={`mr-1.5 h-[264px] space-y-4 pr-2 ${scrollbarClass}`}>
        {data.items.map((team) => {
          const percentage =
            team.members_count > 0
              ? Math.min(
                  100,
                  Math.round((team.projects_count / team.members_count) * 100),
                )
              : 0;

          return (
            <div key={team.id} className="space-y-1">
              <h3 className="truncate text-sm font-semibold text-gray-900">
                {team.name}
              </h3>

              <div className="flex items-center gap-3">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-600 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="shrink-0 text-xs font-medium text-gray-600">
                  {team.projects_count}/{team.members_count}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
