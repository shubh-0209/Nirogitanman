"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface FollowUpSuggestionsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function FollowUpSuggestions({ suggestions, onSelect }: FollowUpSuggestionsProps) {
  if (!suggestions || suggestions.length === 0) return null;

  return (
    <div className="flex flex-col gap-2 mt-4 mb-2 animate-in slide-in-from-bottom-2 fade-in duration-500">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">Suggested Follow-ups</p>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSelect(suggestion)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-primary/30 rounded-full text-xs font-medium text-primary hover:bg-primary hover:text-white transition-colors text-left"
          >
            <span>{suggestion}</span>
            <ArrowRight className="w-3 h-3 flex-shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}
