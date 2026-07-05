"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ROUTES } from "@/config/routes";

export function MobileNavigation() {
  const [open, setOpen] = React.useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger render={<Button variant="ghost" size="icon" />}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
          <SheetHeader>
            <SheetTitle className="text-left text-primary font-bold">Nirogitanman</SheetTitle>
          </SheetHeader>
          <div className="grid gap-6 py-6">
            <div className="flex flex-col space-y-4">
              <Link href={ROUTES.HOME} onClick={closeMenu} className="text-lg font-medium hover:text-primary transition-colors">Home</Link>
              <Link href="/features" onClick={closeMenu} className="text-lg font-medium hover:text-primary transition-colors">Features</Link>
              <Link href="/doctors" onClick={closeMenu} className="text-lg font-medium hover:text-primary transition-colors">Find Doctors</Link>
              <Link href="/ai-health" onClick={closeMenu} className="text-lg font-medium hover:text-primary transition-colors">AI Health</Link>
              <Link href="/diet-planner" onClick={closeMenu} className="text-lg font-medium hover:text-primary transition-colors">Diet Planner</Link>
              <Link href="/about" onClick={closeMenu} className="text-lg font-medium hover:text-primary transition-colors">About Us</Link>
              <Link href="/testimonials" onClick={closeMenu} className="text-lg font-medium hover:text-primary transition-colors">Testimonials</Link>
              <Link href="/faq" onClick={closeMenu} className="text-lg font-medium hover:text-primary transition-colors">FAQ</Link>
              <Link href="/contact" onClick={closeMenu} className="text-lg font-medium hover:text-primary transition-colors">Contact</Link>
            </div>
            <div className="flex flex-col space-y-4 pt-6 border-t border-border">
              <Link href={ROUTES.LOGIN} className={cn(buttonVariants({ variant: "outline" }), "w-full justify-center")} onClick={closeMenu}>Login</Link>
              <Link href={ROUTES.REGISTER} className={cn(buttonVariants(), "w-full justify-center")} onClick={closeMenu}>Get Started</Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
