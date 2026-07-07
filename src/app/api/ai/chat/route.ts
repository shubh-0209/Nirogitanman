import { createClient } from "@/lib/supabase/server";
import { getCachedAuthUser } from "@/features/auth/utils";
import { Message } from "ai";
import { AIService } from "@/lib/ai/ai-service";
import { getPatientContextString } from "@/lib/ai/context";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const user = await getCachedAuthUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { messages, conversationId, includeContext = false } = body as {
      messages: Message[];
      conversationId?: string;
      includeContext?: boolean;
    };

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 });
    }

    const supabase = await createClient();

    let currentConversationId = conversationId;
    if (!currentConversationId) {
      const firstUserMessage = messages.find(m => m.role === 'user');
      const title = firstUserMessage 
        ? firstUserMessage.content.substring(0, 50) + (firstUserMessage.content.length > 50 ? '...' : '')
        : 'New Conversation';

      const { data: conv, error: convError } = await supabase
        .from("ai_conversations")
        .insert({ user_id: user.id, title })
        .select("id")
        .single();

      if (convError || !conv) {
        console.error("Error creating conversation:", convError);
        return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
      }
      currentConversationId = conv.id;
    }

    const latestMessage = messages[messages.length - 1];
    if (latestMessage.role === 'user') {
      await supabase.from("ai_messages").insert({
        conversation_id: currentConversationId,
        role: "user",
        content: latestMessage.content,
      });
    }

    let patientContext: string | undefined = undefined;
    if (includeContext) {
      const ctx = await getPatientContextString();
      if (ctx) patientContext = ctx;
    }

    const result = await AIService.streamResponse(
      messages,
      patientContext,
      async (text) => {
        await supabase.from("ai_messages").insert({
          conversation_id: currentConversationId!,
          role: "assistant",
          content: text,
        });
      }
    );

    return result.toDataStreamResponse({
      headers: {
        'x-conversation-id': currentConversationId || ''
      }
    });

  } catch (error) {
    console.error("Error in AI Chat API:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
