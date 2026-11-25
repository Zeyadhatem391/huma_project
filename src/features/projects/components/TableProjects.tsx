"use client";

import DataTable from "@/shared/components/data-table/DataTable";
import { projectColumns } from "../data/projects";
import { Project } from "../types/project";
import ProjectTableSkeleton from "../skeletons/ProjectTableSkeleton";

interface TableProjectsProps {
  project: Project[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export default function TableProjects({
  project,
  isLoading,
  isError,
  error,
}: TableProjectsProps) {
  if (isLoading) {
    return <ProjectTableSkeleton />;
  }

  if (isError) {
    return (
      <div className="py-20 text-center text-destructive">
        {error?.message || "Failed to load projects"}
      </div>
    );
  }

  return <DataTable columns={projectColumns} data={project} />;
}
