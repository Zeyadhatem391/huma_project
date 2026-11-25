"use client";

import { Button } from "@/components/ui/button";
import { EllipsisVertical, Plus } from "lucide-react";

import { statuses, tasks } from "../data/tasks";
import TaskCard from "./TaskCard";

export default function TaskStatus() {
  return (
    <div className="grid gap-5 grid-cols-4">
      {statuses.map((status) => {
        const filteredTasks = tasks.filter(
          (task) => task.status === status.title,
        );

        return (
          <div key={status.title} className="rounded-2xl bg-white ">
            <div
              className={`flex justify-between items-center p-6 rounded-t-2xl  ${status.color}`}
            >
              <div className="flex gap-1 items-center">
                <span
                  className={`w-1.5 h-1.5 rounded-full  ${status.dot} `}
                ></span>
                <p className="text-sm font-semibold">{status.title}</p>
              </div>

              <EllipsisVertical size={20} />
            </div>

            <div className="space-y-5 p-6">
              <Button className="text-blue-600 border-2 border-blue-600 w-full h-10 rounded-full border-dashed cursor-pointer hover:bg-blue-600 hover:text-white bg-white">
                Add Task <Plus size={18} />
              </Button>
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
