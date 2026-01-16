"use client";
import { useState } from "react";
import { mockStats } from "../data/mockStats";
import { mockChartData } from "../data/mockChartData";
import { mockActivities } from "../data/mockActivities";
import { mockCompanies } from "../data/mockCompanies";

export function useDashboardData() {
  const [stats] = useState(mockStats);
  const [chartData] = useState(mockChartData);
  const [activities] = useState(mockActivities);
  const [companies] = useState(mockCompanies);

  // Example: Add filtering logic here if needed
  return { stats, chartData, activities, companies };
}
