
import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type ProjectReportResponse = paths["/api/v1/reports/projects"]["get"]["responses"]["200"]["content"]["application/json"]

export type ProjectReportItem = ProjectReportResponse["data"]["chart"]["data"][number];

export type ProjectReportSummary = ProjectReportResponse["data"]["summary"];



export default async function getProjectReport(): Promise<ProjectReportResponse> {
    const token = Cookies.get("token");

    if (!token) {
        throw new Error("Unauthorized: Token not found");
    }

    const response = await fetch(`${API_URL}/api/v1/reports/projects`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch project report");
    }

    return response.json();
}
