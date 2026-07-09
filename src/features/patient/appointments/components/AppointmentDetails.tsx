"use client";

import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, Video, MapPin, CheckCircle2, XCircle, HelpCircle, ArrowLeft, Download, FileText, AlertCircle, PlayCircle, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { JoinedAppointment } from "./AppointmentCard";

interface AppointmentDetailsProps {
  appointment: JoinedAppointment;
  labReports?: any[];
}

export function AppointmentDetails({ appointment, labReports = [] }: AppointmentDetailsProps) {
  const isPending = appointment.status === "Pending" || appointment.status === "Pending Confirmation";
  const isConfirmed = appointment.status === "Confirmed" || appointment.status === "Rescheduled";
  const isInProgress = appointment.status === "In Progress";
  const isCompleted = appointment.status === "Completed";
  const isCancelled = appointment.status === "Cancelled" || appointment.status === "Rejected";

  const getStatusConfig = () => {
    if (isCompleted) return { icon: CheckCircle2, class: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200" };
    if (isCancelled) return { icon: XCircle, class: "bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200" };
    if (isPending) return { icon: HelpCircle, class: "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200" };
    if (isInProgress) return { icon: PlayCircle, class: "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200" };
    return { icon: Calendar, class: "bg-teal-100 text-teal-700 hover:bg-teal-100 border-teal-200" }; // Confirmed
  };

  const StatusIcon = getStatusConfig().icon;
  const statusClass = getStatusConfig().class;

  const dateStr = appointment.appointment_date 
    ? format(parseISO(appointment.appointment_date), "EEEE, MMMM d, yyyy") 
    : "Date TBD";

  const createdStr = appointment.created_at
    ? format(parseISO(appointment.created_at), "MMM d, yyyy 'at' h:mm a")
    : "Unknown";

  const doctor = appointment.doctors;

  // Timeline logic
  const steps = [
    { label: "Appointment Booked", done: true, time: createdStr },
    { label: "Doctor Confirmed", done: isConfirmed || isInProgress || isCompleted, time: (isConfirmed || isInProgress || isCompleted) && appointment.updated_at ? format(parseISO(appointment.updated_at), "MMM d, yyyy 'at' h:mm a") : null },
    { label: "Consultation Started", done: isInProgress || isCompleted, time: null },
    { label: "Consultation Completed", done: isCompleted, time: null },
    { label: "Prescription Available", done: !!appointment.prescription_id, time: null }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
      <Link href={`${ROUTES.DASHBOARD}/my-appointments`} className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Appointments
      </Link>

      <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
        {/* Header Section */}
        <div className="p-6 sm:p-8 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              Consultation Details
              <Badge variant="outline" className={cn("px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 font-medium", statusClass)}>
                <StatusIcon className="w-3.5 h-3.5" />
                {appointment.status}
              </Badge>
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Reference ID: <span className="font-mono">{appointment.id.split('-')[0]}</span>
            </p>
          </div>
          
          {/* Dynamic Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {isPending && (
              <Button variant="outline" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 border-rose-200">
                Cancel Appointment
              </Button>
            )}
            {isConfirmed && (
              <Button disabled className="bg-indigo-600">
                <Video className="w-4 h-4 mr-2" /> Join Consultation
              </Button>
            )}
            {isInProgress && (
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <Video className="w-4 h-4 mr-2" /> Re-join Consultation
              </Button>
            )}
            {isCompleted && (
              <>
                <Button variant="outline" disabled={!appointment.prescription_id}>
                  <Pill className="w-4 h-4 mr-2" /> View Prescription
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" /> Download Summary
                </Button>
              </>
            )}
            {isCancelled && (
              <Link href={`${ROUTES.DASHBOARD}/consult-doctor`}>
                <Button variant="outline" className="text-primary hover:text-primary">
                  Book Again
                </Button>
              </Link>
            )}
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Main Info Column */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Doctor/Provider Profile */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Provider</h3>
              {doctor ? (
                <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <Avatar className="h-16 w-16 border-2 border-white shadow-sm">
                    <AvatarImage src={doctor.profile_photo || ""} />
                    <AvatarFallback>{doctor.full_name?.substring(0,2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">Dr. {doctor.full_name}</h4>
                    <p className="text-sm font-medium text-primary">{doctor.specialization}</p>
                    <p className="text-sm text-gray-600 mt-1">{doctor.clinic_name}</p>
                    {doctor.city && (
                      <p className="text-sm text-gray-500 flex items-center mt-1">
                        <MapPin className="w-3.5 h-3.5 mr-1" /> {doctor.city}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <h4 className="text-lg font-bold text-gray-900">{appointment.department}</h4>
                  <p className="text-sm text-gray-500">General Consultation</p>
                </div>
              )}
            </div>

            {/* Visit Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Visit Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Date</p>
                    <p className="text-sm font-semibold text-gray-900">{dateStr}</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Time</p>
                    <p className="text-sm font-semibold text-gray-900">{appointment.appointment_time}</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    {appointment.consultation_mode === "Video" ? <Video className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">Mode</p>
                    <p className="text-sm font-semibold text-gray-900">{appointment.consultation_mode}</p>
                  </div>
                </div>
                {appointment.appointment_type && (
                  <div className="p-4 rounded-xl border border-gray-100 flex items-start gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-1">Type</p>
                      <p className="text-sm font-semibold text-gray-900">{appointment.appointment_type}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Notes Section */}
            {(appointment.reason_for_visit || appointment.patient_notes || appointment.doctor_notes) && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Consultation Notes</h3>
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 space-y-5">
                  {appointment.reason_for_visit && (
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase">Reason for Visit</span>
                      <p className="text-sm text-gray-800 mt-1.5">{appointment.reason_for_visit}</p>
                    </div>
                  )}
                  {appointment.patient_notes && (
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase">Patient Notes</span>
                      <p className="text-sm text-gray-800 mt-1.5">{appointment.patient_notes}</p>
                    </div>
                  )}
                  {appointment.doctor_notes && (
                    <div>
                      <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5" /> Doctor's Notes
                      </span>
                      <div className="mt-2 bg-white p-4 rounded-lg border shadow-sm">
                        <p className="text-sm text-gray-800">{appointment.doctor_notes}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Uploaded Reports Section */}
            {labReports.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Attached Reports</h3>
                <div className="space-y-3">
                  {labReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between p-4 rounded-xl border bg-white">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{report.report_name}</p>
                          <p className="text-xs text-gray-500">{report.report_type} • {format(new Date(report.report_date), "MMM d, yyyy")}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info Column */}
          <div className="md:border-l border-gray-100 md:pl-8 space-y-8">
            
            {/* Status Timeline */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Status Timeline</h3>
              <div className="relative pl-6 space-y-6 before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 before:to-transparent">
                
                {steps.map((step, idx) => {
                  if (isCancelled && idx > 0) return null; // Don't show future steps if cancelled

                  return (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className={cn(
                        "flex items-center justify-center w-5 h-5 rounded-full border-2 border-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute -left-6 transition-colors",
                        step.done ? "bg-primary" : "bg-slate-200"
                      )} />
                      <div className={cn("w-full transition-opacity", !step.done && "opacity-50")}>
                        <p className="text-sm font-semibold text-gray-900">{step.label}</p>
                        {step.time && <p className="text-xs text-gray-500">{step.time}</p>}
                      </div>
                    </div>
                  );
                })}
                
                {isCancelled && (
                  <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-rose-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute -left-6" />
                    <div className="w-full">
                      <p className="text-sm font-semibold text-rose-600">Consultation Cancelled</p>
                    </div>
                  </div>
                )}
                
              </div>
            </div>
            
            {/* Meeting Link (if confirmed and video) */}
            {isConfirmed && appointment.consultation_mode === "Video" && appointment.meeting_link && (
              <div className="bg-indigo-50 p-5 rounded-xl border border-indigo-100">
                <h4 className="text-sm font-semibold text-indigo-900 mb-2 flex items-center gap-2">
                  <Video className="w-4 h-4" /> Meeting Link Ready
                </h4>
                <p className="text-xs text-indigo-700 mb-4">The doctor has provided a meeting link. You can join the consultation when it is time.</p>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Join Now</Button>
              </div>
            )}

            {/* Help & Support */}
            <div className="bg-primary/5 p-5 rounded-xl border border-primary/10">
              <h4 className="text-sm font-semibold text-primary mb-2">Need help?</h4>
              <p className="text-xs text-gray-600 mb-4">If you have questions about this consultation, please contact the clinic directly.</p>
              <Button variant="outline" size="sm" className="w-full bg-white">Contact Support</Button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}
