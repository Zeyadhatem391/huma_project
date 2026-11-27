"use client";

import AddTask from "@/features/tasks/components/AddTask";
import TaskStatus from "@/features/tasks/components/TaskStatus";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import SearchTask from "@/features/tasks/components/SearchTask";
import FilterTask from "@/features/tasks/components/FilterTask";

export default function page() {
  const [isAdministrator, setIsAdministrator] = useState(false);

  useEffect(() => {
    const roles = JSON.parse(Cookies.get("roles") || "[]");
    setIsAdministrator(roles.includes("Administrator"));
  }, []);
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <SearchTask />

          <FilterTask />
        </div>
        {isAdministrator && <AddTask />}
      </div>
      <TaskStatus />
    </div>
  );
}
