"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Pencil } from "lucide-react";

import useGetAllProjects from "@/features/projects/hook/useGetAllProjects";
import useTeams from "@/shared/hook/useTeams";
import useUser from "@/shared/hook/useUser";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import updateTask from "../api/updateTask";
import {
  UpdateTaskInput,
  UpdateTaskOutput,
  UpdateTaskSchema,
} from "../schema/updateTaskSchema";
import { TaskCardProps } from "./TaskActions";

interface UpdateTaskProps {
  task: TaskCardProps;
}

export default function UpdateTask({ task }: UpdateTaskProps) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: projectData } = useGetAllProjects();

  const projects = projectData?.data.data ?? [];

  const { data: teamData } = useTeams();

  const teams = teamData?.data.data ?? [];

  const { data: userData } = useUser();

  const users = userData?.data ?? [];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<UpdateTaskInput, unknown, UpdateTaskOutput>({
    resolver: zodResolver(UpdateTaskSchema),
    mode: "onTouched",
    defaultValues: {
      name: task.name,
      description: task.description || "",
      project_id: task.project_id,
      due_date: task.due_date || "",
      team_id: task.team_id || 0,
      assigned_to: task.assigned_to || 0,
      priority: "Low",
      status: "Pending",
    },
  });

  const onSubmit = async (data: UpdateTaskOutput) => {
    try {
      await updateTask(task.id, data);

      toast.success("Task updated successfully");

      await queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message === "This action is unauthorized."
            ? "You don't have permission to update this Task."
            : error.message,
        );
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="cursor-pointer gap-2 flex text-gray-700 focus:bg-blue-50 focus:text-blue-700">
          <Pencil />
          Edit Task
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Task Name</Label>
            <Input
              id="name"
              placeholder="Enter task name"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your task..."
              rows={3}
              {...register("description")}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && (
              <p className="text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Project</Label>
              <Controller
                name="project_id"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select project" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.map((project) => (
                        <SelectItem key={project.id} value={String(project.id)}>
                          {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.project_id && (
                <p className="text-xs text-red-500">
                  {errors.project_id.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Team</Label>
              <Controller
                name="team_id"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      {teams.map((team) => (
                        <SelectItem key={team.id} value={String(team.id)}>
                          {team.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.team_id && (
                <p className="text-xs text-red-500">{errors.team_id.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Assigned To</Label>
            <Controller
              name="assigned_to"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value ? String(field.value) : ""}
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((member) => (
                      <SelectItem key={member.id} value={String(member.id)}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.assigned_to && (
              <p className="text-xs text-red-500">
                {errors.assigned_to.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Priority</Label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.priority && (
                <p className="text-xs text-red-500">
                  {errors.priority.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="In Review">In Review</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && (
                <p className="text-xs text-red-500">{errors.status.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="due_date">Due Date</Label>
            <Input
              id="due_date"
              type="date"
              {...register("due_date")}
              className={errors.due_date ? "border-red-500" : ""}
            />
            {errors.due_date && (
              <p className="text-xs text-red-500">{errors.due_date.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="bg-blue-700 hover:bg-blue-800 cursor-pointer w-full"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
