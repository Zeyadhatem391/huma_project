import { ChevronDown } from "lucide-react";

export default function FilterProject() {
  return (
    <div className="flex gap-4">
      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-gray-800 px-3 py-2 text-sm text-gray-900 transition hover:bg-gray-50"
      >
        All Projects
        <ChevronDown size={20} className="text-gray-900" />
      </button>

      <button
        type="button"
        className="flex items-center gap-2 rounded-xl border border-gray-800 px-3 py-2 text-sm text-gray-900 transition hover:bg-gray-50"
      >
        Newest
        <ChevronDown size={20} className="text-gray-900" />
      </button>
    </div>
  );
}
