import { Download, FileText } from "lucide-react";
import Link from "next/link";
import { DashboardRecentFiles } from "../types/home";

export default function RecentFilesCard({
  data,
}: {
  data: DashboardRecentFiles;
}) {
  const files = data.items.slice(0, 3);

  return (
    <div className="w-full rounded-2xl border bg-white pt-5 shadow-sm space-y-5">
      <div className="flex w-full items-center justify-between px-5">
        <h2 className="text-xl font-bold text-gray-900">Recent Files</h2>

        <Link
          href="/dashboard/files"
          className="flex items-center gap-1 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700"
        >
          View All
        </Link>
      </div>

      <div className="w-full">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex w-full min-w-0 items-center justify-between gap-3 border-y border-gray-200 px-3 py-5 transition hover:border-blue-200 hover:shadow-sm"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText size={23} />
              </div>

              <div className="min-w-0 space-y-1">
                <p className="truncate font-semibold text-gray-900">
                  {file.name}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <p className="truncate">By {file.uploaded_by.name}</p>
                  <span className="h-1 w-1 rounded-full bg-gray-400" />

                  <span>{file.file_size_formatted}</span>
                </div>
              </div>
            </div>

            <button className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600">
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
