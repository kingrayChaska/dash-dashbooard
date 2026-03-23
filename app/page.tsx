"use client";

import { useDashboardData } from "../hooks/useDashboardData";
import StatsCard from "../components/StatsCard";
import PostStatsChart from "../components/PostStatsChart";
import ActivityLog from "../components/ActivityLog";
import CompaniesTable from "../components/CompaniesTable";

const cardClass =
  "bg-[#111118] border border-[#c9a84c]/20 rounded-xl p-5 shadow-xl shadow-black/30";

const selectClass =
  "text-xs bg-[#1a1a24] border border-[#c9a84c]/20 text-[#6b7280] rounded-lg px-3 py-1.5 outline-none hover:border-[#c9a84c]/40 focus:border-[#c9a84c]/50 transition-colors cursor-pointer";

interface SectionHeaderProps {
  title: string;
  children?: React.ReactNode;
}

function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h3
        className="text-[#d1d5db] font-light"
        style={{ fontFamily: "'Cormorant Garant', serif", fontSize: "1.15rem" }}
      >
        {title}
      </h3>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

// ============================================================================
// MAIN DASHBOARD PAGE
// ============================================================================

export default function Dashboard() {
  const { stats, chartData, activities, companies } = useDashboardData();

  return (
    <div className="space-y-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((stat, index) => (
          <StatsCard key={index} title={stat.title} value={stat.value} />
        ))}
      </div>

      {/* Chart and Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Post Statistics */}
        <div className={cardClass}>
          <SectionHeader title="Post Statistics">
            <select className={selectClass} title="Select time range">
              <option>Two Months Ago</option>
              <option>Last Month</option>
              <option>This Month</option>
            </select>
            <select className={selectClass} title="Filter by type">
              <option>All Types</option>
              <option>Jobs Only</option>
              <option>Projects Only</option>
              <option>Courses Only</option>
            </select>
          </SectionHeader>
          <PostStatsChart data={chartData} />
        </div>

        {/* Activity Log */}
        <div className={cardClass}>
          <SectionHeader title="Activity Log">
            <select className={selectClass} title="Select activity period">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </SectionHeader>
          <ActivityLog activities={activities} />
        </div>
      </div>

      {/* Companies Table */}
      <div className={cardClass}>
        <SectionHeader title="Companies Statistics">
          <select className={selectClass} title="Select company stats period">
            <option>Monthly</option>
            <option>Weekly</option>
            <option>Daily</option>
          </select>
        </SectionHeader>
        <CompaniesTable companies={companies} />
      </div>
    </div>
  );
}
