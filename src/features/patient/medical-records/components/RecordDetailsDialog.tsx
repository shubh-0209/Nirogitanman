"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { FileText, Building2, Stethoscope, File, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/lib/supabase/database.types";

type MedicalRecordRow = Database['public']['Tables']['medical_records']['Row'];

interface RecordDetailsDialogProps {
  record: MedicalRecordRow;
  onClose: () => void;
}

export function RecordDetailsDialog({ record, onClose }: RecordDetailsDialogProps) {
  const supabase = createClient();
  const [downloadingUrl, setDownloadingUrl] = React.useState<string | null>(null);

  const handleDownload = async (path: string) => {
    try {
      setDownloadingUrl(path);
      const { data, error } = await supabase.storage
        .from('medical-records')
        .createSignedUrl(path, 60); // 60 seconds expiry

      if (error) throw error;
      
      // Open the signed URL in a new tab to download/view
      window.open(data.signedUrl, '_blank');
    } catch (error) {
      console.error(error);
      toast.error("Failed to download file");
    } finally {
      setDownloadingUrl(null);
    }
  };

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mt-2">
            <Badge variant="outline" className="bg-slate-100 text-slate-700">
              <FileText className="w-3.5 h-3.5 mr-1.5" />
              {record.record_type}
            </Badge>
            <span className="text-sm font-medium text-muted-foreground mr-4">
              {format(parseISO(record.visit_date), "PPP")}
            </span>
          </div>
          <DialogTitle className="text-2xl mt-4">{record.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-2">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-100">
            {record.doctor_name && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Doctor</p>
                <p className="text-sm font-medium flex items-center">
                  <Stethoscope className="w-4 h-4 mr-2 text-slate-400" />
                  Dr. {record.doctor_name}
                </p>
              </div>
            )}
            {record.hospital_name && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Hospital/Clinic</p>
                <p className="text-sm font-medium flex items-center">
                  <Building2 className="w-4 h-4 mr-2 text-slate-400" />
                  {record.hospital_name}
                </p>
              </div>
            )}
            {record.diagnosis && (
              <div className="col-span-2 mt-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Diagnosis / Result</p>
                <p className="text-sm font-medium text-slate-800">{record.diagnosis}</p>
              </div>
            )}
          </div>

          {/* Description */}
          {record.description && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Description</h4>
              <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                {record.description}
              </p>
            </div>
          )}

          {/* Notes */}
          {record.notes && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Additional Notes</h4>
              <div className="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {record.notes}
                </p>
              </div>
            </div>
          )}

          {/* Attachments */}
          {record.attachments && record.attachments.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Attached Files</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {record.attachments.map((path, idx) => {
                  const filename = path.split('/').pop() || `Attachment ${idx + 1}`;
                  const isDownloading = downloadingUrl === path;
                  
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm hover:border-slate-300 transition-colors">
                      <div className="flex items-center truncate mr-2">
                        <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0 mr-3">
                          <File className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-slate-700 truncate" title={filename}>
                          {filename}
                        </span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="shrink-0 h-8 w-8 text-slate-500 hover:text-primary hover:bg-primary/5"
                        onClick={() => handleDownload(path)}
                        disabled={isDownloading}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
