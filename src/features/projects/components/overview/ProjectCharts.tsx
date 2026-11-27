import { ProjectOverview } from "../../api/getProjectOverview";
import GrowthChart from "./GrowthChart";

function ProjectCharts({ project }: { project: ProjectOverview }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <GrowthChart data={project.chart.data} year={project.chart.year} />
    </div>
  );
}

export default ProjectCharts;
