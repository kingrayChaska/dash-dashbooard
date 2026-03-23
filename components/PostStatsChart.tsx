"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ChartDataPoint {
  month: string;
  Jobs: number;
  Projects: number;
  Courses: number;
}

interface ChartProps {
  data: ChartDataPoint[];
}

// ============================================================================
// CUSTOM TOOLTIP
// ============================================================================

interface TooltipRendererProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color?: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: TooltipRendererProps) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className="bg-[#111118] border border-[#c9a84c]/30 rounded-lg px-4 py-3 shadow-xl shadow-black/40"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <p className="text-[#c9a84c] text-xs uppercase tracking-widest mb-2">
        {label}
      </p>
      {payload?.map(
        (entry: { name: string; value: number | string; color?: string }) => (
          <div key={entry.name} className="flex items-center gap-2 text-sm">
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[#6b7280]">{entry.name}:</span>
            <span className="text-[#d1d5db] font-medium">{entry.value}</span>
          </div>
        ),
      )}
    </div>
  );
}

// ============================================================================
// MAIN CHART COMPONENT
// ============================================================================

const CHART_LINES: {
  key: keyof Omit<ChartDataPoint, "month">;
  color: string;
}[] = [
  { key: "Jobs", color: "#c9a84c" },
  { key: "Projects", color: "#6366f1" },
  { key: "Courses", color: "#10b981" },
];

export default function PostStatsChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <defs>
          {CHART_LINES.map(({ key, color }) => (
            <linearGradient
              key={key}
              id={`gradient-${key}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#1a1a24"
          vertical={false}
        />
        <XAxis
          dataKey="month"
          stroke="#2a2a34"
          tick={{
            fill: "#6b7280",
            fontSize: 11,
            fontFamily: "'DM Sans', sans-serif",
          }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          stroke="#2a2a34"
          tick={{
            fill: "#6b7280",
            fontSize: 11,
            fontFamily: "'DM Sans', sans-serif",
          }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#c9a84c20" }} />
        <Legend
          wrapperStyle={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "12px",
            color: "#6b7280",
            paddingTop: "16px",
          }}
        />

        {CHART_LINES.map(({ key, color }) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={color}
            strokeWidth={2}
            dot={{ fill: color, strokeWidth: 0, r: 3 }}
            activeDot={{ r: 5, fill: color, stroke: "#111118", strokeWidth: 2 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
