"use client";
import CardReport from "@/features/reports/components/CardReport";
import ProjectsProgress from "@/features/reports/components/ProjectsProgress";
import SubmitReportForm from "@/features/reports/components/SubmitReportForm";
import TaskProgress from "@/features/reports/components/TaskProgress";
import TeamProgress from "@/features/reports/components/TeamProgress";
import useProjectReport from "@/features/reports/hook/useProjectReport";
import useTaskReport from "@/features/reports/hook/useTaskReport";
import useTeamReport from "@/features/reports/hook/useTeamReport";
import ReportSkeleton from "@/shared/skeleton/ReportSkeleton";

export default function Page() {
  const { data: projectReport, isLoading: isProjectLoading } =
    useProjectReport();

  const { data: taskReport, isLoading: isTaskLoading } = useTaskReport();

  const { data: teamReport, isLoading: isTeamLoading } = useTeamReport();

  const project = projectReport?.data.summary;
  const task = taskReport?.data.summary;
  const team = teamReport?.data.summary;

  const isLoading = isProjectLoading || isTaskLoading || isTeamLoading;

  if (isLoading) return <ReportSkeleton />;

  if (!project || !task || !team) return <p>No dashboard data found.</p>;

  return (
    <div className="space-y-5">
      <CardReport project={project} task={task} team={team} />

      <div className="grid grid-cols-12 gap-3">
        <div className="lg:col-span-6">
          <TaskProgress />
        </div>

        <div className="lg:col-span-6">
          <ProjectsProgress />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="lg:col-span-6">
          <TeamProgress />
        </div>

        <div className="lg:col-span-6">
          <SubmitReportForm />
        </div>
      </div>
    </div>
  );
}
