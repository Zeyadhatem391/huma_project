
import { paths } from "@/schema/api";
import Cookies from "js-cookie";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type TaskReportResponse = paths["/api/v1/reports/tasks"]["get"]["responses"]["200"]["content"]["application/json"]

export type TaskReportItem = TaskReportResponse["data"]["chart"]["data"][number];

export type TaskReportSummary = TaskReportResponse["data"]["summary"];



export default async function getTaskReport(): Promise<TaskReportResponse> {
    const token = Cookies.get("token");

    if (!token) {
        throw new Error("Unauthorized: Token not found");
    }

    const response = await fetch(`${API_URL}/api/v1/reports/tasks`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch task report");
    }

    return response.json();
}
