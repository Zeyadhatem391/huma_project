"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, SearchX } from "lucide-react";
import { categories, Category, SearchResult } from "../../data/search";

interface Props {
  results: SearchResult[];
  onSelect: () => void;
}

const categoryKeys = Object.keys(categories) as Category[];

export default function SearchDropdown({ results, onSelect }: Props) {
  const [selectedTab, setSelectedTab] = useState<Category | "all">("all");

  const countOf = (type: Category) =>
    results.filter((r) => r.type === type).length;

  const availableTypes = categoryKeys.filter((type) => countOf(type) > 0);

  const activeTab =
    selectedTab !== "all" && availableTypes.includes(selectedTab)
      ? selectedTab
      : "all";

  const visibleTypes = activeTab === "all" ? availableTypes : [activeTab];

  return (
    <div className="fixed inset-x-4 top-20 z-50 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xl sm:absolute sm:inset-x-auto sm:left-0 sm:top-full sm:mt-2 sm:w-[480px]">
      {/* Header + Tabs */}
      <div className="border-b border-gray-100 bg-gray-50/60 p-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-700">
            Found {results.length} results
          </p>

          {results.length > 0 && (
            <span className="text-[11px] text-gray-400">Scroll to explore</span>
          )}
        </div>

        {results.length > 0 && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
            {(["all", ...availableTypes] as const).map((tab) => {
              const label = tab === "all" ? "All" : categories[tab].label;
              const count = tab === "all" ? results.length : countOf(tab);
              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setSelectedTab(tab)}
                  className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition ${
                    active
                      ? "border-[#0057FF] bg-[#0057FF] text-white"
                      : "border-gray-100 bg-white text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {label} ({count})
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Results */}
      <div className="max-h-[min(330px,60vh)] overflow-y-auto p-2">
        {visibleTypes.length === 0 ? (
          <div className="flex flex-col items-center gap-2 py-10 text-gray-400">
            <SearchX className="size-8" />
            <p className="text-sm">No results found</p>
          </div>
        ) : (
          visibleTypes.map((type) => {
            const { label, icon: Icon, color } = categories[type];
            const items = results.filter((r) => r.type === type).slice(0, 5);

            return (
              <div key={type} className="py-1">
                <div className="flex items-center gap-2 px-2 py-2 text-[11px] font-bold uppercase text-gray-400">
                  <Icon
                    className={`size-3.5 bg-transparent ${color.split(" ")[1]}`}
                  />
                  {label} ({items.length})
                </div>

                <ul>
                  {items.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.href}
                        onClick={onSelect}
                        className="group flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-50"
                      >
                        <span
                          className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${color}`}
                        >
                          <Icon className="size-4" />
                        </span>

                        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-900">
                          {item.title}
                        </span>

                        <ExternalLink className="size-3.5 shrink-0 text-gray-300 group-hover:text-[#0057FF]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
