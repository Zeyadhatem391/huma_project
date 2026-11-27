
import { z } from "zod";

export const TaskSchema = z.object({
  name: z
    .string()
    .min(3, "Task name must be at least 3 characters")
    .max(100, "Task name must not exceed 100 characters")
    .trim(),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),

  project_id: z.number().min(1, "Please select a project"),

  team_id: z.number().min(1, "Please select a team"),

  assigned_to: z.number().min(1, "Please assign this task to a member"),

  priority: z.enum(["Low", "Medium", "High", "Critical"], {
    message: "Please select a priority",
  }),

  status: z.enum(["Pending", "In Progress", "Completed", "In Review"], {
    message: "Please select a status",
  }),

  due_date: z.string().min(1, "Due date is required"),
});

export type AddTaskInput = z.input<typeof TaskSchema>;
export type AddTaskOutput = z.output<typeof TaskSchema>;
