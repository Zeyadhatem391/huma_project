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

import { toast } from "sonner";

import { useQueryClient } from "@tanstack/react-query";
import useUser from "@/shared/hook/useUser";
import useGetAllProjects from "@/features/projects/hook/useGetAllProjects";
import { MeetingFormValues, meetingSchema } from "../schema/meeting";
import addMeeting from "../api/addMeeting";

export default function AddMeeting() {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: projecData } = useGetAllProjects();

  const projects = projecData?.data.data ?? [];

  const { data: userData } = useUser();

  const users = userData?.data ?? [];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<MeetingFormValues>({
    resolver: zodResolver(meetingSchema),
    mode: "onTouched",
    defaultValues: {
      title: "",
      description: "",
      start_time: "",
      end_time: "",
      meeting_link: "",
      project_id: 0,
      participants: [],
    },
  });

  const onSubmit = async (data: MeetingFormValues) => {
    try {
      const result = await addMeeting(data);

      toast.success("Meeting created successfully");

      await queryClient.invalidateQueries({
        queryKey: ["meeting"],
      });
      reset();
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(
          error.message === "This action is unauthorized."
            ? "You don't have permission to create meeting."
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
          <span>Add Meeting</span>
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">New Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Meeting Title</Label>
            <Input
              id="title"
              placeholder="Enter meeting title"
              {...register("title")}
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && (
              <p className="text-xs text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your meeting..."
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
              <Label htmlFor="start_time">Start Time</Label>
              <Input
                id="start_time"
                type="time"
                {...register("start_time")}
                className={errors.start_time ? "border-red-500" : ""}
              />
              {errors.start_time && (
                <p className="text-xs text-red-500">
                  {errors.start_time.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_time">End Time</Label>
              <Input
                id="end_time"
                type="time"
                {...register("end_time")}
                className={errors.end_time ? "border-red-500" : ""}
              />
              {errors.end_time && (
                <p className="text-xs text-red-500">
                  {errors.end_time.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meeting_date">Meeting Date</Label>
            <Input
              id="meeting_date"
              type="date"
              {...register("meeting_date")}
              className={errors.meeting_date ? "border-red-500" : ""}
            />
            {errors.meeting_date && (
              <p className="text-xs text-red-500">
                {errors.meeting_date.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="meeting_link">Meeting Link</Label>
            <Input
              id="meeting_link"
              type="url"
              placeholder="https://meet.google.com/..."
              {...register("meeting_link")}
              className={errors.meeting_link ? "border-red-500" : ""}
            />
            {errors.meeting_link && (
              <p className="text-xs text-red-500">
                {errors.meeting_link.message}
              </p>
            )}
          </div>

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
            <Label>Participants</Label>

            <Controller
              name="participants"
              control={control}
              render={({ field }) => {
                const selectedParticipants = field.value ?? [];

                return (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full justify-between font-normal"
                      >
                        <span className="truncate">
                          {selectedParticipants.length > 0
                            ? `${selectedParticipants.length} participants selected`
                            : "Select participants"}
                        </span>

                        <ChevronsUpDown className="size-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[250px] p-3" align="start">
                      <div className="max-h-52 space-y-3 overflow-y-auto">
                        {users.map((member) => {
                          const isSelected = selectedParticipants.includes(
                            member.id,
                          );

                          return (
                            <div
                              key={member.id}
                              className="flex items-center gap-2"
                            >
                              <Checkbox
                                id={`participant-${member.id}`}
                                checked={isSelected}
                                onCheckedChange={(checked) => {
                                  const updatedParticipants = checked
                                    ? [...selectedParticipants, member.id]
                                    : selectedParticipants.filter(
                                        (id) => id !== member.id,
                                      );

                                  field.onChange(updatedParticipants);
                                }}
                              />

                              <Label
                                htmlFor={`participant-${member.id}`}
                                className="cursor-pointer font-normal"
                              >
                                {member.name}
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

            {errors.participants && (
              <p className="text-xs text-red-500">
                {errors.participants.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full cursor-pointer bg-blue-700 hover:bg-blue-800"
          >
            {isSubmitting ? "Creating..." : "Create Meeting"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
