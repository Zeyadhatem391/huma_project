"use client";

import { useQuery } from "@tanstack/react-query";
import getTasksProject from "../api/getTasksProject";

export default function useGetProjectTask(projectId: number) {
    return useQuery({
        queryKey: ["projects-tasks", projectId],
        queryFn: () => getTasksProject(projectId),
        enabled: !!projectId,
    });
}