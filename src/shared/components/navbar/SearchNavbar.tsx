"use client";

import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { mockResults } from "../../data/search";
import SearchDropdown from "./SearchDropdown";

export default function SearchNavbar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const results = mockResults.filter((item) =>
    item.title.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    function handleOutside(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", handleOutside);
    return () => document.removeEventListener("pointerdown", handleOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
      }}
      className="relative w-50 sm:w-72"
    >
      <Search
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-800"
      />

      <Input
        type="search"
        aria-label="Search"
        placeholder="search project, task, user..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        className="h-11 w-full rounded-2xl border-gray-50 bg-gray-100 px-10 shadow-none placeholder:text-sm placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:ring-0 [&::-webkit-search-cancel-button]:hidden"
      />

      {query && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => {
            setQuery("");
            setOpen(false);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-800"
        >
          <X size={16} />
        </button>
      )}

      {open && query.trim() && (
        <SearchDropdown results={results} onSelect={() => setOpen(false)} />
      )}
    </div>
  );
}
