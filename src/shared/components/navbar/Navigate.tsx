"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { name: "Dashboard", route: "/" },
  { name: "Projects", route: "/dashboard/projects" },
  { name: "Tasks", route: "/dashboard/tasks" },
  { name: "Chats", route: "/dashboard/chats" },
  { name: "Meetings", route: "/dashboard/meetings" },
  { name: "Reports", route: "/dashboard/reports" },
];

export default function Navigate() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-2 rounded-full bg-gray-100 p-1">
      {routes.map((item) => {
        const isActive = pathname === item.route;

        return (
          <Link
            key={item.route}
            href={item.route}
            className={`
               px-4 py-2.5 text-sm font-medium
              transition-all duration-300 ease-in-out
              rounded-full
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-600 hover:bg-white hover:text-gray-900"
              }
            `}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
}
