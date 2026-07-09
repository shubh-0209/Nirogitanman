"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppointmentCard, JoinedAppointment } from "@/features/patient/appointments/components/AppointmentCard";
import { RescheduleDialog } from "@/features/patient/appointments/components/RescheduleDialog";
import { CalendarX2, CheckCircle2, Clock, Search, Filter } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cancelAppointment } from "../actions";

interface AppointmentsClientProps {
  patientId: string;
  initialAppointments: JoinedAppointment[];
}

export function AppointmentsClient({ patientId, initialAppointments }: AppointmentsClientProps) {
  const router = useRouter();
  const supabase = createClient();
  const [rescheduleAppointment, setRescheduleAppointment] = React.useState<JoinedAppointment | null>(null);
  const [cancelAppointmentId, setCancelAppointmentId] = React.useState<string | null>(null);
  const [isCancelling, setIsCancelling] = React.useState(false);

  const [searchQuery, setSearchQuery] = React.useState("");

  // We could fetch real-time updates but since we rely on joined data, we'll just refresh route on changes.
  React.useEffect(() => {
    const channel = supabase
      .channel('appointments_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments',
          filter: `patient_id=eq.${patientId}`
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router, patientId]);

  // Filter based on search query
  const appointments = initialAppointments.filter(app => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    const docName = app.doctors?.full_name?.toLowerCase() || "";
    const spec = app.doctors?.specialization?.toLowerCase() || "";
    const date = app.appointment_date || "";
    return docName.includes(q) || spec.includes(q) || date.includes(q);
  });

  // Group appointments
  const upcomingAppointments = appointments.filter(
    (app) => ["Scheduled", "Rescheduled", "Pending Confirmation", "Pending", "Confirmed", "In Progress"].includes(app.status)
  );
  
  const completedAppointments = appointments.filter(
    (app) => app.status === "Completed"
  );

  const cancelledAppointments = appointments.filter(
    (app) => app.status === "Cancelled" || app.status === "Rejected"
  );

  const handleCancel = async (appointmentId: string) => {
    try {
      setIsCancelling(true);
      const res = await cancelAppointment(appointmentId);

      if (!res.success) throw new Error(res.error || "Failed to cancel");
      
      toast.success("Appointment cancelled successfully");
      setCancelAppointmentId(null);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to cancel appointment");
      }
    } finally {
      setIsCancelling(false); 
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">My Appointments</h1>
          <p className="text-gray-500 mt-1">Manage your upcoming visits and view history.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by Doctor, Specialization, or Date (YYYY-MM-DD)..." 
            className="pl-9 w-full bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="bg-white border w-full justify-start h-auto p-1 rounded-xl overflow-x-auto overflow-y-hidden">
          <TabsTrigger value="upcoming" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none">
            Upcoming ({upcomingAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none">
            Completed ({completedAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none">
            Cancelled ({cancelledAppointments.length})
          </TabsTrigger>
          <TabsTrigger value="all" className="rounded-lg px-6 py-2.5 data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none">
            All ({appointments.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 outline-none">
          {upcomingAppointments.length === 0 ? (
            <EmptyState 
              icon={Clock} 
              title="No Upcoming Appointments" 
              description="You don't have any appointments scheduled at the moment."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {upcomingAppointments.map((app) => (
                <AppointmentCard
                  key={app.id}
                  appointment={app}
                  onReschedule={setRescheduleAppointment}
                  onCancel={(id) => setCancelAppointmentId(id)}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 outline-none">
          {completedAppointments.length === 0 ? (
            <EmptyState 
              icon={CheckCircle2} 
              title="No Completed Appointments" 
              description="You haven't completed any appointments yet."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {completedAppointments.map((app) => (
                <AppointmentCard
                  key={app.id}
                  appointment={app}
                  onReschedule={() => {}} 
                  onCancel={() => {}}     
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4 outline-none">
          {cancelledAppointments.length === 0 ? (
            <EmptyState 
              icon={CalendarX2} 
              title="No Cancelled Appointments" 
              description="You have no cancelled appointments in your history."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {cancelledAppointments.map((app) => (
                <AppointmentCard
                  key={app.id}
                  appointment={app}
                  onReschedule={() => {}} 
                  onCancel={() => {}}     
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4 outline-none">
          {appointments.length === 0 ? (
            <EmptyState 
              icon={Clock} 
              title="No Appointments Found" 
              description="You don't have any appointments."
            />
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {appointments.map((app) => (
                <AppointmentCard
                  key={app.id}
                  appointment={app}
                  onReschedule={setRescheduleAppointment}
                  onCancel={(id) => setCancelAppointmentId(id)}
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

      <Dialog open={!!cancelAppointmentId} onOpenChange={(open) => !open && setCancelAppointmentId(null)}>
        <DialogContent className="sm:max-w-[400px]">
          <div className="flex flex-col items-center justify-center text-center pt-8 pb-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <CalendarX2 className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Cancel Appointment</h3>
            <p className="text-gray-500 mb-6">
              Are you sure you want to cancel this appointment? This action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={() => setCancelAppointmentId(null)}
                disabled={isCancelling}
              >
                Keep Appointment
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={() => cancelAppointmentId && handleCancel(cancelAppointmentId)}
                disabled={isCancelling}
              >
                {isCancelling ? "Cancelling..." : "Yes, Cancel it"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function EmptyState({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) {
  return (
    <div className="bg-white rounded-2xl border border-dashed p-12 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        {description}
      </p>
    </div>
  );
}
