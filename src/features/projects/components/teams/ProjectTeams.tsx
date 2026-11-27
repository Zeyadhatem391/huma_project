"use client";

import useProjectTeam from "../../hook/useProjectTeam";
import ProjectTeamsSkeleton from "../../../../shared/skeleton/ProjectTeamsSkeleton";
import ProjectTeamCard from "./ProjectTeamCard";

export default function ProjectTeams({ id }: { id: number }) {
  const { data, isLoading, isError } = useProjectTeam(id);

  const teams = data?.data ?? [];

  if (isLoading) {
    return <ProjectTeamsSkeleton />;
  }

  if (isError) {
    return (
      <p className="text-sm text-red-500">Failed to load project teams.</p>
    );
  }

  if (!teams.length) {
    return (
      <div className="rounded-2xl border bg-white p-8 text-center text-gray-500">
        No teams found for this project.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 items-start">
      {teams.map((team) => (
        <ProjectTeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}
