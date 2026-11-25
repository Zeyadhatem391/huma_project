"use client";

import { useQuery } from "@tanstack/react-query";
import getProjectTeams from "../api/getProjectTeams";

export default function useProjectTeam(projectId: number) {
    return useQuery({
        queryKey: ["projects-team", projectId],
        queryFn: () => getProjectTeams(projectId),
        enabled: !!projectId,
    });
}