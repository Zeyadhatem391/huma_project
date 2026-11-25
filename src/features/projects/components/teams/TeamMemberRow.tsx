import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProjectTeamMember } from "../../api/getProjectTeams";

interface Props {
  member: ProjectTeamMember;
}

export default function TeamMemberRow({ member }: Props) {
  const progress = Math.min(100, Math.max(0, member.progress_percentage));

  const initials = member.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-3 border-b px-5 py-4 last:border-b-0">
      <Avatar className="h-10 w-10 shrink-0 border">
        <AvatarImage src={member.avatar_url ?? undefined} alt={member.name} />

        <AvatarFallback className="bg-blue-50 font-semibold text-blue-600">
          {initials}
        </AvatarFallback>
      </Avatar>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <p className="truncate text-sm font-medium text-gray-800">
          {member.name}
        </p>

        <div className="flex items-center gap-3">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <span className="shrink-0 text-sm tabular-nums ">
            {member.tasks_completed}/{member.tasks_total}
          </span>
        </div>
      </div>
    </div>
  );
}
