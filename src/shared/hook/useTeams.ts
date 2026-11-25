
"use client";

import { useQuery } from "@tanstack/react-query";
import getTeams from "../api/getTeam";

export default function useTeams() {
  return useQuery({
    queryKey: ["teams"],
    queryFn: getTeams,
  });
}
