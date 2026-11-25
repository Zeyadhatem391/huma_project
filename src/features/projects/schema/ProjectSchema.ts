import { z } from "zod";

export const ProjectSchema = z
  .object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(30, "Name must not exceed 30 characters")
      .trim(),

    description: z
      .string()
      .max(500, "Description must not exceed 500 characters")
      .optional(),

    start_date: z.string().min(1, "Start date is required"),

    deadline: z.string().min(1, "Deadline is required"),

    priority: z.enum(["Low", "Medium", "High", "Critical"]),

    status: z.enum([
      "Not Started",
      "In Progress",
      "Completed",
      "On Hold",
    ]),

    teams: z.array(z.number()).min(1, "Select at least one team"),
    members: z
      .array(
        z.object({
          user_id: z.number(),
          role: z.string().min(1, "Role is required"),
        })
      )
      .default([]),
  })
  .refine((data) => data.deadline >= data.start_date, {
    message: "Deadline must be after or equal to start date",
    path: ["deadline"],
  });

export type AddProjectInput = z.input<typeof ProjectSchema>;
export type AddProjectOutput = z.output<typeof ProjectSchema>;