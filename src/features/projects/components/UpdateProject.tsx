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
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Projects } from "../api/getAllProjects";
import {
  UpdateProjectInput,
  UpdateProjectOutput,
  UpdateProjectSchema,
} from "../schema/UpdateProjectSchema";
import updateProject from "../api/updateProject";

type UpdateProjectProps = {
  project: Projects;
};

export default function UpdateProject({ project }: UpdateProjectProps) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<UpdateProjectInput, unknown, UpdateProjectOutput>({
    resolver: zodResolver(UpdateProjectSchema),
    mode: "onTouched",
    defaultValues: {
      name: project.name,
      description: project.description ?? "",
      start_date: project.start_date,
      deadline: project.deadline,
      priority: project.priority as UpdateProjectInput["priority"],
      status: project.status as UpdateProjectInput["status"],
    },
  });

  const onSubmit = async (data: UpdateProjectOutput) => {
    try {
      const payload = {
        ...data,
        description: data.description ?? "",
      };

      await updateProject(project.id, payload);

      toast.success("Project updated successfully");

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["projects"] }),
        queryClient.invalidateQueries({ queryKey: ["project", project.id] }),
      ]);

      setOpen(false);
    } catch (error) {
      console.error("Update Project Error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="cursor-pointer rounded-md text-blue-500">
          <Pencil size={15} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Edit Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="Enter project name"
              {...register("name")}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                {...register("start_date")}
                className={errors.start_date ? "border-red-500" : ""}
              />
              {errors.start_date && (
                <p className="text-xs text-red-500">
                  {errors.start_date.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="deadline">End Date</Label>
              <Input
                id="deadline"
                type="date"
                {...register("deadline")}
                className={errors.deadline ? "border-red-500" : ""}
              />
              {errors.deadline && (
                <p className="text-xs text-red-500">
                  {errors.deadline.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your project..."
              rows={4}
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
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

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
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            className="bg-blue-700 hover:bg-blue-800 w-full cursor-pointer"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
