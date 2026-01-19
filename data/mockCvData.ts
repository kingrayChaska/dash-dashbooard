// Type definitions
export interface CVWebsite {
  id: string;
  studentName: string;
  studentId: string;
  email: string;
  websiteUrl: string;
  status: "active" | "pending" | "inactive";
  createdDate: string;
  lastUpdated: string;
  template: string;
  views: number;
  thumbnail?: string;
}

// Mock data
export const cvWebsites: CVWebsite[] = [
  {
    id: "1",
    studentName: "John Doe",
    studentId: "ST2024001",
    email: "john.doe@example.com",
    websiteUrl: "https://johndoe.cvsite.com",
    status: "active",
    createdDate: "2026-01-10",
    lastUpdated: "2026-01-18",
    template: "Modern Professional",
    views: 245,
    thumbnail:
      "https://via.placeholder.com/400x300/628563/ffffff?text=John+Doe",
  },
  {
    id: "2",
    studentName: "Sarah Johnson",
    studentId: "ST2024002",
    email: "sarah.j@example.com",
    websiteUrl: "https://sarahjohnson.cvsite.com",
    status: "active",
    createdDate: "2026-01-12",
    lastUpdated: "2026-01-17",
    template: "Creative Portfolio",
    views: 189,
    thumbnail:
      "https://via.placeholder.com/400x300/527554/ffffff?text=Sarah+Johnson",
  },
  {
    id: "3",
    studentName: "Michael Chen",
    studentId: "ST2024003",
    email: "m.chen@example.com",
    websiteUrl: "https://michaelchen.cvsite.com",
    status: "pending",
    createdDate: "2026-01-15",
    lastUpdated: "2026-01-15",
    template: "Minimalist",
    views: 45,
    thumbnail:
      "https://via.placeholder.com/400x300/7a9b7b/ffffff?text=Michael+Chen",
  },
  {
    id: "4",
    studentName: "Emily Williams",
    studentId: "ST2024004",
    email: "emily.w@example.com",
    websiteUrl: "https://emilywilliams.cvsite.com",
    status: "active",
    createdDate: "2026-01-08",
    lastUpdated: "2026-01-16",
    template: "Tech Focused",
    views: 312,
    thumbnail:
      "https://via.placeholder.com/400x300/4a6b4c/ffffff?text=Emily+Williams",
  },
  {
    id: "5",
    studentName: "David Martinez",
    studentId: "ST2024005",
    email: "david.m@example.com",
    websiteUrl: "https://davidmartinez.cvsite.com",
    status: "inactive",
    createdDate: "2025-12-20",
    lastUpdated: "2025-12-28",
    template: "Classic Resume",
    views: 98,
    thumbnail:
      "https://via.placeholder.com/400x300/3d5a3e/ffffff?text=David+Martinez",
  },
  {
    id: "6",
    studentName: "Jessica Taylor",
    studentId: "ST2024006",
    email: "jessica.t@example.com",
    websiteUrl: "https://jessicataylor.cvsite.com",
    status: "active",
    createdDate: "2026-01-14",
    lastUpdated: "2026-01-19",
    template: "Designer Portfolio",
    views: 276,
    thumbnail:
      "https://via.placeholder.com/400x300/628563/ffffff?text=Jessica+Taylor",
  },
];

// Subcomponents
export interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}
