import { streamText, Message, CoreMessage } from "ai";
import { groqProvider } from "./groq-provider";
import { SYSTEM_PROMPT } from "./system-prompt";

export class AIService {
  static async streamResponse(
    messages: Message[], 
    contextString?: string,
    onFinish?: (text: string) => Promise<void>
  ) {
    const finalSystemPrompt = contextString 
      ? `${SYSTEM_PROMPT}\n\nUSER CONTEXT:\n${contextString}`
      : SYSTEM_PROMPT;

    return await streamText({
      model: groqProvider.getModel(),
      system: finalSystemPrompt,
      messages: messages as CoreMessage[],
      temperature: 0.7,
      onFinish: async ({ text }) => {
        if (onFinish) {
          await onFinish(text);
        }
      }
    });
  }
}
