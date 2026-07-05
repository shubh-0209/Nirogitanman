"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { StatHighlight } from "./StatHighlight";
import { motion } from "framer-motion";

export function MetricsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-24 bg-white border-t border-border/40">
      <Container>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Scale that speaks for itself.
          </h2>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-100 text-center"
        >
          <motion.div variants={itemVariants}>
            <StatHighlight 
              value="500+" 
              label="Verified Specialists" 
              className="px-4"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatHighlight 
              value="1M+" 
              label="Health Records" 
              className="px-4"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatHighlight 
              value="4.9/5" 
              label="Patient Satisfaction" 
              className="px-4"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <StatHighlight 
              value="0" 
              label="Data Breaches" 
              className="px-4"
            />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
