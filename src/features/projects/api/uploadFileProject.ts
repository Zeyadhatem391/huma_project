import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface UploadFileParams {
    project_id: number;
    file: File;
    name: string;
}

type UploadFileResponse = paths["/api/v1/files"]["post"]["responses"]["201"]["content"]["application/json"]


export default async function uploadFileProject(
    data: UploadFileParams
): Promise<UploadFileResponse> {
    const formData = new FormData();

    formData.append("project_id", String(data.project_id));
    formData.append("file", data.file);
    formData.append("name", data.name);

    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/api/v1/files`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });

    const result: UploadFileResponse = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to upload file");
    }

    return result;
}
