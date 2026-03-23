"use client";

import { useState, useEffect } from "react";
import React from "react";
import {
  Bell,
  X,
  Calendar,
  User,
  Pin,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import { cn } from "../../utils/formatDate";
import {
  announcements as initialAnnouncements,
  Announcement,
} from "../../data/mockAnnouncements";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type Priority = "low" | "medium" | "high";
type FilterType = "all" | "pinned" | Priority;

interface AnnouncementCardProps {
  announcement: Announcement;
  onClick: () => void;
  isNew?: boolean;
}

interface AnnouncementModalProps {
  announcement: Announcement | null;
  onClose: () => void;
}

interface AnnouncementsPageProps {
  onUnreadCountChange?: (count: number) => void;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatFullDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

// ============================================================================
// SHARED STYLES
// ============================================================================

const priorityBadgeStyles: Record<Priority, string> = {
  low: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  medium: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  high: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
};

const priorityDotStyles: Record<Priority, string> = {
  low: "bg-blue-400",
  medium: "bg-amber-400",
  high: "bg-rose-400",
};

// ============================================================================
// STAT CARD SUBCOMPONENT
// ============================================================================

interface StatTileProps {
  value: number;
  label: string;
  valueClass?: string;
}

function StatTile({
  value,
  label,
  valueClass = "text-[#e8c96a]",
}: StatTileProps) {
  return (
    <div className="bg-[#111118] border border-[#c9a84c]/20 rounded-xl p-4 hover:border-[#c9a84c]/40 transition-colors duration-200">
      <div
        className={`text-3xl font-light mb-1 ${valueClass}`}
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {value}
      </div>
      <div
        className="text-xs text-[#6b7280] uppercase tracking-widest"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {label}
      </div>
    </div>
  );
}

// ============================================================================
// ANNOUNCEMENT CARD COMPONENT
// ============================================================================

function AnnouncementCard({
  announcement,
  onClick,
  isNew = false,
}: AnnouncementCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative bg-[#111118] border rounded-xl p-5 cursor-pointer group",
        "hover:border-[#c9a84c]/50 hover:shadow-[0_0_20px_rgba(201,168,76,0.06)]",
        "transition-all duration-300",
        announcement.isPinned ? "border-[#c9a84c]/40" : "border-[#c9a84c]/15",
      )}
    >
      {/* Gold top line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/0 to-transparent group-hover:via-[#c9a84c]/40 transition-all duration-300 rounded-t-xl" />

      {isNew && (
        <div
          className="absolute -top-2 -right-2 bg-[#c9a84c] text-[#0a0a0f] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          NEW
        </div>
      )}

      <div className="flex items-start justify-between mb-3 gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {announcement.isPinned && (
            <Pin size={14} className="text-[#c9a84c] fill-[#c9a84c] shrink-0" />
          )}
          <h3
            className="font-medium text-[#d1d5db] line-clamp-1 group-hover:text-[#e8c96a] transition-colors duration-200"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1rem",
            }}
          >
            {announcement.title}
          </h3>
        </div>
        <span
          className={cn(
            "text-[10px] px-2.5 py-1 rounded-full font-medium whitespace-nowrap capitalize tracking-wide shrink-0",
            priorityBadgeStyles[announcement.priority],
          )}
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {announcement.priority}
        </span>
      </div>

      <p
        className="text-[#6b7280] text-sm line-clamp-2 mb-4 leading-relaxed"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {announcement.content}
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-[#4b5563]">
            <User size={12} />
            <span
              className="text-xs truncate"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {announcement.author}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-[#4b5563]">
            <Calendar size={12} />
            <span
              className="text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {formatDate(announcement.date)}
            </span>
          </div>
        </div>
        <span
          className="text-[10px] bg-[#1a1a24] text-[#6b7280] px-2.5 py-1 rounded-full tracking-wider uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {announcement.category}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// ANNOUNCEMENT MODAL COMPONENT
// ============================================================================

function AnnouncementModal({ announcement, onClose }: AnnouncementModalProps) {
  if (!announcement) return null;

  const priorityIcons: Record<Priority, React.ReactNode> = {
    low: <Bell className="text-blue-400" size={20} />,
    medium: <AlertCircle className="text-amber-400" size={20} />,
    high: <AlertCircle className="text-rose-400" size={20} />,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-[#111118] rounded-xl border border-[#c9a84c]/25 shadow-2xl shadow-black/60 max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Gold top line */}
        <div className="h-px bg-gradient-to-r from-[#c9a84c] via-[#e8c96a]/50 to-transparent" />

        {/* Header */}
        <div className="p-6 border-b border-[#1a1a24]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="mt-0.5">
                {priorityIcons[announcement.priority]}
              </div>
              <div className="flex-1">
                <h2
                  className="text-[#e8c96a] font-medium mb-2 pr-4 leading-snug"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.3rem",
                  }}
                >
                  {announcement.title}
                </h2>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1.5 text-[#4b5563]">
                    <User size={12} />
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {announcement.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#4b5563]">
                    <Calendar size={12} />
                    <span
                      className="text-xs"
                      style={{ fontFamily: "'DM Sans', sans-serif" }}
                    >
                      {formatFullDate(announcement.date)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-[#1a1a24] rounded-lg transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X size={18} className="text-[#6b7280]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[55vh]">
          <p
            className="text-[#9ca3af] leading-relaxed whitespace-pre-line text-sm"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {announcement.content}
          </p>

          <div className="mt-6 pt-5 border-t border-[#1a1a24] flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`w-1.5 h-1.5 rounded-full ${priorityDotStyles[announcement.priority]}`}
              />
              <span
                className="text-xs text-[#6b7280] tracking-wider uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {announcement.category}
              </span>
            </div>
            {announcement.isPinned && (
              <span
                className="inline-flex items-center gap-1.5 text-xs text-[#c9a84c]"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <Pin size={12} className="fill-[#c9a84c]" />
                Pinned Announcement
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN ANNOUNCEMENTS PAGE
// ============================================================================

export default function AnnouncementsPage({
  onUnreadCountChange,
}: AnnouncementsPageProps) {
  const [announcements] = useState(initialAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewedAnnouncements, setViewedAnnouncements] = useState<
    Set<string | number>
  >(new Set());

  useEffect(() => {
    const unreadCount = announcements.filter(
      (a) => !viewedAnnouncements.has(a.id),
    ).length;
    if (onUnreadCountChange) onUnreadCountChange(unreadCount);
  }, [announcements, viewedAnnouncements, onUnreadCountChange]);

  const handleOpenAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setViewedAnnouncements((prev) => new Set(prev).add(announcement.id));
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "pinned" && announcement.isPinned) ||
      announcement.priority === filter;

    const matchesSearch =
      searchQuery === "" ||
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalCount = announcements.length;
  const pinnedCount = announcements.filter((a) => a.isPinned).length;
  const highPriorityCount = announcements.filter(
    (a) => a.priority === "high",
  ).length;
  const unreadCount = announcements.filter(
    (a) => !viewedAnnouncements.has(a.id),
  ).length;

  const filterOptions: FilterType[] = [
    "all",
    "pinned",
    "high",
    "medium",
    "low",
  ];

  return (
    <div className="space-y-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#c9a84c]/10 border border-[#c9a84c]/25 rounded-lg">
            <Bell className="text-[#c9a84c]" size={20} />
          </div>
          <div>
            <h1
              className="text-[#d1d5db] font-medium leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem",
              }}
            >
              Announcements
            </h1>
            <p className="text-[#4b5563] text-xs mt-0.5 tracking-wide">
              Stay updated with the latest company news
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4b5563]"
            size={14}
          />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#111118] border border-[#c9a84c]/20 text-[#d1d5db] text-sm rounded-lg
              placeholder:text-[#4b5563] focus:outline-none focus:border-[#c9a84c]/50 transition-colors"
          />
        </div>
      </div>

      {/* Stat Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatTile value={totalCount} label="Total" />
        <StatTile
          value={unreadCount}
          label="Unread"
          valueClass="text-[#e8c96a]"
        />
        <StatTile
          value={highPriorityCount}
          label="High Priority"
          valueClass="text-rose-400"
        />
        <StatTile
          value={pinnedCount}
          label="Pinned"
          valueClass="text-blue-400"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <div className="flex items-center gap-1.5 text-[#4b5563] mr-1">
          <Filter size={13} />
          <span className="text-xs tracking-wider uppercase">Filter</span>
        </div>
        {filterOptions.map((option) => (
          <button
            key={option}
            onClick={() => setFilter(option)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize tracking-wide",
              filter === option
                ? "bg-[#c9a84c]/15 text-[#e8c96a] border border-[#c9a84c]/40"
                : "bg-[#111118] text-[#6b7280] border border-[#c9a84c]/10 hover:border-[#c9a84c]/30 hover:text-[#d1d5db]",
            )}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="space-y-3">
        {filteredAnnouncements.length > 0 ? (
          filteredAnnouncements.map((announcement) => (
            <AnnouncementCard
              key={announcement.id}
              announcement={announcement}
              onClick={() => handleOpenAnnouncement(announcement)}
              isNew={!viewedAnnouncements.has(announcement.id)}
            />
          ))
        ) : (
          <div className="text-center py-16 bg-[#111118] border border-[#c9a84c]/15 rounded-xl">
            <Bell className="mx-auto text-[#2a2a34] mb-3" size={36} />
            <h3
              className="text-[#6b7280] mb-1"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
              }}
            >
              No announcements found
            </h3>
            <p className="text-[#4b5563] text-xs">
              {searchQuery
                ? "Try a different search term"
                : "Try changing your filter"}
            </p>
          </div>
        )}
      </div>

      <AnnouncementModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </div>
  );
}
