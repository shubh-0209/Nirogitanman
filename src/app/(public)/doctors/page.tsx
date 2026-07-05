import { Metadata } from "next";
import { HeroSection } from "@/components/public/HeroSection";
import { DoctorCard, Doctor } from "@/components/public/DoctorCard";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Find Doctors | Nirogitanman",
  description: "Book appointments with top-rated medical professionals across various specialties.",
};

const mockDoctors: Doctor[] = [
  { id: "1", name: "Dr. Anjali Sharma", specialization: "Cardiologist", experienceYears: 15, rating: 4.9, location: "New Delhi, India" },
  { id: "2", name: "Dr. Rajiv Menon", specialization: "Ayurvedic Practitioner", experienceYears: 12, rating: 4.8, location: "Mumbai, India" },
  { id: "3", name: "Dr. Sarah Jenkins", specialization: "Clinical Nutritionist", experienceYears: 8, rating: 4.7, location: "Bangalore, India" },
  { id: "4", name: "Dr. Amit Patel", specialization: "General Physician", experienceYears: 20, rating: 4.9, location: "Ahmedabad, India" },
  { id: "5", name: "Dr. Priya Desai", specialization: "Dermatologist", experienceYears: 10, rating: 4.6, location: "Pune, India" },
  { id: "6", name: "Dr. Vikram Singh", specialization: "Neurologist", experienceYears: 18, rating: 4.9, location: "Delhi, India" },
];

export default function DoctorsPage() {
  return (
    <>
      <HeroSection 
        title="Find the Right"
        subtitle="Specialist for You"
        description="Search our network of highly qualified and verified healthcare professionals."
      />
      
      <Section className="bg-white">
        <Container>
          <div className="mb-10 flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input placeholder="Search by name, specialty, or condition..." className="pl-10 h-12 text-lg" />
            </div>
            <Button size="lg" className="h-12 px-8">Search</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockDoctors.map(doc => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
