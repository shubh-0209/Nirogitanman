import { Metadata } from "next";
import { HeroSection } from "@/components/public/HeroSection";
import { FeatureCard } from "@/components/public/FeatureCard";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Sparkles, Apple, Activity, FileText, Bell, Users, Lock, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "Platform Features | Nirogitanman",
  description: "Explore the comprehensive suite of healthcare tools available on Nirogitanman.",
};

export default function FeaturesPage() {
  const features = [
    { title: "AI Symptom Checker", desc: "Instantly analyze your symptoms using our advanced medical LLM to get preliminary triage advice.", icon: <Sparkles className="h-6 w-6" /> },
    { title: "Personalized Diet Planner", desc: "Get nutrition plans tailored to your dosha, allergies, and specific health goals.", icon: <Apple className="h-6 w-6" /> },
    { title: "Vitals Tracking", desc: "Log and visualize your blood pressure, sugar levels, and BMI over time.", icon: <Activity className="h-6 w-6" /> },
    { title: "Secure Health Records", desc: "Store your prescriptions, lab reports, and scans in a highly secure, encrypted vault.", icon: <Lock className="h-6 w-6" /> },
    { title: "Smart Medicine Reminders", desc: "Never miss a dose with our automated SMS and push notification reminder system.", icon: <Bell className="h-6 w-6" /> },
    { title: "Doctor Network", desc: "Browse through a curated list of top-tier specialists and book consultations instantly.", icon: <Users className="h-6 w-6" /> },
    { title: "AI Report Summarization", desc: "Upload complex medical PDFs and let our AI translate the jargon into plain English.", icon: <FileText className="h-6 w-6" /> },
    { title: "Seamless Scheduling", desc: "Manage your appointments with automated calendar syncing and reminders.", icon: <Calendar className="h-6 w-6" /> },
  ];

  return (
    <>
      <HeroSection 
        title="Powerful Features for"
        subtitle="Better Health"
        description="Discover the tools designed to keep you proactive, informed, and connected to your wellness journey."
      />
      
      <Section className="bg-white">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <FeatureCard key={i} title={f.title} description={f.desc} icon={f.icon} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
