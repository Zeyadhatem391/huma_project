"use client";

import { MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ProjectTask } from "../api/getTasks";
import { KanbanTask } from "@/features/projects/api/getTasksProject";
import UpdateTask from "./UpdateTask";
import DeleteTask from "./DeleteTask";

export interface TaskFormValues {
  name: string;
  description: string;
  priority: string;
}
export type TaskCardProps = ProjectTask | KanbanTask;

interface Props {
  task: TaskCardProps;
  onEdit?: (id: TaskCardProps["id"], values: TaskFormValues) => Promise<void>;
  onDelete: (id: TaskCardProps["id"]) => Promise<void>;
}

export default function TaskActions({ task, onDelete }: Props) {
  return (
    <div
      className="shrink-0"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Task actions"
            onClick={(e) => e.preventDefault()}
            className="flex h-6 w-6 items-center justify-center rounded-md text-gray-500 outline-none transition hover:bg-gray-200 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-blue-500 data-[state=open]:bg-gray-200"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-36 rounded-xl border-gray-200 bg-white p-1"
        >
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <UpdateTask task={task} />
          </DropdownMenuItem>

          <DeleteTask task={task} onDelete={onDelete} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
