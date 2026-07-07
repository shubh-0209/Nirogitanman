"use client";

import React, { useMemo } from "react";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { FollowUpSuggestions } from "./FollowUpSuggestions";

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant" | "system" | "data";
  content: string;
}

interface ChatMessageProps {
  message: ChatMessageData;
  onFollowUpSelect?: (question: string) => void;
}

export function ChatMessage({ message, onFollowUpSelect }: ChatMessageProps) {
  const isUser = message.role === "user";

  const { cleanContent, followUps } = useMemo(() => {
    if (isUser) return { cleanContent: message.content, followUps: [] };
    
    const parts = message.content.split("---FOLLOWUPS---");
    const cleanContent = parts[0].trim();
    let followUps: string[] = [];
    
    if (parts.length > 1) {
      try {
        const jsonStr = parts[1].trim();
        // Simple extraction in case it's not perfectly formatted
        if (jsonStr.includes("[")) {
          const arrMatch = jsonStr.match(/\[([\s\S]*)\]/);
          if (arrMatch) {
            followUps = JSON.parse(arrMatch[0]);
          }
        }
      } catch (e) {
        // Silently fail if JSON parsing fails while streaming
      }
    }
    
    return { cleanContent, followUps };
  }, [message.content, isUser]);

  return (
    <div className={cn("flex flex-col w-full mb-6")}>
      <div className={cn("flex gap-3", isUser ? "justify-end" : "justify-start")}>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
        )}
        
        <div className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
          isUser 
            ? "bg-primary text-white rounded-br-none" 
            : "bg-white border border-gray-100 text-gray-800 rounded-tl-none prose prose-sm max-w-none prose-p:leading-relaxed prose-pre:hidden prose-li:my-0.5"
        )}>
          {isUser ? (
            <p className="whitespace-pre-wrap text-sm">{cleanContent}</p>
          ) : (
            <ReactMarkdown>{cleanContent}</ReactMarkdown>
          )}
        </div>
        
        {isUser && (
          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-1 border">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        )}
      </div>

      {!isUser && followUps.length > 0 && onFollowUpSelect && (
        <div className="pl-11 mt-1">
          <FollowUpSuggestions suggestions={followUps} onSelect={onFollowUpSelect} />
        </div>
      )}
    </div>
  );
}
