"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useQueryState } from "nuqs";

import useGetTasks from "../hook/useGetTasks";
import ProjectTaskCard from "@/shared/components/KanbanBoard/ProjectTaskCard";
import AddTask from "./AddTask";
import KanbanBoardSkeleton from "@/shared/skeleton/KanbanBoardSkeleton";
import deleteTask from "../api/deleteTask";
import { statuses } from "@/shared/types/types";


export default function TaskStatus() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [search] = useQueryState("search", {
    defaultValue: "",
  });

  const [status] = useQueryState("status", {
    defaultValue: "all",
  });

  const [priority] = useQueryState("priority", {
    defaultValue: "all",
  });

  const { data, isLoading, isError } = useGetTasks({
    status,
    priority,
    search,
  });

  const tasks = data?.data.data ?? [];

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await deleteTask(id);

      toast.success("Task deleted successfully");

      await queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });

      router.refresh();
    } catch (error) {
      console.error("Delete task error:", error);
      toast.error("Failed to delete task");
    }
  };

  if (isLoading) {
    return <KanbanBoardSkeleton />;
  }

  if (isError) {
    return (
      <p className="py-10 text-center text-sm text-red-500">
        Failed to load tasks.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2 xl:grid-cols-4">
      {statuses.map((status) => {
        const filteredTasks = tasks.filter(
          (task) => task.status === status.title,
        );

        return (
          <div key={status.title} className="rounded-2xl bg-white">
            <div
              className={`flex items-center gap-2 rounded-t-2xl p-6 ${status.color}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
              <p className="text-sm font-semibold">{status.title}</p>
              <span className="text-xs opacity-70">
                ({filteredTasks.length})
              </span>
            </div>

            <div className="space-y-5 px-3 py-6">
              <AddTask>
                <Button className="h-10 w-full cursor-pointer rounded-full border-2 border-dashed border-blue-600 bg-white text-blue-600 hover:bg-blue-600 hover:text-white">
                  Add Task <Plus size={18} />
                </Button>
              </AddTask>

              {filteredTasks.length > 0 ? (
                filteredTasks.map((task) => (
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
