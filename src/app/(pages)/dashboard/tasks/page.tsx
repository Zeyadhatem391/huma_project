"use client";

import AddTask from "@/features/tasks/components/AddTask";
import TaskStatus from "@/features/tasks/components/TaskStatus";
import SearchTask from "@/features/tasks/components/SearchTask";
import FilterTask from "@/features/tasks/components/FilterTask";

import { useEffect, useState, Suspense } from "react";
import Cookies from "js-cookie";

export default function Page() {
  const [isAdministrator, setIsAdministrator] = useState(false);

  useEffect(() => {
    const roles = JSON.parse(Cookies.get("roles") || "[]");
    setIsAdministrator(roles.includes("Administrator"));
  }, []);

  return (
    <div className="space-y-5">
      <Suspense fallback={<div className="h-10" />}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <SearchTask />
            <FilterTask />
          </div>

          {isAdministrator && <AddTask />}
        </div>
      </Suspense>

      <TaskStatus />
    </div>
  );
}
