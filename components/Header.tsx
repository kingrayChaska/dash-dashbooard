import { admin } from "@/data/adminData";
import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#f0f4f0] p-4 flex text-gray-600 justify-between items-center border-b border-gray-200">
      <div>
        <h2 className="font-semibold">Admin</h2>
        <p className="text-sm text-gray-600 font-sm">
          Welcome to Chaska Industries
        </p>
      </div>

      <div className="flex items-center space-x-4">
        <Bell size={20} className="text-gray-500" />
        <div className="flex items-center">
          <img src="c44.jpg" alt="Admin" className="w-8 h-8 rounded-full" />

          {admin.map((admin) => (
            <span key={admin.id} className="ml-2">
              {admin.name}
            </span>
          ))}
          <ChevronDown size={16} className="ml-1" />
        </div>
      </div>
    </header>
  );
}
