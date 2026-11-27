import Cookies from "js-cookie";
import { paths } from "@/schema/api";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type AddMeetingPayload = NonNullable<
    paths["/api/v1/meetings"]["post"]["requestBody"]>["content"]["application/json"];
type AddMeetingResponse = paths["/api/v1/meetings"]["post"]["responses"]["201"]["content"]["application/json"]

export default async function addMeeting(
    data: AddMeetingPayload
): Promise<AddMeetingResponse> {
    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/api/v1/meetings`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
        console.error("API Error:", result);

        throw new Error(
            result.message || "Failed to create meeting"
        );
    }

    return result.data;
}