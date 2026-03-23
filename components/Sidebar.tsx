import { Bell, FileText, Users, Clipboard, LucideIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "../utils/formatDate";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

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

// ============================================================================
// NAVIGATION CONFIGURATION
// ============================================================================

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
    title: "Student",
    items: [
      { label: "All Students", href: "/students", icon: Users },
      { label: "Requests", href: "/students/requests", icon: Clipboard },
      { label: "Reports", href: "/students/reports", icon: FileText },
    ],
  },
];

// ============================================================================
// SUBCOMPONENTS
// ============================================================================

interface SidebarHeaderProps {
  companyName: string;
}

function SidebarHeader({ companyName }: SidebarHeaderProps) {
  return (
    <Link href="/" className="block mb-8">
      <div className="flex items-center gap-3">
        <img
          src="/Chaska-ind.png"
          alt={`${companyName} logo`}
          width={100}
          height={40}
          className="rounded-sm"
        />
      </div>
      {/* Gold divider */}
      <div className="mt-4 h-px bg-gradient-to-r from-[#c9a84c]/50 via-[#c9a84c]/20 to-transparent" />
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
          "flex items-center gap-3 py-2.5 px-3 rounded-lg transition-all duration-200 group",
          isNested && "ml-2",
          isActive
            ? "bg-[#c9a84c]/15 text-[#e8c96a] border border-[#c9a84c]/30"
            : "text-[#6b7280] hover:text-[#d1d5db] hover:bg-[#1a1a24]",
        )}
      >
        {Icon && (
          <Icon
            size={16}
            className={cn(
              "shrink-0 transition-colors duration-200",
              isActive
                ? "text-[#c9a84c]"
                : "text-[#4b5563] group-hover:text-[#c9a84c]/70",
            )}
          />
        )}
        <span
          className="text-xs tracking-wide"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {label}
        </span>
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
        <h2
          className="text-[10px] font-semibold text-[#c9a84c]/50 uppercase tracking-[0.2em] px-3 pt-5 pb-1"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          {section.title}
        </h2>
      )}
      <ul className="space-y-0.5">
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

// ============================================================================
// MAIN SIDEBAR COMPONENT
// ============================================================================

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  return (
    <aside className="w-60 bg-[#0a0a0f] border-r border-[#c9a84c]/10 flex flex-col h-screen overflow-y-auto">
      {/* Top gold accent line */}
      <div className="h-0.5 bg-gradient-to-r from-[#c9a84c] via-[#e8c96a] to-[#c9a84c]/30" />

      <div className="p-6 flex-1">
        <SidebarHeader companyName="Chaska Industries" />
        <nav className="space-y-1">
          {navigationSections.map((section, index) => (
            <NavSectionComponent
              key={section.title || `section-${index}`}
              section={section}
              onClose={onClose}
            />
          ))}
        </nav>
      </div>

      {/* Bottom user hint */}
      <div className="p-6 border-t border-[#c9a84c]/10">
        <p
          className="text-[10px] text-[#4b5563] tracking-widest uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          Admin Console
        </p>
        <p
          className="text-[#c9a84c]/60 text-xs mt-0.5"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          v2.0 — Chaska Industries
        </p>
      </div>
    </aside>
  );
}
