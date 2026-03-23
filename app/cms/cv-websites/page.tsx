"use client";

import { useState } from "react";
import { FileText, ExternalLink, Search, Plus, Globe, Eye, Edit2 } from "lucide-react";
import { cn } from "../../../utils/formatDate";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface CVWebsite {
  id: string | number;
  name: string;
  owner: string;
  url: string;
  status: "live" | "draft" | "archived";
  lastUpdated: string;
  views: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockWebsites: CVWebsite[] = [
  {
    id: 1,
    name: "Raymond Bamidele — Portfolio",
    owner: "Raymond Bamidele",
    url: "raymond.chaska.io",
    status: "live",
    lastUpdated: "2024-03-10",
    views: 1240,
  },
  {
    id: 2,
    name: "Amara Osei — Creative CV",
    owner: "Amara Osei",
    url: "amara.chaska.io",
    status: "live",
    lastUpdated: "2024-03-08",
    views: 870,
  },
  {
    id: 3,
    name: "Leke Adeyemi — Dev CV",
    owner: "Leke Adeyemi",
    url: "leke.chaska.io",
    status: "draft",
    lastUpdated: "2024-03-05",
    views: 0,
  },
  {
    id: 4,
    name: "Chisom Eze — Marketing CV",
    owner: "Chisom Eze",
    url: "chisom.chaska.io",
    status: "archived",
    lastUpdated: "2024-01-20",
    views: 340,
  },
];

// ============================================================================
// SHARED STYLES
// ============================================================================

const statusStyles: Record<CVWebsite["status"], string> = {
  live: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  draft: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  archived: "bg-[#1a1a24] text-[#4b5563] border border-[#2a2a34]",
};

// ============================================================================
// WEBSITE CARD COMPONENT
// ============================================================================

interface WebsiteCardProps {
  website: CVWebsite;
}

function WebsiteCard({ website }: WebsiteCardProps) {
  const formattedDate = new Date(website.lastUpdated).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-[#111118] border border-[#c9a84c]/15 rounded-xl p-5 group hover:border-[#c9a84c]/40 hover:shadow-[0_0_20px_rgba(201,168,76,0.05)] transition-all duration-300">
      {/* Top gold line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/0 group-hover:via-[#c9a84c]/40 to-transparent transition-all duration-300 rounded-t-xl" />

      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 bg-[#c9a84c]/10 border border-[#c9a84c]/20 rounded-lg shrink-0">
            <Globe size={16} className="text-[#c9a84c]" />
          </div>
          <div className="min-w-0">
            <h3
              className="text-[#d1d5db] font-medium truncate group-hover:text-[#e8c96a] transition-colors duration-200"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.95rem" }}
            >
              {website.name}
            </h3>
            <p
              className="text-[#4b5563] text-xs mt-0.5 truncate"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {website.url}
            </p>
          </div>
        </div>
        <span
          className={cn(
            "text-[10px] px-2.5 py-1 rounded-full font-medium capitalize tracking-wide shrink-0",
            statusStyles[website.status],
          )}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {website.status}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-[#4b5563]">
            <Eye size={12} />
            <span
              className="text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {website.views.toLocaleString()} views
            </span>
          </div>
          <span
            className="text-xs text-[#4b5563]"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Updated {formattedDate}
          </span>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            className="p-1.5 hover:bg-[#1a1a24] rounded-lg transition-colors"
            aria-label="Edit website"
          >
            <Edit2 size={13} className="text-[#6b7280] hover:text-[#c9a84c]" />
          </button>
          <button
            className="p-1.5 hover:bg-[#1a1a24] rounded-lg transition-colors"
            aria-label="Open website"
          >
            <ExternalLink size={13} className="text-[#6b7280] hover:text-[#c9a84c]" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN CV WEBSITES PAGE
// ============================================================================

export default function CVWebsitesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<CVWebsite["status"] | "all">("all");

  const filtered = mockWebsites.filter((site) => {
    const matchesSearch =
      searchQuery === "" ||
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.owner.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || site.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const liveCount = mockWebsites.filter((s) => s.status === "live").length;
  const draftCount = mockWebsites.filter((s) => s.status === "draft").length;
  const archivedCount = mockWebsites.filter((s) => s.status === "archived").length;

  return (
    <div
      className="space-y-6"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#c9a84c]/10 border border-[#c9a84c]/25 rounded-lg">
            <FileText className="text-[#c9a84c]" size={20} />
          </div>
          <div>
            <h1
              className="text-[#d1d5db] font-medium leading-tight"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}
            >
              CV Websites
            </h1>
            <p className="text-[#4b5563] text-xs mt-0.5 tracking-wide">
              Manage student CV website deployments
            </p>
          </div>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] rounded-lg text-sm
            hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all duration-200"
        >
          <Plus size={15} />
          <span style={{ fontFamily: "'DM Sans', sans-serif" }}>New Website</span>
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Live", value: liveCount, color: "text-emerald-400" },
          { label: "Draft", value: draftCount, color: "text-amber-400" },
          { label: "Archived", value: archivedCount, color: "text-[#6b7280]" },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="bg-[#111118] border border-[#c9a84c]/15 rounded-xl p-4 text-center"
          >
            <div
              className={`text-3xl font-light ${color}`}
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {value}
            </div>
            <div className="text-[#6b7280] text-xs uppercase tracking-widest mt-1">
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4b5563]" size={14} />
          <input
            type="text"
            placeholder="Search by name or owner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#111118] border border-[#c9a84c]/20 text-[#d1d5db] text-sm rounded-lg
              placeholder:text-[#4b5563] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
          />
        </div>

        <div className="flex gap-2">
          {(["all", "live", "draft", "archived"] as const).map((option) => (
            <button
              key={option}
              onClick={() => setStatusFilter(option)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs capitalize tracking-wide transition-all duration-200",
                statusFilter === option
                  ? "bg-[#c9a84c]/15 text-[#e8c96a] border border-[#c9a84c]/40"
                  : "bg-[#111118] text-[#6b7280] border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 hover:text-[#d1d5db]",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Websites Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((website) => (
            <div key={website.id} className="relative">
              <WebsiteCard website={website} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-[#111118] border border-[#c9a84c]/15 rounded-xl p-12 text-center">
          <FileText className="mx-auto text-[#2a2a34] mb-4" size={40} />
          <h3
            className="text-[#6b7280] mb-1"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}
          >
            No websites found
          </h3>
          <p className="text-[#4b5563] text-xs">
            {searchQuery ? "Try a different search term" : "No websites match your filter"}
          </p>
        </div>
      )}
    </div>
  );
}