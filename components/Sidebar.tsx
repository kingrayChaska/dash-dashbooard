import {
  Grid,
  Bell,
  FileText,
  Users,
  Building,
  Clipboard,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "../utils/formatDate";

// Type definitions
interface NavItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  isActive?: boolean;
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

// Navigation configuration
const navigationSections: NavSection[] = [
  {
    title: "Dashboard",
    items: [
      {
        label: "Announcements",
        href: "/announcements",
        icon: Bell,
        isActive: false,
      },
    ],
  },
  {
    title: "CMS",
    items: [{ label: "CV Websites", href: "/cms/cv-websites", icon: FileText }],
  },
  {
    title: "STUDENT",
    items: [
      { label: "All Students", href: "/students", icon: Users },
      { label: "Requests", href: "/students/requests", icon: Clipboard },
      { label: "Reports", href: "/students/reports", icon: FileText },
    ],
  },
];

// Subcomponents
interface SidebarHeaderProps {
  companyName: string;
  companyInitials: string;
}

function SidebarHeader({ companyName, companyInitials }: SidebarHeaderProps) {
  return (
    <Link href="/">
      <div className="flex-col font-semibold">
        <img
          src="Chaska-ind.png"
          alt=""
          width={80}
          height={20}
          className="rounded-sm"
        />
      </div>
    </Link>
  );
}

interface NavItemComponentProps extends NavItem {
  isNested?: boolean;
  onClose?: () => void;
}

function NavItemComponent({
  label,
  href,
  icon: Icon,
  isActive = false,
  isNested = false,
  onClose,
}: NavItemComponentProps) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClose}
        className={cn(
          "flex items-center py-2 px-3 rounded-lg transition-all duration-200",
          isNested && "ml-4",
          isActive
            ? "font-bold text-[#d9e7d9] bg-[#628563]/10"
            : "transform text-gray-200 font-bold hover:text-gray-200 hover:bg-[#b7b160] hover:scale-105 transition duration-200 ease-in-out  ",
        )}
      >
        {Icon && <Icon className="mr-3 shrink-0" size={18} />}
        <span className="text-sm">{label}</span>
      </Link>
    </li>
  );
}

interface NavSectionComponentProps {
  section: NavSection;
  onClose?: () => void;
}

function NavSectionComponent({ section, onClose }: NavSectionComponentProps) {
  const hasTitle = Boolean(section.title);

  return (
    <div className="space-y-1">
      {section.title && (
        <h2 className="text-xs font-bold text-gray-200 uppercase tracking-wider px-3 py-2 mt-6">
          {section.title}
        </h2>
      )}
      <ul className="space-y-1">
        {section.items.map((item) => (
          <NavItemComponent
            key={item.href}
            {...item}
            isNested={hasTitle}
            onClose={onClose}
          />
        ))}
      </ul>
    </div>
  );
}

// Main component
interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <aside className="w-60 bg-[#628563] border-r border-gray-700 flex flex-col h-screen">
      <div className="p-6">
        <SidebarHeader companyName="Chaska Industries" companyInitials="CI" />
        <nav className="space-y-2">
          {navigationSections.map((section, index) => (
            <NavSectionComponent
              key={index}
              section={section}
              onClose={onClose}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}
