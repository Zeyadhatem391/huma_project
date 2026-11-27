import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type FilesProjectResponse = paths["/api/v1/files"]["get"]["responses"]["200"]["content"]["application/json"]

export type ProjectFile = FilesProjectResponse["data"]["data"][number]

export default async function getFilesProject(
    projectId: number,
): Promise<FilesProjectResponse> {
    const token = Cookies.get("token");

    const response = await fetch(
        `${API_URL}/api/v1/files?project_id=${projectId}`,
        {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch project files");
    }

    return response.json();
}