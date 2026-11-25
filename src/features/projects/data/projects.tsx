import { ColumnDef } from "@tanstack/react-table";
import { formatDate } from "@/shared/utils/formatDate";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { File } from "lucide-react";
import { Project } from "../types/project";

export type ProjectPriority = "low" | "medium" | "high";
export type ProjectStatus = "active" | "done";

const statusStyles: Record<Project["status"], string> = {
  active: "text-pink-700",
  done: "text-green-700",
};

const priorityStyles: Record<Project["priority"], string> = {
  low: "text-gray-700",
  medium: "text-orange-700",
  high: "text-red-700",
};

export const projectColumns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    header: "Project Name",
    cell: ({ row }) => (
      <p className="font-medium text-base capitalize">{row.original.name}</p>
    ),
  },
  {
    accessorKey: "date",
    header: "Start Date",
    cell: ({ row }) => (
      <span className="text-gray-600">
        {formatDate(row.original.start_date)}
      </span>
    ),
  },
  {
    accessorKey: "deadline",
    header: "Deadline",
    cell: ({ row }) => (
      <span className="text-gray-600">{formatDate(row.original.deadline)}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      return (
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${statusStyles[status]}`}
        >
          {status.replace("-", " ")}
        </span>
      );
    },
  },
  {
    accessorKey: "files",
    header: "Files",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <File size={22} className="text-yellow-400" />
        <span className="text-gray-600">{row.original.files_count} Files</span>
      </div>
    ),
  },

  {
    accessorKey: "teams",
    header: "Teams",
    cell: ({ row }) => {
      const teams = row.original.teams ?? [];

      return (
        <div className="flex items-center pl-2">
          {teams.slice(0, 3).map((team, index) => (
            <Avatar
              key={team.id}
              className={`h-9 w-9 border-2 border-white ${
                index !== 0 ? "-ml-3" : ""
              }`}
            >
              <AvatarFallback className="bg-gray-300/90 text-primary text-xs font-semibold">
                {team.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          ))}

          {teams.length > 3 && (
            <Avatar className="h-9 w-9 -ml-3 border-2 border-white">
              <AvatarFallback className="bg-gray-200 text-gray-700 text-xs font-semibold">
                +{teams.length - 3}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      );
    },
  },

  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.original.priority;

      return (
        <span
          className={`rounded-full px-3 py-1 text-sm font-medium capitalize ${priorityStyles[priority]}`}
        >
          {priority}
        </span>
      );
    },
  },
];

export const tabs = [
  { id: "overview", label: "Overview" },
  { id: "tasks", label: "Tasks" },
  { id: "teams", label: "Teams" },
  { id: "files", label: "Files" },
] as const;

export type Tab = (typeof tabs)[number]["id"];


