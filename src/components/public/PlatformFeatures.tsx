"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { 
  LineChart, 
  Activity, 
  Smartphone, 
  BellRing,
  FileDigit,
  Syringe
} from "lucide-react";
import { motion } from "framer-motion";

export function PlatformFeatures() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-32 bg-slate-50/50 border-t border-slate-100">
      <Container>
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6"
          >
            Everything you need. <br className="hidden sm:block" />
            <span className="text-primary">Nothing you don&apos;t.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            A comprehensive suite of tools designed with extreme simplicity. Access powerful healthcare features without the learning curve.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          
          {/* Large Feature 1 */}
          <motion.div variants={itemVariants} className="md:col-span-2 bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100/60 flex flex-col justify-between overflow-hidden relative group hover:shadow-md transition-all duration-300">
            <div className="z-10 mb-16 max-w-md">
              <div className="h-14 w-14 rounded-2xl bg-teal-50 flex items-center justify-center mb-6 border border-teal-100/50">
                <LineChart className="h-7 w-7 text-teal-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Longitudinal Tracking</h3>
              <p className="text-slate-600 leading-relaxed">Watch your health metrics improve over time with interactive, beautifully visualized charts that reveal hidden patterns in your daily habits.</p>
            </div>
            
            {/* Mock Chart Decorative */}
            <div className="absolute right-0 bottom-0 w-[80%] sm:w-2/3 h-1/2 translate-y-1/4 translate-x-1/4 group-hover:translate-y-8 group-hover:translate-x-8 transition-transform duration-700 ease-out">
              <div className="w-full h-full bg-slate-50/80 backdrop-blur-sm rounded-tl-3xl border-t border-l border-slate-200 p-6 flex items-end gap-2 sm:gap-3">
                {[30, 45, 40, 60, 55, 80, 75, 95].map((h, i) => (
                  <div key={i} className="flex-1 bg-teal-100/50 rounded-t-lg" style={{ height: `${h}%` }}>
                    <div className="w-full bg-primary rounded-t-lg opacity-80" style={{ height: `${h - 20}%` }} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Small Feature 1 */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100/60 flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="h-14 w-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 border border-blue-100/50">
                <FileDigit className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Smart Records</h3>
              <p className="text-slate-600 leading-relaxed">All your prescriptions, lab results, and consultation notes automatically organized.</p>
            </div>
          </motion.div>
          
          {/* Small Feature 2 */}
          <motion.div variants={itemVariants} className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-slate-100/60 flex flex-col justify-between hover:shadow-md transition-all duration-300">
            <div>
              <div className="h-14 w-14 rounded-2xl bg-emerald-50 flex items-center justify-center mb-6 border border-emerald-100/50">
                <Smartphone className="h-7 w-7 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Mobile First</h3>
              <p className="text-slate-600 leading-relaxed">A seamless experience across all your devices. Your health data goes wherever you go.</p>
            </div>
          </motion.div>
          
          {/* Large Feature 2 */}
          <motion.div variants={itemVariants} className="md:col-span-2 bg-slate-900 rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-800 flex flex-col justify-between overflow-hidden relative group">
            <div className="z-10 relative max-w-md">
              <div className="h-14 w-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 border border-slate-700">
                <BellRing className="h-7 w-7 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Proactive Alerts</h3>
              <p className="text-slate-400 leading-relaxed">
                Get notified when it&apos;s time to take your medication, hydrate, or when your wearables detect an anomaly in your resting heart rate.
              </p>
            </div>
            
            {/* Mock Alert UI */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 w-72 flex flex-col gap-4 hidden md:flex">
              <motion.div 
                whileHover={{ scale: 1.05, x: -10 }}
                className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex items-start gap-4 shadow-2xl transition-transform"
              >
                <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-1">
                  <Syringe className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">Time for Medicine</div>
                  <div className="text-xs text-slate-400">Take 1 pill of Vitamin D3 with your morning meal.</div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05, x: -10 }}
                className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-4 flex items-start gap-4 shadow-2xl opacity-60 translate-x-6 transition-transform"
              >
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 mt-1">
                  <Activity className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white mb-1">Daily Goal Met</div>
                  <div className="text-xs text-slate-400">You reached 10,000 steps! Keep up the great work.</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
          
        </motion.div>
      </Container>
    </section>
  );
}
