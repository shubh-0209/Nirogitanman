"use client";

import React from "react";
import { Send, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

const ROTATING_TOPICS = [
  "Healthy Eating",
  "Mental Wellness",
  "Exercise Tips",
  "Preventive Care",
  "Women's Health",
  "Men's Health",
  "Diabetes",
  "Heart Health",
  "Nutrition",
  "Vaccination",
  "Sleep",
  "Stress Relief"
];

interface ChatInputProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | { target: { value: string } }) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  stop?: () => void;
}

export function ChatInput({ input, handleInputChange, handleSubmit, isLoading, stop }: ChatInputProps) {
  return (
    <div className="p-4 bg-white border-t flex flex-col gap-3 shrink-0">
      
      {/* Topics horizontal scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide no-scrollbar -mx-2 px-2">
        {ROTATING_TOPICS.map((topic, i) => (
          <div 
            key={i} 
            className="flex-shrink-0 px-3 py-1 bg-gray-50 border border-gray-100 rounded-full text-[11px] font-medium text-gray-500 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => handleInputChange({ target: { value: topic } })}
          >
            {topic}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
        <div className="relative flex items-center">
          <textarea
            value={input}
            onChange={handleInputChange as any}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (input.trim() && !isLoading) {
                  handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                }
              }
            }}
            placeholder="Type your health question..."
            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none min-h-[44px] max-h-[120px]"
            rows={1}
            disabled={isLoading}
          />
        </div>
        <div className="flex justify-between items-center px-1">
          <span className="text-[10px] text-gray-400">AI can make mistakes. Consult a doctor for medical advice.</span>
          
          {isLoading ? (
            <Button 
              type="button" 
              onClick={stop}
              size="icon" 
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-900 text-white shadow-sm"
              title="Stop generating"
            >
              <Square className="w-3 h-3 fill-current" />
            </Button>
          ) : (
            <Button 
              type="submit" 
              size="icon" 
              className="w-8 h-8 rounded-full bg-primary hover:bg-primary/90 text-white shadow-sm disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send className="w-3 h-3" />
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
