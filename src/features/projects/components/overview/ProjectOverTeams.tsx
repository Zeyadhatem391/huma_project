import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProjectOverview } from "../../types/project";

export default function ProjectOverTeams({
  project,
}: {
  project: ProjectOverview;
}) {
  const teams = project.direct_members;

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
      <h2 className="font-semibold text-xl text-gray-900">Team Members</h2>

      <div className="space-y-2">
        {teams.map((team) => (
          <div key={team.id} className="flex gap-3 items-center">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarFallback>
                {team.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <p>{team.name} - ({team.job_title})</p>
          </div>
        ))}
      </div>
    </div>
  );
}
