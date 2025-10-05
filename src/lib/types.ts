import { z } from "zod";

// Lead Form Schema
export const LeadFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  organization: z.string().optional(),
  interest: z.enum([
    "cloud-modern-work",
    "data-ai",
    "security-compliance", 
    "power-platform",
    "government-portals",
    "managed-services",
    "holo-school",
    "fintech-payments",
    "general"
  ]),
  message: z.string().min(10, "Please provide more details about your requirements"),
  consent: z.boolean().refine(val => val === true, "You must agree to our privacy policy"),
  locale: z.string().default("en"),
  source: z.string().default("website"),
});

export type LeadFormData = z.infer<typeof LeadFormSchema>;

// Case Study Schema
export const CaseStudySchema = z.object({
  title: z.string(),
  slug: z.string(),
  summary: z.string(),
  industry: z.enum(["government", "healthcare", "education", "finance", "telecommunications"]),
  services: z.array(z.string()),
  metrics: z.array(z.object({
    label: z.string(),
    value: z.string(),
    unit: z.string().optional(),
  })),
  heroImage: z.string(),
  bodyMDX: z.string(),
  publishedAt: z.date(),
  featured: z.boolean().default(false),
});

export type CaseStudy = z.infer<typeof CaseStudySchema>;

// Tender Schema
export const TenderSchema = z.object({
  title: z.string(),
  source: z.string(),
  url: z.string().url(),
  country: z.string(),
  category: z.enum([
    "software-development",
    "cloud-infrastructure", 
    "digital-transformation",
    "cybersecurity",
    "data-analytics",
    "telecommunications"
  ]),
  closingDate: z.date(),
  tags: z.array(z.string()),
  scrapedAt: z.date(),
  estimatedValue: z.string().optional(),
  requirements: z.string().optional(),
});

export type Tender = z.infer<typeof TenderSchema>;

// Partner Schema
export const PartnerSchema = z.object({
  name: z.string(),
  role: z.enum(["technology", "implementation", "reseller", "strategic"]),
  url: z.string().url(),
  country: z.string(),
  logo: z.string().optional(),
  description: z.string().optional(),
  tier: z.enum(["platinum", "gold", "silver", "partner"]).default("partner"),
});

export type Partner = z.infer<typeof PartnerSchema>;

// Holo-School Pilot Schema
export const HoloSchoolPilotSchema = z.object({
  siteName: z.string(),
  location: z.string(),
  screensCount: z.number().min(1),
  headsetsCount: z.number().min(1),
  rfBand: z.enum(["VHF", "UHF", "FM"]),
  isp: z.string(),
  status: z.enum(["planning", "pilot", "deployed", "completed"]),
  kpis: z.object({
    attendance: z.number().optional(),
    uptime: z.number().optional(),
    comprehension: z.number().optional(),
  }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});

export type HoloSchoolPilot = z.infer<typeof HoloSchoolPilotSchema>;

// Service Categories
export const ServiceCategory = z.enum([
  "cloud-modern-work",
  "data-ai", 
  "security-compliance",
  "power-platform",
  "government-portals",
  "managed-services"
]);

export type ServiceCategoryType = z.infer<typeof ServiceCategory>;

// Industry Types
export const Industry = z.enum([
  "government",
  "healthcare", 
  "education",
  "finance",
  "telecommunications"
]);

export type IndustryType = z.infer<typeof Industry>;

// AI Assistant Types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  locale?: string;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

// Vectorize Document
export interface VectorDocument {
  id: string;
  content: string;
  metadata: {
    title: string;
    url: string;
    section?: string;
    locale: string;
    lastUpdated: Date;
  };
}

// Translation Types
export interface TranslationEntry {
  key: string;
  en: string;
  ny?: string;
  tum?: string;
  yao?: string;
  lomwe?: string;
  sena?: string;
  tonga?: string;
  verified: boolean;
  machineTranslated: boolean;
  lastUpdated: Date;
}

// Cloudflare Environment Types
export interface CloudflareEnv {
  KORENA_SETTINGS: KVNamespace;
  KORENA_DOCS: Vectorize;
  AI: Ai;
  KORENA_ASSETS: R2Bucket;
  POWER_AUTOMATE_WEBHOOK_URL: string;
}

// Rate Limiting
export interface RateLimit {
  count: number;
  resetTime: number;
}

// Power Automate Webhook Payload
export interface PowerAutomatePayload {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  interest: string;
  message: string;
  consent: boolean;
  source: string;
  locale: string;
  timestamp: string;
  page: string;
  userAgent?: string;
  ip?: string;
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  external?: boolean;
  children?: NavItem[];
}

// Content Types
export interface PageContent {
  title: string;
  description: string;
  content: string;
  locale: string;
  lastUpdated: Date;
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  locale: string;
  alternates?: Record<string, string>;
}