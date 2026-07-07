"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Download } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/database.types";

type LabReport = Database["public"]["Tables"]["lab_reports"]["Row"];

interface ReportPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  report: LabReport | null; 
}

export function ReportPreviewModal({ open, onOpenChange, report }: ReportPreviewModalProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setSignedUrl(null), 300);
      return () => clearTimeout(timer);
    }

    if (open && report) {
      let isMounted = true;
      const loadSignedUrl = async () => {
        setIsLoading(true);
        try {
          const supabase = createClient();
          const { data, error } = await supabase.storage
            .from('lab-reports')
            .createSignedUrl(report.file_url, 3600); 

          if (error) {
            console.error("Error creating signed URL:", error);
          } else if (isMounted) {
            setSignedUrl(data.signedUrl);
          }
        } finally {
          if (isMounted) setIsLoading(false);
        }
      };
      
      loadSignedUrl();
      return () => { isMounted = false; };
    }
  }, [open, report]);

  const handleDownload = () => {
    if (signedUrl && report) {
      const a = document.createElement('a');
      a.href = signedUrl;
      a.download = report.file_name;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  if (!report) return null;

  const isPdf = report.mime_type === "application/pdf";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl w-[90vw] h-[90vh] flex flex-col p-0 overflow-hidden gap-0">
        <DialogHeader className="p-4 border-b bg-white flex-row items-center justify-between space-y-0 z-10 shrink-0">
          <div>
            <DialogTitle className="text-lg">{report.report_name}</DialogTitle>
            <p className="text-sm text-gray-500 mt-1">{report.report_type} &bull; {new Date(report.report_date).toLocaleDateString()}</p>
          </div>
          <div className="flex gap-2">
            {signedUrl && (
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" /> Download
              </Button>
            )}
            <Button variant="default" size="sm" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 bg-gray-100/50 flex items-center justify-center relative overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          )}

          {signedUrl ? (
            isPdf ? (
              <iframe 
                src={`${signedUrl}#toolbar=0`} 
                className="w-full h-full border-none"
                title={report.report_name}
              />
            ) : (
              <div className="w-full h-full p-4 flex items-center justify-center overflow-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={signedUrl} 
                  alt={report.report_name} 
                  className="max-w-full max-h-full object-contain shadow-sm bg-white"
                />
              </div>
            )
          ) : (
            !isLoading && (
              <div className="text-gray-500">Failed to load preview</div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
