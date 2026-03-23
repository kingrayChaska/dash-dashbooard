interface Activity {
  user: string;
  action: string;
  time: string;
  status: string;
}

interface ActivityLogProps {
  activities: Activity[];
}

const statusStyles: Record<string, string> = {
  completed: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  pending: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  failed: "bg-rose-500/10 text-rose-400 border border-rose-500/20",
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function ActivityLog({ activities }: ActivityLogProps) {
  return (
    <div className="space-y-1">
      {activities.map((activity, index) => (
        <div
          key={index}
          className="flex items-start gap-3 px-3 py-3 rounded-lg hover:bg-[#1a1a24] transition-colors duration-200 group"
        >
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/30 flex items-center justify-center shrink-0"
          >
            <span
              className="text-[#c9a84c] text-xs font-semibold"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {getInitials(activity.user)}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p
              className="text-sm text-[#d1d5db] leading-snug"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="text-[#e8c96a] font-medium">{activity.user}</span>{" "}
              {activity.action}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-medium tracking-wide capitalize ${
                  statusStyles[activity.status.toLowerCase()] ??
                  "bg-[#1a1a24] text-[#6b7280] border border-[#2a2a34]"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {activity.status}
              </span>
              <span
                className="text-[#4b5563] text-xs"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {activity.time}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Footer link */}
      <div className="pt-2 px-3">
        <a
          href="/announcements"
          className="inline-flex items-center gap-1.5 text-xs text-[#c9a84c] hover:text-[#e8c96a] transition-colors duration-200 tracking-wider uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          View all activity
          <span className="text-base leading-none">→</span>
        </a>
      </div>
    </div>
  );
}