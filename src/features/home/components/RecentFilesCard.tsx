import { Download } from "lucide-react";
import { scrollbarClass } from "@/shared/utils/scrollbar";
import { DashboardRecentFiles } from "../api/getAllDataDashboard";
import { FaFilePdf } from "react-icons/fa";

export default function RecentFilesCard({
  data,
}: {
  data: DashboardRecentFiles;
}) {
  return (
    <div className="group w-full space-y-5 rounded-2xl border bg-white pt-5 shadow-sm">
      <div className="px-5">
        <h2 className="text-xl font-bold text-gray-900">Recent Files</h2>
      </div>

      <div className={`mr-1.5 h-[300px] ${scrollbarClass}`}>
        {data.items.map((file) => (
          <div
            key={file.id}
            className="flex w-full min-w-0 items-center justify-between gap-3 border-y border-gray-200 py-5 pl-3 pr-1.5 transition hover:border-blue-200 hover:shadow-sm"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <FaFilePdf size={23} />
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

            <button className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-red-50 hover:text-red-600 cursor-pointer">
              <Download size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
