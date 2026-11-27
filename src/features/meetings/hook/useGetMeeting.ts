"use client";

import { useQuery } from "@tanstack/react-query";
import getMeeting from "../api/getMeeting";

export default function useGetMeeting(meetingId: number) {
    return useQuery({
        queryKey: ["meeting-detils", meetingId],
        queryFn: () => getMeeting(meetingId),
        enabled: !!meetingId,
    });
}