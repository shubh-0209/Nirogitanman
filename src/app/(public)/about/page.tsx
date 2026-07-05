import { Metadata } from "next";
import { HeroSection } from "@/components/public/HeroSection";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | Nirogitanman",
  description: "Learn about the mission, vision, and healthcare philosophy behind Nirogitanman.",
};

export default function AboutPage() {
  return (
    <>
      <HeroSection 
        title="About"
        subtitle="Nirogitanman"
        description="We are on a mission to democratize preventive healthcare by blending modern medical science with holistic wellness traditions, powered by AI."
      />
      
      <Section className="bg-white">
        <Container className="max-w-4xl">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <HeartPulse className="h-6 w-6" />
              </div>
              <h2 className="text-3xl font-bold m-0 text-foreground">Our Philosophy</h2>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              At Nirogitanman, we believe that true health is not just the absence of disease, but a state of complete physical, mental, and social well-being. The name &apos;Nirogitanman&apos; translates roughly to a &apos;disease-free body and mind&apos; — a philosophy that guides every feature we build.
            </p>
            
            <h3 className="text-2xl font-semibold mt-12 mb-4 text-foreground">The Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              We envision a world where proactive, preventive healthcare is accessible to everyone. By leveraging advanced Artificial Intelligence, we can provide personalized, 24/7 wellness guidance while seamlessly connecting patients to certified medical professionals when acute care is needed.
            </p>

            <h3 className="text-2xl font-semibold mt-12 mb-4 text-foreground">Our Core Values</h3>
            <ul className="space-y-4 text-muted-foreground list-disc pl-6">
              <li><strong className="text-foreground">Empathy First:</strong> Technology should enhance the human touch, not replace it.</li>
              <li><strong className="text-foreground">Evidence-Informed:</strong> Our AI and clinical guidelines are rooted in validated medical research.</li>
              <li><strong className="text-foreground">Privacy & Security:</strong> Your health data is your most private asset. We protect it with enterprise-grade encryption.</li>
              <li><strong className="text-foreground">Holistic Approach:</strong> We respect the integration of modern medicine (Allopathy) with traditional wellness systems (like Ayurveda).</li>
            </ul>
          </div>
        </Container>
      </Section>
    </>
  );
}
