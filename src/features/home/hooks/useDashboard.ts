"use client";

import { useQuery } from "@tanstack/react-query";
import getAllDataDashboard from "../api/getAllDataDashboard";

export default function useDashboard() {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: getAllDataDashboard,
        staleTime: 5 * 60 * 1000,
    });
}