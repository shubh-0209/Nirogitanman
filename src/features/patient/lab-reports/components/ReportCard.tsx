"use client";

import React, { useState } from "react";
import { Database } from "@/lib/supabase/database.types";
import { FileText, MoreVertical, Download, Eye, Trash2, Building, User as UserIcon, Calendar, Clock, Loader2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { toast } from "sonner";
import { deleteLabReport } from "../actions";

type LabReport = Database["public"]["Tables"]["lab_reports"]["Row"];

interface ReportCardProps {
  report: LabReport;
  onPreview: (report: LabReport) => void;
  onDeleteSuccess: () => void;
}

export function ReportCard({ report, onPreview, onDeleteSuccess }: ReportCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;
    
    setIsDeleting(true);
    try {
      const res = await deleteLabReport(report.id, report.file_url);
      if (res.error) {
        toast.error(res.error);
      } else {
        toast.success("Report deleted successfully");
        onDeleteSuccess();
      }
    } catch {
      toast.error("Failed to delete report");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownload = () => {
    onPreview(report);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition-shadow group relative flex flex-col justify-between">
      {isDeleting && (
        <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center rounded-xl">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
      )}
      
      <div>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 line-clamp-1" title={report.report_name}>
                {report.report_name}
              </h4>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-600">
                {report.report_type}
              </span>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="p-1 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors outline-none">
              <MoreVertical className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => onPreview(report)}>
                <Eye className="w-4 h-4 mr-2" /> Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" /> Download
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="text-red-600 focus:text-red-600">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-2 gap-y-2 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1.5" title="Report Date">
            <Calendar className="w-3.5 h-3.5 opacity-70" />
            <span className="truncate">{format(new Date(report.report_date), "MMM d, yyyy")}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Upload Time">
            <Clock className="w-3.5 h-3.5 opacity-70" />
            <span className="truncate">{format(new Date(report.created_at!), "MMM d, yyyy")}</span>
          </div>
          
          {report.doctor_name && (
            <div className="flex items-center gap-1.5 col-span-2" title="Doctor">
              <UserIcon className="w-3.5 h-3.5 opacity-70 shrink-0" />
              <span className="truncate">Dr. {report.doctor_name}</span>
            </div>
          )}
          
          {report.hospital_name && (
            <div className="flex items-center gap-1.5 col-span-2" title="Hospital">
              <Building className="w-3.5 h-3.5 opacity-70 shrink-0" />
              <span className="truncate">{report.hospital_name}</span>
            </div>
          )}
        </div>

        {report.notes && (
          <div className="mt-3 text-sm bg-gray-50 p-3 rounded-lg text-gray-600 italic border border-gray-100 line-clamp-2" title={report.notes}>
            &quot;{report.notes}&quot;
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
        <span>{(report.file_size / (1024 * 1024)).toFixed(2)} MB</span>
        <button 
          onClick={() => onPreview(report)}
          className="text-primary hover:underline font-medium"
        >
          View Report
        </button>
      </div>
    </div>
  );
}
