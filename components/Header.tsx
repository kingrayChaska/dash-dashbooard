import { Bell, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#F5F4E6] p-4 flex justify-between items-center border-b border-gray-200">
      <h2 className="font-semibold">Admin</h2>
      <div className="flex items-center space-x-4">
        <Bell size={20} className="text-gray-500" />
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/32"
            alt="Admin"
            className="w-8 h-8 rounded-full"
          />
          <span className="ml-2">Admin123...</span>
          <ChevronDown size={16} className="ml-1" />
        </div>
      </div>
    </header>
  );
}
