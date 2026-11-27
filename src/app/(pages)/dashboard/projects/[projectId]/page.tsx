"use client";

import TabsProject from "@/features/projects/components/TabsProject";
import useProjectOverview from "@/features/projects/hook/useProjectOverview";
import ProjectOverviewSkeleton from "@/shared/skeleton/ProjectOverviewSkeleton";
import { formatDateTask } from "@/shared/utils/formatDate";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const projectId = Number(params.projectId);

  const { data, isLoading, isError, error } = useProjectOverview(projectId);

  if (isLoading) return <ProjectOverviewSkeleton />;

  if (isError) return <p>{error.message}</p>;

  const project = data?.data;

  if (!project) return <p>Project not found</p>;

  const progress = project.progress_percentage;
  const isOverdue = project.due_date_indicator.is_overdue;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-4">
          <div className="flex gap-1.5 items-center">
            <Link
              href="/dashboard/projects"
              className="text-gray-600 cursor-pointer hover:text-base"
            >
              Projects
            </Link>
            <ChevronRight size={14} />
            <p className="font-semibold">{project?.name}</p>
          </div>
          <h1 className="text-3xl font-bold">{project?.name}</h1>
        </div>
        <div className="rounded-2xl border bg-white p-5 shadow-sm space-y-1.5">
          <h3 className="text-sm font-semibold text-gray-900">Due Date</h3>

          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full transition-all ${
                isOverdue ? "bg-red-600" : "bg-blue-600"
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between gap-14">
            <p className="font-medium">
              Start Date :{" "}
              {formatDateTask(project?.due_date_indicator.start_date)}
            </p>

            <p className="font-medium">
              Deadline : {formatDateTask(project?.due_date_indicator.deadline)}
            </p>
          </div>
        </div>
      </div>

      <TabsProject project={project} />
    </div>
  );
}
