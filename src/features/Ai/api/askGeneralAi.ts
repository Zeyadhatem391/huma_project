import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type AskAiPayload = NonNullable<
    paths["/api/v1/ai/ask"]["post"]["requestBody"]
>["content"]["application/json"];

type AskAiResponse =
    paths["/api/v1/ai/ask"]["post"]["responses"]["200"]["content"]["application/json"];

export async function askGeneralAi(data: AskAiPayload): Promise<AskAiResponse> {
    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/api/v1/ai/ask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(data),
    }).catch(() => {
        throw new Error("Network error, check your connection.");
    });

    const result = await response.json().catch(() => null);

    if (!response.ok || !result?.success) {
        throw new Error(result?.message || `Request failed (${response.status})`);
    }

    return result;
}