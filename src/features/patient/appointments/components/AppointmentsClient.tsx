"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentCard } from "@/features/patient/appointments/components/AppointmentCard";
import { BookAppointmentDialog } from "@/features/patient/appointments/components/BookAppointmentDialog";
import { RescheduleDialog } from "@/features/patient/appointments/components/RescheduleDialog";
import { CalendarX2 } from "lucide-react";

import { Database } from "@/lib/supabase/database.types";

type AppointmentRow = Database['public']['Tables']['appointments']['Row'];

interface AppointmentsClientProps {
  patientId: string;
  appointments: AppointmentRow[];
}

export function AppointmentsClient({ patientId, appointments }: AppointmentsClientProps) {
  const router = useRouter();
  const supabase = createClient();
  const [rescheduleAppointment, setRescheduleAppointment] = React.useState<AppointmentRow | null>(null);

  // Group appointments
  const upcomingAppointments = appointments.filter(
    (app) => app.status === "Scheduled" || app.status === "Rescheduled"
  );
  
  const historyAppointments = appointments.filter(
    (app) => app.status === "Completed" || app.status === "Cancelled"
  );

  const handleCancel = async (appointmentId: string) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: 'Cancelled' })
        .eq('id', appointmentId);

      if (error) throw error;
      
      toast.success("Appointment cancelled successfully");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to cancel appointment");
      }
    }
  };

  const handleViewDetails = (appointment: AppointmentRow) => {
    // In a future step, this could open a full details modal
    toast.info("Viewing details for " + appointment.department);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">Appointments</h1>
          <p className="text-muted-foreground mt-1">Manage your upcoming visits and view history.</p>
        </div>
        <BookAppointmentDialog patientId={patientId} />
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="bg-white border w-full justify-start h-auto p-1 rounded-xl">
          <TabsTrigger value="upcoming" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none">
            History ({historyAppointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 outline-none">
          {upcomingAppointments.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {upcomingAppointments.map((app) => (
                <AppointmentCard
                  key={app.id}
                  appointment={app}
                  onReschedule={setRescheduleAppointment}
                  onCancel={handleCancel}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4 outline-none">
          {historyAppointments.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed p-12 flex flex-col items-center justify-center text-center">
              <p className="text-muted-foreground">No appointment history found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {historyAppointments.map((app) => (
                <AppointmentCard
                  key={app.id}
                  appointment={app}
                  onReschedule={() => {}} // Disabled for history
                  onCancel={() => {}}     // Disabled for history
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <RescheduleDialog
        appointment={rescheduleAppointment}
        onClose={() => setRescheduleAppointment(null)}
      />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white rounded-2xl border border-dashed p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <CalendarX2 className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">No Upcoming Appointments</h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-6">
        You don&apos;t have any appointments scheduled at the moment. Book a consultation with one of our specialists to get started.
      </p>
    </div>
  );
}
