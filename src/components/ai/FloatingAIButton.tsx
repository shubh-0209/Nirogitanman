"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { useAIContext } from "./AIProvider";
import { cn } from "@/lib/utils";

export function FloatingAIButton() {
  const { isOpen, toggleAI } = useAIContext();

  return (
    <button
      onClick={toggleAI}
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        !isOpen && "animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
      )}
      aria-label="Open AI Assistant"
    >
      <Sparkles className="w-6 h-6" />
    </button>
  );
}
