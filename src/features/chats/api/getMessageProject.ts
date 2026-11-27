import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type TasksResponse = paths["/api/v1/projects/18/messages"]["get"]["responses"]["200"]["content"]["application/json"]

export default async function getMessageProject({ project_id }: { project_id: number }): Promise<TasksResponse> {
    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/api/v1/projects/${project_id}/messages`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch tasks");
    }

    return response.json();
}