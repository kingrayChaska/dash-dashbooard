"use client";

import { useState } from "react";
import {
  FileText,
  Eye,
  Edit,
  Trash2,
  Download,
  Search,
  Filter,
  Plus,
  Globe,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
  X,
} from "lucide-react";
import { cn } from "@/utils/formatDate";
import Image from "next/image";
import {
  cvWebsites,
  CVWebsite,
  StatsCardProps,
} from "../../../data/mockCvData";

function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg border p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={cn("p-3 rounded-lg", color)}>{icon}</div>
      </div>
    </div>
  );
}

interface CVWebsiteCardProps {
  website: CVWebsite;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function CVWebsiteCard({
  website,
  onView,
  onEdit,
  onDelete,
}: CVWebsiteCardProps) {
  const statusConfig = {
    active: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: <CheckCircle size={14} />,
    },
    pending: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: <Clock size={14} />,
    },
    inactive: {
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: <XCircle size={14} />,
    },
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-200 group">
      {/* Thumbnail */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <Image
          src={website.thumbnail || "/placeholder.jpg"}
          alt={website.studentName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span
            className={cn(
              "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
              statusConfig[website.status].color,
            )}
          >
            {statusConfig[website.status].icon}
            {website.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">
            {website.studentName}
          </h3>
          <p className="text-sm text-gray-600">{website.studentId}</p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Globe size={14} className="text-gray-400" />
            <a
              href={website.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#628563] hover:underline truncate"
            >
              {website.websiteUrl}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <FileText size={14} className="text-gray-400" />
            <span>{website.template}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Eye size={14} className="text-gray-400" />
            <span>{website.views} views</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>Created: {formatDate(website.createdDate)}</span>
          <span>Updated: {formatDate(website.lastUpdated)}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={onView}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[#628563] text-white rounded-lg hover:bg-[#527554] transition-colors duration-200"
          >
            <Eye size={16} />
            <span className="text-sm font-medium">View</span>
          </button>
          <button
            onClick={onEdit}
            className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            aria-label="Edit website"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
            aria-label="Delete website"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

interface ViewModalProps {
  website: CVWebsite | null;
  onClose: () => void;
}

function ViewModal({ website, onClose }: ViewModalProps) {
  if (!website) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-linear-to-r from-[#628563] to-[#527554] text-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">{website.studentName}</h2>
              <p className="text-white/90">{website.studentId}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Contact Information
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-gray-400" />
                  <span className="text-gray-700">{website.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-gray-400" />
                  <a
                    href={website.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#628563] hover:underline flex items-center gap-1"
                  >
                    {website.websiteUrl}
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Website Details
              </h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText size={16} className="text-gray-400" />
                  <span className="text-gray-700">
                    Template: {website.template}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye size={16} className="text-gray-400" />
                  <span className="text-gray-700">
                    {website.views} total views
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
              Timeline
            </h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar size={16} className="text-gray-400" />
                <span>Created on {formatDate(website.createdDate)}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <Calendar size={16} className="text-gray-400" />
                <span>Last updated on {formatDate(website.lastUpdated)}</span>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="border-t pt-6 mt-6">
            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
              Website Preview
            </h3>
            <div className="rounded-lg overflow-hidden border">
              <Image
                src={website.thumbnail || "/placeholder.jpg"}
                alt={website.studentName}
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <a
              href={website.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[#628563] text-white rounded-lg hover:bg-[#527554] transition-colors duration-200"
            >
              <ExternalLink size={18} />
              Open Website
            </a>
            <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2">
              <Download size={18} />
              Download Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function CVWebsitesPage() {
  const [selectedWebsite, setSelectedWebsite] = useState<CVWebsite | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredWebsites = cvWebsites.filter((website) => {
    const matchesSearch =
      website.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      website.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || website.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: cvWebsites.length,
    active: cvWebsites.filter((w) => w.status === "active").length,
    pending: cvWebsites.filter((w) => w.status === "pending").length,
    totalViews: cvWebsites.reduce((sum, w) => sum + w.views, 0),
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this CV website?")) {
      console.log("Deleting website:", id);
      // Implement delete logic
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-[#628563] rounded-lg">
              <FileText className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">CV Websites</h1>
              <p className="text-gray-600 mt-1">
                Manage student CV websites and portfolios
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#628563] text-white rounded-lg hover:bg-[#527554] transition-colors duration-200">
            <Plus size={20} />
            <span className="font-medium">Create New</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Websites"
          value={stats.total}
          icon={<Globe className="text-white" size={24} />}
          color="bg-[#628563]"
        />
        <StatsCard
          title="Active"
          value={stats.active}
          icon={<CheckCircle className="text-white" size={24} />}
          color="bg-green-500"
        />
        <StatsCard
          title="Pending Review"
          value={stats.pending}
          icon={<Clock className="text-white" size={24} />}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Total Views"
          value={stats.totalViews}
          icon={<Eye className="text-white" size={24} />}
          color="bg-blue-500"
        />
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search by name, student ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#628563] focus:border-transparent outline-none"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#628563] focus:border-transparent outline-none"
              aria-label="Filter by status"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
              <Filter size={18} />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Websites Grid */}
      {filteredWebsites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebsites.map((website) => (
            <CVWebsiteCard
              key={website.id}
              website={website}
              onView={() => setSelectedWebsite(website)}
              onEdit={() => console.log("Edit:", website.id)}
              onDelete={() => handleDelete(website.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border">
          <FileText className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No CV websites found
          </h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter criteria
          </p>
          <button className="px-4 py-2 bg-[#628563] text-white rounded-lg hover:bg-[#527554] transition-colors duration-200">
            Clear Filters
          </button>
        </div>
      )}

      {/* View Modal */}
      <ViewModal
        website={selectedWebsite}
        onClose={() => setSelectedWebsite(null)}
      />
    </div>
  );
}
