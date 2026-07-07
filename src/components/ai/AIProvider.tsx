"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface AIContextType {
  isOpen: boolean;
  userName: string;
  openAI: () => void;
  closeAI: () => void;
  toggleAI: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export function AIProvider({ children, userName = "there" }: { children: ReactNode; userName?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const openAI = () => setIsOpen(true);
  const closeAI = () => setIsOpen(false);
  const toggleAI = () => setIsOpen((prev) => !prev);

  return (
    <AIContext.Provider value={{ isOpen, userName, openAI, closeAI, toggleAI }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAIContext() {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error("useAIContext must be used within an AIProvider");
  }
  return context;
}
