import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type TeamReportResponse = paths["/api/v1/reports/teams"]["get"]["responses"]["200"]["content"]["application/json"]

export type TeamReportSummary = TeamReportResponse["data"]["summary"];

export default async function getTeamReport(): Promise<TeamReportResponse> {
    const token = Cookies.get("token");

    if (!token) {
        throw new Error("Unauthorized: Token not found");
    }

    const response = await fetch(`${API_URL}/api/v1/reports/teams`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch team report");
    }

    return response.json();
}