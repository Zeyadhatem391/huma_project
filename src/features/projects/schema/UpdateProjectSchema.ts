import { z } from "zod";

export const UpdateProjectSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must not exceed 30 characters"),

    description: z
      .string()
      .max(500, "Description must not exceed 500 characters")
      .optional(),

    start_date: z.string().min(1, "Start date is required"),

    deadline: z.string().min(1, "Deadline is required"),

    priority: z.enum(["Low", "Medium", "High", "Critical"]),

    status: z.enum([
      "Pending",
      "In Progress",
      "Completed",
      "On Hold",
      "Cancelled",
    ]),
  });

export type UpdateProjectInput = z.input<typeof UpdateProjectSchema>;
export type UpdateProjectOutput = z.output<typeof UpdateProjectSchema>;