import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GetAllProjectsParams {
  status?: string;
  priority?: string;
  search?: string;
}

type GetAllProjectsResponse = paths["/api/v1/projects"]["get"]["responses"]["200"]["content"]["application/json"]

export type Projects = GetAllProjectsResponse["data"]["data"][number]

export default async function getAllProjects({
  status,
  priority,
  search,
}: GetAllProjectsParams = {}): Promise<GetAllProjectsResponse> {
  const token = Cookies.get("token");

  const params = new URLSearchParams({
    page: "1",
  });

  if (status && status !== "all") {
    params.set("status", status);
  }

  if (priority && priority !== "all") {
    params.set("priority", priority);
  }
  if (search) {
    params.set("search", search);
  }

  const response = await fetch(
    `${API_URL}/api/v1/projects?${params.toString()}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch projects");
  }

  return response.json();
}