import { NextRequest, NextResponse } from "next/server";
import { groq } from "@/lib/groq/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, model = "llama-3.3-70b-versatile" } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Call Groq SDK on the server, safely hiding the API key
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: model,
    });

    return NextResponse.json({
      result: completion.choices[0]?.message?.content || "",
      usage: completion.usage,
    });
  } catch (error: any) {
    console.error("Groq API Error:", error);
    
    // Add proper error handling as per requirements
    return NextResponse.json(
      { error: error.message || "Failed to communicate with Groq API" },
      { status: 500 }
    );
  }
}
