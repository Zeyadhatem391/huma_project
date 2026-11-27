import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type AddProjectPayload = NonNullable<paths["/api/v1/projects"]["post"]["requestBody"]>["content"]["application/json"];

type AddProjectResponse = paths["/api/v1/projects"]["post"]["responses"]["201"]["content"]["application/json"]

export default async function addProject(
    data: AddProjectPayload
): Promise<AddProjectResponse> {
    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/api/v1/projects`, {
        method: "POST",
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

        throw new Error(
            result.message || "Failed to create project"
        );
    }

    return result;
}