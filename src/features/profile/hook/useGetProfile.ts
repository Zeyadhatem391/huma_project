
"use client";

import { useQuery } from "@tanstack/react-query";
import getProfile from "../api/getProfile";

export default function useGetProfile() {
    return useQuery({
        queryKey: ["profile"],
        queryFn: getProfile,
    });
}
