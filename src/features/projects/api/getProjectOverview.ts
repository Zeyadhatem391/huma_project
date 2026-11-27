import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ProjectOverviewResponse = paths["/api/v1/projects/18/overview"]["get"]["responses"]["200"]["content"]["application/json"]

export type ProjectOverview = ProjectOverviewResponse["data"]


export default async function getProjectOverview(
    projectId: number,
): Promise<ProjectOverviewResponse> {
    const token = Cookies.get("token");

    const response = await fetch(
        `${API_URL}/api/v1/projects/${projectId}/overview`,
        {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch project overview");
    }

    return response.json();
}