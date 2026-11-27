
import Cookies from "js-cookie";
import { paths } from "@/schema/api";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type UpdateProjectPayload = NonNullable<
    paths["/api/v1/projects/18"]["put"]["requestBody"]
>["content"]["application/json"];

export type UpdateProjectResponse =
    paths["/api/v1/projects/18"]["put"]["responses"]["200"]["content"]["application/json"];

export default async function updateProject(
    projectId: number,
    data: UpdateProjectPayload
): Promise<UpdateProjectResponse> {
    const token = Cookies.get("token");

    if (!token) {
        throw new Error("Unauthorized: Token not found");
    }

    const response = await fetch(`${API_URL}/api/v1/projects/${projectId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        console.error("API Error:", result);

        throw new Error(result.message || "Failed to update project");
    }

    return result;
}
