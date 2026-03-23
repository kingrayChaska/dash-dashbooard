"use client";

import { Bell, ChevronDown, LogOut, Settings, User, Menu } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "../utils/formatDate";
import Image from "next/image";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface Notification {
  id: string | number;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  href?: string;
}

interface NotificationButtonProps {
  notifications: Notification[];
  onMarkAsRead?: (id: string | number) => void;
  onMarkAllAsRead?: () => void;
}

interface UserMenuProps {
  user: {
    id: string | number;
    name: string;
    email?: string;
    avatar?: string;
    role?: string;
  };
  onLogout?: () => void;
}

interface HeaderProps {
  user?: {
    id: string | number;
    name: string;
    email?: string;
    avatar?: string;
    role?: string;
  };
  notifications?: Notification[];
  onToggleSidebar?: () => void;
  onMarkNotificationAsRead?: (id: string | number) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onLogout?: () => void;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

// ============================================================================
// NOTIFICATION BUTTON COMPONENT
// ============================================================================

function NotificationButton({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <div className="relative" ref={notifRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-[#1a1a24] rounded-lg transition-all duration-200 group"
        aria-label="Notifications"
        aria-expanded={isOpen ? "true" : "false"}
      >
        <Bell
          size={18}
          className={cn(
            "transition-all duration-200",
            isOpen
              ? "text-[#c9a84c]"
              : "text-[#6b7280] group-hover:text-[#d1d5db]",
          )}
        />
        {unreadCount > 0 && (
          <span
            className={cn(
              "absolute -top-0.5 -right-0.5 bg-[#c9a84c] text-[#0a0a0f] text-[10px] font-bold rounded-full flex items-center justify-center min-w-[16px] h-4 px-1",
              !isOpen && "animate-pulse",
            )}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-[#111118] rounded-xl border border-[#c9a84c]/20 shadow-2xl shadow-black/60 z-50">
          {/* Top gold line */}
          <div className="h-px bg-gradient-to-r from-[#c9a84c] via-[#e8c96a]/50 to-transparent rounded-t-xl" />

          <div className="p-4 flex items-center justify-between">
            <div>
              <h3
                className="font-semibold text-[#d1d5db] text-sm"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                }}
              >
                Notifications
              </h3>
              {unreadCount > 0 && (
                <p
                  className="text-xs text-[#6b7280] mt-0.5"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  {unreadCount} unread
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-xs text-[#c9a84c] hover:text-[#e8c96a] font-medium transition-colors tracking-wide"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto border-t border-[#1a1a24]">
            {notifications.length > 0 ? (
              <div className="divide-y divide-[#1a1a24]">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={cn(
                      "p-4 hover:bg-[#1a1a24] transition-colors cursor-pointer relative",
                      !notification.isRead && "bg-[#c9a84c]/[0.03]",
                    )}
                  >
                    {!notification.isRead && (
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#c9a84c] rounded-full" />
                    )}
                    <div className={cn(!notification.isRead && "pl-3")}>
                      <p
                        className="text-sm font-medium text-[#d1d5db]"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {notification.title}
                      </p>
                      <p
                        className="text-xs text-[#6b7280] mt-1 line-clamp-2"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {notification.description}
                      </p>
                      <p
                        className="text-xs text-[#4b5563] mt-1.5"
                        style={{ fontFamily: "'DM Sans', sans-serif" }}
                      >
                        {formatRelativeTime(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bell size={28} className="mx-auto text-[#2a2a34] mb-2" />
                <p
                  className="text-sm text-[#4b5563]"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  No notifications
                </p>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="p-3 border-t border-[#1a1a24]">
              <a
                href="/announcements"
                className="text-xs text-[#c9a84c] hover:text-[#e8c96a] font-medium transition-colors block text-center tracking-wider uppercase"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                View all announcements →
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// USER MENU COMPONENT
// ============================================================================

function UserMenu({ user, onLogout }: UserMenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuItemClick = (href: string, isLogout: boolean = false) => {
    if (isLogout && onLogout) {
      onLogout();
    } else {
      router.push(href);
    }
    setIsOpen(false);
  };

  const menuItems = [
    { icon: User, label: "Profile", href: "/profile", danger: false },
    { icon: Settings, label: "Settings", href: "/settings", danger: false },
    { icon: LogOut, label: "Logout", href: "/logout", danger: true },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 hover:bg-[#1a1a24] rounded-lg px-3 py-2 transition-colors duration-200 group"
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
      >
        <div className="relative">
          <div
            className={cn(
              "w-8 h-8 rounded-full overflow-hidden ring-1 transition-all",
              isOpen
                ? "ring-[#c9a84c]"
                : "ring-[#2a2a34] group-hover:ring-[#c9a84c]/50",
            )}
          >
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] text-sm font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border-2 border-[#0d0d14] rounded-full" />
        </div>

        <div className="hidden md:block text-left">
          <p
            className="text-sm font-medium text-[#d1d5db] group-hover:text-[#e8c96a] transition-colors"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {user.name}
          </p>
          {user.role && (
            <p
              className="text-xs text-[#4b5563]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {user.role}
            </p>
          )}
        </div>

        <ChevronDown
          size={14}
          className={cn(
            "text-[#4b5563] transition-transform duration-200 hidden md:block",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#111118] rounded-xl border border-[#c9a84c]/20 shadow-2xl shadow-black/60 py-1 z-50">
          <div className="h-px bg-gradient-to-r from-[#c9a84c] via-[#e8c96a]/50 to-transparent rounded-t-xl" />

          <div className="px-4 py-3 border-b border-[#1a1a24]">
            <p
              className="text-sm font-semibold text-[#d1d5db]"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1rem",
              }}
            >
              {user.name}
            </p>
            {user.email && (
              <p
                className="text-xs text-[#4b5563] mt-0.5 truncate"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {user.email}
              </p>
            )}
          </div>

          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() =>
                  handleMenuItemClick(item.href, item.label === "Logout")
                }
                className={cn(
                  "w-full flex items-center px-4 py-2.5 text-sm transition-colors duration-150",
                  item.danger
                    ? "text-rose-500 hover:bg-rose-500/5"
                    : "text-[#6b7280] hover:bg-[#1a1a24] hover:text-[#d1d5db]",
                )}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                <item.icon size={15} className="mr-3" />
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN HEADER COMPONENT
// ============================================================================

export default function Header({
  user = {
    id: 1,
    name: "Raymond Bamidele",
    avatar: "/profile-img.jpg",
    email: "admin@chaskaindustries.com",
    role: "CEO",
  },
  notifications = [],
  onToggleSidebar,
  onMarkNotificationAsRead,
  onMarkAllNotificationsAsRead,
  onLogout,
}: HeaderProps) {
  return (
    <header className="bg-[#0d0d14] border-b border-[#c9a84c]/15 sticky top-0 z-40">
      {/* Very subtle top gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#c9a84c]/20 to-transparent" />

      <div className="px-6 py-3.5 flex justify-between items-center">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-[#1a1a24] rounded-lg transition-colors duration-200 lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu size={18} className="text-[#6b7280]" />
            </button>
          )}
          <div>
            <h2
              className="text-[#d1d5db] font-light leading-tight"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.2rem",
              }}
            >
              {user.name}
            </h2>
            <p
              className="text-[#4b5563] text-xs tracking-wider mt-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              Welcome back to{" "}
              <span className="text-[#c9a84c]/70">Chaska Industries</span>
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1">
          <NotificationButton
            notifications={notifications}
            onMarkAsRead={onMarkNotificationAsRead}
            onMarkAllAsRead={onMarkAllNotificationsAsRead}
          />
          <div className="w-px h-6 bg-[#1a1a24] mx-1" />
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}
