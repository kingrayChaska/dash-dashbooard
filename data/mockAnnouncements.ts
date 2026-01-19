// Type definitions
export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  priority: "low" | "medium" | "high";
  isPinned?: boolean;
  category: string;
  readBy?: string[];
}

// Mock data
export const announcements: Announcement[] = [
  {
    id: "1",
    title: "System Maintenance Scheduled",
    content:
      "We will be performing scheduled maintenance on our servers this Saturday from 2 AM to 6 AM. During this time, the system may be temporarily unavailable. Please save your work and log out before 2 AM. We apologize for any inconvenience this may cause.",
    author: "IT Department",
    date: "2026-01-18",
    priority: "high",
    isPinned: true,
    category: "Technical",
  },
  {
    id: "2",
    title: "New Employee Onboarding - January Batch",
    content:
      "We are excited to welcome our new team members joining us this month! The onboarding session will be held on January 22nd at 10 AM in Conference Room A. All new employees are required to attend. HR will provide orientation materials and answer any questions you may have.",
    author: "HR Team",
    date: "2026-01-17",
    priority: "medium",
    category: "HR",
  },
  {
    id: "3",
    title: "Q4 Financial Results Published",
    content:
      "We are pleased to announce that our Q4 financial results have been published. The company has achieved a 15% growth compared to the previous quarter. Detailed reports are available on the company portal. Thank you all for your hard work and dedication!",
    author: "Finance Department",
    date: "2026-01-16",
    priority: "medium",
    category: "Finance",
  },
  {
    id: "4",
    title: "Office Holiday - Upcoming Long Weekend",
    content:
      "Please note that the office will be closed on Monday, January 27th for the public holiday. Normal operations will resume on Tuesday, January 28th. Have a great long weekend!",
    author: "Administration",
    date: "2026-01-15",
    priority: "low",
    category: "General",
  },
  {
    id: "5",
    title: "Security Policy Update",
    content:
      "Important: Our security policies have been updated to enhance data protection. All employees must complete the new security training module by January 31st. The module is available on the learning portal. Failure to complete the training may result in temporary account suspension.",
    author: "Security Team",
    date: "2026-01-14",
    priority: "high",
    isPinned: true,
    category: "Security",
  },
  {
    id: "6",
    title: "Team Building Event - February 10th",
    content:
      "Mark your calendars! We're organizing a team building event on February 10th at Green Valley Resort. Activities include team challenges, outdoor games, and a networking dinner. Please RSVP by January 25th. This is a great opportunity to bond with your colleagues!",
    author: "HR Team",
    date: "2026-01-13",
    priority: "low",
    category: "Events",
  },
  {
    id: "7",
    title: "CEO's Birthday - September 13th",
    content:
      "Mark your calendars! We're organizing a birthday party for the CEO on September 13th at Green Valley Resort. Activities include team challenges, outdoor games, and a networking dinner. Please RSVP by January 25th. This is a great opportunity to bond with your colleagues!",
    author: "HR Team",
    date: "2026-01-13",
    priority: "high",
    isPinned: true,
    category: "Events",
  },
];
