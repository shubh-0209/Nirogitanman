"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { FaqAccordion } from "./FaqAccordion";
import { motion } from "framer-motion";

export function FaqSection() {
  const faqs = [
    {
      question: "How does the AI Assistant work?",
      answer: "Our AI assistant uses advanced machine learning models trained on millions of clinical data points. It analyzes your symptoms, medical history, and lifestyle data to provide preliminary guidance. However, it does not replace a doctor's diagnosis."
    },
    {
      question: "Who can see my health records?",
      answer: "Only you and the healthcare professionals you explicitly authorize. We use end-to-end encryption and zero-knowledge architecture, meaning even our staff cannot view your personal medical data without your permission."
    },
    {
      question: "Are the doctors on the platform verified?",
      answer: "Yes, every doctor undergoes a rigorous multi-stage vetting process. We verify their medical licenses, clinical experience, and patient reviews to ensure you receive the highest standard of care."
    },
    {
      question: "How is the Ayurvedic diet plan personalized?",
      answer: "During onboarding, we assess your unique body type (Dosha) through a specialized questionnaire. The AI then maps your Dosha against your current health goals to generate meal plans that optimize your energy and digestion."
    },
    {
      question: "Can I connect my fitness wearables?",
      answer: "Yes. Nirogitanman seamlessly integrates with Apple Health, Google Fit, Garmin, and Fitbit to pull in your daily activity, sleep, and heart rate data for a complete holistic overview."
    }
  ];

  return (
    <section className="py-24 bg-white border-t border-border/40">
      <Container className="max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600">
            Everything you need to know about the platform.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <FaqAccordion items={faqs} />
        </motion.div>
      </Container>
    </section>
  );
}
