
"use client";

import { useQuery } from "@tanstack/react-query";
import getUser from "../api/getUser";

export default function useUser() {
    return useQuery({
        queryKey: ["users"],
        queryFn: getUser,
    });
}
