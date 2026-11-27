"use client";

import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useProjectReport from "../hook/useProjectReport";
import { ProjectReportItem } from "../api/getProjectReport";

const GREEN = "#4ade80";

export default function ProjectsProgress() {
  const { data: report, isLoading, isError } = useProjectReport();

  const chart = report?.data.chart;

  const points = useMemo(
    () =>
      (chart?.data ?? []).map((item: ProjectReportItem) => ({
        month: item.month,
        year: item.year,
        value: item.is_future ? null : item.completed_tasks,
      })),
    [chart],
  );

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 text-gray-800 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Projects Progress
      </h2>

      <div className="h-72 w-full">
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-gray-400">Loading chart...</p>
          </div>
        ) : isError || !chart ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-sm text-red-500">Failed to load chart.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={points}
              margin={{ top: 10, right: 15, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="projectsProgressFill"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={GREEN} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={GREEN} stopOpacity={0.02} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                stroke="#f1f5f9"
                strokeDasharray="4 4"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={12}
                tick={{ fill: "#9ca3af", fontSize: 14 }}
              />

              <YAxis
                domain={[10, 100]}
                ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                allowDecimals={false}
                axisLine={false}
                tickLine={false}
                width={35}
                tickMargin={1}
                tick={{ fill: "#9ca3af", fontSize: 13 }}
              />

              <Tooltip
                cursor={{
                  stroke: GREEN,
                  strokeWidth: 1,
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  fontSize: "12px",
                }}
                labelFormatter={(_, payload) => {
                  const p = payload?.[0]?.payload as
                    | { month: string; year: number }
                    | undefined;

                  return p ? `${p.month} ${p.year}` : "";
                }}
                formatter={(value) => [`${value ?? 0}`, "Completed tasks"]}
              />

              <Area
                type="monotone"
                dataKey="value"
                stroke={GREEN}
                strokeWidth={2.5}
                fill="url(#projectsProgressFill)"
                activeDot={{
                  r: 5,
                  fill: GREEN,
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
                connectNulls={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
