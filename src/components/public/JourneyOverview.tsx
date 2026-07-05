"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Search, HeartPulse, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function JourneyOverview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-32 bg-slate-50 border-t border-b border-border/40">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              A smarter way <br className="hidden lg:block"/> to manage your wellness journey.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Traditional healthcare is reactive. Nirogitanman flips the model by proactively analyzing your health data, connecting you with verified professionals, and delivering personalized guidance before symptoms become problems.
            </p>
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7 pl-0 lg:pl-12 border-l-0 lg:border-l border-slate-200 space-y-12"
          >
            
            <motion.div variants={itemVariants} className="flex gap-6 relative">
              <div className="flex-shrink-0 mt-1">
                <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                  <Search className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Intelligent Analysis</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Our medical AI cross-references your symptoms with millions of clinical data points to provide accurate preliminary guidance and actionable next steps.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex gap-6 relative">
              <div className="flex-shrink-0 mt-1">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                  <HeartPulse className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Holistic Care</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  We merge modern medicine with traditional Ayurvedic practices to create a nutrition and lifestyle plan completely unique to your physiological blueprint.
                </p>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex gap-6 relative">
              <div className="flex-shrink-0 mt-1">
                <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                  <ShieldCheck className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Data Ownership</h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Your medical records are yours. Encrypted, secure, and accessible only by you and the doctors you explicitly authorize through our zero-knowledge architecture.
                </p>
              </div>
            </motion.div>
            
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
}
