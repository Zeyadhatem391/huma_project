import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ProfileResponse = paths["/api/v1/auth/me"]["get"]["responses"]["200"]["content"]["application/json"]

export default async function getProfile(): Promise<ProfileResponse> {
    const token = Cookies.get("token");
    const response = await fetch(`${API_URL}/api/v1/auth/me`, {
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