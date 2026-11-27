"use client";

import { useEffect, useState } from "react";
import AddProject from "@/features/projects/components/AddProject";
import TableProjects from "@/features/projects/components/TableProjects";
import useGetAllProjects from "@/features/projects/hook/useGetAllProjects";
import Cookies from "js-cookie";
import { useQueryState } from "nuqs";
import SearchProject from "@/features/projects/components/SearchProject";
import FilterProject from "@/features/projects/components/FilterProject";

export default function Page() {
  const [status] = useQueryState("status", {
    defaultValue: "all",
  });

  const [priority] = useQueryState("priority", {
    defaultValue: "all",
  });

  const [search] = useQueryState("search", {
    defaultValue: "",
  });

  const { data, isLoading, isError, error } = useGetAllProjects({
    status,
    priority,
    search,
  });

  const [isAdministrator, setIsAdministrator] = useState(false);

  useEffect(() => {
    const roles = JSON.parse(Cookies.get("roles") || "[]");
    setIsAdministrator(roles.includes("Administrator"));
  }, []);

  const projects = data?.data.data ?? [];

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">All Projects</h1>

        {isAdministrator && <AddProject />}
      </div>

      <div className="flex justify-between items-center">
        <SearchProject />

        <FilterProject />
      </div>

      <TableProjects
        project={projects}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </div>
  );
}
