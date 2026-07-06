"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { FileText, Building2, Stethoscope, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/lib/supabase/database.types";

type MedicalRecordRow = Database['public']['Tables']['medical_records']['Row'];

interface RecordCardProps {
  record: MedicalRecordRow;
  onViewDetails: () => void;
}

export function RecordCard({ record, onViewDetails }: RecordCardProps) {
  const attachmentCount = record.attachments ? record.attachments.length : 0;


  return (
    <div className="bg-white rounded-2xl border p-5 sm:p-6 flex flex-col md:flex-row gap-5 transition-all hover:shadow-md relative z-10 ml-0 sm:ml-4">
      {/* Date & Type Block */}
      <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4 md:gap-2 md:w-48 shrink-0 md:border-r border-slate-100 md:pr-6">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
            {format(parseISO(record.visit_date), "MMM d")}
          </p>
          <div className="flex items-center text-foreground font-medium text-lg">
            {format(parseISO(record.visit_date), "yyyy")}
          </div>
        </div>
        <Badge variant="outline" className="px-2.5 py-0.5 rounded-full border bg-slate-100 text-slate-700">
          <FileText className="w-3.5 h-3.5 mr-1.5" />
          {record.record_type}
        </Badge>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-3">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-1.5">
            {record.title}
          </h3>
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-muted-foreground font-medium">
            {record.doctor_name && (
              <div className="flex items-center text-slate-600">
                <Stethoscope className="w-4 h-4 mr-2" />
                Dr. {record.doctor_name}
              </div>
            )}
            {record.hospital_name && (
              <div className="flex items-center text-slate-600">
                <Building2 className="w-4 h-4 mr-2" />
                {record.hospital_name}
              </div>
            )}
            {attachmentCount > 0 && (
              <div className="flex items-center text-indigo-600">
                <Paperclip className="w-4 h-4 mr-2" />
                {attachmentCount} file{attachmentCount !== 1 ? 's' : ''}
              </div>
            )}
          </div>
        </div>

        {record.diagnosis && (
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 inline-block">
            <p className="text-sm text-slate-700">
              <span className="font-semibold mr-2">Diagnosis:</span>
              {record.diagnosis}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex md:flex-col gap-3 justify-end items-end shrink-0 pt-2 md:pt-0">
        <Button variant="outline" className="w-full md:w-32" onClick={onViewDetails}>
          View Details
        </Button>
      </div>
    </div>
  );
}
