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
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#628563] p-4 rounded-lg">
        {stats.map((stat, index) => (
          <StatsCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* Chart and Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bg-[#628563] p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4">
            <h3 className="text-gray-200 font-semibold">Post Statistics</h3>
            <select
              className="text-sm border rounded p-1"
              title="Select time range"
            >
              <option className="text-gray-500">Two Months Ago</option>
              <option className="text-gray-500">Last Month</option>
              <option className="text-gray-500">This Month</option>
            </select>
            <select
              className="text-sm border rounded p-1"
              title="Select time range"
            >
              <option className="text-gray-500">Jobs Only</option>
            </select>
          </div>
          <PostStatsChart data={chartData} />
        </div>
        <div className="bg-[#628563] p-4 rounded-lg shadow">
          <div className="flex justify-between mb-4">
            <h3 className="text-gray-200 font-semibold">Activity Log</h3>
            <select
              className="text-sm text-gray-200 border rounded p-1"
              title="Select activity period"
            >
              <option>Today</option>
            </select>
          </div>
          <ActivityLog activities={activities} />
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-[#628563] p-4 rounded-lg shadow">
        <div className="text-gray-200 flex justify-between mb-4">
          <h3 className=" font-semibold">Companies Statistics</h3>
          <select
            className="text-sm border rounded p-1"
            title="Select company stats period"
          >
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Daily</option>
          </select>
        </div>
        <CompaniesTable companies={companies} />
      </div>
    </div>
  );
}
