import {
  CalendarDays,
  BriefcaseBusiness,
  Settings,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TabsProfile from "@/features/profile/components/TabsProfile";
import { stats } from "@/features/profile/data/profile";

export default function Page() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-center gap-4">
          <div className="relative w-fit">
            <Avatar className="size-20 border-2 border-blue-100">
              <AvatarImage src="" alt="Zeyad Hatem" />
              <AvatarFallback className="bg-blue-100 text-blue-700 text-2xl font-bold">
                ZH
              </AvatarFallback>
            </Avatar>

            <button className="absolute -bottom-0.5 -right-0.5 cursor-pointer flex size-7 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-gray-600 shadow-sm hover:bg-gray-200 transition-colors">
              <Settings size={14} />
            </button>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Zeyad Hatem</h1>

            <div className="flex flex-wrap items-center gap-3 text-gray-600">
              <span className="flex items-center gap-1.5">
                <BriefcaseBusiness size={18} />
                UI/UX Designer
              </span>

              <span className="flex items-center gap-1.5">
                <CalendarDays size={18} />
                Joined Apr 2022
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="flex justify-between items-center p-5 gap-15 shadow rounded-2xl bg-white"
              >
                <div className="flex flex-col gap-4">
                  <p>{stat.title}</p>
                  <span className="text-2xl font-bold">{stat.value}</span>
                </div>
                <div className={`${stat.bg} ${stat.color} p-5 rounded-full`}>
                  <Icon />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TabsProfile />
    </div>
  );
}
