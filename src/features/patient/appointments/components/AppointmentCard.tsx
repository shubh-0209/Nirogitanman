import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, Video, MapPin, CheckCircle2, XCircle, HelpCircle, ArrowRight, PlayCircle, Pill, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ROUTES } from "@/config/routes";

export type JoinedAppointment = any;

interface AppointmentCardProps {
  appointment: JoinedAppointment;
  onReschedule: (appointment: JoinedAppointment) => void;
  onCancel: (appointmentId: string) => void;
}

export function AppointmentCard({ appointment, onReschedule, onCancel }: AppointmentCardProps) {
  const isPending = appointment.status === "Pending" || appointment.status === "Pending Confirmation" || appointment.status === "Scheduled";
  const isConfirmed = appointment.status === "Confirmed" || appointment.status === "Rescheduled";
  const isInProgress = appointment.status === "In Progress";
  const isCompleted = appointment.status === "Completed";
  const isCancelled = appointment.status === "Cancelled" || appointment.status === "Rejected";

  const getStatusConfig = () => {
    if (isCompleted) return { icon: CheckCircle2, class: "bg-emerald-100 text-emerald-700 border-emerald-200" };
    if (isCancelled) return { icon: XCircle, class: "bg-rose-100 text-rose-700 border-rose-200" };
    if (isPending) return { icon: HelpCircle, class: "bg-amber-100 text-amber-700 border-amber-200" };
    if (isInProgress) return { icon: PlayCircle, class: "bg-indigo-100 text-indigo-700 border-indigo-200" };
    return { icon: Calendar, class: "bg-teal-100 text-teal-700 border-teal-200" }; // Confirmed
  };

  const StatusIcon = getStatusConfig().icon;
  const statusClass = getStatusConfig().class;

  const dateStr = appointment.appointment_date 
    ? format(parseISO(appointment.appointment_date), "EEEE, MMMM d, yyyy") 
    : "Date TBD";

  const doctor = appointment.doctors;

  return (
    <div className={cn(
      "bg-white rounded-2xl border p-6 flex flex-col md:flex-row gap-6 transition-all hover:shadow-md",
      isCancelled && "opacity-75 bg-slate-50"
    )}>
      {/* Date & Time Block */}
      <div className="flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start gap-4 md:gap-2 md:w-48 shrink-0 md:border-r border-slate-100 md:pr-6">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">
            {appointment.appointment_date ? format(parseISO(appointment.appointment_date), "MMM d") : "TBD"}
          </p>
          <div className="flex items-center text-gray-900 font-medium text-lg">
            <Clock className="w-5 h-5 mr-2 text-gray-500" />
            {appointment.appointment_time}
          </div>
        </div>
        <Badge variant="outline" className={cn("px-2.5 py-0.5 rounded-full border flex items-center gap-1.5", statusClass)}>
          <StatusIcon className="w-3.5 h-3.5" />
          {appointment.status}
        </Badge>
      </div>

      {/* Main Content */}
      <div className="flex-1 space-y-4">
        {/* Doctor Info */}
        {doctor ? (
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={doctor.profile_photo || ""} />
              <AvatarFallback>{doctor.full_name?.substring(0,2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Dr. {doctor.full_name}</h3>
              <p className="text-sm text-gray-500">{doctor.specialization} • {doctor.clinic_name}</p>
            </div>
          </div>
        ) : (
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {appointment.department} 
          </h3>
        )}

        <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500 font-medium">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {dateStr}
          </div>
          <div className="flex items-center">
            {appointment.consultation_mode === "Video" ? (
              <Video className="w-4 h-4 mr-2 text-indigo-500" />
            ) : (
              <MapPin className="w-4 h-4 mr-2 text-emerald-500" />
            )}
            {appointment.consultation_mode}
          </div>
        </div>

        {(appointment.reason_for_visit || appointment.patient_notes) && (
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2">
            {appointment.reason_for_visit && (
              <p className="text-sm text-gray-700 line-clamp-1">
                <span className="font-semibold text-gray-900 mr-2">Reason:</span>
                {appointment.reason_for_visit}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap md:flex-col gap-3 justify-end items-end shrink-0 pt-4 md:pt-0">
        
        {/* We always want View Details except maybe if Cancelled, but it's good to see it anyway. */}
        <Link href={`${ROUTES.DASHBOARD}/my-appointments/${appointment.id}`} className="w-full md:w-36 block">
          <Button variant="outline" className="w-full h-9">
            View Details <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>

        {isPending && (
          <Button variant="ghost" className="w-full md:w-36 h-9 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => onCancel(appointment.id)}>
            Cancel
          </Button>
        )}

        {isConfirmed && (
          <Button disabled className="w-full md:w-36 h-9 bg-indigo-600">
            <Video className="w-4 h-4 mr-2" /> Join
          </Button>
        )}

        {isInProgress && (
          <Button className="w-full md:w-36 h-9 bg-indigo-600 hover:bg-indigo-700">
            <Video className="w-4 h-4 mr-2" /> Re-join
          </Button>
        )}

        {isCompleted && (
          <>
            <Button variant="outline" disabled className="w-full md:w-36 h-9">
              <Pill className="w-4 h-4 mr-2" /> Prescription
            </Button>
            <Button variant="outline" disabled className="w-full md:w-36 h-9">
              <Download className="w-4 h-4 mr-2" /> Summary
            </Button>
          </>
        )}

        {isCancelled && (
          <Link href={`${ROUTES.DASHBOARD}/consult-doctor`} className="w-full md:w-36 block">
            <Button variant="outline" className="w-full h-9 text-primary border-primary hover:bg-primary/5">
              Book Again
            </Button>
          </Link>
        )}

      </div>
    </div>
  );
}
