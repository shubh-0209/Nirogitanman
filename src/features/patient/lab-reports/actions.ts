"use server";

import { createClient } from "@/lib/supabase/server";
import { getCachedAuthUser } from "@/features/auth/utils";
import { revalidatePath } from "next/cache";
import { sendNotification } from "@/features/patient/notifications/actions";

export async function saveLabReportMetadata(data: {
  reportName: string;
  reportType: string;
  doctorName?: string | null;
  hospitalName?: string | null;
  reportDate: string;
  notes?: string | null;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
}) {
  try {
    const user = await getCachedAuthUser();
    if (!user) return { error: "Unauthorized" };

    if (!data.reportName || !data.reportType || !data.reportDate || !data.fileUrl || !data.fileName) {
      return { error: "Missing required fields" };
    }

    const supabase = await createClient();
    
    const { data: dbData, error: dbError } = await supabase
      .from('lab_reports')
      .insert({
        user_id: user.id,
        report_name: data.reportName,
        report_type: data.reportType,
        doctor_name: data.doctorName || null,
        hospital_name: data.hospitalName || null,
        report_date: data.reportDate,
        notes: data.notes || null,
        file_url: data.fileUrl,
        file_name: data.fileName,
        file_size: data.fileSize,
        mime_type: data.mimeType
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database insert error:", dbError);
      return { error: "Failed to save report metadata" };
    }

    await sendNotification({
      userId: user.id,
      type: "lab_report",
      title: "Lab Report Uploaded",
      message: `${data.reportName} uploaded successfully.`,
      referenceId: dbData.id,
      referenceType: "lab_reports"
    });

    revalidatePath("/dashboard/lab-reports");
    revalidatePath("/dashboard");
    return { success: true, data: dbData };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function deleteLabReport(id: string, fileUrl: string) {
  try {
    const user = await getCachedAuthUser();
    if (!user) return { error: "Unauthorized" };

    const supabase = await createClient();

    const { error: dbError } = await supabase
      .from('lab_reports')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (dbError) return { error: "Failed to delete record" };

    const { error: storageError } = await supabase.storage
      .from('lab-reports')
      .remove([fileUrl]);

    if (storageError) console.error("Failed to delete storage file", storageError);

    revalidatePath("/dashboard/lab-reports");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "An unexpected error occurred" };
  }
}

export async function updateLabReport(id: string, formData: FormData) {
  try {
    const user = await getCachedAuthUser();
    if (!user) return { error: "Unauthorized" };

    const reportName = formData.get("report_name") as string;
    const notes = formData.get("notes") as string || null;

    if (!reportName) return { error: "Report name is required" };

    const supabase = await createClient();
    
    const { error } = await supabase
      .from('lab_reports')
      .update({
        report_name: reportName,
        notes: notes,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) return { error: "Failed to update record" };

    revalidatePath("/dashboard/lab-reports");
    return { success: true };
  } catch (error) {
    console.error("Unexpected error:", error);
    return { error: "An unexpected error occurred" };
  }
}
