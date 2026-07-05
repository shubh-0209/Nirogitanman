import { PageWrapper } from "@/components/layout/PageWrapper";
import { Section } from "@/components/layout/Section";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageWrapper>
      <Section className="flex-1 flex items-center justify-center bg-slate-50 min-h-screen px-4 py-12">
        <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
          {children}
        </div>
      </Section>
    </PageWrapper>
  );
}
