import {
    CheckSquare,
    FileText,
    FolderKanban,
    User,
    Users,
    Video,
} from "lucide-react";

export const categories = {
    projects: {
        label: "Projects",
        icon: FolderKanban,
        color: "bg-blue-50 text-blue-600",
    },
    users: { label: "Users", icon: User, color: "bg-emerald-50 text-emerald-600" },
    tasks: { label: "Tasks", icon: CheckSquare, color: "bg-amber-50 text-amber-600" },
    meetings: { label: "Meetings", icon: Video, color: "bg-purple-50 text-purple-600" },
    files: { label: "Files", icon: FileText, color: "bg-rose-50 text-rose-600" },
    teams: { label: "Teams", icon: Users, color: "bg-cyan-50 text-cyan-600" },
};

export type Category = keyof typeof categories;

export interface SearchResult {
    id: number;
    type: Category;
    title: string;
    href: string;
}

// بيانات تجريبية
export const mockResults: SearchResult[] = [
    { id: 1, type: "meetings", title: "Retrospective - Marketing Website 2026", href: "/meetings" },
    { id: 2, type: "meetings", title: "Release Readiness - Marketing Website 2026", href: "/meetings" },
    { id: 3, type: "meetings", title: "Daily Standup - Marketing Website 2026", href: "/meetings" },
    { id: 4, type: "projects", title: "Marketing Website 2026", href: "/projects" },
    { id: 5, type: "users", title: "System Administrator", href: "/users" },
    { id: 6, type: "tasks", title: "Prepare release notes", href: "/tasks" },
    { id: 7, type: "files", title: "Design mockups.pdf", href: "/files" },
    { id: 8, type: "teams", title: "Platform Team", href: "/teams" },
];