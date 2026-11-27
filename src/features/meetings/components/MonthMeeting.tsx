
"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function MonthMeeting() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 1));

  const changeMonth = (value: number) => {
    setCurrentDate((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() + value, 1);
    });
  };

  const month = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center gap-4">
      <ChevronLeft
        size={20}
        className="cursor-pointer"
        onClick={() => changeMonth(-1)}
      />

      <p className="font-semibold">{month}</p>

      <ChevronRight
        size={20}
        className="cursor-pointer"
        onClick={() => changeMonth(1)}
      />
    </div>
  );
}
