"use client";

import { useDashboardData } from "../hooks/useDashboardData";
import StatsCard from "../components/dashboard/StatsCard";
import PostStatsChart from "../components/dashboard/PostStatsChart";
import ActivityLog from "../components/dashboard/ActivityLog";
import CompaniesTable from "../components/dashboard/CompaniesTable";

export default function Dashboard() {
  const { stats, chartData, activities, companies } = useDashboardData();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome to Skill Fusion</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#628563] p-4 rounded-lg">
        {stats.map((stat, index) => (
          <StatsCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* Chart and Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#F5F4E6] p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Post Statistics</h3>
            <select
              className="text-sm border rounded p-1"
              title="Select time range"
            >
              <option>Last Month</option>
            </select>
          </div>
          <PostStatsChart data={chartData} />
        </div>
        <div className="bg-[#F5F4E6] p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4">
            <h3 className="font-semibold">Activity Log</h3>
            <select
              className="text-sm border rounded p-1"
              title="Select activity period"
            >
              <option>Today</option>
            </select>
          </div>
          <ActivityLog activities={activities} />
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-[#F5F4E6] p-4 rounded-lg shadow">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">Companies Statistics</h3>
          <select
            className="text-sm border rounded p-1"
            title="Select company stats period"
          >
            <option>Weekly</option>
          </select>
        </div>
        <CompaniesTable companies={companies} />
      </div>
    </div>
  );
}
