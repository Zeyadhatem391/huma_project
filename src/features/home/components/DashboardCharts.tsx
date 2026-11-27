import GrowthChart from "@/features/projects/components/overview/GrowthChart";
import { ProjectOverviewChart } from "../api/getAllDataDashboard";

function DashboardCharts({ project }: { project: ProjectOverviewChart }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      <GrowthChart data={project.data} year={project.year} />
    </div>
  );
}

export default DashboardCharts;
