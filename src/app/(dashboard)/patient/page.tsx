import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { StatCard } from "@/components/dashboard/StatCard";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { ActivityTimeline } from "@/components/dashboard/ActivityTimeline";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { createClient } from "@/lib/supabase/server";
import { Activity, Heart, Calendar, Stethoscope, Bot, FileText, Pill } from "lucide-react";

export default async function PatientDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "there";

  const RECENT_ACTIVITY = [
    {
      id: "1",
      title: "Health Report Generated",
      description: "Your monthly wellness report is ready.",
      time: "2 hours ago",
      icon: FileText,
      iconClassName: "bg-blue-100 text-blue-600",
    },
    {
      id: "2",
      title: "Appointment Completed",
      description: "Consultation with Dr. Sharma.",
      time: "Yesterday",
      icon: Stethoscope,
      iconClassName: "bg-emerald-100 text-emerald-600",
    },
    {
      id: "3",
      title: "Medicine Refill",
      description: "Prescription updated for next month.",
      time: "3 days ago",
      icon: Pill,
      iconClassName: "bg-purple-100 text-purple-600",
      isLast: true,
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <SectionHeader 
        title={`Welcome back, ${firstName}`} 
        description="Here's a summary of your health and upcoming activities."
      />

      {/* Top Stats Grid */}
      <DashboardGrid columns={3}>
        <StatCard
          title="Overall Wellness Score"
          value="85/100"
          icon={Heart}
          trend={{ value: 5, isPositive: true, label: "vs last month" }}
        />
        <StatCard
          title="Next Appointment"
          value="Oct 24, 10:00 AM"
          description="Dr. Sharma (Ayurveda)"
          icon={Calendar}
        />
        <StatCard
          title="Daily Activity"
          value="6,450"
          description="Steps taken today"
          icon={Activity}
          trend={{ value: 12, isPositive: false, label: "vs yesterday" }}
        />
      </DashboardGrid>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Column (Wider) */}
        <div className="xl:col-span-2 space-y-6">
          {/* Quick Actions */}
          <DashboardCard title="Quick Actions">
            <DashboardGrid columns={2} className="gap-4">
              <QuickActionCard
                title="Book Appointment"
                description="Schedule a new consultation"
                icon={Calendar}
                href="/patient/appointments"
              />
              <QuickActionCard
                title="AI Health Assistant"
                description="Chat with our wellness AI"
                icon={Bot}
                href="/patient/ai-assistant"
              />
              <QuickActionCard
                title="Symptom Checker"
                description="Analyze your current symptoms"
                icon={Stethoscope}
                href="/patient/symptom-checker"
              />
              <QuickActionCard
                title="View Reports"
                description="Access your medical history"
                icon={FileText}
                href="/patient/health-reports"
              />
            </DashboardGrid>
          </DashboardCard>

          {/* Health Progress Placeholder */}
          <DashboardCard title="Health Progress">
            <EmptyState
              icon={Activity}
              title="No Data Yet"
              description="Connect your health devices or start logging your daily vitals to see your progress chart here."
              actionLabel="Connect Device"
              className="min-h-[250px] bg-transparent border-none p-0"
            />
          </DashboardCard>
        </div>

        {/* Right Column (Narrower) */}
        <div className="space-y-6">
          <DashboardCard title="Recent Activity">
            <ActivityTimeline events={RECENT_ACTIVITY} />
          </DashboardCard>
          
          <DashboardCard title="Daily Wellness Tip" className="bg-primary text-white border-transparent">
            <div className="space-y-4">
              <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Stay Hydrated</h3>
              <p className="text-primary-foreground/90 text-sm">
                Drinking warm water in the morning helps flush toxins and stimulates digestion according to Ayurvedic principles.
              </p>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
}
