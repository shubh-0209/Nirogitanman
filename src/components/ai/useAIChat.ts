"use client";

import { useChat } from "ai/react";
import { toast } from "sonner";
import { useState, useEffect, useCallback } from "react";
import { getConversations, getMessages, deleteConversation as deleteDbConversation } from "@/app/actions/ai-actions";

import { Message } from "ai";

export interface ConversationMeta {
  id: string;
  title: string;
  created_at: string;
}

export interface AIChatService {
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | { target: { value: string } }) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  append: (message: Message | Omit<Message, 'id'>) => Promise<string | null | undefined>;
  stop: () => void;
  isLoading: boolean;
  includeContext: boolean;
  setIncludeContext: (val: boolean) => void;
  // History features
  conversations: ConversationMeta[];
  activeConversationId: string | null;
  loadConversation: (id: string) => Promise<void>;
  startNewConversation: () => void;
  deleteConversation: (id: string) => Promise<void>;
  isHistoryOpen: boolean;
  setIsHistoryOpen: (val: boolean) => void;
  error?: Error | undefined;
}

export function useAIChat(): AIChatService {
  const [includeContext, setIncludeContext] = useState(false);
  const [conversations, setConversations] = useState<ConversationMeta[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const fetchConversations = useCallback(async () => {
    try {
      const data = await getConversations();
      setConversations(data);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  const chat = useChat({
    api: "/api/ai/chat",
    body: {
      includeContext,
      conversationId: activeConversationId
    },
    onResponse: (response) => {
      // If we started a new conversation, the backend creates an ID. We read it from the header.
      const newConvId = response.headers.get('x-conversation-id');
      if (newConvId && newConvId !== activeConversationId) {
        setActiveConversationId(newConvId);
        fetchConversations();
      }
    },
    onError: (err) => {
      toast.error(err.message || "Failed to send message");
    }
  });

  const loadConversation = async (id: string) => {
    setActiveConversationId(id);
    setIsHistoryOpen(false); // Close sidebar on selection
    try {
      const msgs = await getMessages(id);
      chat.setMessages(msgs.map(m => ({
        id: m.id,
        role: m.role as any,
        content: m.content,
      })));
    } catch (e) {
      toast.error("Failed to load conversation");
    }
  };

  const startNewConversation = () => {
    setActiveConversationId(null);
    chat.setMessages([]);
    setIsHistoryOpen(false);
  };

  const deleteConversation = async (id: string) => {
    try {
      await deleteDbConversation(id);
      if (id === activeConversationId) {
        startNewConversation();
      }
      fetchConversations();
      toast.success("Conversation deleted");
    } catch (e) {
      toast.error("Failed to delete conversation");
    }
  };

  return {
    ...chat,
    handleInputChange: chat.handleInputChange as any,
    includeContext,
    setIncludeContext,
    conversations,
    activeConversationId,
    loadConversation,
    startNewConversation,
    deleteConversation,
    isHistoryOpen,
    setIsHistoryOpen
  };
}
