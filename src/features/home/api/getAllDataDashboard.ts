import Cookies from "js-cookie";
import { DashboardResponse } from "../types/home";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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