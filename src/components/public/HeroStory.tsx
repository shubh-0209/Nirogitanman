"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { MockupFrame } from "./MockupFrame";
import { 
  ArrowRight, 
  Stethoscope, 
  CalendarDays, 
  Activity, 
  Pill, 
  Sparkles,
  LayoutDashboard,
  UserCircle,
  Settings
} from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { motion } from "framer-motion";

export function HeroStory() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 md:pt-24 lg:pt-32 pb-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50/50 via-white to-white pointer-events-none" />
      
      <Container className="relative z-10 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center rounded-full border border-teal-100 bg-teal-50/50 px-3 py-1 text-sm font-medium text-teal-800 mb-8"
        >
          <Sparkles className="mr-2 h-4 w-4 text-teal-600" />
          The Future of Preventive Care
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl"
        >
          Your Health, <br className="hidden sm:block" />
          <span className="text-primary">Intelligently Connected.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed"
        >
          Experience a unified ecosystem where AI-driven insights, top-tier doctors, and personalized wellness plans work together to optimize your health.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Link href={ROUTES.REGISTER}>
            <Button size="lg" className="w-full sm:w-auto h-14 px-8 text-base shadow-sm transition-transform hover:scale-105">
              Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-14 px-8 text-base border-slate-200 hover:bg-slate-50 transition-transform hover:scale-105">
              Discover How It Works
            </Button>
          </Link>
        </motion.div>

        {/* Cohesive Ecosystem Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 w-full max-w-6xl mx-auto"
        >
          <MockupFrame className="h-[550px] md:h-[650px] bg-slate-50 border-slate-200 shadow-2xl">
            <div className="flex h-full w-full overflow-hidden bg-white">
              
              {/* Mock Sidebar */}
              <div className="w-64 border-r border-slate-100 bg-slate-50/50 p-4 hidden md:flex flex-col gap-6">
                <div className="flex items-center gap-3 px-2 text-primary font-bold">
                  <Activity className="h-6 w-6" />
                  <span>Nirogitanman</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 bg-white rounded-lg border border-slate-200 text-sm font-medium text-slate-900 shadow-sm">
                    <LayoutDashboard className="h-4 w-4 text-primary" /> Dashboard
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    <Sparkles className="h-4 w-4" /> AI Assistant
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    <CalendarDays className="h-4 w-4" /> Appointments
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
                    <Activity className="h-4 w-4" /> Health Reports
                  </div>
                </div>
                <div className="mt-auto space-y-1">
                  <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500">
                    <Settings className="h-4 w-4" /> Settings
                  </div>
                  <div className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-500">
                    <UserCircle className="h-4 w-4" /> Profile
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-6 md:p-8 flex flex-col gap-6 bg-white overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">Good Morning, John</h2>
                    <p className="text-sm text-slate-500">Here is your wellness summary for today.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs text-slate-500">Health Score</div>
                      <div className="font-bold text-primary">94/100</div>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                      JD
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: AI Assistant & Medicines */}
                  <div className="lg:col-span-2 flex flex-col gap-6">
                    {/* AI Insights Panel */}
                    <div className="rounded-xl border border-teal-100 bg-teal-50/30 p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <Sparkles className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-slate-900">AI Wellness Insight</h3>
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-sm border border-slate-100 text-sm text-slate-600">
                        Based on your recent sleep data and nutrition logs, I recommend adjusting your evening meal time to 7:00 PM. This will align perfectly with your Pitta dosha and improve your restorative sleep phase.
                      </div>
                    </div>

                    {/* Vitals Trend Chart */}
                    <div className="rounded-xl border border-slate-100 p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900">Resting Heart Rate</h3>
                        <span className="text-xs text-slate-500">Last 7 Days</span>
                      </div>
                      <div className="flex items-end gap-3 h-32 w-full justify-between mt-2">
                        {[68, 65, 62, 60, 58, 61, 59].map((val, i) => (
                          <div key={i} className="w-full flex flex-col items-center gap-2 group">
                            <div className="w-full bg-teal-50 rounded-t-sm relative h-full flex items-end">
                              <motion.div 
                                initial={{ height: 0 }}
                                animate={{ height: `${val}%` }}
                                transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                className="w-full bg-primary rounded-t-sm" 
                              />
                            </div>
                            <span className="text-[10px] text-slate-400">Day {i+1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Appointments & Diet */}
                  <div className="flex flex-col gap-6">
                    {/* Upcoming Appointment */}
                    <div className="rounded-xl border border-slate-100 p-5">
                      <h3 className="font-semibold text-slate-900 mb-4">Up Next</h3>
                      <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                            <Stethoscope className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-slate-900">Dr. Sarah Jenkins</div>
                            <div className="text-xs text-slate-500">Cardiology Review</div>
                          </div>
                        </div>
                        <div className="text-xs font-medium text-slate-700 bg-white border border-slate-200 p-2 rounded flex justify-between items-center">
                          <span>Today</span>
                          <span className="text-primary">10:30 AM</span>
                        </div>
                      </div>
                    </div>

                    {/* Meds */}
                    <div className="rounded-xl border border-slate-100 p-5">
                      <h3 className="font-semibold text-slate-900 mb-4">Medications</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 rounded-lg border border-emerald-100 bg-emerald-50/50">
                          <div className="flex items-center gap-3">
                            <Pill className="h-4 w-4 text-emerald-600" />
                            <span className="text-sm font-medium text-slate-900">Vitamin D3</span>
                          </div>
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Taken</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100">
                          <div className="flex items-center gap-3">
                            <Pill className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-600">Omega 3</span>
                          </div>
                          <span className="text-xs bg-slate-100 text-slate-500 px-2 py-1 rounded">01:00 PM</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </MockupFrame>
        </motion.div>
      </Container>
    </section>
  );
}
