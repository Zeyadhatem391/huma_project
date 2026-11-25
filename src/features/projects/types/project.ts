
export interface Team {
  id: number;
  name: string;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  start_date: string;
  deadline: string;
  status: string;
  priority: string;
  progress_percentage: number;
  files_count: number;
  teams: Team[];
  created_at: string;
}

export interface GetAllProjectsResponse {
  success: boolean;
  message: string;
  data: {
    data: Project[];
  };
}


export interface AddProjectPayload {
  name: string;
  description?: string;
  start_date: string;
  deadline: string;
  priority: string;
  status: string;
  teams: number[];
  members: {
    user_id: number;
    role: string;
  }[];
}



export interface ProjectCreator {
  id: number;
  name: string;
  email: string;
}

export interface ProjectTeam {
  id: number;
  name: string;
  description: string;
  created_by: number;
  members_count: number;
  active_projects_count: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectMember {
  id: number;
  name: string;
  email: string;
  avatar_url: string | null;
  job_title: string;
  role: string;
}

export interface DueDateIndicator {
  start_date: string;
  deadline: string;
  total_days: number;
  days_remaining: number;
  is_overdue: boolean;
}

export interface TasksStatistics {
  total: number;
  pending: number;
  in_progress: number;
  in_review: number;
  completed: number;
  completion_rate: number;
  pending_percentage: number;
  in_progress_percentage: number;
  in_review_percentage: number;
  completed_percentage: number;
}

export interface ProjectCounts {
  files: number;
  meetings: number;
  messages: number;
  teams: number;
  direct_members: number;
}

export interface ProjectChartItem {
  month: string;
  month_number: number;
  year: number;
  label: string;
  created_tasks: number;
  completed_tasks: number;
  progress_percentage: number | null;
  is_future: boolean;
}

export interface ProjectChart {
  period: string;
  year: number;
  group_by: string;
  data: ProjectChartItem[];
}

export interface ProjectOverview {
  id: number;
  name: string;
  description: string;
  status: "Not Started" | "In Progress" | "Completed" | "On Hold";
  priority: "Low" | "Medium" | "High" | "Critical";
  progress_percentage: number;
  due_date_indicator: DueDateIndicator;
  tasks_statistics: TasksStatistics;
  counts: ProjectCounts;
  teams: ProjectTeam[];
  direct_members: ProjectMember[];
  created_by: number;
  creator: ProjectCreator;
  created_at: string;
  updated_at: string;
  chart: ProjectChart;
}

export interface ProjectOverviewResponse {
  success: boolean;
  message: string;
  data: ProjectOverview;
}
