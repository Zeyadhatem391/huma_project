import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function updateProfile(data: FormData) {
    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/api/v1/auth/profile`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: data,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update profile");
    }

    return result.data;
}