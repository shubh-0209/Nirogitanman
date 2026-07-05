"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Quote, TrendingUp, Activity } from "lucide-react";
import { motion } from "framer-motion";

export function TestimonialSection() {
  const testimonials = [
    {
      outcome: "Reversed Pre-diabetes",
      journey: "6 Months • Diet & Regular AI Tracking",
      quote: "Nirogitanman completely changed how I manage my health. The continuous tracking combined with targeted Ayurvedic dietary changes helped me normalize my blood sugar without heavy medication.",
      author: "Sarah J.",
      role: "Verified Patient"
    },
    {
      outcome: "Optimized Digestion & Energy",
      journey: "3 Months • Pitta Balancing Plan",
      quote: "The holistic diet planner mapped perfectly to my Ayurvedic needs. I've never felt more energized and balanced in my daily routine. The personalized adjustments make all the difference.",
      author: "Michael R.",
      role: "Wellness Enthusiast"
    },
    {
      outcome: "Managed Chronic Hypertension",
      journey: "1 Year • Doctor Network & Daily Vitals",
      quote: "Having my cardiologist and my daily vitals in one connected ecosystem gave me total peace of mind. The proactive alerts caught an anomaly before I even felt it.",
      author: "Priya M.",
      role: "Verified Patient"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-32 bg-slate-50 border-t border-b border-border/40">
      <Container>
        <div className="flex flex-col items-center text-center mb-20">
          <Quote className="h-10 w-10 text-teal-200 mb-6" />
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mb-6 max-w-3xl leading-tight">
            Real outcomes from proactive care.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            See how our integrated approach to preventive healthcare is transforming lives.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-8 lg:grid-cols-3"
        >
          {testimonials.map((t, idx) => (
            <motion.div 
              variants={itemVariants}
              key={idx} 
              className="flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Highlight Header */}
              <div className="bg-teal-50/50 p-6 border-b border-teal-100 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-teal-700 font-bold">
                  <TrendingUp className="h-5 w-5" />
                  <span>{t.outcome}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <Activity className="h-4 w-4" />
                  <span>{t.journey}</span>
                </div>
              </div>
              
              {/* Body */}
              <div className="p-8 flex flex-col flex-1">
                <div className="mb-8 flex-1 text-slate-700 text-lg leading-relaxed">
                  &quot;{t.quote}&quot;
                </div>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                  <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                    {t.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{t.author}</div>
                    <div className="text-sm font-medium text-slate-500">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
