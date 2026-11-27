
import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type UserResponse = paths["/api/v1/users"]["get"]["responses"]["200"]["content"]["application/json"]

export default async function getUsers(): Promise<UserResponse> {
    const token = Cookies.get("token");

    if (!token) {
        throw new Error("Unauthorized: Token not found");
    }

    const response = await fetch(`${API_URL}/api/v1/users`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }

    return response.json();
}
