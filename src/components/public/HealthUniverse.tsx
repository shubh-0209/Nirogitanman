"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { motion } from "framer-motion";
import { 
  User, 
  Sparkles, 
  Stethoscope, 
  Apple, 
  CalendarDays, 
  Pill, 
  Activity, 
  Bell 
} from "lucide-react";

export function HealthUniverse() {
  const modules = [
    { id: "ai", icon: Sparkles, label: "AI Assistant", color: "text-teal-600", bg: "bg-teal-50", delay: 0.2 },
    { id: "doc", icon: Stethoscope, label: "Doctor Network", color: "text-blue-600", bg: "bg-blue-50", delay: 0.4 },
    { id: "nut", icon: Apple, label: "Nutrition", color: "text-emerald-600", bg: "bg-emerald-50", delay: 0.6 },
    { id: "app", icon: CalendarDays, label: "Appointments", color: "text-indigo-600", bg: "bg-indigo-50", delay: 0.8 },
    { id: "med", icon: Pill, label: "Medicine", color: "text-rose-600", bg: "bg-rose-50", delay: 1.0 },
    { id: "rep", icon: Activity, label: "Reports", color: "text-orange-600", bg: "bg-orange-50", delay: 1.2 },
    { id: "alt", icon: Bell, label: "Alerts", color: "text-yellow-600", bg: "bg-yellow-50", delay: 1.4 },
  ];

  return (
    <section className="py-32 bg-white overflow-hidden border-t border-border/40">
      <Container>
        <div className="text-center mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4"
          >
            Your Health Universe
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            You are at the center. Every module is interconnected, seamlessly sharing data to provide a unified, intelligent healthcare experience.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto min-h-[600px] flex items-center justify-center">
          
          {/* SVG Connecting Lines Background */}
          <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
            <svg width="100%" height="100%" viewBox="-300 -300 600 600" className="overflow-visible">
              {modules.map((mod, index) => {
                const angle = (index / modules.length) * 2 * Math.PI - Math.PI / 2;
                const radius = 220; // Must match the div positioning below
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.line
                    key={`line-${mod.id}`}
                    x1="0"
                    y1="0"
                    x2={x}
                    y2={y}
                    stroke="url(#line-gradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.5 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, delay: mod.delay - 0.2, ease: "easeInOut" }}
                  />
                );
              })}
              
              <defs>
                <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Central User Node */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="relative z-20 flex flex-col items-center justify-center h-32 w-32 rounded-full bg-white border border-slate-100 shadow-[0_0_40px_-10px_rgba(20,184,166,0.2)]"
          >
            <div className="h-16 w-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-700 mb-1">
              <User className="h-8 w-8" />
            </div>
            <span className="text-sm font-bold text-slate-900">You</span>
            
            {/* Subtle pulse effect */}
            <div className="absolute inset-0 rounded-full border border-teal-200 animate-ping opacity-20 duration-3000" />
          </motion.div>

          {/* Orbiting Modules */}
          {modules.map((mod, index) => {
            const angle = (index / modules.length) * 2 * Math.PI - Math.PI / 2;
            const radius = 220; 
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: mod.delay,
                  type: "spring",
                  stiffness: 70
                }}
                className="absolute z-10 flex flex-col items-center group cursor-pointer"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                {/* Node */}
                <motion.div 
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`relative h-16 w-16 rounded-2xl ${mod.bg} border border-white shadow-lg flex items-center justify-center mb-3 group-hover:shadow-xl transition-shadow`}
                >
                  <mod.icon className={`h-7 w-7 ${mod.color}`} />
                </motion.div>
                
                {/* Label */}
                <span className="text-sm font-semibold text-slate-700 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-slate-100 shadow-sm transition-all group-hover:bg-white group-hover:text-primary">
                  {mod.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
