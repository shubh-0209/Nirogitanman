"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { motion } from "framer-motion";

export function CtaSection() {
  return (
    <section className="py-32 bg-slate-50 border-t border-b border-border/40 relative overflow-hidden">
      {/* Very soft background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-50/50 via-transparent to-transparent pointer-events-none" />
      
      <Container className="relative z-10 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6"
        >
          Ready to redefine your health?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Join thousands of members who have already taken the proactive step towards a healthier, longer life. Your journey starts today.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Link href={ROUTES.REGISTER}>
            <Button size="lg" className="h-14 px-8 text-base shadow-md transition-transform hover:scale-105">
              Create Your Account <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
