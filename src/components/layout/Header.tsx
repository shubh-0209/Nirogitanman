import { Container } from "./Container";
import { TopNavigation } from "./TopNavigation";
import { MobileNavigation } from "./MobileNavigation";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/config/routes";
import Link from "next/link";
import { AnnouncementBar } from "@/components/public/AnnouncementBar";

export function Header() {
  return (
    <div className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
      <AnnouncementBar />
      <header className="w-full bg-white border-b border-border/40">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex gap-6 md:gap-10">
            <Link href={ROUTES.HOME} className="flex items-center space-x-2">
              <span className="inline-block font-bold text-xl text-primary">Nirogitanman</span>
            </Link>
            <TopNavigation />
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex gap-4">
              <Link href={ROUTES.LOGIN} className={buttonVariants({ variant: "ghost" })}>Login</Link>
              <Link href={ROUTES.REGISTER} className={buttonVariants()}>Get Started</Link>
            </div>
            <MobileNavigation />
          </div>
        </Container>
      </header>
    </div>
  );
}
