"use client";

import React, { useState, useRef, useEffect } from "react";
import { saveLabReportMetadata } from "../actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UploadCloud, X, File, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

interface UploadReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const REPORT_TYPES = [
  "Blood Test", "Urine Test", "MRI", "CT Scan", "X-Ray", "ECG", "Prescription", "Vaccination", "Other"
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

export function UploadReportDialog({ open, onOpenChange, onSuccess }: UploadReportDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [reportName, setReportName] = useState("");
  const [reportType, setReportType] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (selectedFile: File) => {
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      toast.error("Invalid file type. Only PDF, PNG, and JPEG are allowed.");
      return false;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      toast.error("File is too large. Maximum size is 10MB.");
      return false;
    }
    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        if (!reportName) {
          setReportName(droppedFile.name.split('.')[0]);
        }
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        if (!reportName) {
          setReportName(selectedFile.name.split('.')[0]);
        }
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return toast.error("Please upload a file");
    if (!reportName || !reportType || !reportDate) return toast.error("Please fill required fields");

    setIsSubmitting(true);
    setUploadProgress(10);
    
    try {
      const supabase = createClient();
      const { data: userData, error: authError } = await supabase.auth.getUser();
      if (authError || !userData?.user) {
        throw new Error("You must be logged in to upload files.");
      }
      
      setUploadProgress(30);

      // Simulate progress for UI feedback during the upload phase
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => (prev < 90 ? prev + 10 : prev));
      }, 300);

      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `${userData.user.id}/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('lab-reports')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      clearInterval(progressInterval);

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        throw new Error("Failed to upload file to storage.");
      }

      setUploadProgress(100);

      const result = await saveLabReportMetadata({
        reportName,
        reportType,
        doctorName: doctorName || null,
        hospitalName: hospitalName || null,
        reportDate,
        notes: notes || null,
        fileUrl: uploadData.path,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type
      });

      if (result.error) {
        toast.error(result.error);
        // Attempt to cleanup orphaned file
        await supabase.storage.from('lab-reports').remove([filePath]);
      } else {
        toast.success("Report uploaded successfully!");
        onOpenChange(false);
        resetForm();
        if (onSuccess) onSuccess();
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to upload report");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setUploadProgress(0), 500);
    }
  };

  const resetForm = () => {
    setFile(null);
    setReportName("");
    setReportType("");
    setDoctorName("");
    setHospitalName("");
    setReportDate(new Date().toISOString().split('T')[0]);
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      onOpenChange(val);
      if (!val) resetForm();
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Lab Report</DialogTitle>
          <DialogDescription>Securely store your medical reports.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          
          <div 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="hidden" 
            />
            
            {file ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                  <File className="w-6 h-6" />
                </div>
                <div className="text-sm font-medium text-gray-900 truncate max-w-[200px]">{file.name}</div>
                <div className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => { e.stopPropagation(); setFile(null); }}
                  className="mt-2 text-red-500 hover:text-red-600 hover:bg-red-50"
                >
                  <X className="w-4 h-4 mr-1" /> Remove
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-2">
                  <UploadCloud className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, PNG, JPG (max. 10MB)</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportName">Report Name *</Label>
              <Input 
                id="reportName" 
                value={reportName} 
                onChange={(e) => setReportName(e.target.value)} 
                placeholder="e.g. Complete Blood Count" 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type *</Label>
              <Select value={reportType} onValueChange={(val) => setReportType(val || "")} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportDate">Report Date *</Label>
              <Input 
                id="reportDate" 
                type="date" 
                value={reportDate} 
                onChange={(e) => setReportDate(e.target.value)} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctorName">Doctor Name</Label>
              <Input 
                id="doctorName" 
                value={doctorName} 
                onChange={(e) => setDoctorName(e.target.value)} 
                placeholder="Optional" 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="hospitalName">Hospital / Clinic Name</Label>
              <Input 
                id="hospitalName" 
                value={hospitalName} 
                onChange={(e) => setHospitalName(e.target.value)} 
                placeholder="Optional" 
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
                placeholder="Add any additional notes here..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t">
            {isSubmitting && (
              <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !file}>
                {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <UploadCloud className="w-4 h-4 mr-2" />}
                {isSubmitting ? "Uploading..." : "Upload Report"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
