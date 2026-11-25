"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface GrowthChartItem {
  label: string;
  month: string;
  is_future: boolean;
  created_tasks: number;
}

interface GrowthChartProps {
  data: GrowthChartItem[];
  year: number;
}

export default function GrowthChart({ data, year }: GrowthChartProps) {
  const chartData = data.filter((item) => !item.is_future);

  return (
    <div className="w-full rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Project overview
        </h2>

        <span className="text-sm text-gray-500">{year}</span>
      </div>

      <div className="h-[260px] w-full sm:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{
              top: 10,
              right: 5,
              left: -15,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="projectGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#E5E7EB"
              strokeDasharray="0"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748B" }}
              tickMargin={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#64748B" }}
              tickFormatter={(value) =>
                value >= 1000 ? `${value / 1000}k` : value
              }
              width={40}
              allowDecimals={false}
              domain={[0, "auto"]}
            />

            <Tooltip
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.label ?? ""
              }
              formatter={(value, name) => [
                value ?? 0,
                name === "created_tasks" ? "Created Tasks" : name,
              ]}
              contentStyle={{
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              }}
              labelStyle={{
                fontWeight: 600,
                marginBottom: 4,
                color: "#111827",
              }}
            />

            <Area
              type="monotone"
              dataKey="created_tasks"
              name="Created Tasks"
              stroke="#3B82F6"
              strokeWidth={2}
              fill="url(#projectGradient)"
              activeDot={{
                r: 5,
                fill: "#3B82F6",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              }}
              dot={false}
              connectNulls
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
