"use client";

import KanbanBoard from "@/shared/components/KanbanBoard/KanbanBoard";
import useGetProjectTask from "../../hook/useGetProjectTask";
import KanbanBoardSkeleton from "@/shared/skeleton/KanbanBoardSkeleton";

export default function ProjectTasks({ id }: { id: number }) {
  const { data, isLoading, isError } = useGetProjectTask(id);

  if (isLoading) {
    return <KanbanBoardSkeleton />;
  }

  if (isError || !data?.data) {
    return (
      <p className="py-10 text-center text-sm text-red-500">
        Failed to load project tasks.
      </p>
    );
  }

  return <KanbanBoard columns={data.data.columns} />;
}
