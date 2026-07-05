"use client";

import * as React from "react";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function DoctorNetwork() {
  const doctors = [
    { name: "Dr. Emily Chen", spec: "Cardiologist", rating: 4.9, patients: "2k+", color: "bg-blue-100", init: "EC" },
    { name: "Dr. James Wilson", spec: "Ayurvedic Specialist", rating: 4.8, patients: "1.5k+", color: "bg-emerald-100", init: "JW" },
    { name: "Dr. Sarah Jenkins", spec: "General Practitioner", rating: 4.9, patients: "3k+", color: "bg-teal-100", init: "SJ" },
  ];

  return (
    <section className="py-24 bg-slate-50 border-t border-border/40 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-6">
              World-class care, <br/>just a tap away.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              Connect instantly with our network of rigorously vetted medical professionals. From modern allopathy to traditional Ayurveda, find the right expert for your holistic wellness journey.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-slate-700 font-medium">Verified Credentials</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-slate-700 font-medium">Zero Wait Time Consultations</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-primary" />
                <span className="text-slate-700 font-medium">Integrated Health Records</span>
              </div>
            </div>

            <Link href="/doctors">
              <Button size="lg" className="w-fit transition-transform hover:scale-105">
                Explore Doctor Network <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
          
          <div className="relative h-[400px] sm:h-[500px] w-full flex items-center justify-center">
            {/* Soft decorative background element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50/50 rounded-full blur-3xl -z-10" />

            {/* Overlapping Cards */}
            {doctors.map((doc, idx) => (
              <motion.div 
                key={doc.name}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="absolute bg-white rounded-2xl p-6 shadow-lg border border-slate-100 w-[280px] sm:w-[320px] transition-transform hover:z-20 hover:scale-105"
                style={{
                  transform: `translate(${idx === 0 ? '-10%' : idx === 2 ? '10%' : '0%'}, ${idx === 1 ? '-20%' : '20%'})`,
                  zIndex: idx === 1 ? 10 : 5
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`h-14 w-14 rounded-full flex items-center justify-center font-bold text-lg text-slate-700 ${doc.color}`}>
                    {doc.init}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{doc.name}</h4>
                    <p className="text-sm text-slate-500">{doc.spec}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1 text-slate-600">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{doc.rating}</span>
                  </div>
                  <div className="text-slate-500">
                    {doc.patients} Patients
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </Container>
    </section>
  );
}
