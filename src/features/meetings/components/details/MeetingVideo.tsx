import { VideoOff } from "lucide-react";

export default function MeetingVideo() {
  return (
    <div className="flex aspect-video items-center justify-center overflow-hidden rounded-3xl border border-gray-200 bg-gray-50 lg:aspect-[751/323]">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-gray-100">
          <VideoOff className="size-8 text-gray-400" />
        </div>

        <div className="space-y-1">
          <h3 className="font-semibold text-gray-700">
            No Recording Available
          </h3>
          <p className="text-sm text-gray-500">
            The meeting recording hasn't been uploaded yet.
          </p>
        </div>
      </div>
    </div>
  );
}