import createClient from "openapi-fetch";
import type { paths } from "@/schema/api";

export const client = createClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        Accept: "application/json",
    },
});
