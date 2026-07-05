import { Metadata } from "next";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export const metadata: Metadata = {
  title: "Privacy Policy | Nirogitanman",
  description: "Privacy policy and data handling guidelines for Nirogitanman.",
};

export default function PrivacyPolicyPage() {
  return (
    <Section className="bg-white">
      <Container className="max-w-3xl">
        <h1 className="text-4xl font-extrabold tracking-tight mb-8 text-foreground">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        
        <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
          <p>
            At Nirogitanman, we take your privacy seriously. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our platform.
          </p>

          <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">1. Information We Collect</h3>
          <p>
            When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
          </p>
          <p>
            Additionally, when you register for an account, we collect personal information you provide, such as your name, email address, health conditions, and medical history required for the platform to function properly.
          </p>

          <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">2. How Do We Use Your Personal Information?</h3>
          <p>
            We use the Personal Information that we collect generally to fulfill any services requested through the Site (including processing your health data for AI symptom checking, diet planning, and connecting you with doctors).
          </p>
          <ul>
            <li>Communicate with you.</li>
            <li>Screen for potential risk or fraud.</li>
            <li>Provide you with information or advertising relating to our products or services (if you have opted in).</li>
          </ul>

          <h3 className="text-2xl font-semibold text-foreground mt-8 mb-4">3. Data Security</h3>
          <p>
            We implement enterprise-grade encryption for all health-related data. However, please remember that no method of transmission over the Internet, or method of electronic storage, is 100% secure.
          </p>
        </div>
      </Container>
    </Section>
  );
}
