import { ProjectTeam } from "../../api/getProjectTeams";
import TeamMemberRow from "./TeamMemberRow";

interface Props {
  team: ProjectTeam;
}

const headerColors = [
  "bg-green-100 text-green-800",
  "bg-pink-100 text-pink-800",
  "bg-gray-200 text-gray-800",
  "bg-red-100 text-red-800",
  "bg-amber-100 text-amber-800",
];

export default function ProjectTeamCard({ team }: Props) {
  const colorIndex = team.id % headerColors.length;
  const headerColor = headerColors[colorIndex];

  return (
    <div className="overflow-hidden rounded-2xl border bg-white shadow-sm ">
      <div
        className={`border-b px-5 py-6 transition-colors duration-300 ${headerColor}`}
      >
        <h2 className="text-xl font-semibold">{team.name}</h2>
      </div>

      <div>
        <div className="flex justify-between px-6 py-3 text-sm font-semibold text-gray-500">
          <span>Name</span>
          <span>Tasks</span>
        </div>

        <div>
          {team.members.map((member) => (
            <TeamMemberRow key={member.id} member={member} />
          ))}

          {team.members.length === 0 && (
            <p className="py-6 text-center text-sm text-gray-500">
              No members in this team.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
