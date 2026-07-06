"use client";

import * as React from "react";
import { Search, Filter, FolderOpen, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Database } from "@/lib/supabase/database.types";
import { RecordCard } from "./RecordCard";
import { UploadRecordDialog } from "./UploadRecordDialog";
import { RecordDetailsDialog } from "./RecordDetailsDialog";

type MedicalRecordRow = Database['public']['Tables']['medical_records']['Row'];

interface MedicalRecordsClientProps {
  patientId: string;
  initialRecords: MedicalRecordRow[];
}

export function MedicalRecordsClient({ patientId, initialRecords }: MedicalRecordsClientProps) {
  const [records, setRecords] = React.useState<MedicalRecordRow[]>(initialRecords);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filterType, setFilterType] = React.useState<string>("All");
  const [sortOrder, setSortOrder] = React.useState<"desc" | "asc">("desc");
  const [selectedRecord, setSelectedRecord] = React.useState<MedicalRecordRow | null>(null);

  // Derived state for filtered and sorted records
  const displayRecords = React.useMemo(() => {
    let result = [...records];

    // Filter by type
    if (filterType !== "All") {
      result = result.filter(r => r.record_type === filterType);
    }

    // Search query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        r => 
          r.title.toLowerCase().includes(q) ||
          r.diagnosis?.toLowerCase().includes(q) ||
          r.doctor_name?.toLowerCase().includes(q) ||
          r.hospital_name?.toLowerCase().includes(q)
      );
    }

    // Sort by date
    result.sort((a, b) => {
      const dateA = new Date(a.visit_date).getTime();
      const dateB = new Date(b.visit_date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [records, searchQuery, filterType, sortOrder]);

  const uniqueTypes = ["All", ...Array.from(new Set(records.map(r => r.record_type)))];

  const handleRecordAdded = (newRecord: MedicalRecordRow) => {
    setRecords(prev => [newRecord, ...prev]);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Medical Records</h1>
          <p className="text-muted-foreground mt-1">Manage your health documents, prescriptions, and lab reports.</p>
        </div>
        <UploadRecordDialog patientId={patientId} onRecordAdded={handleRecordAdded} />
      </div>

      {/* Controls: Search, Filter, Sort */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title, doctor, diagnosis..." 
            className="pl-10 w-full bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {/* Simple Type Filter */}
          <div className="relative">
            <select
              className="h-10 pl-10 pr-4 rounded-md border border-input bg-white text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              {uniqueTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>

          <Button 
            variant="outline" 
            className="bg-white px-3"
            onClick={() => setSortOrder(prev => prev === "desc" ? "asc" : "desc")}
            title="Sort by Date"
          >
            <ArrowUpDown className="w-4 h-4 mr-2 text-muted-foreground" />
            {sortOrder === "desc" ? "Newest" : "Oldest"}
          </Button>
        </div>
      </div>

      {/* Records Timeline / List */}
      <div className="space-y-4">
        {displayRecords.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <FolderOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">No Records Found</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              {records.length === 0 
                ? "You haven't uploaded any medical records yet. Upload your first document to get started." 
                : "No records match your search or filter criteria."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 relative">
            {/* Timeline line connecting items (optional UI flourish) */}
            <div className="absolute left-[39px] md:left-[51px] top-4 bottom-4 w-px bg-slate-200 hidden sm:block" />
            
            {displayRecords.map((record) => (
              <RecordCard 
                key={record.id} 
                record={record} 
                onViewDetails={() => setSelectedRecord(record)} 
              />
            ))}
          </div>
        )}
      </div>

      {/* Details Dialog */}
      {selectedRecord && (
        <RecordDetailsDialog 
          record={selectedRecord} 
          onClose={() => setSelectedRecord(null)} 
        />
      )}
    </div>
  );
}
