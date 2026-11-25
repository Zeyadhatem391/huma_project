import { CheckCircle2, Clock } from "lucide-react";

export const stats = [
    {
        title: "Completed Tasks",
        value: "140",
        icon: CheckCircle2,
        color: "text-green-600",
        bg: "bg-green-50",
    },
    {
        title: "Pending Tasks",
        value: "24",
        icon: Clock,
        color: "text-orange-600",
        bg: "bg-orange-50",
    },
];


export const tabs = [
  { id: "overview", label: "Overview" },
  { id: "tasks", label: "Tasks" },
  { id: "files", label: "Files" },
] as const;

export type Tab = (typeof tabs)[number]["id"];
