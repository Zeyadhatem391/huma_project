import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


type DeleteTaskResponse = paths["/api/v1/tasks/396"]["delete"]["responses"]["200"]["content"]["application/json"]


export default async function deleteTask(
    taskId: number
): Promise<DeleteTaskResponse> {
    const token = Cookies.get("token");

    const response = await fetch(
        `${API_URL}/api/v1/tasks/${taskId}`,
        {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    const result = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Failed to delete project");
    }

    return result;
}