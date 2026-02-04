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

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
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

  // Close notification panel when clicking outside
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
    if (notification.href) {
      router.push(notification.href);
    }
  };

  const handleMarkAllAsRead = () => {
    if (onMarkAllAsRead) {
      onMarkAllAsRead();
    }
  };

  return (
    <div className="relative" ref={notifRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-200/50 rounded-lg transition-all duration-200 group"
        aria-label="Notifications"
        aria-expanded={isOpen ? "true" : "false"}
      >
        <Bell
          size={20}
          className={cn(
            "transition-all duration-200",
            isOpen
              ? "text-[#628563]"
              : "text-gray-600 group-hover:text-gray-800",
          )}
        />
        {unreadCount > 0 && (
          <span
            className={cn(
              "absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center min-w-[20px] h-5 px-1",
              unreadCount > 0 && !isOpen && "animate-pulse",
            )}
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <p className="text-xs text-gray-500 mt-0.5">
                  {unreadCount} unread
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-xs text-[#628563] hover:text-[#527452] font-medium transition-colors"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification)}
                    className={cn(
                      "p-4 hover:bg-gray-50 transition-colors cursor-pointer relative",
                      !notification.isRead && "bg-blue-50/30",
                    )}
                  >
                    {!notification.isRead && (
                      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#628563] rounded-full" />
                    )}
                    <div className={cn(!notification.isRead && "pl-4")}>
                      <p
                        className={cn(
                          "text-sm font-medium",
                          notification.isRead
                            ? "text-gray-700"
                            : "text-gray-900",
                        )}
                      >
                        {notification.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {notification.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {formatRelativeTime(notification.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Bell size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-500">No notifications</p>
              </div>
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div className="p-3 border-t border-gray-100">
              <a
                href="/announcements"
                className="text-sm text-[#628563] hover:text-[#527452] font-medium transition-colors block text-center"
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

  // Close menu when clicking outside
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
        className="flex items-center space-x-3 hover:bg-gray-200/50 rounded-lg px-3 py-2 transition-colors duration-200 group"
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
      >
        <div className="relative">
          <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-200 group-hover:ring-[#628563] transition-all">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#628563] flex items-center justify-center text-white text-sm font-semibold">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#f0f4f0] rounded-full" />
        </div>

        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
            {user.name}
          </p>
          {user.role && <p className="text-xs text-gray-500">{user.role}</p>}
        </div>

        <ChevronDown
          size={16}
          className={cn(
            "text-gray-500 transition-transform duration-200 hidden md:block",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            {user.email && (
              <p className="text-xs text-gray-500 mt-0.5 truncate">
                {user.email}
              </p>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() =>
                  handleMenuItemClick(item.href, item.label === "Logout")
                }
                className={cn(
                  "w-full flex items-center px-4 py-2 text-sm transition-colors duration-150",
                  item.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-50",
                )}
              >
                <item.icon size={16} className="mr-3" />
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
    <header className="bg-[#f0f4f0] border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-200/50 rounded-lg transition-colors duration-200 lg:hidden"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} className="text-gray-600" />
            </button>
          )}
          <div>
            <h2 className="font-semibold text-gray-800 text-lg">{user.name}</h2>
            <p className="text-sm text-gray-600 mt-0.5">
              Welcome to Chaska Industries
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <NotificationButton
            notifications={notifications}
            onMarkAsRead={onMarkNotificationAsRead}
            onMarkAllAsRead={onMarkAllNotificationsAsRead}
          />
          <UserMenu user={user} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}
