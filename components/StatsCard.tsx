interface StatsCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: "up" | "down";
  };
}

export default function StatsCard({
  title,
  value,
  icon,
  trend,
}: StatsCardProps) {
  return (
    <div
      className="relative overflow-hidden bg-[#111118] border border-[#c9a84c]/20 rounded-xl p-5 group
        hover:border-[#c9a84c]/50 hover:shadow-[0_0_30px_rgba(201,168,76,0.08)]
        transition-all duration-500 ease-out"
    >
      {/* Subtle gold glow top-left */}
      <div className="absolute -top-8 -left-8 w-24 h-24 bg-[#c9a84c]/5 rounded-full blur-2xl group-hover:bg-[#c9a84c]/10 transition-all duration-500" />

      {/* Gold top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/40 to-transparent" />

      <div className="relative flex items-start justify-between">
        <div>
          <p
            className="text-[#6b7280] text-xs uppercase tracking-widest mb-3"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {title}
          </p>
          <h4
            className="text-4xl font-light text-[#e8c96a] leading-none"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {value}
          </h4>
          {trend && (
            <div className="flex items-center gap-1 mt-3">
              <span
                className={`text-xs font-medium ${
                  trend.direction === "up"
                    ? "text-emerald-400"
                    : "text-rose-400"
                }`}
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {trend.direction === "up" ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span
                className="text-[#4b5563] text-xs"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                vs last month
              </span>
            </div>
          )}
        </div>
        {icon && (
          <div className="text-[#c9a84c]/50 group-hover:text-[#c9a84c] transition-colors duration-300">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
