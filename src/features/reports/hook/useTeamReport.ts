
"use client";

import { useQuery } from "@tanstack/react-query";
import getTeamReport from "../api/getTeamReport";

export default function useTeamReport() {
    return useQuery({
        queryKey: ["team-report"],
        queryFn: getTeamReport,
    });
}
