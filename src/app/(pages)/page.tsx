"use client";

import ActiveProjectsCard from "@/features/home/components/ActiveProjectsCard";
import AiDashboardCard from "@/features/home/components/AiDashboardCard";
import CardDashboard from "@/features/home/components/CardDashboard";
import DashboardCharts from "@/features/home/components/DashboardCharts";
import DashboardTasksCard from "@/features/home/components/DashboardTasksCard";
import DashboardTeamsCard from "@/features/home/components/DashboardTeamsCard";
import RecentFilesCard from "@/features/home/components/RecentFilesCard";
import UpcomingMeetingCard from "@/features/home/components/UpcomingMeetingCard";
import useDashboard from "@/features/home/hooks/useDashboard";
import DashboardSkeleton from "@/features/home/skeletons/DashboardSkeleton";

export default function Home() {
  const { data, isLoading, isError, error } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;

  if (isError) return <p>{error.message}</p>;

  if (!data) return <p>No dashboard data found.</p>;

  const {
    overview,
    tasks,
    teams,
    active_projects,
    recent_files,
    project_overview,
    upcoming_meetings,
  } = data.data;

  return (
    <div className="space-y-5">
      <CardDashboard data={overview} />

      <div className="grid grid-cols-12 gap-3">
        <div className="lg:col-span-6">
          <DashboardCharts project={project_overview} />
        </div>

        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <ActiveProjectsCard data={active_projects} />
          <RecentFilesCard data={recent_files} />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <DashboardTasksCard data={tasks} />

        <DashboardTeamsCard data={teams} />

        <UpcomingMeetingCard data={upcoming_meetings} />

        <AiDashboardCard />
      </div>
    </div>
  );
}
