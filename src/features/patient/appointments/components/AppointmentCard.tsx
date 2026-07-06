import * as React from "react";
import { format, parseISO } from "date-fns";
import { Calendar, Clock, Video, MapPin, CheckCircle2, XCircle, AlertCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { Database } from "@/lib/supabase/database.types";

type AppointmentRow = Database['public']['Tables']['appointments']['Row'];

interface AppointmentCardProps {
  appointment: AppointmentRow;
  onReschedule: (appointment: AppointmentRow) => void;
  onCancel: (appointmentId: string) => void;
  onViewDetails: (appointment: AppointmentRow) => void;
}

export function AppointmentCard({ appointment, onReschedule, onCancel, onViewDetails }: AppointmentCardProps) {
  const isUpcoming = appointment.status === "Scheduled" || appointment.status === "Rescheduled";
  const isCancelled = appointment.status === "Cancelled";
  const isCompleted = appointment.status === "Completed";

  const getStatusConfig = () => {
    if (isCompleted) return { icon: CheckCircle2, class: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200" };
    if (isCancelled) return { icon: XCircle, class: "bg-rose-100 text-rose-700 hover:bg-rose-100 border-rose-200" };
    if (appointment.status === "Rescheduled") return { icon: AlertCircle, class: "bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200" };
    return { icon: Calendar, class: "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200" }; // Scheduled
  };

  const StatusIcon = getStatusConfig().icon;
  const statusClass = getStatusConfig().class;

  const dateStr = appointment.appointment_date 
    ? format(parseISO(appointment.appointment_date), "EEEE, MMMM d, yyyy") 
    : "Date TBD";

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
          <div className="flex items-center text-foreground font-medium text-lg">
            <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
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
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            {appointment.department} Consultation
          </h3>
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-muted-foreground font-medium">
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
            {appointment.doctor_id && (
              <div className="flex items-center">
                <Building2 className="w-4 h-4 mr-2" />
                Doctor Assigned
              </div>
            )}
          </div>
        </div>

        {appointment.reason_for_visit && (
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <p className="text-sm text-slate-600 line-clamp-2">
              <span className="font-semibold text-slate-700 mr-2">Reason:</span>
              {appointment.reason_for_visit}
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex md:flex-col gap-3 justify-end items-end shrink-0 pt-2 md:pt-0">
        <Button variant="outline" className="w-full md:w-32" onClick={() => onViewDetails(appointment)}>
          View Details
        </Button>
        {isUpcoming && (
          <>
            <Button variant="outline" className="w-full md:w-32" onClick={() => onReschedule(appointment)}>
              Reschedule
            </Button>
            <Button variant="ghost" className="w-full md:w-32 text-rose-600 hover:text-rose-700 hover:bg-rose-50" onClick={() => onCancel(appointment.id)}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
