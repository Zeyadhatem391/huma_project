
"use client";

import { useQuery } from "@tanstack/react-query";
import getProjectReport from "../api/getProjectReport";

export default function useProjectReport() {
    return useQuery({
        queryKey: ["project-report"],
        queryFn: getProjectReport,
    });
}
