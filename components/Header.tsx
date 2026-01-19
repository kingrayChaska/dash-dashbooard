"use client";

import { admin } from "@/data/adminData";
import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "../utils/formatDate";
import Image from "next/image";

// Type definitions
interface NotificationBadgeProps {
  count?: number;
}

interface UserMenuProps {
  user: {
    id: string | number;
    name: string;
    email?: string;
    avatar?: string;
    role?: string;
  };
}

// Subcomponents
function NotificationButton({ count = 0 }: NotificationBadgeProps) {
  return (
    <button
      className="relative p-2 hover:bg-gray-200/50 rounded-lg transition-colors duration-200"
      aria-label="Notifications"
    >
      <Bell size={20} className="text-gray-600" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </button>
  );
}

function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: LogOut, label: "Logout", href: "/logout", danger: true },
  ];

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 hover:bg-gray-200/50 rounded-lg px-3 py-2 transition-colors duration-200"
        aria-expanded={isOpen ? "true" : "false"}
        aria-haspopup="true"
      >
        <div className="relative">
          <Image
            src={user.avatar || "/c44.jpg"}
            alt={user.name}
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-gray-200"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#f0f4f0] rounded-full"></span>
        </div>

        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-700">{user.name}</p>
          {user.role && <p className="text-xs text-gray-500">{user.role}</p>}
        </div>

        <ChevronDown
          size={16}
          className={cn(
            "text-gray-500 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-semibold text-gray-900">{user.name}</p>
            {user.email && (
              <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={"/announcement"}
                className={cn(
                  "flex items-center px-4 py-2 text-sm transition-colors duration-150",
                  item.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-50",
                )}
              >
                <item.icon size={16} className="mr-3" />
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Main component
export default function Header() {
  // Get first admin or use default
  const currentAdmin = admin[0] || {
    id: 1,
    name: "Admin User",
    email: "admin@chaskaindustries.com",
    role: "Administrator",
  };

  return (
    <header className="bg-[#f0f4f0] border-b border-gray-200 sticky top-0 z-40">
      <div className="px-6 py-4 flex justify-between items-center">
        {/* Left section - Welcome message */}
        <div>
          <h2 className="font-semibold text-gray-800 text-lg">Admin</h2>
          <p className="text-sm text-gray-600 mt-0.5">
            Welcome to Chaska Industries
          </p>
        </div>

        {/* Right section - Actions */}
        <div className="flex items-center space-x-2">
          <NotificationButton count={3} />
          <UserMenu user={currentAdmin} />
        </div>
      </div>
    </header>
  );
}
