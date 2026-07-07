"use client";

import React from "react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3 justify-start animate-in fade-in duration-300 w-full mb-6">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
        <span className="text-white text-xs font-bold">AI</span>
      </div>
      <div className="bg-white border border-gray-100 shadow-sm rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-3 w-fit">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce"></span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }}></span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "300ms" }}></span>
        </div>
        <span className="text-sm text-gray-500 font-medium">Nirogitanman AI is thinking...</span>
      </div>
    </div>
  );
}
