import { z } from "zod";

export const meetingSchema = z.object({
    title: z.string().min(1, "Meeting title is required"),
    description: z.string().min(1, "Description is required"),
    meeting_date: z.string().min(1, "Meeting date is required"),
    start_time: z.string().min(1, "Start time is required"),
    end_time: z.string().min(1, "End time is required"),
    meeting_link: z.string().url("Enter a valid meeting link"),
    project_id: z.number().min(1, "Please select a project"),
    participants: z
        .array(z.number())
        .min(1, "Select at least one participant"),
});

export type MeetingFormValues = z.infer<typeof meetingSchema>;