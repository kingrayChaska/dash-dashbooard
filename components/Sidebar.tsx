import { Grid, Bell, FileText, Users, Building, Clipboard } from "lucide-react";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-54 bg-[#f0f4f0] p-6 border-r border-gray-400 ">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-[#628563] text-white flex items-center justify-center rounded-full mr-2">
          CI
        </div>
        <h1 className="font-bold text-gray-600">Chaska Industries</h1>
      </div>
      <nav>
        <ul className="space-y-4 text-gray-600 ">
          <li className="flex items-center font-semibold">
            <Grid className="mr-2" size={15} /> Dashboard
          </li>
          <li className="flex items-center hover:text-green-700">0
            <Bell className="mr-2" size={15} /> Announcements
          </li>
          <li className="font-semibold mt-4">CMS</li>
          <li className="flex items-center hover:text-green-700">
            <FileText className="mr-2" size={15} /> CV Websites
          </li>
          <li className="font-semibold mt-4">STUDENT</li>
          <li className="flex items-center ml-4 hover:text-green-700">
            <Users className="mr-2" size={15} /> All Students
          </li>
          <li className="flex items-center ml-4 hover:text-green-700 ">
            <Clipboard className="mr-2" size={15} /> Requests
          </li>
          <li className="flex items-center ml-4 hover:text-green-700">
            <FileText className="mr-2" size={15} /> Reports
          </li>
          <li className="font-semibold mt-4">SOFTWARE HOUSE</li>
          <li className="flex items-center ml-4 hover:text-green-700 ">
            <Building className="mr-2" size={15} /> All Companies
          </li>
          <li className="flex items-center ml-4 hover:text-green-700 ">
            <FileText className="mr-2" size={15} /> Companies Post
          </li>
          <li className="flex items-center ml-4 hover:text-green-700 ">
            <Clipboard className="mr-2" size={15} /> Requests
          </li>
          <li className="flex items-center ml-4 hover:text-green-700 ">
            <FileText className="mr-2" size={15} /> Reports
          </li>
        </ul>
      </nav>
    </aside>
  );
}
