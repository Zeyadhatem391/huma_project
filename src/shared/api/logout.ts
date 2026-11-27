import { paths } from "@/schema/api";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


type LogoutResponse = paths["/api/v1/auth/logout"]["post"]["responses"]["200"]["content"]["application/json"]

export async function logoutUser(token: string): Promise<LogoutResponse> {
    const response = await fetch(`${API_URL}/api/v1/auth/logout`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const result: LogoutResponse = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Logout failed");
    }

    return result;
}