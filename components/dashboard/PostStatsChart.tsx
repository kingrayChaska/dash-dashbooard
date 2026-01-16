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

interface ChartProps {
  data: Array<{
    month: string;
    Jobs: number;
    Projects: number;
    Courses: number;
  }>;
}

export default function PostStatsChart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Jobs" stroke="#3b82f6" />
        <Line type="monotone" dataKey="Projects" stroke="#10b981" />
        <Line type="monotone" dataKey="Courses" stroke="#f59e0b" />
      </LineChart>
    </ResponsiveContainer>
  );
}
