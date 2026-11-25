import { Bell } from "lucide-react";
import Link from "next/link";

export default function Notifications() {
  return (
    <Link
      href="/notifications"
      className="relative flex h-10 w-10 items-center justify-center rounded-full cursor-pointer text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
    >
      <Bell size={23} />

      <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500" />
    </Link>
  );
}
