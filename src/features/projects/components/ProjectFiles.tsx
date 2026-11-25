import { Download, FileText } from "lucide-react";

const files = [
  {
    id: 1,
    name: "Design mockups",
    uploadedBy: "Ahmed Hassan",
    size: "6.4 MB",
    time: "1h ago",
  },
  {
    id: 2,
    name: "Design mockups",
    uploadedBy: "Ahmed Hassan",
    size: "6.4 MB",
    time: "1h ago",
  },
  {
    id: 3,
    name: "Design mockups",
    uploadedBy: "Ahmed Hassan",
    size: "6.4 MB",
    time: "1h ago",
  },
];

export default function ProjectFiles() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {files.map((file) => (
        <div
          key={file.id}
          className="flex min-w-0 items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:border-blue-200 hover:shadow-md"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={25} />
            </div>

            <div className="min-w-0 space-y-1">
              <p className="truncate font-semibold text-gray-900">
                {file.name}
              </p>

              <p className="truncate text-sm text-gray-500">
                By {file.uploadedBy}
              </p>

              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>{file.size}</span>
                <span className="h-1 w-1 rounded-full bg-gray-400" />
                <span>{file.time}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="shrink-0 rounded-lg p-2 text-gray-400 transition hover:bg-blue-50 hover:text-blue-600"
          >
            <Download size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}
