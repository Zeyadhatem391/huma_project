"use client";

import { Button } from "@/components/ui/button";
import {
  KanbanBoardResponse,
  KanbanColumns,
} from "@/features/projects/api/getTasksProject";
import AddTask from "@/features/tasks/components/AddTask";
import ProjectTaskCard from "@/shared/components/KanbanBoard/ProjectTaskCard";
import { statuses } from "@/shared/types/types";
import { EllipsisVertical, Plus } from "lucide-react";



interface Props {
  columns: KanbanColumns;
}
const handleDelete = async (id: number): Promise<void> => {
  console.log("delete task");
};

export default function KanbanBoard({ columns }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 items-start">
      {statuses.map((status) => {
        const column = columns[status.title];
        const tasks = column?.tasks ?? [];

        return (
          <div key={status.title} className="rounded-2xl bg-white">
            <div
              className={`flex items-center justify-between rounded-t-2xl p-6 ${status.color}`}
            >
              <div className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                <p className="text-sm font-semibold">{status.title}</p>
                <span className="text-xs opacity-70">
                  ({column?.count ?? 0})
                </span>
              </div>

              <EllipsisVertical size={20} />
            </div>

            <div className="space-y-5 px-4 py-6">
              <AddTask>
                <Button className="h-10 w-full cursor-pointer rounded-full border-2 border-dashed border-blue-600 bg-white text-blue-600 hover:bg-blue-600 hover:text-white">
                  Add Task <Plus size={18} />
                </Button>
              </AddTask>

              {tasks.length > 0 ? (
                tasks.map((task) => (
                  <ProjectTaskCard
                    key={task.id}
                    task={task}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <p className="py-8 text-center text-sm text-gray-400">
                  No tasks in this column
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
