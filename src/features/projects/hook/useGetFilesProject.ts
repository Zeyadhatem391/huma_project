"use client";

import { useQuery } from "@tanstack/react-query";
import getFilesProject from "../api/getFilesProject";

export default function useGetFilesProject(projectId: number) {
    return useQuery({
        queryKey: ["projects-files", projectId],
        queryFn: () => getFilesProject(projectId),
        enabled: !!projectId,
    });
}