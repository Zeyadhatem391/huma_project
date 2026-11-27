import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ProjectTeamResponse = paths["/api/v1/projects/18/teams"]["get"]["responses"]["200"]["content"]["application/json"]

export type ProjectTeam = ProjectTeamResponse["data"][number];

export type ProjectTeamMember = ProjectTeam["members"][number];

export default async function getProjectTeams(
    projectId: number,
): Promise<ProjectTeamResponse> {
    const token = Cookies.get("token");

    const response = await fetch(
        `${API_URL}/api/v1/projects/${projectId}/teams`,
        {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch project teams");
    }

    return response.json();
}