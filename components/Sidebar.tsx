import { Grid, Bell, FileText, Users, Building, Clipboard } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#F5F4E6] p-6 border-r border-gray-200">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-[#628563] text-white flex items-center justify-center rounded-full mr-2">
          CI
        </div>
        <h1 className="font-bold text-gray-600">Chaska Industries</h1>
      </div>
      <nav>
        <ul className="space-y-4">
          <li className="flex items-center text-blue-500 font-semibold">
            <Grid className="mr-2" size={20} /> Dashboard
          </li>
          <li className="flex items-center">
            <Bell className="mr-2" size={20} /> Announcements
          </li>
          <li className="flex items-center">
            <FileText className="mr-2" size={20} /> CMS
          </li>
          <li className="flex items-center">
            <FileText className="mr-2" size={20} /> CV Websites
          </li>
          <li className="font-semibold mt-4">STUDENT</li>
          <li className="flex items-center ml-4">
            <Users className="mr-2" size={20} /> All Students
          </li>
          <li className="flex items-center ml-4">
            <Clipboard className="mr-2" size={20} /> Requests
          </li>
          <li className="flex items-center ml-4">
            <FileText className="mr-2" size={20} /> Reports
          </li>
          <li className="font-semibold mt-4">SOFTWARE HOUSE</li>
          <li className="flex items-center ml-4">
            <Building className="mr-2" size={20} /> All Companies
          </li>
          <li className="flex items-center ml-4">
            <FileText className="mr-2" size={20} /> Companies Post
          </li>
          <li className="flex items-center ml-4">
            <Clipboard className="mr-2" size={20} /> Requests
          </li>
          <li className="flex items-center ml-4">
            <FileText className="mr-2" size={20} /> Reports
          </li>
        </ul>
      </nav>
    </aside>
  );
}
