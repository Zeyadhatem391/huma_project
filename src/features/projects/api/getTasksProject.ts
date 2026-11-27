import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type KanbanBoardResponse = paths["/api/v1/projects/10/tasks/kanban"]["get"]["responses"]["200"]["content"]["application/json"]

export type KanbanColumns = KanbanBoardResponse["data"]["columns"];

export type KanbanTask = NonNullable<
    NonNullable<KanbanColumns[keyof KanbanColumns]>["tasks"]
>[number];


export default async function getTasksProject(
    projectId: number,
): Promise<KanbanBoardResponse> {
    const token = Cookies.get("token");

    const response = await fetch(
        `${API_URL}/api/v1/projects/${projectId}/tasks/kanban`,
        {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch project tasks");
    }

    return response.json();
}