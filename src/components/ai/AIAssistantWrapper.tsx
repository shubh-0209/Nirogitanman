"use client";

import React from "react";
import { FloatingAIButton } from "./FloatingAIButton";
import { AIAssistantDrawer } from "./AIAssistantDrawer";

export function AIAssistantWrapper() {
  return (
    <>
      <FloatingAIButton />
      <AIAssistantDrawer />
    </>
  );
}
