"use client";

import React from "react";
import { format } from "date-fns";
import { 
  Calendar, 
  FileText, 
  Pill, 
  Bell, 
  User,
  Clock,
  MapPin,
  Video,
  Upload,
  ActivitySquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StatCard } from "@/components/dashboard/StatCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { WidgetContainer } from "@/components/dashboard/WidgetContainer";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { createClient } from "@/lib/supabase/client";
import { Database } from "@/lib/supabase/database.types";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];
type Appointment = Database["public"]["Tables"]["appointments"]["Row"];
type MedicalRecord = Database["public"]["Tables"]["medical_records"]["Row"];
type Prescription = Database["public"]["Tables"]["prescriptions"]["Row"];
type Notification = Database["public"]["Tables"]["notifications"]["Row"];

interface DashboardClientProps {
  patientId: string;
  profile: Profile | null;
  counts: {
    appointments: number;
    prescriptions: number;
    records: number;
    notifications: number;
  };
  nextAppointment: Appointment | null;
  recentRecords: MedicalRecord[];
  prescriptions: Prescription[];
  notifications: Notification[];
}

export function DashboardClient({
  profile,
  counts,
  nextAppointment,
  recentRecords,
  prescriptions,
  notifications
}: DashboardClientProps) {
  const [greeting, setGreeting] = React.useState("Welcome");
  const [currentDate, setCurrentDate] = React.useState("");
  const router = useRouter();
  const supabase = createClient();

  React.useEffect(() => {
    const channel = supabase
      .channel('dashboard_realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments',
          filter: profile ? `patient_id=eq.${profile.id}` : undefined
        },
        () => {
          router.refresh();
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: profile ? `user_id=eq.${profile.id}` : undefined
        },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router, profile]);

  React.useEffect(() => {
    const now = new Date();
    setCurrentDate(format(now, "EEEE, MMMM do, yyyy"));
    
    const hour = now.getHours();
    if (hour >= 5 && hour < 12) setGreeting("Good Morning");
    else if (hour >= 12 && hour < 17) setGreeting("Good Afternoon");
    else if (hour >= 17 && hour < 21) setGreeting("Good Evening");
    else setGreeting("Good Night");
  }, []);

  if (!profile || !profile.full_name) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm border border-primary/20">
          <User className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{greeting}</h1>
        <p className="text-gray-500 mb-8 max-w-md text-lg">
          Please complete your profile to access your personalized health dashboard, book appointments, and manage your medical records.
        </p>
        <Link href={`${ROUTES.DASHBOARD}/profile`}>
          <Button size="lg" className="shadow-sm">Complete Profile Now</Button>
        </Link>
      </div>
    );
  }

  const firstName = profile.full_name.split(" ")[0];

  // Calculate BMI safely
  const bmi = profile.height_cm && profile.weight_kg 
    ? (profile.weight_kg / Math.pow(profile.height_cm / 100, 2)).toFixed(1) 
    : "--";

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-10">
      
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/10 shadow-sm">
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback className="bg-primary/5 text-primary text-xl">
              {firstName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
              {greeting}, {firstName}
            </h1>
            <p className="text-gray-500 font-medium min-h-[24px]">{currentDate}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href={`${ROUTES.DASHBOARD}/appointments`}>
            <Button className="shadow-sm">Book Appointment</Button>
          </Link>
        </div>
      </div>

      {/* Summary Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Upcoming Visits"
          value={counts.appointments.toString()}
          icon={Calendar}
          description={counts.appointments > 0 ? "Next one soon" : "None scheduled"}
        />
        <StatCard
          title="Active Prescriptions"
          value={counts.prescriptions.toString()}
          icon={Pill}
          description={counts.prescriptions > 0 ? "Take on time" : "No active meds"}
        />
        <StatCard
          title="Medical Records"
          value={counts.records.toString()}
          icon={FileText}
          description="Securely stored"
        />
        <StatCard
          title="Notifications"
          value={counts.notifications.toString()}
          icon={Bell}
          description={counts.notifications > 0 ? "Action required" : "All caught up"}
        />
      </div>

      <DashboardGrid columns={2}>
        {/* Left Column - Priority Items */}
        <div className="flex flex-col gap-6">
          {/* Next Appointment Widget */}
          <WidgetContainer 
            title="Next Appointment" 
            action={
              <Link href={`${ROUTES.DASHBOARD}/appointments`} className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            }
          >
            {nextAppointment ? (
              <div className="flex flex-col sm:flex-row gap-5 p-4 rounded-xl border border-primary/10 bg-primary/5">
                <div className="bg-white rounded-lg p-3 text-center min-w-[80px] shadow-sm border">
                  <div className="text-xs font-semibold text-gray-500 uppercase">
                    {format(new Date(nextAppointment.appointment_date), "MMM")}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {format(new Date(nextAppointment.appointment_date), "d")}
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900">{nextAppointment.department}</h3>
                    <StatusBadge 
                      variant={
                        nextAppointment.status === "Scheduled" || nextAppointment.status === "Confirmed" ? "primary" :
                        nextAppointment.status === "Completed" ? "success" :
                        nextAppointment.status === "Cancelled" ? "destructive" :
                        "default"
                      }
                    >
                      {nextAppointment.status}
                    </StatusBadge>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 gap-4 mt-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {nextAppointment.appointment_time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      {nextAppointment.consultation_mode === "Video" ? (
                        <Video className="w-4 h-4 text-gray-400" />
                      ) : (
                        <MapPin className="w-4 h-4 text-gray-400" />
                      )}
                      {nextAppointment.consultation_mode}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <EmptyState 
                icon={Calendar} 
                title="No upcoming appointments"
                description="You don't have any appointments scheduled at the moment."
                action={{
                  label: "Book Appointment",
                  href: `${ROUTES.DASHBOARD}/appointments`
                }}
              />
            )}
          </WidgetContainer>

          {/* Recent Medical Records Widget */}
          <WidgetContainer 
            title="Recent Medical Records"
            action={
              <Link href={`${ROUTES.DASHBOARD}/medical-records`} className="text-sm font-medium text-primary hover:underline">
                View All
              </Link>
            }
          >
            {recentRecords.length > 0 ? (
              <div className="space-y-3">
                {recentRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{record.title}</p>
                        <p className="text-xs text-gray-500">{record.doctor_name || record.hospital_name || record.record_type}</p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(new Date(record.visit_date), "MMM d, yyyy")}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={FileText} 
                title="No records found"
                description="Upload your past medical records to access them securely from anywhere."
                action={{
                  label: "Upload Record",
                  href: `${ROUTES.DASHBOARD}/medical-records`
                }}
              />
            )}
          </WidgetContainer>
          
          {/* Quick Actions */}
          <WidgetContainer title="Quick Actions">
            <div className="grid grid-cols-2 gap-4">
              <QuickActionCard
                title="Update Profile"
                description="Manage personal details"
                icon={User}
                href={`${ROUTES.DASHBOARD}/profile`}
              />
              <QuickActionCard
                title="Upload Record"
                description="Add new documents"
                icon={Upload}
                href={`${ROUTES.DASHBOARD}/medical-records`}
              />
              <QuickActionCard
                title="Book Visit"
                description="Schedule an appointment"
                icon={Calendar}
                href={`${ROUTES.DASHBOARD}/appointments`}
              />
              <QuickActionCard
                title="Health Tools"
                description="Take an assessment"
                icon={ActivitySquare}
                href={`${ROUTES.DASHBOARD}/dosha-assessment`}
              />
            </div>
          </WidgetContainer>
        </div>

        {/* Right Column - Secondary Items */}
        <div className="flex flex-col gap-6">
          
          {/* Health Profile Widget */}
          <WidgetContainer title="Health Vitals">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border bg-white flex flex-col items-center justify-center text-center">
                <span className="text-sm font-medium text-gray-500 mb-1">Blood Group</span>
                <span className="text-2xl font-bold text-red-500">{profile?.blood_group || "--"}</span>
              </div>
              <div className="p-4 rounded-xl border bg-white flex flex-col items-center justify-center text-center">
                <span className="text-sm font-medium text-gray-500 mb-1">BMI</span>
                <span className="text-2xl font-bold text-gray-900">{bmi}</span>
              </div>
              <div className="p-4 rounded-xl border bg-white flex flex-col items-center justify-center text-center">
                <span className="text-sm font-medium text-gray-500 mb-1">Height (cm)</span>
                <span className="text-xl font-semibold text-gray-900">{profile?.height_cm || "--"}</span>
              </div>
              <div className="p-4 rounded-xl border bg-white flex flex-col items-center justify-center text-center">
                <span className="text-sm font-medium text-gray-500 mb-1">Weight (kg)</span>
                <span className="text-xl font-semibold text-gray-900">{profile?.weight_kg || "--"}</span>
              </div>
            </div>
            {(!profile?.height_cm || !profile?.weight_kg || !profile?.blood_group) && (
              <div className="mt-4 p-3 bg-amber-50 rounded-lg border border-amber-100 flex items-start gap-3">
                <ActivitySquare className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-amber-800">Complete your profile</p>
                  <p className="text-xs text-amber-700 mt-1">Add your vitals to get personalized health insights.</p>
                  <Link href={`${ROUTES.DASHBOARD}/profile`} className="text-xs font-semibold text-amber-600 hover:text-amber-700 mt-2 inline-block">
                    Update Vitals &rarr;
                  </Link>
                </div>
              </div>
            )}
          </WidgetContainer>

          {/* Current Medications Widget */}
          <WidgetContainer title="Active Prescriptions">
            {prescriptions.length > 0 ? (
              <div className="space-y-3">
                {prescriptions.map((med) => (
                  <div key={med.id} className="p-3 rounded-lg border flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                        <Pill className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{med.medication_name}</p>
                        <p className="text-xs text-gray-500">{med.dosage} • {med.frequency}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={Pill} 
                title="No active prescriptions"
                description="You don't have any ongoing medications."
              />
            )}
          </WidgetContainer>
          
          {/* Notifications Widget */}
          <WidgetContainer title="Recent Notifications">
            {notifications.length > 0 ? (
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div key={notif.id} className="p-3 rounded-lg bg-gray-50 border border-gray-100 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">{notif.title}</p>
                      {!notif.is_read && <span className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2">{notif.message}</p>
                    <Link href={`${ROUTES.DASHBOARD}/notifications`} className="text-[10px] font-semibold text-primary mt-1 hover:underline">
                      View Details &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState 
                icon={Bell} 
                title="You're all caught up"
                description="You have no new notifications."
              />
            )}
          </WidgetContainer>

        </div>
      </DashboardGrid>
    </div>
  );
}
