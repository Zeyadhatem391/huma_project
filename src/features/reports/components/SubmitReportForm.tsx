import { CalendarDays, Sparkle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SubmitReportForm() {
  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 text-gray-800 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Submit a detailed report
        </h2>
        <span className="flex items-start text-xl font-medium text-[#005BFF]">
          Ai
          <Sparkle className="size-3 fill-[#005BFF]" />
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <Select>
          <SelectTrigger className="!h-12 w-full rounded-xl border-gray-300 px-4 text-sm text-gray-400 data-[placeholder]:text-gray-400">
            <SelectValue placeholder="Select Report Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Add Note"
          className="h-12 rounded-xl border-gray-300 px-4 text-sm placeholder:text-gray-400"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="relative">
            <Input
              placeholder="Start Date"
              className="h-12 rounded-xl border-blue-100 px-4 pr-11 text-sm placeholder:text-gray-400"
            />
            <CalendarDays className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-gray-800" />
          </div>

          <div className="relative">
            <Input
              placeholder="End Date"
              className="h-12 rounded-xl border-blue-100 px-4 pr-11 text-sm placeholder:text-gray-400"
            />
            <CalendarDays className="pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-gray-800" />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            type="button"
            className="h-11 rounded-full bg-[#005BFF] px-8 text-sm font-medium text-white hover:bg-[#0049cc]"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
