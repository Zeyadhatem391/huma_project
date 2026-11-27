import Cookies from "js-cookie";
import { paths } from "@/schema/api";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type DashboardResponse = paths["/api/v1/dashboard"]["get"]["responses"]["200"]["content"]["application/json"]

export default async function getAllDataDashboard(): Promise<DashboardResponse> {
    const token = Cookies.get("token");

    const response = await fetch(`${API_URL}/api/v1/dashboard`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
    });

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }

    return response.json();
}

export type DashboardActiveProject = DashboardResponse["data"]["active_projects"]

export type DashboardOverview = DashboardResponse["data"]["overview"]

export type ProjectOverviewChart = DashboardResponse["data"]["project_overview"]

export type DashboardTasksType = DashboardResponse["data"]["tasks"]

export type DashboardTeams = DashboardResponse["data"]["teams"]

export type DashboardRecentFiles = DashboardResponse["data"]["recent_files"]

export type DashboardUpcomingMeetings = DashboardResponse["data"]["upcoming_meetings"]
