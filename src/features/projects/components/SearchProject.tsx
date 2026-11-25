import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchProject() {
  return (
    <div className="relative max-w-xs w-70">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800"
      />

      <Input
        type="search"
        placeholder="Search..."
        className="h-10 w-full placeholder:text-gray-800 placeholder:font-semibold rounded-2xl border-gray-50 bg-white pl-10 shadow-none focus-visible:border-gray-400 focus-visible:ring-0"
      />
    </div>
  );
}
