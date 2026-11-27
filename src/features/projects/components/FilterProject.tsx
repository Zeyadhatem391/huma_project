"use client";

import { useQueryState } from "nuqs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterProject() {
  const [status, setStatus] = useQueryState("status", {
    defaultValue: "all",
  });

  const [priority, setPriority] = useQueryState("priority", {
    defaultValue: "all",
  });

  return (
    <div className="flex gap-4">
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[160px] rounded-xl border-gray-100 text-sm bg-white">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Status</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="In Progress">In Progress</SelectItem>
          <SelectItem value="Completed">Completed</SelectItem>
          <SelectItem value="On Hold">On Hold</SelectItem>
          <SelectItem value="Cancelled">Cancelled</SelectItem>
        </SelectContent>
      </Select>

      <Select value={priority} onValueChange={setPriority}>
        <SelectTrigger className="w-[160px] rounded-xl border-gray-100 text-sm bg-white">
          <SelectValue placeholder="Priority" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Priorities</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Critical">Critical</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
