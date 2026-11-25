export interface Task {
    id: string;
    title: string;
    startDate: string;
    description: string;
    dueDate: string;
    priority: TaskPriority;
    teams: string[];
    files: number;
    status: TaskStatus;
}

export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus =
    | "To-do"
    | "In Progress"
    | "In Review"
    | "Completed Tasks";

export const priorityStyles: Record<TaskPriority, string> = {
    low: "bg-green-500/10 text-green-600 dark:text-green-400",
    medium: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
    high: "bg-red-500/10 text-red-600 dark:text-red-400",
};

export const statuses: {
    title: TaskStatus;
    color: string;
    dot: string;
}[] = [
        {
            title: "To-do",
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
            title: "Completed Tasks",
            color: "bg-green-700/20 text-green-700",
            dot: "bg-green-500",
        },
    ];

export const tasks: Task[] = [
    {
        id: "1",
        title: "Design Dashboard UI",
        startDate: "2026-11-15",
        description: "Create a modern and responsive dashboard layout with reusable components.",
        dueDate: "2026-11-27",
        priority: "high",
        teams: ["Zeyad", "Ahmed", "Omar"],
        files: 5,
        status: "To-do",
    },
    {
        id: "2",
        title: "Create Authentication Pages",
        startDate: "2026-11-16",
        description: "Build login, register, and forgot password pages.",
        dueDate: "2026-11-29",
        priority: "medium",
        teams: ["Mohamed", "Ali"],
        files: 5,
        status: "To-do",
    },
    {
        id: "3",
        title: "Setup Project Structure",
        startDate: "2026-11-14",
        description: "Configure folders, dependencies, and shared project utilities.",
        dueDate: "2026-11-25",
        priority: "low",
        teams: ["Zeyad"],
        files: 5,
        status: "To-do",
    },
    {
        id: "4",
        title: "Implement Sidebar Navigation",
        startDate: "2026-11-18",
        description: "Develop a responsive sidebar with active navigation states.",
        dueDate: "2026-11-28",
        priority: "high",
        teams: ["Ahmed", "Omar"],
        files: 5,
        status: "In Progress",
    },
    {
        id: "5",
        title: "Integrate Dashboard APIs",
        startDate: "2026-11-17",
        description: "Connect dashboard statistics and project data with backend APIs.",
        dueDate: "2026-12-02",
        priority: "high",
        teams: ["Zeyad", "Mohamed", "Ali"],
        files: 5,
        status: "In Progress",
    },
    {
        id: "6",
        title: "Build Reusable Table",
        startDate: "2026-11-19",
        description: "Create a reusable data table with sorting, filtering, and pagination.",
        dueDate: "2026-12-04",
        priority: "medium",
        teams: ["Omar", "Ahmed"],
        files: 5,
        status: "In Progress",
    },
    {
        id: "7",
        title: "Review Authentication Flow",
        startDate: "2026-11-18",
        description: "Review authentication logic and validate all user access scenarios.",
        dueDate: "2026-11-26",
        priority: "high",
        teams: ["Zeyad", "Ali"],
        files: 5,
        status: "In Review",
    },
    {
        id: "8",
        title: "Test Responsive Design",
        startDate: "2026-11-20",
        description: "Test layouts across mobile, tablet, and desktop screen sizes.",
        dueDate: "2026-11-30",
        priority: "medium",
        teams: ["Mohamed"],
        files: 5,
        status: "In Review",
    },
    {
        id: "9",
        title: "Setup Dark Mode",
        startDate: "2026-11-12",
        description: "Implement application theme switching with persistent preferences.",
        dueDate: "2026-11-20",
        priority: "low",
        teams: ["Zeyad", "Ahmed"],
        files: 5,
        status: "Completed Tasks",
    },
    {
        id: "10",
        title: "Create Project Cards",
        startDate: "2026-11-10",
        description: "Build project cards with status, priority, and team information.",
        dueDate: "2026-11-19",
        priority: "medium",
        teams: ["Omar", "Ali"],
        files: 5,
        status: "Completed Tasks",
    },
    {
        id: "11",
        title: "Configure Global Styles",
        startDate: "2026-11-08",
        description: "Setup global typography, colors, and reusable design tokens.",
        dueDate: "2026-11-18",
        priority: "low",
        teams: ["Zeyad"],
        files: 5,
        status: "Completed Tasks",
    },
    {
        id: "12",
        title: "Build Notification Component",
        startDate: "2026-11-21",
        description: "Create reusable notification messages and toast interactions.",
        dueDate: "2026-12-05",
        priority: "medium",
        teams: ["Ahmed", "Mohamed", "Omar", "Ali"],
        files: 5,
        status: "In Progress",
    },
];
