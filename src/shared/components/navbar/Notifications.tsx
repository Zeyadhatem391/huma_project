"use client";

import { Bell } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Notifications() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
        >
          <Bell size={23} />

          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={8}
        className="w-90 rounded-xl p-0"
      >
        <div className="flex flex-col gap-0.5 border-b px-4 py-2">
          <h2 className="font-bold text-xl text-gray-900">Notifications</h2>

          <p className="text-gray-600"> 0 unread</p>
        </div>

        <div className="p-6 text-center">
          <Bell className="mx-auto mb-2 text-gray-400" size={28} />
          <p className="text-sm font-medium text-gray-700">
            No notifications yet
          </p>
          <p className="mt-1 text-xs text-gray-500">You're all caught up!</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
