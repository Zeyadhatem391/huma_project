import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface GetAllTasksParams {
    projectId?: string;
    search?: string;
    status?: string;
    priority?: string;
}

type TasksResponse = paths["/api/v1/tasks"]["get"]["responses"]["200"]["content"]["application/json"]

export type ProjectTask =
    TasksResponse["data"]["data"][number];


export default async function getTasks({
    projectId,
    search,
    priority,
    status,
}: GetAllTasksParams = {}): Promise<TasksResponse> {
    const token = Cookies.get("token");

    const url = new URL(`${API_URL}/api/v1/tasks?per_page=30`);

    if (projectId) {
        url.searchParams.set("project_id", projectId);
    }

    if (search?.trim()) {
        url.searchParams.set("search", search.trim());
    }

    if (status && status !== "all") {
        url.searchParams.set("status", status);
    }

    if (priority && priority !== "all") {
        url.searchParams.set("priority", priority);
    }

    const response = await fetch(url.toString(), {
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