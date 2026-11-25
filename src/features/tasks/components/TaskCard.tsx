"use client";

import { CalendarDays, MessageSquareText } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { formatDateTask } from "@/shared/utils/formatDate";
import { Task, TaskStatus, priorityStyles } from "../data/tasks";

interface Props {
  task: Task;
}

const progressByStatus: Record<TaskStatus, number> = {
  "To-do": 0,
  "In Progress": 50,
  "In Review": 75,
  "Completed Tasks": 100,
};

export default function TaskCard({ task }: Props) {
  const progress = progressByStatus[task.status];

  return (
    <Link href={`/dashboard/tasks/${task.id}`} className="block w-full">
      <div
        className="
          w-full cursor-pointer rounded-xl bg-gray-100 p-4
          shadow-sm transition-all duration-200
          hover:-translate-y-0.5 hover:shadow-md
        "
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="min-w-0 flex-1 line-clamp-2 text-sm font-semibold leading-5 text-gray-900">
            {task.title}
          </h3>

          <span
            className={`
              shrink-0 rounded-full px-2.5 py-1
              text-[11px] font-semibold capitalize
              ${priorityStyles[task.priority]}
            `}
          >
            {task.priority}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-xs leading-5 text-gray-500 sm:text-sm">
          {task.description}
        </p>

        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700">
              Progress
            </span>

            <span className="text-xs font-semibold text-blue-600">
              {progress}%
            </span>
          </div>

          <div
            className="h-2 w-full overflow-hidden rounded-full bg-gray-200"
            role="progressbar"
          >
            <div
              className="h-full rounded-full bg-blue-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3">
          <div className="flex items-center">
            {task.teams.slice(0, 3).map((member, index) => (
              <Avatar
                key={member}
                className={`h-8 w-8 border-2 border-white ${
                  index !== 0 ? "-ml-2.5" : ""
                }`}
              >
                <AvatarFallback className="bg-blue-100 text-xs font-semibold text-blue-700">
                  {member.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}

            {task.teams.length > 3 && (
              <Avatar className="-ml-2.5 h-8 w-8 border-2 border-white">
                <AvatarFallback className="bg-gray-200 text-[10px] font-semibold text-gray-700">
                  +{task.teams.length - 3}
                </AvatarFallback>
              </Avatar>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="font-medium text-gray-700">{task.files}</span>

              <MessageSquareText className="h-4 w-4 shrink-0 text-gray-400" />
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="font-medium text-gray-700">
                {formatDateTask(task.startDate)}
              </span>

              <CalendarDays className="h-4 w-4 shrink-0 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
