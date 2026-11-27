"use client";

import { useQuery } from "@tanstack/react-query";
import getFilesProfile from "../api/getFilesProfile";

export default function useGetFilesProfile() {
    return useQuery({
        queryKey: ["profile-files"],
        queryFn: getFilesProfile,
    });
}