"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import deleteProject from "../api/deleteProject";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteProjectButtonProps {
  projectId: number;
}

export default function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  async function handleDelete() {
    try {
      await deleteProject(projectId);

      toast.success("project deleted successfully");
      await queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      router.refresh();
    } catch (error) {
      console.error("Delete project error:", error);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="cursor-pointer rounded-md p-2 bg-red-100 text-red-500 transition hover:text-red-700"
        >
          <Trash2 size={15} />
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-gray-900">
            Delete Project?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-sm leading-6 text-gray-600">
            Are you sure you want to delete project? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-4 gap-2 sm:gap-3">
          <AlertDialogCancel className="h-10 cursor-pointer rounded-md px-5 text-sm font-semibold">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="h-11 gap-2 cursor-pointer rounded-md bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700"
          >
            <Trash2 size={16} />
            Delete Project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
