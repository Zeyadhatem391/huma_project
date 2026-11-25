const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        user: {
            id: number;
            name: string;
            email: string;
            job_title: string | null;
            avatar_url: string | null;
            roles: string[];
            [key: string]: unknown;
        };
        token: string;
        token_type: string;
    };
}

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