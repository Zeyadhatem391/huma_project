"use client";
import MeetingHeader from "@/features/meetings/components/details/MeetingHeader";
import MeetingTabs from "@/features/meetings/components/details/MeetingTabs";
import MeetingVideo from "@/features/meetings/components/details/MeetingVideo";
import TranscriptPanel from "@/features/meetings/components/details/TranscriptPanel";
import useGetMeeting from "@/features/meetings/hook/useGetMeeting";
import MeetingSkeleton from "@/shared/skeleton/MeetingSkeleton";
import { useParams } from "next/navigation";

export default function MeetingDetailsPage() {
  const params = useParams();
  const meetingId = Number(params.meetingId);
  const { data, isError, isLoading } = useGetMeeting(meetingId);

  const meeting = data?.data;

  if (isLoading) return <MeetingSkeleton />;

  if (isError || !meeting) {
    return <p>Meeting not found.</p>;
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,751fr)_minmax(0,528fr)]">
      <div className="space-y-6">
        <MeetingHeader meeting={meeting} />
        <MeetingVideo />
        <MeetingTabs meeting={meeting}/>
      </div>

      <TranscriptPanel />
    </div>
  );
}
