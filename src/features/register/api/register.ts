const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    data: {
        user: {
            id: number;
            name: string;
            email: string;
            roles: string[];
            [key: string]: unknown;
        };
        token: string;
        token_type: string;
    };
}

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



