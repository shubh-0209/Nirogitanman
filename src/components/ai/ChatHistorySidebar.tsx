"use client";

import React from "react";
import { MessageSquare, Plus, Trash2, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatHistorySidebarProps {
  conversations: any[];
  activeConversationId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export function ChatHistorySidebar({ 
  conversations, 
  activeConversationId, 
  onSelect, 
  onNew, 
  onDelete,
  onClose,
  isOpen 
}: ChatHistorySidebarProps) {
  
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const groupConversations = () => {
    const groups: { [key: string]: any[] } = {
      Today: [],
      Yesterday: [],
      "Previous 7 Days": [],
      Older: []
    };

    conversations.forEach(conv => {
      const date = new Date(conv.created_at);
      if (date.toDateString() === today.toDateString()) {
        groups.Today.push(conv);
      } else if (date.toDateString() === yesterday.toDateString()) {
        groups.Yesterday.push(conv);
      } else if (date > lastWeek) {
        groups["Previous 7 Days"].push(conv);
      } else {
        groups.Older.push(conv);
      }
    });

    return groups;
  };

  const grouped = groupConversations();

  return (
    <div className={cn(
      "absolute inset-y-0 left-0 w-64 bg-gray-50 border-r border-gray-200 z-[80] flex flex-col transition-transform duration-300 shadow-xl md:shadow-none",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-4 border-b flex items-center justify-between shrink-0 bg-white">
        <h3 className="font-semibold text-gray-800 flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-500" /> History
        </h3>
        <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 shrink-0">
        <button 
          onClick={onNew}
          className="w-full flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-primary hover:text-primary transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" /> New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-4 scrollbar-hide">
        {Object.entries(grouped).map(([label, items]) => {
          if (items.length === 0) return null;
          return (
            <div key={label} className="space-y-1">
              <h4 className="px-2 text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">{label}</h4>
              {items.map(conv => (
                <div 
                  key={conv.id} 
                  className={cn(
                    "group flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer",
                    activeConversationId === conv.id 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                  onClick={() => onSelect(conv.id)}
                >
                  <div className="flex items-center gap-2 truncate">
                    <MessageSquare className="w-4 h-4 shrink-0 opacity-70" />
                    <span className="truncate">{conv.title || "New Chat"}</span>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 hover:bg-red-50 rounded transition-all shrink-0"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
