import { Button } from "@/components/ui/button";
import AddTask from "@/features/tasks/components/AddTask";
import FilterTask from "@/features/tasks/components/FilterTask";
import SearchTask from "@/features/tasks/components/SearchTask";
import TaskStatus from "@/features/tasks/components/TaskStatus";
import { Plus } from "lucide-react";

export default function page() {
  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <SearchTask />
          <FilterTask />
        </div>
        <AddTask />
      </div>
      <TaskStatus />
    </div>
  );
}
