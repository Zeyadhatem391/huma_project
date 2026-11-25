// ==================== Overview ====================

export interface DashboardOverview {
    projects: {
        total: number;
        active: number;
        completed: number;
        average_progress: number;
    };

    tasks: {
        total: number;
        pending: number;
        in_progress: number;
        in_review: number;
        completed: number;
        pending_percentage: number;
        in_progress_percentage: number;
        in_review_percentage: number;
        completed_percentage: number;
        overdue: number;
        assigned_to_me: number;
        completion_rate: number;
        by_priority: {
            low: number;
            medium: number;
            high: number;
            critical: number;
        };
    };

    meetings: {
        upcoming_count: number;
    };

    teams: {
        total: number;
    };
}

// ==================== Project Overview Chart ====================

export interface ProjectOverviewItem {
    label: string;
    month: string;
    month_number: number;
    year: number;
    is_future: boolean;
    projects: number;
    created_tasks: number;
    completed_tasks: number;
}

export interface ProjectOverviewChart {
    period: string;
    year: number;
    from: string;
    to: string;
    group_by: string;
    data: ProjectOverviewItem[];
}

// ==================== Pagination ====================

export interface DashboardPagination {
    current_page: number;
    per_page: number;
    total: number;
}

// ==================== Tasks ====================

export interface DashboardTask {
    id: number;
    name: string;
    priority: "low" | "medium" | "high" | "critical";
    status: "pending" | "in_progress" | "in_review" | "completed";
    status_label: string;
    due_date: string;
    project: {
        id: number;
        name: string;
    };
    assignee: {
        id: number;
        name: string;
        avatar_url: string | null;
    } | null;
}

export interface DashboardTasks {
    items: DashboardTask[];
    pagination: DashboardPagination;
}

// ==================== Teams ====================

export interface DashboardTeam {
    id: number;
    name: string;
    description: string;
    members_count: number;
    projects_count: number;
}

export interface DashboardTeams {
    items: DashboardTeam[];
    pagination: DashboardPagination;
}

// ==================== Upcoming Meetings ====================

export interface MeetingParticipant {
    id: number;
    name: string;
    avatar_url: string | null;
}

export interface DashboardMeeting {
    id: number;
    title: string;
    date: string;
    start_time: string;
    end_time: string;
    meeting_link: string;
    project: {
        id: number;
        name: string;
    };
    creator: {
        id: number;
        name: string;
    };
    participants: MeetingParticipant[];
}

export interface DashboardUpcomingMeetings {
    items: DashboardMeeting[];
}

// ==================== Recent Files ====================

export interface DashboardFile {
    id: number;
    name: string;
    mime_type: string;
    file_size_formatted: string;
    download_url: string;
    uploaded_by: {
        id: number;
        name: string;
    };
    project: {
        id: number;
        name: string;
    };
    created_at: string;
}

export interface DashboardRecentFiles {
    items: DashboardFile[];
}

// ==================== Recent Activity ====================

export interface DashboardActivity {
    id: number;
    category: string;
    action: string;
    description: string;
    user: {
        id: number;
        name: string;
        avatar_url: string | null;
    };
    created_at: string;
}

export interface DashboardRecentActivity {
    items: DashboardActivity[];
    pagination: DashboardPagination;
}

// ==================== Active Projects ====================

export interface DashboardActive {
    id: number;
    name: string;
    progress: number;
    tasks_total: number;
    tasks_completed: number;
}


export interface DashboardActiveProject {
    items: DashboardActive[];
    pagination: DashboardPagination;
}
// ==================== Main Dashboard Response ====================

export interface DashboardData {
    overview: DashboardOverview;
    project_overview: ProjectOverviewChart;
    active_projects: DashboardActiveProject;
    tasks: DashboardTasks;
    teams: DashboardTeams;
    upcoming_meetings: DashboardUpcomingMeetings;
    recent_files: DashboardRecentFiles;
    recent_activity: DashboardRecentActivity;
}

export interface DashboardResponse {
    success: boolean;
    data: DashboardData;
}