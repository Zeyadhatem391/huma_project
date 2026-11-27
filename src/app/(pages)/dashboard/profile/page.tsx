"use client";
import {
  CalendarDays,
  BriefcaseBusiness,
  Settings,
  CheckCircle2,
  Clock,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TabsProfile from "@/features/profile/components/TabsProfile";
import useGetProfile from "@/features/profile/hook/useGetProfile";
import { formatDateTask } from "@/shared/utils/formatDate";
import ProfileSkeleton from "@/shared/skeleton/ProfileSkeleton";
import Link from "next/link";

export default function Page() {
  const { data, isLoading, isError } = useGetProfile();

  if (isLoading) return <ProfileSkeleton />;

  if (isError) {
    return (
      <p className="py-10 text-center text-sm text-red-500">
        Failed to load profile.
      </p>
    );
  }

  const profile = data?.data;
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="relative w-fit">
            <Avatar className="size-20 border-2 border-blue-100">
              <AvatarImage
                src={profile?.user.avatar_url || ""}
                alt={profile?.user.name || "User"}
              />

              <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl font-bold">
                {profile?.user.name?.slice(0, 2).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>

            <Link
              href="/dashboard/profile/edit"
              className="absolute -bottom-0.5 -right-0.5 cursor-pointer flex size-7 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-gray-600 shadow-sm hover:bg-gray-200 transition-colors"
            >
              <Settings size={14} />
            </Link>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">{profile?.user.name}</h1>

            <div className="flex flex-wrap items-center gap-3 text-gray-600">
              <span className="flex items-center gap-1.5">
                <BriefcaseBusiness size={18} />
                {profile?.user.job_title}
              </span>

              <span className="flex items-center gap-1.5">
                <CalendarDays size={18} />
                Joined {formatDateTask(profile?.user.created_at)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between items-center p-5 gap-15 shadow rounded-2xl bg-white">
            <div className="flex flex-col gap-4">
              <p>Completed Tasks</p>
              <span className="text-2xl font-bold">
                {profile?.stats.completed_tasks}
              </span>
            </div>
            <div className={`bg-green-50 text-green-600 p-5 rounded-full`}>
              <CheckCircle2 />
            </div>
          </div>

          <div className="flex justify-between items-center p-5 gap-15 shadow rounded-2xl bg-white">
            <div className="flex flex-col gap-4">
              <p>Total Tasks</p>
              <span className="text-2xl font-bold">
                {profile?.stats.total_tasks}
              </span>
            </div>
            <div className={`bg-orange-50 text-orange-600 p-5 rounded-full`}>
              <Clock />
            </div>
          </div>
        </div>
      </div>

      <TabsProfile profile={profile} />
    </div>
  );
}
