import { Metadata } from "next";
import { HeroSection } from "@/components/public/HeroSection";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Apple, Activity, Target } from "lucide-react";
import { FeatureCard } from "@/components/public/FeatureCard";

export const metadata: Metadata = {
  title: "Diet & Wellness Planner | Nirogitanman",
  description: "Get personalized nutrition plans based on your unique body dosha and health goals.",
};

export default function DietPlannerPage() {
  return (
    <>
      <HeroSection 
        title="Personalized"
        subtitle="Diet & Nutrition"
        description="Food is medicine. Unlock a diet plan meticulously crafted for your body type, allergies, and wellness goals."
      />
      
      <Section className="bg-white">
        <Container>
          <div className="grid gap-8 md:grid-cols-3">
            <FeatureCard 
              icon={<Apple className="h-6 w-6" />}
              title="Macronutrient Tracking"
              description="Keep an eye on your daily intake of proteins, carbs, and fats tailored to your specific fitness or health goals."
            />
            <FeatureCard 
              icon={<Activity className="h-6 w-6" />}
              title="Dosha-Based Eating"
              description="Discover foods that balance your Vata, Pitta, or Kapha doshas, integrating ancient Ayurvedic wisdom with modern nutrition."
            />
            <FeatureCard 
              icon={<Target className="h-6 w-6" />}
              title="Goal-Oriented Plans"
              description="Whether you're managing diabetes, seeking weight loss, or building immunity, get actionable weekly meal plans."
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
