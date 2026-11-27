import { File } from "lucide-react";
import { ProfileResponse } from "../api/getProfile";
import { timeAgo } from "@/shared/utils/formatDate";

export default function OverviewProfile({
  profile,
}: {
  profile?: ProfileResponse["data"];
}) {
  const recent = profile?.recent_activities ?? [];

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">About</h1>
        <p className="w-1/2">{profile?.user.about}</p>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Recent Activities</h1>

        {recent.length > 0 ? (
          recent.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between gap-4 w-1/2"
            >
              <div className="flex min-w-0 items-center gap-3">
                <File className=" text-yellow-600" size={20} />

                <p className=" text-gray-700">
                  {activity.description}
                </p>
              </div>

              <span className="shrink-0 text-xs text-gray-500">
                {timeAgo(activity.created_at)}
              </span>
            </div>
          ))
        ) : (
          <p className="py-5 text-center text-sm text-gray-500">
            No recent activities found.
          </p>
        )}
      </div>
    </div>
  );
}