
export type Priority = "Low" | "Medium" | "High" | "Critical";

export type TaskStatus =
  | "Pending"
  | "In Progress"
  | "In Review"
  | "Completed";

export type ProjectStatus =
  | "In Progress"
  | "Completed"
  | "On Hold"
  | "Cancelled"
  | "Pending";

export const statusStyles: Record<ProjectStatus, string> = {
  "In Progress": "text-blue-700 bg-blue-50",
  Completed: "text-green-700 bg-green-50",
  "On Hold": "text-orange-700 bg-orange-50",
  Cancelled: "text-red-700 bg-red-50",
  Pending: "text-yellow-700 bg-yellow-50",
};

export const priorityStyles: Record<Priority, string> = {
  Low: "bg-green-500/10 text-green-600 ",
  Medium: "bg-orange-500/10 text-orange-600 ",
  High: "bg-red-500/10 text-red-600 ",
  Critical: "bg-purple-500/10 text-purple-600 ",
};

export const statuses: {
  title: TaskStatus;
  color: string;
  dot: string;
}[] = [
    {
      title: "Pending",
      color: "bg-slate-100 text-slate-700",
      dot: "bg-slate-500",
    },
    {
      title: "In Progress",
      color: "bg-blue-100 text-blue-700",
      dot: "bg-blue-500",
    },
    {
      title: "In Review",
      color: "bg-pink-100 text-pink-700",
      dot: "bg-pink-500",
    },
    {
      title: "Completed",
      color: "bg-green-700/20 text-green-700",
      dot: "bg-green-500",
    },
  ];


export const reports = [
  {
    id: 1,
    title: "Task Completion Rate",
    value: "70",
    change: 3,
  },
  {
    id: 2,
    title: "Projects Completion Rate",
    value: "248",
    change: 12,
  },
  {
    id: 3,
    title: "Teams Activity Rate",
    value: "18",
    change: -5,
  },
];

export const tabs = [
  { id: "overview", label: "Overview" },
  { id: "tasks", label: "Tasks" },
  { id: "files", label: "Files" },
] as const;

export type Tab = (typeof tabs)[number]["id"];


// export type Priority = "low" | "medium" | "high" | "critical";

// export type TaskStatus =
//   | "To-do"
//   | "In Progress"
//   | "In Review"
//   | "Completed Tasks";



// const priorityColors = {
//   low: "bg-green-100 text-green-700",
//   medium: "bg-yellow-100 text-yellow-700",
//   high: "bg-orange-100 text-orange-700",
//   critical: "bg-red-100 text-red-700",
// }; //DashboardTasksCard

