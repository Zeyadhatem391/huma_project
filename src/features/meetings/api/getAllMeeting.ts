import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type GetAllMeetingResponse = paths["/api/v1/meetings"]["get"]["responses"]["200"]["content"]["application/json"]

export type Meeting = GetAllMeetingResponse["data"]["data"][number];

export default async function getAllMeeting(): Promise<GetAllMeetingResponse> {
    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/api/v1/meetings?time_filter=upcoming`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch meetings");
    }

    return response.json();
}