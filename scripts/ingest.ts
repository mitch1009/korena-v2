#!/usr/bin/env node

/**
 * Content ingestion script for Vectorize
 * This script extracts content from the website and indexes it for RAG
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname } from "path";

interface DocumentChunk {
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

// Sample content to index (in production, this would extract from built pages)
const sampleContent = [
  {
    title: "Cloud & Modern Work Services",
    url: "/services/cloud-modern-work",
    content: `Korena Digital Solutions offers comprehensive cloud and modern work solutions including:
    
    Azure Cloud Migration: Complete migration services from on-premises to Azure cloud, including assessment, planning, migration, and optimization.
    
    Microsoft 365 Implementation: Full Microsoft 365 deployment including Exchange Online, SharePoint, Teams, and OneDrive with security configuration.
    
    Teams & Collaboration: Microsoft Teams setup with custom integrations, Power Platform connectors, and governance policies.
    
    Hybrid Work Solutions: Modern workplace solutions supporting remote and hybrid work scenarios with security and compliance.`,
    locale: "en",
    section: "Services",
  },
  {
    title: "Data & AI Analytics",
    url: "/services/data-ai",
    content: `Our Data & AI services include:
    
    Power BI Dashboards: Custom dashboard development with real-time data visualization and automated reporting.
    
    Data Governance: Implementation of data governance frameworks, data quality management, and compliance monitoring.
    
    AI Analytics: Machine learning model development using Azure Cognitive Services and custom AI solutions.
    
    Predictive Insights: Advanced analytics for forecasting, trend analysis, and business intelligence reporting.`,
    locale: "en",
    section: "Services",
  },
  {
    title: "Security & Compliance",
    url: "/services/security-compliance",
    content: `Security and compliance services include:
    
    Microsoft Defender: Implementation of Microsoft Defender for Office 365, Endpoint, and Cloud Apps with threat protection.
    
    Compliance Frameworks: Support for regulatory compliance including GDPR, data protection laws, and industry standards.
    
    Security Audits: Comprehensive security assessments, vulnerability scanning, and penetration testing services.
    
    Incident Response: 24/7 security monitoring, incident response planning, and cybersecurity training programs.`,
    locale: "en",
    section: "Services",
  },
  {
    title: "Holo-School Initiative",
    url: "/holo-school",
    content: `The Holo-School initiative revolutionizes education delivery in rural Malawi through:
    
    Holographic Technology: Advanced holographic projection systems for immersive educational experiences.
    
    Azure Media Services: Cloud-based content delivery and streaming infrastructure for educational content.
    
    MACRA Partnership: Collaboration with MACRA for RF broadcast infrastructure reaching remote communities.
    
    Pilot Program: Three-site pilot implementation measuring attendance, comprehension, and system uptime.
    
    Impact: Bridging educational inequality and providing access to qualified teachers in rural areas.`,
    locale: "en",
    section: "Initiatives",
  },
  {
    title: "Government Digital Services",
    url: "/services/government-portals",
    content: `Government portal solutions include:
    
    Citizen Services: Online citizen service portals for government service delivery and citizen engagement.
    
    E-Government Platforms: Complete e-governance solutions with digital identity, document management, and workflow automation.
    
    Digital Identity: Secure digital identity solutions with multi-factor authentication and biometric integration.
    
    Service Integration: Integration of government services with existing systems and third-party platforms.`,
    locale: "en",
    section: "Services",
  },
  {
    title: "Microsoft Partnership",
    url: "/about",
    content: `Korena Digital Solutions is a Microsoft Gold Partner with expertise in:
    
    Azure Solutions Architecture: Certified architects designing and implementing complex Azure environments.
    
    Modern Work Solutions: Microsoft 365 and Teams implementation with security and compliance best practices.
    
    Power Platform Development: Custom application development using Power Apps, Power Automate, and Power BI.
    
    Security Specialization: Microsoft Security solutions including Defender, Sentinel, and compliance frameworks.`,
    locale: "en",
    section: "About",
  },
];

// Chunk content into smaller pieces for better RAG performance
function chunkContent(content: string, maxChunkSize: number = 1000): string[] {
  const sentences = content.split(/[.!?]+/);
  const chunks: string[] = [];
  let currentChunk = "";

  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length > maxChunkSize && currentChunk) {
      chunks.push(currentChunk.trim());
      currentChunk = sentence;
    } else {
      currentChunk += (currentChunk ? ". " : "") + sentence;
    }
  }

  if (currentChunk.trim()) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// Generate embeddings and upsert to Vectorize
async function ingestContent() {
  console.log("🚀 Starting content ingestion...");
  
  const documents: DocumentChunk[] = [];

  // Process sample content
  for (const item of sampleContent) {
    const chunks = chunkContent(item.content);
    
    chunks.forEach((chunk, index) => {
      documents.push({
        id: `${item.url.replace(/\//g, "_")}_${index}`,
        content: chunk,
        metadata: {
          title: item.title,
          url: item.url,
          section: item.section,
          locale: item.locale,
          lastUpdated: new Date(),
        },
      });
    });
  }

  console.log(`📄 Prepared ${documents.length} document chunks for ingestion`);

  // In a real implementation, you would:
  // 1. Connect to Workers AI to generate embeddings
  // 2. Upsert the vectors to Vectorize
  // 3. Handle batch processing and error handling

  console.log("⚠️  Note: This is a demo script. In production:");
  console.log("   1. Use wrangler or Workers APIs to connect to Vectorize");
  console.log("   2. Generate embeddings using Workers AI");
  console.log("   3. Batch upsert vectors to the Vectorize index");
  console.log("   4. Implement proper error handling and retry logic");

  // Example pseudo-code for production:
  /*
  for (const doc of documents) {
    try {
      // Generate embeddings
      const embeddings = await env.AI.run("@cf/baai/bge-base-en-v1.5", {
        text: doc.content,
      });

      // Upsert to Vectorize
      await env.KORENA_DOCS.upsert([{
        id: doc.id,
        values: embeddings.data[0],
        metadata: {
          content: doc.content,
          ...doc.metadata,
        },
      }]);

      console.log(`✅ Indexed: ${doc.metadata.title} (chunk ${doc.id})`);
    } catch (error) {
      console.error(`❌ Failed to index ${doc.id}:`, error);
    }
  }
  */

  console.log("✅ Content ingestion simulation complete!");
  console.log("\n📋 To run in production:");
  console.log("   1. Set up your Vectorize index: wrangler vectorize create korena-docs-index");
  console.log("   2. Configure bindings in wrangler.toml");
  console.log("   3. Deploy and run: wrangler dev");
  console.log("   4. Call the ingestion endpoint or run via Workers");
}

// CLI execution
if (require.main === module) {
  ingestContent().catch(console.error);
}

export { ingestContent, sampleContent };