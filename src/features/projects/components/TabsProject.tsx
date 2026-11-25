"use client";

import { useState } from "react";

import ProjectTasks from "./ProjectTasks";
import ProjectFiles from "./ProjectFiles";
import ProjectTeams from "./teams/ProjectTeams";
import { Tab, tabs } from "../data/projects";
import { ProjectOverview } from "../types/project";
import ProjectOverviews from "./overview/ProjectOverviews";

export default function TabsProject({ project }: { project: ProjectOverview }) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="space-y-6">
      <div className="border-b">
        <ul className="flex items-center gap-6">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 font-medium transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? "text-blue-700"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}

                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-blue-700" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {activeTab === "overview" && <ProjectOverviews project={project} />}
        {activeTab === "tasks" && <ProjectTasks />}
        {activeTab === "teams" && <ProjectTeams id={project.id}/>}
        {activeTab === "files" && <ProjectFiles />}
      </div>
    </div>
  );
}
