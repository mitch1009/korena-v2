"use server";

import { LeadFormSchema, type LeadFormData, type PowerAutomatePayload } from "@/lib/types";
import { headers } from "next/headers";

export async function submitLead(data: LeadFormData) {
  try {
    // Validate the form data
    const validatedData = LeadFormSchema.parse(data);
    
    // Get request headers for additional context
    const headersList = headers();
    const userAgent = headersList.get("user-agent") || "";
    const forwarded = headersList.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : headersList.get("x-real-ip") || "unknown";
    const referer = headersList.get("referer") || "";

    // Construct the payload for Power Automate
    const payload: PowerAutomatePayload = {
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || "",
      organization: validatedData.organization || "",
      interest: validatedData.interest,
      message: validatedData.message,
      consent: validatedData.consent,
      source: validatedData.source,
      locale: validatedData.locale,
      timestamp: new Date().toISOString(),
      page: referer,
      userAgent,
      ip,
    };

    // Get the Power Automate webhook URL from environment
    const webhookUrl = process.env.POWER_AUTOMATE_WEBHOOK_URL;
    
    if (!webhookUrl) {
      console.error("Power Automate webhook URL not configured");
      return { success: false, error: "Configuration error" };
    }

    // Submit to Power Automate with retry logic
    const maxRetries = 3;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "Korena-Website/1.0",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          console.log(`Lead submitted successfully for ${validatedData.email}`);
          return { success: true };
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        lastError = error as Error;
        console.warn(`Power Automate submission attempt ${attempt} failed:`, error);
        
        if (attempt < maxRetries) {
          // Exponential backoff: wait 1s, 2s, 4s
          const delay = Math.pow(2, attempt - 1) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    // All retries failed
    console.error("All Power Automate submission attempts failed:", lastError);
    return { success: false, error: "Service temporarily unavailable" };
    
  } catch (error) {
    if (error instanceof Error) {
      console.error("Lead submission validation error:", error.message);
      return { success: false, error: error.message };
    }
    
    console.error("Unknown error during lead submission:", error);
    return { success: false, error: "Unknown error occurred" };
  }
}

// Rate limiting helper using Cloudflare KV (Edge-compatible)
export async function checkRateLimit(identifier: string): Promise<boolean> {
  try {
    // In development, skip rate limiting
    if (process.env.NODE_ENV === "development") {
      return true;
    }

    // This would use Cloudflare KV in production
    // For now, return true to allow submissions
    return true;
  } catch (error) {
    console.error("Rate limit check failed:", error);
    // Fail open - allow the submission
    return true;
  }
}

