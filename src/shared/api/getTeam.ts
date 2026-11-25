
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface Team {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GetTeamsResponse {
  success: boolean;
  message: string;
  data: {
    data: Team[];
  };
}


export default async function getTeams(): Promise<GetTeamsResponse> {
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
