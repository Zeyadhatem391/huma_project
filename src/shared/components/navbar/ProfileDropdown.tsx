"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ChevronDown, LogOut, UserRound } from "lucide-react";
import { logoutUser } from "@/shared/api/logout";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  job_title: string | null;
  avatar_url: string | null;
  roles: string[];
}

interface Props {
  user: User;
}

export default function ProfileDropdown({ user }: Props) {
  const router = useRouter();

  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleLogout = async () => {
    const token = Cookies.get("token");

    if (!token) {
      Cookies.remove("token");
      Cookies.remove("roles");
      Cookies.remove("user");

      router.replace("/login");
      router.refresh();
      return;
    }

    try {
      const response = await logoutUser(token);

      Cookies.remove("token");
      Cookies.remove("roles");
      Cookies.remove("user");

      toast.success(response.message);

      router.replace("/login");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong";

      toast.error(message);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="group flex shrink-0 cursor-pointer items-center gap-3 rounded-xl p-2 transition-colors hover:bg-gray-100 focus-visible:ring-0">
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-sm font-semibold text-gray-900">
              {user.name}
            </span>

            <span className="text-xs text-gray-500">
              {user.job_title || user.roles?.[0] || "User"}
            </span>
          </div>

          <Avatar className="size-11 border border-gray-200">
            <AvatarImage src={user.avatar_url || ""} alt={user.name} />

            <AvatarFallback className="bg-blue-100 font-semibold text-blue-700">
              {initials}
            </AvatarFallback>
          </Avatar>

          <ChevronDown
            size={15}
            className="text-gray-400 transition-transform group-data-[state=open]:rotate-180"
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-60 rounded-xl p-2"
      >
        <DropdownMenuLabel className="px-3 py-2">
          <p className="text-sm font-semibold text-gray-900">{user.name}</p>
          <p className="truncate text-xs font-normal text-gray-500">
            {user.email}
          </p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild className="cursor-pointer rounded-lg py-2.5">
          <Link href="/dashboard/profile">
            <UserRound className="mr-2 size-4" />
            Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer rounded-lg py-2.5 text-red-600 focus:bg-red-50 focus:text-red-600"
        >
          <LogOut className="mr-2 size-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
