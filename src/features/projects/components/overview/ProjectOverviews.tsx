import { ProjectOverview } from "../../types/project";
import ProjectCharts from "./ProjectCharts";
import ProjectProgress from "./ProjectProgress";
import ProjectOverTeams from "./ProjectOverTeams";
import ProjectOverDetails from "./ProjectOverDetails";

export default function ProjectOverviews({
  project,
}: {
  project: ProjectOverview;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-8 space-y-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-3">
          <h2 className="font-semibold text-xl text-gray-900">Description</h2>

          <p className="text-sm leading-7 text-gray-600">
            {project.description || "No description available."}
          </p>
        </div>

        <ProjectCharts project={project} />

        <ProjectOverDetails project={project} />
      </div>

      <div className="lg:col-span-4 space-y-6">
        <ProjectProgress project={project} />

        <ProjectOverTeams project={project} />
      </div>
    </div>
  );
}
