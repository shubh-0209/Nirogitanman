import { createOpenAI } from "@ai-sdk/openai";

export const DEFAULT_GROQ_MODEL = "llama-3.3-70b-versatile";

export class GroqProvider {
  private groq;

  constructor() {
    this.groq = createOpenAI({
      baseURL: "https://api.groq.com/openai/v1",
      apiKey: process.env.GROQ_API_KEY,
    });
  }

  getModel(modelName: string = DEFAULT_GROQ_MODEL) {
    return this.groq(modelName);
  }
}

export const groqProvider = new GroqProvider();
