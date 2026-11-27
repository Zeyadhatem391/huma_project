import { paths } from "@/schema/api";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type GoogleRedirectResponse = paths["/api/v1/auth/social/google/redirect"]["get"]["responses"]["200"]["content"]["application/json"]

export default async function googleRedirect(): Promise<GoogleRedirectResponse> {
  const response = await fetch(
    `${API_URL}/api/v1/auth/social/google/redirect`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  const result: GoogleRedirectResponse = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Google authentication failed");
  }

  return result;
}
