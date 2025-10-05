import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { z } from "zod";

// Request schema
const TTSRequestSchema = z.object({
  text: z.string().min(1).max(500), // Limit text length for TTS
  voice: z.enum(["alloy", "echo", "fable", "onyx", "nova", "shimmer"]).default("nova"),
  speed: z.number().min(0.25).max(4.0).default(1.0),
});

export async function POST(request: NextRequest) {
  try {
    const { env } = getCloudflareContext();
    const body = await request.json();
    
    // Validate request
    const { text, voice, speed } = TTSRequestSchema.parse(body);
    
    // Rate limiting check (basic implementation)
    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimitKey = `tts_rate_limit:${clientIP}`;
    
    try {
      const current = await env.KORENA_SETTINGS.get(rateLimitKey);
      const count = current ? parseInt(current) : 0;
      
      if (count >= 20) { // 20 TTS requests per hour
        return NextResponse.json(
          { error: "TTS rate limit exceeded. Please wait before making another request." },
          { status: 429 }
        );
      }
      
      await env.KORENA_SETTINGS.put(rateLimitKey, (count + 1).toString(), { expirationTtl: 3600 });
    } catch (error) {
      console.error("TTS rate limiting error:", error);
    }

    // Generate speech using Workers AI
    // Note: This is a placeholder as Workers AI TTS models may vary
    // You would replace this with the actual Workers AI TTS model
    try {
      const audioResponse = await env.AI.run("@cf/speecht5_tts", {
        text: text,
        voice: voice,
        speed: speed,
      });

      // Return the audio as a blob
      return new NextResponse(audioResponse, {
        headers: {
          "Content-Type": "audio/mpeg",
          "Cache-Control": "public, max-age=3600",
        },
      });
    } catch (aiError) {
      console.error("Workers AI TTS error:", aiError);
      
      // Fallback: return a simple error audio response
      return NextResponse.json(
        { error: "TTS service temporarily unavailable" },
        { status: 503 }
      );
    }

  } catch (error) {
    console.error("TTS API error:", error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      error: "Method not allowed",
      usage: "POST with { text, voice?, speed? }"
    },
    { status: 405 }
  );
}

export const runtime = "edge";