"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { ShieldCheck, Lock, Database } from "lucide-react";
import { motion } from "framer-motion";

export function SecuritySection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-32 bg-white border-t border-border/40 overflow-hidden">
      <Container>
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="h-16 w-16 bg-teal-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-teal-100"
          >
            <ShieldCheck className="h-8 w-8 text-teal-600" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl mb-6 text-slate-900 max-w-3xl"
          >
            Enterprise-grade security for your most private data.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl leading-relaxed"
          >
            Your health information is your property. We employ zero-knowledge architecture and end-to-end encryption to ensure that nobody—not even us—can access your records without your explicit consent.
          </motion.p>
        </div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 md:grid-cols-3"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center bg-slate-50 p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 bg-white text-teal-600 rounded-2xl shadow-sm mb-6 border border-slate-100">
              <Lock className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-slate-900">End-to-End Encryption</h3>
            <p className="text-slate-600 leading-relaxed">
              All data is encrypted in transit and at rest using AES-256 standards, matching the security of top-tier financial institutions.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center bg-slate-50 p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 bg-white text-teal-600 rounded-2xl shadow-sm mb-6 border border-slate-100">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-slate-900">Secure by Design</h3>
            <p className="text-slate-600 leading-relaxed">
              Built on a foundation of privacy-first principles. We never sell, share, or monetize your personal or medical data.
            </p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center bg-slate-50 p-10 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-4 bg-white text-teal-600 rounded-2xl shadow-sm mb-6 border border-slate-100">
              <Database className="h-8 w-8" />
            </div>
            <h3 className="font-bold text-xl mb-3 text-slate-900">Absolute Ownership</h3>
            <p className="text-slate-600 leading-relaxed">
              You maintain total cryptographic control over who sees your health records. Revoke access instantly at any time.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
