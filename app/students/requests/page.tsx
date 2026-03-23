import { Clipboard } from "lucide-react";

export default function Requests() {
  return (
    <div className="space-y-6" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-[#c9a84c]/10 border border-[#c9a84c]/25 rounded-lg">
          <Clipboard className="text-[#c9a84c]" size={20} />
        </div>
        <div>
          <h1
            className="text-[#d1d5db] font-medium leading-tight"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "1.5rem",
            }}
          >
            Requests
          </h1>
          <p className="text-[#4b5563] text-xs mt-0.5 tracking-wide">
            Manage and review student requests
          </p>
        </div>
      </div>

      {/* Placeholder content */}
      <div className="bg-[#111118] border border-[#c9a84c]/20 rounded-xl p-12 text-center">
        <Clipboard className="mx-auto text-[#2a2a34] mb-4" size={40} />
        <h3
          className="text-[#6b7280] mb-1"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem" }}
        >
          No pending requests
        </h3>
        <p className="text-[#4b5563] text-xs">
          Student requests will appear here for review
        </p>
      </div>
    </div>
  );
}
