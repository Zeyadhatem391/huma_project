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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";

import { Plus, ChevronsUpDown } from "lucide-react";

import {
  AddProjectInput,
  AddProjectOutput,
  ProjectSchema,
} from "../schema/ProjectSchema";
import addProject from "../api/addProject";
import { toast } from "sonner";
import useTeams from "@/shared/hook/useTeams";
import { useQueryClient } from "@tanstack/react-query";

export default function AddProject() {
  const [open, setOpen] = useState(false);

  const { data } = useTeams();

  const teams = data?.data?.data ?? [];

  const queryClient = useQueryClient();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AddProjectInput, unknown, AddProjectOutput>({
    resolver: zodResolver(ProjectSchema),
    mode: "onTouched",
    defaultValues: {
      name: "",
      description: "",
      start_date: "",
      deadline: "",
      priority: "Medium",
      status: "In Progress",
      teams: [],
      members: [],
    },
  });

  const onSubmit = async (data: AddProjectOutput) => {
    try {
      const result = {
        ...data,
        description: data.description ?? "",
      };

      await addProject(result);

      toast.success("Project created successfully");

      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      reset();
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message === "This action is unauthorized."
            ? "You don't have permission to create projects."
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
        <Button className="flex gap-1 bg-blue-700 rounded-2xl h-10 px-4 cursor-pointer text-white hover:bg-blue-800">
          <span>Add Project</span>
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">New Project</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
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
              <Label>Teams</Label>

              <Controller
                name="teams"
                control={control}
                render={({ field }) => {
                  const selectedTeams = field.value ?? [];

                  return (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full justify-between font-normal"
                        >
                          <span className="truncate">
                            {selectedTeams.length > 0
                              ? `${selectedTeams.length} teams selected`
                              : "Select teams"}
                          </span>

                          <ChevronsUpDown className="size-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-[220px] p-3" align="start">
                        <div className="space-y-3">
                          {teams.map((team) => {
                            const isSelected = selectedTeams.includes(team.id);

                            return (
                              <div
                                key={team.id}
                                className="flex items-center gap-2"
                              >
                                <Checkbox
                                  id={`team-${team.id}`}
                                  checked={isSelected}
                                  onCheckedChange={(checked) => {
                                    const updatedTeams = checked
                                      ? [...selectedTeams, team.id]
                                      : selectedTeams.filter(
                                          (id) => id !== team.id,
                                        );

                                    field.onChange(updatedTeams);
                                  }}
                                />

                                <Label
                                  htmlFor={`team-${team.id}`}
                                  className="cursor-pointer font-normal"
                                >
                                  {team.name}
                                </Label>
                              </div>
                            );
                          })}
                        </div>
                      </PopoverContent>
                    </Popover>
                  );
                }}
              />

              {errors.teams && (
                <p className="text-xs text-red-500">{errors.teams.message}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-700 hover:bg-blue-800 w-full cursor-pointer"
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
