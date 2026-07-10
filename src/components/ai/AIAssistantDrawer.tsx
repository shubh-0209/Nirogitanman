"use client";

import React, { useEffect, useRef } from "react";
import { useAIContext } from "./AIProvider";
import { useAIChat } from "./useAIChat";
import { ChatMessage, ChatMessageData } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";
import { SuggestedQuestions } from "./SuggestedQuestions";
import { ChatHistorySidebar } from "./ChatHistorySidebar";
import { Minimize2, X, Bot, FileText, Menu, AlertCircle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export function AIAssistantDrawer() {
  const { isOpen, closeAI, toggleAI, userName } = useAIContext();
  const { 
    messages, 
    input, 
    handleInputChange, 
    handleSubmit, 
    append,
    stop,
    isLoading, 
    includeContext, 
    setIncludeContext,
    conversations,
    activeConversationId,
    loadConversation,
    startNewConversation,
    deleteConversation,
    isHistoryOpen,
    setIsHistoryOpen,
    error
  } = useAIChat();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeAI();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeAI]);

  // Prevent background scroll when open on mobile
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleQuestionSelect = (question: string) => {
    append({ role: "user", content: question });
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/20 z-[60] transition-opacity duration-300 md:hidden",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeAI}
      />

      {/* Drawer Container */}
      <div 
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="AI Assistant"
        className={cn(
          "fixed z-[70] bg-white shadow-2xl flex transition-all duration-300 overflow-hidden",
          // Mobile: Full screen bottom sheet
          "inset-x-0 bottom-0 top-0 rounded-t-2xl md:rounded-2xl",
          // Desktop: Floating card near the button
          "md:inset-auto md:bottom-24 md:right-6 md:w-[360px] md:border md:border-gray-200 md:rounded-2xl md:shadow-xl",
          // Dynamic height based on whether messages exist
          messages.length > 0 ? "md:h-[500px] md:max-h-[500px]" : "md:h-auto md:max-h-[500px]",
          // Transform logic
          isOpen 
            ? "translate-y-0 md:translate-y-0 opacity-100 scale-100" 
            : "translate-y-full md:translate-y-8 md:opacity-0 md:scale-95 md:pointer-events-none"
        )}
      >
        
        <ChatHistorySidebar 
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelect={loadConversation}
          onNew={startNewConversation}
          onDelete={deleteConversation}
          isOpen={isHistoryOpen}
          onClose={() => setIsHistoryOpen(false)}
        />

        <div className={cn(
          "flex flex-col w-full flex-1 bg-white transition-transform duration-300",
          isHistoryOpen && "md:translate-x-64" // Optional visual push effect, though sidebar overlaps
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b bg-gray-50/50 shrink-0">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className="p-2 -ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="History"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 leading-tight">AI Assistant</h2>
                <p className="text-[11px] text-gray-500">Ask anything about your health</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                onClick={toggleAI} 
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors hidden md:block"
                aria-label="Minimize"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
              <button 
                onClick={closeAI} 
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Context Toggle */}
          <div className="px-4 py-2 bg-white border-b flex items-center justify-between shrink-0">
            <Label htmlFor="drawer-context-toggle" className="text-xs font-medium text-gray-600 flex items-center gap-1.5 cursor-pointer">
              <FileText className="w-3.5 h-3.5" />
              Share Health Context
            </Label>
            <Switch 
              id="drawer-context-toggle" 
              checked={includeContext}
              onCheckedChange={setIncludeContext}
            />
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto bg-gray-50/30 p-4">
            {messages.length === 0 ? (
              <SuggestedQuestions userName={userName} onSelect={handleQuestionSelect} />
            ) : (
              <div className="space-y-2">
                {messages.map((m) => (
                  <ChatMessage 
                    key={m.id} 
                    message={m as ChatMessageData} 
                    onFollowUpSelect={handleQuestionSelect} 
                  />
                ))}
              </div>
            )}
            
            {isLoading && <TypingIndicator />}
            
            {error && (
              <div className="flex items-start gap-3 p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 border border-red-200">
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-medium">I'm having trouble connecting right now.</span>
                  <p className="mt-1 text-red-700 opacity-90">Please try again in a few moments.</p>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} className="h-px" />
          </div>

          {/* Footer */}
          <ChatInput 
            input={input}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
          />
        </div>
      </div>
    </>
  );
}
