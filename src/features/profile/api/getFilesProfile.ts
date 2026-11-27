import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type FilesProjectResponse = paths["/api/v1/auth/profile/files"]["get"]["responses"]["200"]["content"]["application/json"]

export default async function getFilesProfile(): Promise<FilesProjectResponse> {
    const token = Cookies.get("token");

    const response = await fetch(
        `${API_URL}/api/v1/auth/profile/files`,
        {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        },
    );

    if (!response.ok) {
        throw new Error("Failed to fetch profile files");
    }

    return response.json();
}