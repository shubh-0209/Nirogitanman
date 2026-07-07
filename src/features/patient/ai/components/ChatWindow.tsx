"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChat, Message } from "ai/react";
import { Bot, User, Send, Loader2, RefreshCw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import { getMessages } from "../actions";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ChatWindowProps {
  conversationId: string | null;
  onConversationCreated: (id: string, title: string) => void;
}

export function ChatWindow({ conversationId, onConversationCreated }: ChatWindowProps) {
  const [includeContext, setIncludeContext] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  
  const { messages, setMessages, input, handleInputChange, handleSubmit, isLoading, reload, error } = useChat({
    api: "/api/ai/chat",
    body: {
      conversationId,
      includeContext,
    },
    onResponse: (response: Response) => {
      const newConvId = response.headers.get('x-conversation-id');
      if (newConvId && !conversationId) {
        const title = input.substring(0, 50) + (input.length > 50 ? '...' : '');
        onConversationCreated(newConvId, title);
      }
    },
    onError: (err: Error) => {
      toast.error(err.message || "Failed to send message");
    }
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (conversationId) {
      loadHistory();
    } else {
      setMessages([]);
    }
  }, [conversationId]);

  const loadHistory = async () => {
    setIsLoadingHistory(true);
    const res = await getMessages(conversationId!);
    setIsLoadingHistory(false);
    
    if (res.error) {
      toast.error(res.error);
    } else if (res.data) {
      const formattedMessages = res.data.map(m => ({
        id: m.id,
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      }));
      setMessages(formattedMessages);
    }
  };

  const suggestedPrompts = [
    "What is a normal blood pressure?",
    "Explain what a complete blood count (CBC) is.",
    "How can I improve my sleep schedule?",
    "What does BMI mean?"
  ];

  const handleSuggestedPrompt = (prompt: string) => {
    handleInputChange({ target: { value: prompt } } as any);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50/30">
      
      <div className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Health Assistant</h2>
            <p className="text-xs text-gray-500">Powered by Groq</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Switch 
            id="context-toggle" 
            checked={includeContext}
            onCheckedChange={setIncludeContext}
          />
          <Label htmlFor="context-toggle" className="text-sm text-gray-600 flex items-center gap-1 cursor-pointer">
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline">Share Health Context</span>
          </Label>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {isLoadingHistory ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">How can I help you today?</h3>
            <p className="text-gray-500 mb-8">
              I can help explain medical terms, lab results, and provide general health education. 
              I cannot provide medical diagnoses or prescribe medications.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="p-4 rounded-xl border bg-white text-sm text-left text-gray-700 hover:border-primary/50 hover:shadow-md transition-all"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6 max-w-3xl mx-auto pb-4">
            {messages.map((m: Message) => (
              <div key={m.id} className={cn("flex gap-4", m.role === "user" ? "justify-end" : "justify-start")}>
                
                {m.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div className={cn(
                  "max-w-[85%] rounded-2xl px-5 py-4",
                  m.role === "user" 
                    ? "bg-primary text-white rounded-tr-none" 
                    : "bg-white border shadow-sm text-gray-800 rounded-tl-none prose prose-sm max-w-none"
                )}>
                  {m.role === "user" ? (
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  ) : (
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  )}
                </div>
                
                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white border shadow-sm rounded-2xl rounded-tl-none px-5 py-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }}></span>
                  <span className="w-2 h-2 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: "300ms" }}></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto relative flex items-end gap-2">
          {messages.length > 0 && !isLoading && (
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              className="mb-1"
              onClick={() => reload()}
              title="Regenerate response"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}
          
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask a health-related question..."
              className="pr-12 py-6 rounded-xl border-gray-300 shadow-sm text-base"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-1.5 top-1.5 h-9 w-9 rounded-lg"
              disabled={isLoading || !input.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
        <p className="text-center text-xs text-gray-400 mt-3">
          Nirogitanman AI can make mistakes. Consider verifying important information with a doctor.
        </p>
      </div>
      
    </div>
  );
}
