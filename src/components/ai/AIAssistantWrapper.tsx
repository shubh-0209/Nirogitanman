"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { FloatingAIButton } from "./FloatingAIButton";
import { useAIContext } from "./AIProvider";

// Dynamically import the heavy drawer so it doesn't load on dashboard mount
const AIAssistantDrawer = dynamic(
  () => import("./AIAssistantDrawer").then((mod) => mod.AIAssistantDrawer),
  { ssr: false }
);

export function AIAssistantWrapper() {
  const { isOpen } = useAIContext();
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    if (isOpen && !hasOpened) {
      setHasOpened(true);
    }
  }, [isOpen, hasOpened]);

  return (
    <>
      <FloatingAIButton />
      {hasOpened && <AIAssistantDrawer />}
    </>
  );
}
