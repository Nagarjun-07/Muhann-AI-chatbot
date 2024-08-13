// src/app/api/chat/route.js
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const systemPrompt = "You are a helpful assistant.";

export async function POST(req) {
  try {
    const data = await req.json();

    if (!Array.isArray(data.messages)) {
      return new NextResponse(JSON.stringify({ error: 'Invalid request format.' }), { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: 'system', content: systemPrompt }, ...data.messages],
      model: 'gpt-4',
      stream: true,
    });

    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        try {
          for await (const chunk of completion) {
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (err) {
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(stream);

  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
