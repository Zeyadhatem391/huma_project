import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


export interface ProjectTeamMember {
    id: number;
    name: string;
    avatar_url: string | null;
    role_in_team: string;
    is_leader: boolean;
    tasks_completed: number;
    tasks_total: number;
    tasks_ratio: string;
    progress_percentage: number;
}

export interface ProjectTeam {
    id: number;
    name: string;
    completion_percentage: number;
    total_tasks: number;
    completed_tasks: number;
    members: ProjectTeamMember[];
}

export interface ProjectTeamResponse {
    success: boolean;
    message: string;
    data: ProjectTeam[];
}


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