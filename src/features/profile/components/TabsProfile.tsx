"use client";

import { useState } from "react";

import OverviewProfile from "./OverviewProfile";
import TasksProfile from "./TasksProfile";
import FilesProfile from "./FilesProfile";
import { ProfileResponse } from "../api/getProfile";
import { Tab, tabs } from "@/shared/types/types";

export default function TabsProfile({
  profile,
}: {
  profile?: ProfileResponse["data"];
}) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  return (
    <div className="space-y-6">
      <div className="border-b">
        <ul className="flex items-center gap-6">
          {tabs.map((tab) => (
            <li key={tab.id}>
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`relative pb-3 text-sm font-medium transition-colors cursor-pointer ${
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
        {activeTab === "overview" && <OverviewProfile profile={profile}/>}
        {activeTab === "tasks" && <TasksProfile />}
        {activeTab === "files" && <FilesProfile />}
      </div>
    </div>
  );
}
