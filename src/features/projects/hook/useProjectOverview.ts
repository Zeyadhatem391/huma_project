"use client";

import { useQuery } from "@tanstack/react-query";
import getProjectOverview from "../api/getProjectOverview";

export default function useProjectOverview(projectId: number) {
    return useQuery({
        queryKey: ["projects-overview", projectId],
        queryFn: () => getProjectOverview(projectId),
        enabled: !!projectId,
    });
}