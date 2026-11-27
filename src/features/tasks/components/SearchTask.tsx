"use client";

import { useQueryState } from "nuqs";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

export default function SearchTask() {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
  });

  const [inputValue, setInputValue] = React.useState(search);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setSearch(value || null);
  }, 500);

  React.useEffect(() => {
    setInputValue(search);
  }, [search]);

  function handleSearch(value: string) {
    setInputValue(value);
    debouncedSearch(value);
  }

  return (
    <div className="relative w-70 max-w-xs">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-800"
      />

      <Input
        type="search"
        value={inputValue}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
        className="h-10 w-full rounded-2xl border-gray-50 bg-white pl-10 shadow-none placeholder:font-semibold placeholder:text-gray-800 focus-visible:border-gray-400 focus-visible:ring-0"
      />
    </div>
  );
}
