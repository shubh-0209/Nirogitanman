import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <Section className="flex-1 flex items-center justify-center min-h-[50vh]">
      <Container className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p>Loading your dashboard...</p>
      </Container>
    </Section>
  );
}
