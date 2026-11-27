
import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export type TeamsResponse = paths["/api/v1/teams"]["get"]["responses"]["200"]["content"]["application/json"]

export default async function getTeams(): Promise<TeamsResponse> {
  const token = Cookies.get("token");

  const response = await fetch(`${API_URL}/api/v1/teams`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch teams");
  }

  return response.json();
}
