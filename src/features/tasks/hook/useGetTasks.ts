"use client";

import { useQuery } from "@tanstack/react-query";
import getTasks from "../api/getTasks";

interface Props {
    projectId?: string;
    search?: string;
    status?: string;
    priority?: string;
}

export default function useGetTasks({ projectId, search, status, priority }: Props) {
    return useQuery({
        queryKey: ["tasks", projectId ?? "all", search, status, priority],
        queryFn: () => getTasks({ search, projectId, status, priority }),
    });
}