import { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Terms and Conditions | Nirogitanman",
  description: "Terms and conditions of use for the Nirogitanman healthcare platform.",
};

export default function TermsPage() {
  return (
    <Section className="bg-white">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-foreground">Terms and Conditions</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
          <p>
            Please read these terms and conditions carefully before using the Nirogitanman platform operated by us.
          </p>

          <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Acceptance of Terms</h3>
          <p>
            By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.
          </p>

          <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. Medical Disclaimer</h3>
          <p>
            <strong>Crucial:</strong> The AI features, symptom checkers, and content on Nirogitanman are for informational purposes only. They are not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
          </p>

          <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. User Accounts</h3>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our platform.
          </p>
        </div>
      </Container>
    </Section>
  );
}
