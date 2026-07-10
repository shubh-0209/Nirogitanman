"use client";

import React from "react";

const SUGGESTIONS = [
  { icon: "📋", text: "Summarize report" },
  { icon: "💊", text: "Explain prescription" },
  { icon: "🩺", text: "Check symptoms" },
  { icon: "🍎", text: "Wellness tips" },
];

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void;
  userName?: string;
}

export function SuggestedQuestions({ onSelect, userName = "there" }: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-col py-2 px-1 animate-in fade-in duration-500">
      <div className="mb-3">
        <h3 className="text-lg font-bold text-gray-900 mb-1">👋 Hello, {userName}!</h3>
        <p className="text-sm text-gray-500">
          How can I help you today?
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {SUGGESTIONS.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelect(s.text)}
            className="flex items-center gap-2.5 px-3 py-2 h-11 bg-white border border-gray-100 shadow-sm rounded-xl text-[13px] font-medium text-gray-700 hover:border-primary/40 hover:bg-primary/5 hover:text-primary hover:shadow-md transition-all text-left group active:scale-[0.98]"
          >
            <span className="text-[16px] group-hover:scale-110 transition-transform">{s.icon}</span>
            <span>{s.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
