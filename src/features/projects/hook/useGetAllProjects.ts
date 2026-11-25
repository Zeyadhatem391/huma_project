"use client";

import { useQuery } from "@tanstack/react-query";
import getAllProjects from "../api/getAllProjects";



export default function useGetAllProjects() {
    return useQuery({
        queryKey: ["projects"],
        queryFn: getAllProjects,
    });
}