import { paths } from "@/schema/api";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


type RegisterPayload = NonNullable<
    paths["/api/v1/auth/register"]["post"]["requestBody"]
>["content"]["application/json"];

type RegisterResponse = paths["/api/v1/auth/register"]["post"]["responses"]["201"]["content"]["application/json"]

export async function registerUser(
    data: RegisterPayload
): Promise<RegisterResponse> {
    const response = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(data),
    });

    const result: RegisterResponse = await response.json();

    if (!response.ok) {
        throw new Error(result.message || "Registration failed");
    }

    return result;
}



