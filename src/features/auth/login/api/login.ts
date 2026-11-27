import { paths } from "@/schema/api";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


type LoginPayload = NonNullable<
    paths["/api/v1/auth/login"]["post"]["requestBody"]>["content"]["application/json"];

type LoginResponse = paths["/api/v1/auth/login"]["post"]["responses"]["200"]["content"]["application/json"]

export async function loginUser(
    data: LoginPayload
): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    });

    const result: LoginResponse = await response.json();

    if (!response.ok || !result.success) {
        throw new Error(result.message || "Login failed");
    }

    return result;
}