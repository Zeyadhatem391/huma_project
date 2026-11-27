"use client";

import { useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useTeamReport from "../hook/useTeamReport";

const BLUE = "#005BFF";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function TeamProgress() {
  const { data: report, isLoading, isError } = useTeamReport();

  const teams = report?.data.teams;

  const points = useMemo(
    () =>
      months.map((month, index) => ({
        month,
        value: teams?.[index]?.completion_rate ?? 0,
      })),
    [teams],
  );

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 text-gray-800 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold text-gray-900">
        Team Completion Rate
      </h2>

      <div className="h-[260px] w-full">
        {isLoading ? (
          <p className="text-sm text-gray-400">Loading...</p>
        ) : isError || !teams ? (
          <p className="text-sm text-red-500">Failed to load chart.</p>
        ) : !points.length ? (
          <p className="text-sm text-gray-400">No team data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={points}
              margin={{ top: 8, right: 8, left: 0, bottom: 8 }}
            >
              <CartesianGrid
                horizontal
                vertical={false}
                strokeDasharray="3 3"
                stroke="#f1f5f9"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
              />

              <YAxis
                domain={[0, 100]}
                ticks={[0, 20, 40, 60, 80, 100]}
                tickFormatter={(value) => `${value}%`}
                axisLine={false}
                tickLine={false}
                width={40}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
              />

              <Tooltip
                cursor={{ stroke: BLUE, strokeDasharray: "4 4" }}
                formatter={(value) => [
                  `${Number(value).toFixed(1)}%`,
                  "Completion Rate",
                ]}
                labelFormatter={(label) => `Team: ${label}`}
              />

              <Line
                type="monotone"
                dataKey="value"
                stroke={BLUE}
                strokeWidth={3}
                dot={{ r: 4, fill: BLUE }}
                activeDot={{ r: 6, fill: BLUE, strokeWidth: 0 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
