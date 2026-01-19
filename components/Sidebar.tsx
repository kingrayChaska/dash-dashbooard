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
    items: [
      { label: "Dashboard", href: "/", icon: Grid, isActive: true },
      { label: "Announcements", href: "/announcements", icon: Bell },
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
  {
    title: "SOFTWARE HOUSE",
    items: [
      { label: "All Companies", href: "/companies", icon: Building },
      { label: "Companies Post", href: "/companies/posts", icon: FileText },
      { label: "Requests", href: "/companies/requests", icon: Clipboard },
      { label: "Reports", href: "/companies/reports", icon: FileText },
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
    <div className="flex items-center mb-8">
      <div className="w-8 h-8 bg-[#628563] text-white flex items-center justify-center rounded-full mr-2 font-semibold text-sm">
        {companyInitials}
      </div>
      <h1 className="font-bold text-gray-700 text-base">{companyName}</h1>
    </div>
  );
}

interface NavItemComponentProps extends NavItem {
  isNested?: boolean;
}

function NavItemComponent({
  label,
  href,
  icon: Icon,
  isActive = false,
  isNested = false,
}: NavItemComponentProps) {
  return (
    <li>
      <Link
        href={href}
        className={cn(
          "flex items-center py-2 px-3 rounded-lg transition-all duration-200",
          isNested && "ml-4",
          isActive
            ? "font-semibold text-[#628563] bg-[#628563]/10"
            : "text-gray-600 hover:text-[#628563] hover:bg-[#628563]/5"
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
}

function NavSectionComponent({ section }: NavSectionComponentProps) {
  const hasTitle = Boolean(section.title);

  return (
    <div className="space-y-1">
      {section.title && (
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2 mt-6">
          {section.title}
        </h2>
      )}
      <ul className="space-y-1">
        {section.items.map((item) => (
          <NavItemComponent key={item.href} {...item} isNested={hasTitle} />
        ))}
      </ul>
    </div>
  );
}

// Main component
export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#f0f4f0] border-r border-gray-200 flex flex-col h-screen">
      <div className="p-6">
        <SidebarHeader companyName="Chaska Industries" companyInitials="CI" />

        <nav className="space-y-2">
          {navigationSections.map((section, index) => (
            <NavSectionComponent key={index} section={section} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
