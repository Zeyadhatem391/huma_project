import { GetAllProjectsResponse } from "../types/project";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function getAllProjects(): Promise<GetAllProjectsResponse> {
  const token = Cookies.get("token");
  const response = await fetch(`${API_URL}/api/v1/projects?page=1`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}