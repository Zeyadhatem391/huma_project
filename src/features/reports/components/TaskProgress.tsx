"use client";

import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useTaskReport from "../hook/useTaskReport";
import { TaskReportItem } from "../api/getTaskReport";

const BLUE = "#005BFF";

export default function TaskProgress() {
  const { data: report, isLoading, isError } = useTaskReport();

  const chart = report?.data.chart;

  const points = useMemo(
    () =>
      (chart?.data ?? []).map((item: TaskReportItem) => {
        const rate =
          item.created_tasks > 0
            ? Math.round((item.completed_tasks / item.created_tasks) * 100)
            : 0;
        return {
          month: item.month,
          year: item.year,
          value: item.is_future ? null : Math.min(rate, 100),
        };
      }),
    [chart],
  );

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 text-gray-800 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Task Completion Time vs Deadline
      </h2>

      <div className="h-72 w-full">
        {isLoading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : isError || !chart ? (
          <p className="text-sm text-red-500">Failed to load chart.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={points}
              margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#f3f4f6"
                strokeDasharray="0"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ className: "fill-gray-400 text-xs" }}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                axisLine={false}
                tickLine={false}
                width={32}
                tick={{ className: "fill-gray-400 text-xs" }}
              />

              <Tooltip
                cursor={{ fill: "#f9fafb" }}
                wrapperClassName="!rounded-lg !border !border-gray-200 !text-xs !shadow-sm"
                labelFormatter={(_, payload) => {
                  const p = payload?.[0]?.payload as
                    | { month: string; year: number }
                    | undefined;
                  return p ? `${p.month} ${p.year}` : "";
                }}
                formatter={(value) => [`${value}%`, "Completion rate"]}
              />

              <Bar
                dataKey="value"
                fill={BLUE}
                barSize={28}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
