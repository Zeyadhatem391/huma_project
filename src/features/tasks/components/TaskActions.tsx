"use client";

import { FormEvent, useState } from "react";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { ProjectTask } from "../api/getTasks";
import { priorityStyles } from "@/shared/types/types";
import { KanbanTask } from "@/features/projects/api/getTasksProject";

export interface TaskFormValues {
  name: string;
  description: string;
  priority: string;
}
type TaskCardProps = ProjectTask | KanbanTask;

interface Props {
  task: TaskCardProps;
  onEdit?: (id: TaskCardProps["id"], values: TaskFormValues) => Promise<void>;
  onDelete: (id: TaskCardProps["id"]) => Promise<void>;
}

export default function TaskActions({ task, onEdit, onDelete }: Props) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  // async function handleEdit(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const data = new FormData(e.currentTarget);
  //   setIsPending(true);
  //   setError("");

  //   try {
  //     await onEdit(task.id, {
  //       name: String(data.get("name")).trim(),
  //       description: String(data.get("description")).trim(),
  //       priority: String(data.get("priority")),
  //     });
  //     setEditOpen(false);
  //   } catch {
  //     setError("Failed to update task. Please try again.");
  //   } finally {
  //     setIsPending(false);
  //   }
  // }

  async function handleDelete() {
    setIsPending(true);
    setError("");

    try {
      await onDelete(task.id);
      setDeleteOpen(false);
    } catch {
      setError("Failed to delete task. Please try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div
      className="shrink-0"
      onClick={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
    >
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Task actions"
            onClick={(e) => e.preventDefault()}
            className="flex h-6 w-6 items-center justify-center rounded-md text-gray-500 outline-none transition hover:bg-gray-200 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-blue-500 data-[state=open]:bg-gray-200"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-36 rounded-xl border-gray-200 bg-white p-1"
        >
          <DropdownMenuItem
            onSelect={() => {
              setError("");
              setEditOpen(true);
            }}
            className="cursor-pointer gap-2 text-gray-700 focus:bg-blue-50 focus:text-blue-700"
          >
            <Pencil className="h-4 w-4 text-current" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={() => {
              setError("");
              setDeleteOpen(true);
            }}
            className="cursor-pointer gap-2 text-red-600 focus:bg-red-50 focus:text-red-700"
          >
            <Trash2 className="h-4 w-4 text-current" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent className="bg-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Edit task</DialogTitle>
            <DialogDescription className="text-gray-500">
              Update the task details, then save your changes.
            </DialogDescription>
          </DialogHeader>
          {/* onSubmit={handleEdit} */}
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`name-${task.id}`}>Name</Label>
              <Input
                id={`name-${task.id}`}
                name="name"
                defaultValue={task.name}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`description-${task.id}`}>Description</Label>
              <Textarea
                id={`description-${task.id}`}
                name="description"
                defaultValue={task.description ?? ""}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Priority</Label>
              <Select
                name="priority"
                defaultValue={task.priority.toLowerCase()}
              >
                <SelectTrigger className="w-full capitalize">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {Object.keys(priorityStyles).map((priority) => (
                    <SelectItem
                      key={priority}
                      value={priority}
                      className="capitalize"
                    >
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 text-white hover:bg-blue-700"
              >
                {isPending ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-900">
              Delete task?
            </AlertDialogTitle>
            <AlertDialogDescription className="break-words text-gray-500">
              &quot;{task.name}&quot; will be permanently deleted. This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              disabled={isPending}
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
