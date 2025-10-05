import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { z } from "zod";

// Request schema
const ChatRequestSchema = z.object({
  message: z.string().min(1).max(2000),
  locale: z.string().default("en"),
  sessionId: z.string().optional(),
});

// Rate limiting using KV
async function checkRateLimit(env: any, identifier: string): Promise<boolean> {
  const key = `rate_limit:assistant:${identifier}`;
  const limit = 10; // 10 requests per minute
  const window = 60; // 60 seconds
  
  try {
    const current = await env.KORENA_SETTINGS.get(key);
    const count = current ? parseInt(current) : 0;
    
    if (count >= limit) {
      return false;
    }
    
    await env.KORENA_SETTINGS.put(key, (count + 1).toString(), { expirationTtl: window });
    return true;
  } catch (error) {
    console.error("Rate limiting error:", error);
    return true; // Fail open
  }
}

// Vectorize search for RAG
async function searchKnowledgeBase(env: any, query: string, locale: string = "en") {
  try {
    // Create embeddings for the query
    const embeddings = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
      text: query,
    });

    // Search Vectorize for relevant content
    const results = await env.KORENA_DOCS.query(embeddings.data[0], {
      topK: 5,
      returnMetadata: true,
      filter: { locale },
    });

    return results.matches || [];
  } catch (error) {
    console.error("Knowledge base search error:", error);
    return [];
  }
}

// Build context from search results
function buildContext(searchResults: any[]): string {
  if (searchResults.length === 0) {
    return "No specific information found in the knowledge base.";
  }

  const context = searchResults
    .map((result) => {
      const metadata = result.metadata || {};
      return `Source: ${metadata.title || "Unknown"}\nContent: ${result.metadata?.content || ""}`;
    })
    .join("\n\n");

  return context;
}

// System prompt for the AI assistant
function getSystemPrompt(locale: string, context: string): string {
  const basePrompt = `You are a helpful AI assistant for Korena Digital Solutions, a leading digital transformation company in Malawi. You help visitors learn about our services, solutions, and how we can assist with their digital transformation needs.

Company Overview:
- Korena Digital Solutions is based in Malawi
- We specialize in Microsoft Azure, Microsoft 365, Power Platform, and government digital services
- We're a Microsoft Gold Partner
- We work with government, healthcare, education, and finance sectors
- We have innovative projects like the Holo-School initiative

Services:
1. Cloud & Modern Work (Azure migration, Microsoft 365)
2. Data & AI (Power BI, analytics, AI solutions)
3. Security & Compliance (Microsoft Defender, compliance frameworks)
4. Power Platform (Power Apps, Power Automate, Copilot Studio)
5. Government Portals (e-governance, citizen services)
6. Managed Services (24/7 support, monitoring)

Context from knowledge base:
${context}

Instructions:
- Be helpful, professional, and knowledgeable
- Focus on Korena's services and capabilities
- If you don't know something specific, suggest contacting our team
- Always be truthful about what Korena can and cannot do
- Encourage visitors to reach out for consultations
- Keep responses concise but informative`;

  if (locale === "ny") {
    return basePrompt + "\n\nRespond in Chichewa when possible, but you may use English for technical terms.";
  } else if (locale === "tum") {
    return basePrompt + "\n\nRespond in Tumbuka when possible, but you may use English for technical terms.";
  }

  return basePrompt;
}

export async function POST(request: NextRequest) {
  try {
    const { env } = getCloudflareContext();
    const body = await request.json();
    
    // Validate request
    const { message, locale, sessionId } = ChatRequestSchema.parse(body);
    
    // Rate limiting
    const clientIP = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    const rateLimitKey = sessionId || clientIP;
    
    const withinLimit = await checkRateLimit(env, rateLimitKey);
    if (!withinLimit) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please wait before sending another message." },
        { status: 429 }
      );
    }

    // Search knowledge base
    const searchResults = await searchKnowledgeBase(env, message, locale);
    const context = buildContext(searchResults);
    
    // Prepare the conversation
    const systemPrompt = getSystemPrompt(locale, context);
    
    // Call Workers AI
    const aiResponse = await env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ],
      max_tokens: 512,
      temperature: 0.7,
    });

    const response = aiResponse.response || "I'm sorry, I couldn't process your request right now. Please try again.";

    return NextResponse.json({
      response,
      sources: searchResults.length > 0 ? searchResults.map(r => r.metadata?.title || "Knowledge Base").slice(0, 3) : [],
    });

  } catch (error) {
    console.error("Assistant API error:", error);
    
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
    { error: "Method not allowed" },
    { status: 405 }
  );
}

export const runtime = "edge";