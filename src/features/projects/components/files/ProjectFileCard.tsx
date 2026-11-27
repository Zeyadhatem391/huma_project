import { timeAgo } from "@/shared/utils/formatDate";
import { Download } from "lucide-react";
import { FaFilePdf } from "react-icons/fa";
import useGetFilesProject from "../../hook/useGetFilesProject";
import { ProjectFilesSkeleton } from "../../../../shared/skeleton/ProjectFilesSkeleton";
import { ProjectFile } from "../../api/getFilesProject";

export default function ProjectFileCard({ id }: { id: number }) {
  const { data, isLoading, isError } = useGetFilesProject(id);
  const files: ProjectFile[] = data?.data.data ?? [];

  {
    isLoading && <ProjectFilesSkeleton />;
  }

  {
    isError && (
      <p className="py-8 text-center text-sm text-red-500">
        Failed to load project files.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex min-w-0 items-center justify-between gap-3 rounded-xl border border-gray-300 bg-white py-3 pl-5 pr-4"
        >
          <div className="flex min-w-0 items-center gap-4">
            <FaFilePdf className="h-9 w-8 shrink-0 text-red-500" />

            <div className="min-w-0">
              <p className="truncate text-base font-medium leading-6 text-gray-900">
                {file.name}
              </p>

              <p className="truncate text-sm leading-5 text-gray-700">
                By {file.uploaded_by}
              </p>

              <div className="mt-1 flex items-center gap-1.5 text-xs text-gray-700">
                <span>{file.file_size_formatted}</span>
                <span>•</span>
                <span>{timeAgo(file.created_at)}</span>
              </div>
            </div>
          </div>

          <a
            href={file.url}
            target="_blank"
            rel="noopener noreferrer"
            download
            aria-label={`Download ${file.name}`}
            className="shrink-0 rounded-lg p-2 text-gray-900 transition hover:bg-gray-100"
          >
            <Download size={22} />
          </a>
        </div>
      ))}
    </div>
  );
}
