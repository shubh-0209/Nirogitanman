import { Metadata } from "next";
import { HeroSection } from "@/components/public/HeroSection";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "AI Health Assistant | Nirogitanman",
  description: "Check your symptoms and get personalized wellness guidance from our advanced medical AI.",
};

export default function AIHealthPage() {
  return (
    <>
      <HeroSection 
        title="Your 24/7 AI"
        subtitle="Wellness Companion"
        description="Interact with our cutting-edge AI to understand your symptoms, translate medical jargon, and receive preliminary lifestyle advice."
      />
      
      <Section className="bg-white">
        <Container className="max-w-4xl">
          <Alert className="mb-12 bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-900">
            <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300">Important Safety Notice</AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              The AI Health Assistant is designed for informational purposes only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.
            </AlertDescription>
          </Alert>

          <h2 className="text-3xl font-bold mb-8 text-foreground">How It Helps You</h2>
          
          <div className="space-y-6">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Symptom Checking</h3>
                <p className="text-muted-foreground">Describe how you&apos;re feeling, and the AI will analyze potential causes based on vast medical databases, suggesting whether you need immediate care or home rest.</p>
              </CardContent>
            </Card>
            
            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Report Summarization</h3>
                <p className="text-muted-foreground">Upload your blood test results or MRI reports. The AI will translate complex clinical jargon into easy-to-understand summaries, highlighting areas of concern.</p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">Dosha & Holistic Analysis</h3>
                <p className="text-muted-foreground">Answer a few lifestyle questions, and the AI will map your profile to Ayurvedic principles, offering tailored wellness and lifestyle modifications.</p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
