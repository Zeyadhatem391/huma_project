import { useQuery } from "@tanstack/react-query";
import getAllProjects from "../api/getAllProjects";

interface Props {
  status?: string;
  priority?: string;
  search?: string;
}

export default function useGetAllProjects({
  status,
  priority,
  search,
}: Props = {}) {
  return useQuery({
    queryKey: ["projects", status, priority, search],
    queryFn: () => getAllProjects({ status, priority, search }),
  });
}