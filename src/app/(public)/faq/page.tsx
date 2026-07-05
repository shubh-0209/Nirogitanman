import { Metadata } from "next";
import { HeroSection } from "@/components/public/HeroSection";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { FaqAccordion } from "@/components/public/FaqAccordion";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Nirogitanman",
  description: "Find answers to common questions about using the Nirogitanman healthcare platform.",
};

const generalFaqs = [
  { question: "What is Nirogitanman?", answer: "Nirogitanman is a holistic, AI-powered preventive healthcare platform. It combines modern medical technology (like AI symptom checking and secure health records) with holistic wellness guidance (like Dosha-based diet planning)." },
  { question: "Is my health data secure?", answer: "Yes. We use enterprise-grade encryption for all patient records. Your data is stored securely and never shared with third parties without your explicit consent." },
  { question: "How does the AI Symptom Checker work?", answer: "Our AI is powered by advanced medical language models. You describe your symptoms, and it cross-references vast medical databases to provide potential causes and triage advice. It is not a replacement for a real doctor." },
  { question: "Can I book appointments with real doctors?", answer: "Absolutely. Our platform connects you with a curated network of verified doctors across multiple specialties for both video consultations and in-person visits." },
];

export default function FaqPage() {
  return (
    <>
      <HeroSection 
        title="Frequently Asked"
        subtitle="Questions"
        description="Everything you need to know about the platform, billing, and your privacy."
      />
      
      <Section className="bg-white">
        <Container className="max-w-3xl">
          <FaqAccordion items={generalFaqs} />
        </Container>
      </Section>
    </>
  );
}
