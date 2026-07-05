"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { MockupFrame } from "./MockupFrame";
import { Leaf, Flame, Droplets, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function NutritionShowcase() {
  return (
    <section className="py-32 bg-white">
      <Container>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2"
          >
            <MockupFrame className="h-[450px] bg-emerald-50/50 border-emerald-100 shadow-2xl">
              <div className="p-6 md:p-8 flex flex-col h-full bg-white/40">
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-700 shadow-sm">
                    <Leaf className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-slate-900">Ayurvedic Diet Plan</h3>
                    <p className="text-sm font-medium text-emerald-700">Pitta Dosha Balancing</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Meal Card 1 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-orange-50 flex items-center justify-center">
                        <Flame className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Morning Metabolism</div>
                        <div className="text-xs font-medium text-slate-500 mt-0.5">07:00 AM &bull; Warm Lemon Water</div>
                      </div>
                    </div>
                    <div className="h-6 w-6 rounded-full bg-emerald-100 flex items-center justify-center">
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                    </div>
                  </motion.div>
                  
                  {/* Meal Card 2 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Droplets className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">Hydration Focus</div>
                        <div className="text-xs font-medium text-slate-500 mt-0.5">10:00 AM &bull; Coconut Water</div>
                      </div>
                    </div>
                    <div className="h-6 w-6 rounded-full border-2 border-slate-200" />
                  </motion.div>
                  
                  {/* Macro Progress */}
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8 bg-white rounded-2xl p-5 shadow-sm border border-slate-100"
                  >
                    <div className="flex justify-between text-sm font-bold mb-3">
                      <span className="text-slate-700">Daily Balance</span>
                      <span className="text-emerald-600">65%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: "65%" }}
                        transition={{ duration: 1, delay: 1 }}
                        className="bg-emerald-500 h-full rounded-full" 
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </MockupFrame>
          </motion.div>
          
          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
              Nutrition that dynamically adapts to your body.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We move beyond generic calorie counting. By analyzing your physiological data and understanding your unique body type (Dosha), our AI generates dynamic meal plans that balance your energy, improve digestion, and boost immunity.
            </p>
            
            <ul className="space-y-5 mb-10">
              <li className="flex items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mr-4 shadow-sm">1</span>
                <span className="text-slate-800 font-medium text-lg">Personalized Dosha assessment.</span>
              </li>
              <li className="flex items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mr-4 shadow-sm">2</span>
                <span className="text-slate-800 font-medium text-lg">Real-time adjustments based on activity.</span>
              </li>
              <li className="flex items-center">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mr-4 shadow-sm">3</span>
                <span className="text-slate-800 font-medium text-lg">Integration with clinical lab results.</span>
              </li>
            </ul>
            
            <Link href="/diet-planner" className="inline-flex items-center text-emerald-600 font-bold text-lg hover:text-emerald-700 transition-colors group">
              Explore Diet Planner 
              <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
        </div>
      </Container>
    </section>
  );
}
