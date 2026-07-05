import { Metadata } from "next";
import { HeroStory } from "@/components/public/HeroStory";
import { JourneyOverview } from "@/components/public/JourneyOverview";
import { HealthUniverse } from "@/components/public/HealthUniverse";
import { PreventiveTimeline } from "@/components/public/PreventiveTimeline";
import { DoctorNetwork } from "@/components/public/DoctorNetwork";
import { NutritionShowcase } from "@/components/public/NutritionShowcase";
import { PlatformFeatures } from "@/components/public/PlatformFeatures";
import { TestimonialSection } from "@/components/public/TestimonialSection";
import { SecuritySection } from "@/components/public/SecuritySection";
import { MetricsSection } from "@/components/public/MetricsSection";
import { FaqSection } from "@/components/public/FaqSection";
import { CtaSection } from "@/components/public/CtaSection";

export const metadata: Metadata = {
  title: "AI-Powered Preventive Healthcare | Nirogitanman",
  description: "Experience a unified ecosystem where AI-driven insights, top-tier doctors, and personalized wellness plans work together to optimize your health.",
};

export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <HeroStory />
      <JourneyOverview />
      <HealthUniverse />
      <PreventiveTimeline />
      <DoctorNetwork />
      <NutritionShowcase />
      <PlatformFeatures />
      <TestimonialSection />
      <SecuritySection />
      <MetricsSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}
