import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { PageWrapper } from "@/components/layout/PageWrapper";

export default function NotFound() {
  return (
    <PageWrapper>
      <Section className="flex-1 flex items-center justify-center bg-slate-50 ">
        <Container className="max-w-md text-center">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 mb-8">
            <FileQuestion className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-foreground">404 - Page Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className={buttonVariants({ size: "lg" })}>Return to Home</Link>
          </div>
        </Container>
      </Section>
    </PageWrapper>
  );
}
