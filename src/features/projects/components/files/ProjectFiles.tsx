"use client";

import { useRef } from "react";
import { Plus, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import useUploadFileProject from "../../hook/useUploadFileProject";
import ProjectFileCard from "./ProjectFileCard";

export default function ProjectFiles({ id }: { id: number }) {
  const inputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadFileProject(id);

  const handleUpload = (file?: File) => {
    if (!file) return;

    uploadMutation.mutate({
      file,
      name: file.name,
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">All Files</h2>

        <div>
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files?.[0])}
          />

          <Button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploadMutation.isPending}
            className="gap-2 bg-blue-600 h-10 rounded-xl"
          >
            {uploadMutation.isPending ? "Uploading..." : "Upload File"}

            {uploadMutation.isPending ? (
              <Upload size={16} className="animate-pulse" />
            ) : (
              <Plus size={16} />
            )}
          </Button>
        </div>
      </div>

      <ProjectFileCard id={id} />

      {uploadMutation.isError && (
        <p className="text-sm text-red-500">
          {uploadMutation.error.message || "Failed to upload file."}
        </p>
      )}
    </div>
  );
}
