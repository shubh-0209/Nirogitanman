"use client";

import React from "react";

const SUGGESTIONS = [
  { icon: "🩺", text: "Explain my blood test" },
  { icon: "💊", text: "What is Paracetamol used for?" },
  { icon: "🥗", text: "Suggest a healthy diet" },
  { icon: "🏃", text: "Tips for weight loss" },
  { icon: "😴", text: "Why am I always tired?" },
  { icon: "🤒", text: "What causes fever?" },
  { icon: "❤️", text: "How can I improve heart health?" },
  { icon: "🧠", text: "Stress management tips" },
  { icon: "💧", text: "How much water should I drink?" },
  { icon: "🩸", text: "Explain my blood group" },
  { icon: "📈", text: "How do I reduce cholesterol?" },
  { icon: "🏥", text: "Prepare me for my appointment" },
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  userName?: string;
}

export function SuggestedQuestions({ onSelect, userName = "there" }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center animate-in fade-in duration-700">
      <div className="mb-8 max-w-sm">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">👋 Hello, {userName}!</h3>
        <p className="text-gray-600 mb-2">
          I'm your Nirogitanman Health Assistant.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          I can help explain medical reports, symptoms, medicines, healthy habits, and answer general health questions.
        </p>
        <p className="text-xs text-primary font-medium bg-primary/10 py-1.5 px-3 rounded-full inline-block">
          Always consult a qualified doctor for diagnosis and treatment.
        </p>
      </div>

      <div className="w-full max-w-md">
        <div className="flex flex-wrap justify-center gap-2">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={i}
              onClick={() => onSelect(s.text)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-primary hover:text-primary hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{s.icon}</span>
              <span>{s.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
