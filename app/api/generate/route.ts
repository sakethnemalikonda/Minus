import OpenAI from "openai";
import { MINUS_RULEBOOK, GENERATE_USER_PROMPT } from "../../../components/Prompts";

// Use Edge Runtime for lower latency and better streaming support
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Parse body safely
    const body = await req.json();
    const formData = body.formData;
    
    const apiKey = process.env.API_KEY;

    if (!apiKey) {
      console.error("API Key missing on server");
      return new Response(JSON.stringify({ error: "Server Configuration Error: API Key missing." }), { status: 500 });
    }

    const openai = new OpenAI({ apiKey: apiKey });
    const userPrompt = GENERATE_USER_PROMPT(JSON.stringify(formData, null, 2));

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: MINUS_RULEBOOK },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.1,
      max_tokens: 4000,
      stream: true,
    });

    // Create a Web Standard ReadableStream
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of response) {
            const text = chunk.choices[0]?.delta?.content;
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
          controller.close();
        } catch (err) {
          console.error("Stream generation error:", err);
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: { 
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        'X-Content-Type-Options': 'nosniff',
        'Transfer-Encoding': 'chunked' 
      },
    });

  } catch (error: any) {
    console.error("API Route Fatal Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to generate report" }), { status: 500 });
  }
}