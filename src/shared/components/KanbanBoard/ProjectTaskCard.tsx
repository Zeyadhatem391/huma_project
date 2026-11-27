"use client";

import { CalendarDays, MessageSquareText } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { formatDateTask } from "@/shared/utils/formatDate";

import TaskActions, {
  TaskFormValues,
} from "@/features/tasks/components/TaskActions";
import { priorityStyles, Priority } from "@/shared/types/types";
import { ProjectTask } from "@/features/tasks/api/getTasks";
import { KanbanTask } from "@/features/projects/api/getTasksProject";

type TaskCardProps = ProjectTask | KanbanTask;

interface Props {
  task: TaskCardProps;
  onEdit?: (id: TaskCardProps["id"], values: TaskFormValues) => Promise<void>;
  onDelete: (id: TaskCardProps["id"]) => Promise<void>;
}

export default function ProjectTaskCard({ task, onEdit, onDelete }: Props) {
  return (
    <div className="w-full">
      <div
        className="
          w-full cursor-pointer rounded-xl bg-gray-100/50 border border-gray-200 py-4 px-3
          shadow-sm transition-all duration-200
          hover:-translate-y-0.5 hover:shadow-md
        "
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 min-w-0 flex-1 break-words text-sm font-semibold leading-6 text-gray-900">
            {task.name}
          </h3>

          <div className="flex shrink-0 items-center gap-1">
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${
                priorityStyles[task.priority as Priority]
              }`}
            >
              {task.priority}
            </span>

            <TaskActions task={task} onDelete={onDelete} />
          </div>
        </div>

        <p className="mb-4 line-clamp-2 text-xs leading-5 text-gray-500 sm:text-sm">
          {task.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            {task.assignee && (
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={task.assignee.avatar_url || ""} />
                <AvatarFallback className="bg-blue-100 text-xs font-semibold text-blue-700">
                  {task.assignee.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="font-medium text-gray-700">
                {task.attachments_count}
              </span>

              <MessageSquareText className="h-4 w-4 shrink-0 text-gray-400" />
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="font-medium text-gray-700">
                {formatDateTask(task.due_date || "")}
              </span>

              <CalendarDays className="h-4 w-4 shrink-0 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
