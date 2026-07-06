"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, Plus, UploadCloud, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createClient } from "@/lib/supabase/client";
import { uploadMedicalRecordSchema, UploadMedicalRecordInput } from "@/features/patient/medical-records/schemas";
import { Database } from "@/lib/supabase/database.types";

const RECORD_TYPES = [
  "Consultation",
  "Hospital Visit",
  "Vaccination",
  "Surgery",
  "Diagnosis",
  "Lab Report",
  "Prescription",
  "Other"
];

type MedicalRecordRow = Database['public']['Tables']['medical_records']['Row'];

interface UploadRecordDialogProps {
  patientId: string;
  onRecordAdded: (record: MedicalRecordRow) => void;
}

export function UploadRecordDialog({ patientId, onRecordAdded }: UploadRecordDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [files, setFiles] = React.useState<File[]>([]);
  const supabase = createClient();

  const form = useForm<UploadMedicalRecordInput>({
    resolver: zodResolver(uploadMedicalRecordSchema),
    defaultValues: {
      title: "",
      recordType: "",
      visitDate: new Date().toISOString().split('T')[0],
      hospitalName: "",
      doctorName: "",
      diagnosis: "",
      description: "",
      notes: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      const validFiles = selectedFiles.filter(f => 
        ['application/pdf', 'image/jpeg', 'image/png'].includes(f.type) && 
        f.size <= 10 * 1024 * 1024
      );
      
      if (validFiles.length < selectedFiles.length) {
        toast.warning("Some files were skipped. Only PDF, JPG, and PNG up to 10MB are allowed.");
      }
      
      setFiles(prev => [...prev, ...validFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: UploadMedicalRecordInput) => {
    startTransition(async () => {
      try {
        const attachmentPaths: string[] = [];

        // Upload files to Supabase Storage first
        if (files.length > 0) {
          for (const file of files) {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
            const filePath = `${patientId}/${fileName}`;

            const { error: uploadError } = await supabase.storage
              .from('medical-records')
              .upload(filePath, file);

            if (uploadError) throw uploadError;
            
            attachmentPaths.push(filePath);
          }
        }

        // Insert record into Database
        const { data: insertedRecord, error } = await supabase
          .from('medical_records')
          .insert({
            patient_id: patientId,
            title: data.title,
            record_type: data.recordType,
            visit_date: data.visitDate,
            hospital_name: data.hospitalName || null,
            doctor_name: data.doctorName || null,
            diagnosis: data.diagnosis || null,
            description: data.description || null,
            notes: data.notes || null,
            attachments: attachmentPaths,
          })
          .select()
          .single();

        if (error) throw error;

        toast.success("Medical record uploaded successfully!");
        onRecordAdded(insertedRecord);
        setOpen(false);
        form.reset();
        setFiles([]);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Failed to upload record");
        }
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={(val) => {
      setOpen(val);
      if (!val) {
        form.reset();
        setFiles([]);
      }
    }}>
      <DialogTrigger render={<Button size="lg" className="rounded-full shadow-sm" />}>
        <Plus className="w-5 h-5 mr-2" />
        Upload Record
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload Medical Record</DialogTitle>
          <DialogDescription>
            Add a new document, lab report, or prescription to your history.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Record Title <span className="text-rose-500">*</span></FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Blood Test Report, Annual Checkup" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="recordType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Record Type <span className="text-rose-500">*</span></FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {RECORD_TYPES.map(type => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visitDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col mt-2.5">
                    <FormLabel>Date of Visit / Report <span className="text-rose-500">*</span></FormLabel>
                    <Popover>
                      <PopoverTrigger
                        render={
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          />
                        }
                      >
                        {field.value ? (
                          format(new Date(field.value), "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value ? new Date(field.value) : undefined}
                          onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                          disabled={(date) => date > new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="doctorName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor Name (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Dr. John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="hospitalName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hospital / Clinic (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="City Hospital" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="diagnosis"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Diagnosis / Result (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Viral Fever, Vitamin D Deficiency" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4 border-t pt-4">
              <div>
                <FormLabel className="mb-2 block">Attachments (PDF, JPG, PNG)</FormLabel>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer bg-slate-50 border-slate-300 hover:bg-slate-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <UploadCloud className="w-8 h-8 mb-3 text-muted-foreground" />
                      <p className="mb-2 text-sm text-slate-600"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-slate-500">Max 10MB per file</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" multiple accept="application/pdf,image/jpeg,image/png" onChange={handleFileChange} />
                  </label>
                </div>
                
                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 border rounded-lg">
                        <div className="flex items-center truncate">
                          <span className="text-sm font-medium text-slate-700 truncate">{file.name}</span>
                          <span className="text-xs text-slate-500 ml-2">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-slate-500 hover:text-rose-600" onClick={() => removeFile(idx)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Add any extra information regarding this record..." 
                        className="resize-none h-20" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t mt-6">
              <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={isPending}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Save Record
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
