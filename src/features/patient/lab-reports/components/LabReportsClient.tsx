"use client";

import React, { useState, useMemo } from "react";
import { Database } from "@/lib/supabase/database.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UploadCloud, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardBreadcrumb } from "@/components/dashboard/layout/DashboardBreadcrumb";
import { UploadReportDialog } from "./UploadReportDialog";
import { ReportCard } from "./ReportCard";
import { ReportPreviewModal } from "./ReportPreviewModal";

type LabReport = Database["public"]["Tables"]["lab_reports"]["Row"];

interface LabReportsClientProps {
  initialReports: LabReport[];
  userId: string;
}

export function LabReportsClient({ initialReports: reports, userId }: LabReportsClientProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");
  
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [previewReport, setPreviewReport] = useState<LabReport | null>(null);

  const filteredAndSortedReports = useMemo(() => {
    let result = [...reports];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(r => 
        r.report_name.toLowerCase().includes(q) ||
        (r.doctor_name && r.doctor_name.toLowerCase().includes(q)) ||
        (r.hospital_name && r.hospital_name.toLowerCase().includes(q)) ||
        (r.notes && r.notes.toLowerCase().includes(q))
      );
    }

    // Filter
    if (filter !== "all") {
      result = result.filter(r => r.report_type === filter);
    }

    // Sort
    result.sort((a, b) => {
      if (sort === "newest") {
        return new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime();
      } else if (sort === "oldest") {
        return new Date(a.created_at!).getTime() - new Date(b.created_at!).getTime();
      } else if (sort === "report_date") {
        return new Date(b.report_date).getTime() - new Date(a.report_date).getTime();
      }
      return 0;
    });

    return result;
  }, [reports, search, filter, sort]);

  const uniqueTypes = useMemo(() => {
    const types = new Set(reports.map(r => r.report_type));
    return Array.from(types);
  }, [reports]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="flex flex-col gap-2">
          <DashboardBreadcrumb />
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Lab Reports</h1>
            <p className="text-muted-foreground mt-1">
              Upload and securely manage your medical reports.
            </p>
          </div>
        </div>
        <Button onClick={() => setIsUploadOpen(true)} className="w-full sm:w-auto shadow-sm">
          <UploadCloud className="w-4 h-4 mr-2" />
          Upload Report
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search reports..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-gray-50 border-gray-200"
            />
          </div>
          
          <Select value={filter} onValueChange={(val) => setFilter(val || "all")}>
            <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-200">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {uniqueTypes.map(t => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Select value={sort} onValueChange={(val) => setSort(val || "newest")}>
          <SelectTrigger className="w-full sm:w-[160px] bg-gray-50 border-gray-200">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest Uploads</SelectItem>
            <SelectItem value="oldest">Oldest Uploads</SelectItem>
            <SelectItem value="report_date">Report Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center min-h-[400px]">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <FileText className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Lab Reports Yet</h3>
          <p className="text-gray-500 max-w-md mx-auto mb-8">
            Upload your medical reports to securely access them anytime.
          </p>
          <Button onClick={() => setIsUploadOpen(true)} size="lg" className="shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
            <UploadCloud className="w-5 h-5 mr-2" />
            Upload First Report
          </Button>
        </div>
      ) : filteredAndSortedReports.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No matches found</h3>
          <p className="text-gray-500">Try adjusting your search or filters.</p>
          <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setFilter("all"); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedReports.map((report) => (
            <ReportCard 
              key={report.id} 
              report={report} 
              onPreview={setPreviewReport}
              onDeleteSuccess={() => {}} 
            />
          ))}
        </div>
      )}

      <UploadReportDialog 
        open={isUploadOpen} 
        onOpenChange={setIsUploadOpen} 
        onSuccess={() => {}} 
      />

      <ReportPreviewModal
        open={!!previewReport}
        onOpenChange={(val) => !val && setPreviewReport(null)}
        report={previewReport}
      />
    </div>
  );
}
