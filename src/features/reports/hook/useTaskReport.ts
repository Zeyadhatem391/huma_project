
"use client";

import { useQuery } from "@tanstack/react-query";
import getTaskReport from "../api/getTaskReport";

export default function useTaskReport() {
    return useQuery({
        queryKey: ["task-report"],
        queryFn: getTaskReport,
    });
}
