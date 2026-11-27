import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TranscriptPanel() {
  return (
    <aside className="rounded-2xl border border-gray-100 bg-white p-4 lg:mt-5 lg:pt-16">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl font-medium text-gray-950">
          Meeting Transcripts
        </h2>

        <Select defaultValue="en">
          <SelectTrigger
            aria-label="Language"
            className="!h-10 w-[88px] rounded-xl border-gray-400 text-xs"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="relative mt-5">
        <Search className="absolute left-5 top-1/2 size-4 -translate-y-1/2 text-gray-900" />
        <Input
          aria-label="Search transcript"
          placeholder="Search Transcript"
          className="h-10 rounded-full border-0 bg-gray-100 pl-11 shadow-none placeholder:text-gray-700"
        />
      </div>

      <div className="text-center pt-8 text-gray-600">
        Not Meeting Transcripts
      </div>
    </aside>
  );
}
