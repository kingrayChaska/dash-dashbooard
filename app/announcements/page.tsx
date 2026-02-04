"use client";

import { useState, useEffect } from "react";
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
// ANNOUNCEMENT CARD COMPONENT
// ============================================================================

function AnnouncementCard({
  announcement,
  onClick,
  isNew = false,
}: AnnouncementCardProps) {
  const priorityColors: Record<Priority, string> = {
    low: "bg-blue-100 text-blue-800 border-blue-200",
    medium: "bg-yellow-100 text-yellow-800 border-yellow-200",
    high: "bg-red-100 text-red-800 border-red-200",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white rounded-lg border p-5 cursor-pointer transition-all duration-200 hover:shadow-md hover:border-[#628563] relative",
        announcement.isPinned && "border-[#628563] border-2 shadow-sm",
        isNew && "ring-2 ring-[#628563] ring-opacity-50",
      )}
    >
      {/* New indicator */}
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-[#628563] text-white text-xs font-bold px-2 py-1 rounded-full shadow-md animate-pulse">
          NEW
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          {announcement.isPinned && (
            <Pin
              size={16}
              className="text-[#628563] fill-[#628563] flex-shrink-0"
            />
          )}
          <h3 className="font-semibold text-gray-900 text-lg line-clamp-1">
            {announcement.title}
          </h3>
        </div>
        <span
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium border whitespace-nowrap ml-2",
            priorityColors[announcement.priority],
          )}
        >
          {announcement.priority}
        </span>
      </div>

      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
        {announcement.content}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <User size={14} />
            <span className="truncate">{announcement.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{formatDate(announcement.date)}</span>
          </div>
        </div>
        <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
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

  const priorityIcons: Record<Priority, JSX.Element> = {
    low: <Bell className="text-blue-600" size={24} />,
    medium: <AlertCircle className="text-yellow-600" size={24} />,
    high: <AlertCircle className="text-red-600" size={24} />,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#628563] to-[#527554] text-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              {priorityIcons[announcement.priority]}
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 pr-8">
                  {announcement.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-white/90 flex-wrap">
                  <div className="flex items-center gap-1">
                    <User size={14} />
                    <span>{announcement.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatFullDate(announcement.date)}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-200 flex-shrink-0"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {announcement.content}
            </p>
          </div>

          {/* Footer info */}
          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium text-gray-700">
              <span className="w-2 h-2 bg-[#628563] rounded-full" />
              {announcement.category}
            </span>
            {announcement.isPinned && (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-[#628563]">
                <Pin size={16} className="fill-[#628563]" />
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
// MAIN ANNOUNCEMENTS PAGE COMPONENT
// ============================================================================

export default function AnnouncementsPage({
  onUnreadCountChange,
}: AnnouncementsPageProps) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [filter, setFilter] = useState<FilterType>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewedAnnouncements, setViewedAnnouncements] = useState<
    Set<string | number>
  >(new Set());

  // Track unread count and notify parent
  useEffect(() => {
    const unreadCount = announcements.filter(
      (a) => !viewedAnnouncements.has(a.id),
    ).length;

    if (onUnreadCountChange) {
      onUnreadCountChange(unreadCount);
    }
  }, [announcements, viewedAnnouncements, onUnreadCountChange]);

  // Handle opening announcement
  const handleOpenAnnouncement = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    // Mark as viewed
    setViewedAnnouncements((prev) => new Set(prev).add(announcement.id));
  };

  // Filter announcements
  const filteredAnnouncements = announcements.filter((announcement) => {
    // Apply category/priority filter
    const matchesFilter =
      filter === "all" ||
      (filter === "pinned" && announcement.isPinned) ||
      announcement.priority === filter;

    // Apply search filter
    const matchesSearch =
      searchQuery === "" ||
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Calculate statistics
  const totalCount = announcements.length;
  const pinnedCount = announcements.filter((a) => a.isPinned).length;
  const highPriorityCount = announcements.filter(
    (a) => a.priority === "high",
  ).length;
  const unreadCount = announcements.filter(
    (a) => !viewedAnnouncements.has(a.id),
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-8 flex justify-between">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-[#628563] rounded-lg">
            <Bell className="text-white" size={24} />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600 mt-1">
              Stay updated with the latest company news
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search
            className="absolute left-3 top-1/4 -translate-y-1/2 text-gray-900"
            size={20}
          />
          <input
            type="text"
            placeholder="Search announcements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border text-gray-500 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#628563] focus:border-transparent"
          />
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-gray-900">{totalCount}</div>
          <div className="text-sm text-gray-600">Total Announcements</div>
        </div>
        <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-[#628563]">{unreadCount}</div>
          <div className="text-sm text-gray-600">Unread</div>
        </div>
        <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-red-600">
            {highPriorityCount}
          </div>
          <div className="text-sm text-gray-600">High Priority</div>
        </div>
        <div className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
          <div className="text-2xl font-bold text-blue-600">{pinnedCount}</div>
          <div className="text-sm text-gray-600">Pinned</div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 flex-wrap items-center">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Filter size={16} />
          <span className="font-medium">Filter:</span>
        </div>
        {(["all", "pinned", "high", "medium", "low"] as FilterType[]).map(
          (filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                filter === filterOption
                  ? "bg-[#628563] text-white shadow-md"
                  : "bg-white text-gray-700 border hover:border-[#628563] hover:text-[#628563]",
              )}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
            </button>
          ),
        )}
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
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
          <div className="text-center py-12 bg-white rounded-lg border">
            <Bell className="mx-auto text-gray-400 mb-4" size={48} />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No announcements found
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? "Try a different search term"
                : "Try changing your filter to see more announcements"}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnnouncementModal
        announcement={selectedAnnouncement}
        onClose={() => setSelectedAnnouncement(null)}
      />
    </div>
  );
}
