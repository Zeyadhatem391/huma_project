"use client";

import { useEffect, useState } from "react";
import AddProject from "@/features/projects/components/AddProject";
import FilterProject from "@/features/projects/components/FilterProject";
import SearchProject from "@/features/projects/components/SearchProject";
import TableProjects from "@/features/projects/components/TableProjects";
import useGetAllProjects from "@/features/projects/hook/useGetAllProjects";
import Cookies from "js-cookie";

export default function Page() {
  const { data, isLoading, isError, error } = useGetAllProjects();

  const [isTeamMember, setIsTeamMember] = useState(false);

  useEffect(() => {
    const roles = JSON.parse(Cookies.get("roles") || "[]");
    setIsTeamMember(roles.includes("Team Member"));
  }, []);

  const projects = data?.data.data ?? [];

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-3xl">All Projects</h1>

        {!isTeamMember && <AddProject />}
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
