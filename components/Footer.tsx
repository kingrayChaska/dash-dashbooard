import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0a0f] border-t border-[#c9a84c]/20 px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        <p
          className="text-[#6b7280] text-xs tracking-widest uppercase"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
          &copy; {currentYear}{" "}
          <span className="text-[#c9a84c] font-medium">Chaska Industries</span>.
          All rights reserved.
        </p>
        <div className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span
            className="text-[#6b7280] text-xs tracking-wider"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Systems Operational
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
