import { Metadata } from "next";
import { HeroSection } from "@/components/public/HeroSection";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | Nirogitanman",
  description: "Get in touch with the Nirogitanman team for support, partnerships, or general inquiries.",
};

export default function ContactPage() {
  return (
    <>
      <HeroSection 
        title="Get in"
        subtitle="Touch"
        description="Have a question or need support? We're here to help you on your wellness journey."
      />
      
      <Section className="bg-white">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-foreground">Send us a message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and our support team will get back to you within 24 hours.
              </p>
              
              <form className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="first-name" className="text-sm font-medium">First name</label>
                    <Input id="first-name" placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="last-name" className="text-sm font-medium">Last name</label>
                    <Input id="last-name" placeholder="Doe" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <Textarea id="message" placeholder="How can we help?" rows={5} />
                </div>
                <Button size="lg" className="w-full sm:w-auto">Send Message</Button>
              </form>
            </div>
            
            <div className="space-y-6">
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email Us</h3>
                    <p className="text-muted-foreground mt-1">contact@nirogitanman.com</p>
                    <p className="text-muted-foreground">support@nirogitanman.com</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Call Us</h3>
                    <p className="text-muted-foreground mt-1">+91 1800-123-4567</p>
                    <p className="text-sm text-muted-foreground mt-1">Mon-Fri from 9am to 6pm IST</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200 dark:border-slate-800">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Headquarters</h3>
                    <p className="text-muted-foreground mt-1">
                      123 Wellness Avenue, Health Tech Park<br/>
                      Bangalore, Karnataka 560001<br/>
                      India
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
