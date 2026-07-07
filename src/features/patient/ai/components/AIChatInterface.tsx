"use client";

import React, { useState } from "react";
import { MessageSquarePlus, MessageSquare, Trash2, Edit2, Check, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { deleteConversation, renameConversation } from "../actions";
import { ChatWindow } from "./ChatWindow";
import { toast } from "sonner";
import { Database } from "@/lib/supabase/database.types";

type Conversation = Database["public"]["Tables"]["ai_conversations"]["Row"];

interface AIChatInterfaceProps {
  initialConversations: Conversation[];
}

export function AIChatInterface({ initialConversations }: AIChatInterfaceProps) {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(
    initialConversations.length > 0 ? initialConversations[0].id : null
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");

  const handleNewChat = () => {
    setActiveConversationId(null);
    setIsSidebarOpen(false);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this chat?")) return;
    
    const res = await deleteConversation(id);
    if (res.error) {
      toast.error(res.error);
    } else {
      setConversations(prev => prev.filter(c => c.id !== id));
      if (activeConversationId === id) {
        setActiveConversationId(null);
      }
      toast.success("Chat deleted");
    }
  };

  const startEdit = (conv: Conversation, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  const saveEdit = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!editTitle.trim()) {
      setEditingId(null);
      return;
    }
    const res = await renameConversation(id, editTitle);
    if (res.error) {
      toast.error(res.error);
    } else {
      setConversations(prev => prev.map(c => c.id === id ? { ...c, title: editTitle } : c));
      toast.success("Chat renamed");
    }
    setEditingId(null);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl border shadow-sm overflow-hidden relative">
      
      <div className="md:hidden absolute top-4 left-4 z-20">
        <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="bg-white">
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      <div className={cn(
        "absolute md:relative z-10 w-72 h-full bg-gray-50 border-r flex flex-col transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>
        <div className="p-4 border-b">
          <Button onClick={handleNewChat} className="w-full flex items-center gap-2">
            <MessageSquarePlus className="w-4 h-4" />
            New Chat
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {conversations.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No conversations yet.</p>
          ) : (
            conversations.map(conv => (
              <div
                key={conv.id}
                onClick={() => { setActiveConversationId(conv.id); setIsSidebarOpen(false); }}
                className={cn(
                  "group p-3 rounded-lg cursor-pointer flex items-center justify-between transition-colors",
                  activeConversationId === conv.id ? "bg-primary/10 text-primary" : "hover:bg-gray-200 text-gray-700"
                )}
              >
                <div className="flex items-center gap-3 overflow-hidden flex-1">
                  <MessageSquare className="w-4 h-4 flex-shrink-0" />
                  {editingId === conv.id ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={e => setEditTitle(e.target.value)}
                      onClick={e => e.stopPropagation()}
                      className="w-full bg-white border px-2 py-1 rounded text-sm text-gray-900"
                      autoFocus
                    />
                  ) : (
                    <span className="text-sm font-medium truncate">{conv.title}</span>
                  )}
                </div>
                
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {editingId === conv.id ? (
                    <>
                      <button onClick={e => saveEdit(conv.id, e)} className="p-1 text-green-600 hover:bg-green-50 rounded"><Check className="w-3 h-3" /></button>
                      <button onClick={e => { e.stopPropagation(); setEditingId(null); }} className="p-1 text-gray-500 hover:bg-gray-200 rounded"><X className="w-3 h-3" /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={e => startEdit(conv, e)} className="p-1 text-gray-500 hover:text-primary hover:bg-white rounded"><Edit2 className="w-3 h-3" /></button>
                      <button onClick={e => handleDelete(conv.id, e)} className="p-1 text-gray-500 hover:text-red-600 hover:bg-white rounded"><Trash2 className="w-3 h-3" /></button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col h-full bg-white relative">
        <ChatWindow 
          conversationId={activeConversationId} 
          onConversationCreated={(id, title) => {
            setActiveConversationId(id);
            setConversations(prev => [{ id, title, user_id: "", created_at: "", updated_at: "" } as any, ...prev]);
          }} 
        />
      </div>

    </div>
  );
}
