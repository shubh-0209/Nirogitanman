import { Metadata } from "next";
import { HeroSection } from "@/components/public/HeroSection";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { TestimonialCard } from "@/components/public/TestimonialCard";

export const metadata: Metadata = {
  title: "Patient Testimonials | Nirogitanman",
  description: "Read stories from patients who have transformed their health with Nirogitanman.",
};

const mockTestimonials = [
  { quote: "The AI symptom checker is incredibly accurate. It gave me the confidence to see a specialist immediately.", name: "Sarah J.", role: "Verified Patient" },
  { quote: "I love how the platform combines modern medicine with Ayurvedic diet planning. My energy levels have never been better.", name: "Michael R.", role: "Wellness Enthusiast" },
  { quote: "Having all my lab reports summarized in plain English by the AI is a game-changer.", name: "Priya M.", role: "Verified Patient" },
  { quote: "Booking consultations with top doctors is seamless. The video quality and secure records make remote care perfect.", name: "Arjun K.", role: "Verified Patient" },
  { quote: "The medicine reminders have kept my elderly mother on track with her prescriptions. Highly recommended!", name: "Ritu D.", role: "Caregiver" },
  { quote: "I finally understand my Dosha! The personalized diet planner mapped perfectly to my lifestyle.", name: "Liam S.", role: "Fitness Coach" },
];

export default function TestimonialsPage() {
  return (
    <>
      <HeroSection 
        title="Stories of"
        subtitle="Better Health"
        description="See how Nirogitanman is empowering individuals to take control of their preventive healthcare journey."
      />
      
      <Section className="bg-white">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockTestimonials.map((t, i) => (
              <TestimonialCard key={i} quote={t.quote} name={t.name} role={t.role} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
