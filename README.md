# Korena Digital Solutions Website

A production-ready marketing and venture studio website built with Next.js 15, running entirely on Cloudflare Workers with AI-powered features and comprehensive i18n support for Malawi's local languages.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/korena-digital/website)

## 🚀 Features

- **Cloudflare Workers Edge Runtime**: Complete deployment on Cloudflare infrastructure
- **AI Assistant**: Workers AI + Vectorize RAG for intelligent customer support
- **Multi-language Support**: English, Chichewa, Tumbuka, and extensible for other Malawi languages
- **Power Automate Integration**: Seamless lead management with Microsoft Power Platform
- **Holo-School Initiative**: Dedicated page for holographic education project
- **Modern UI**: Built with shadcn/ui, Tailwind CSS, and Framer Motion
- **Type-Safe**: Full TypeScript implementation with Zod validation

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 (App Router, React Server Components)
- **Runtime**: Cloudflare Workers (Edge-compatible)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animation**: Framer Motion
- **Internationalization**: next-intl with middleware-based routing
- **Forms**: React Hook Form + Zod validation
- **AI**: Cloudflare Workers AI + Vectorize for RAG

### Cloudflare Services
- **Workers**: Application runtime
- **KV**: Settings and rate limiting storage
- **Vectorize**: Vector database for AI assistant knowledge base
- **R2**: Asset storage (optional)
- **AI**: LLM inference and embeddings

## 🛠️ Setup & Development

### Prerequisites
- Node.js 18+ and pnpm
- Cloudflare account with Workers/AI access
- Wrangler CLI installed

### 1. Environment Setup

```bash
# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local
```

### 2. Configure Environment Variables

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://korena.solutions
NEXT_PUBLIC_SITE_NAME="Korena Digital Solutions"

# Power Automate Integration
POWER_AUTOMATE_WEBHOOK_URL=https://prod-XX.eastus.logic.azure.com:443/workflows/XXXXXX/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=XXXXXX

# AI Features
NEXT_PUBLIC_AI_ASSISTANT_ENABLED=true
AI_MODEL=@cf/meta/llama-3.1-8b-instruct
EMBEDDINGS_MODEL=@cf/baai/bge-base-en-v1.5
```

### 3. Cloudflare Setup

#### Create Required Resources
```bash
# Create KV namespace
wrangler kv:namespace create "KORENA_SETTINGS"
wrangler kv:namespace create "KORENA_SETTINGS" --preview

# Create Vectorize index
wrangler vectorize create korena-docs-index --dimensions=768 --metric=cosine

# Create R2 bucket (optional)
wrangler r2 bucket create korena-assets
```

#### Update wrangler.toml
Replace the placeholder IDs in `wrangler.toml` with your actual resource IDs.

### 4. Local Development

```bash
# Start development server with Wrangler
pnpm dev

# Build for production
pnpm build

# Deploy to Cloudflare
pnpm deploy
```

## 🌍 Internationalization (i18n)

### Supported Languages
- **English (en)**: Primary language
- **Chichewa/Nyanja (ny)**: Comprehensive translations
- **Tumbuka (tum)**: Comprehensive translations
- **Yao (yao)**: Scaffold ready for expansion

### Translation Workflow
1. Machine translation baseline via Workers AI
2. Expert linguist review (recommended)
3. Glossary enforcement for technical terms
4. Quality verification via Translation Console

## 🔗 Power Automate Integration

### Setup Instructions

1. **Create Power Automate Flow**:
   - Trigger: "When an HTTP request is received"
   - Parse lead data and create Dataverse record
   - Send email notifications
   - Configure error handling

2. **Dataverse Schema**: Lead entity with fields for name, email, organization, interest, etc.

## 🤖 AI Assistant

The AI assistant uses Vectorize for RAG with Workers AI models:
- **Knowledge Base**: Website content indexed as vectors
- **Embeddings**: Generated using Workers AI
- **Inference**: Llama 3.1 8B model for responses
- **Rate Limiting**: KV-based token bucket

### Content Ingestion
```bash
pnpm run ingest
```

## 🎯 Holo-School Initiative

Comprehensive page showcasing the holographic education project:
- Azure Media Services integration
- MACRA partnership details
- Pilot program information
- Technical architecture diagrams
- Downloadable prospectus

## 🚀 Deployment

### Cloudflare Pages (Recommended)
1. Connect GitHub repository
2. Configure build settings and environment variables
3. Set up custom domain (korena.mw)
4. Configure KV, Vectorize, and AI bindings

### Build Commands
```bash
# Development
pnpm dev

# Production build
pnpm build

# Preview locally
pnpm preview

# Deploy to Cloudflare
pnpm deploy

# Type checking
pnpm typecheck
```

## 🧪 Testing

```bash
# Unit tests
pnpm test

# End-to-end tests
pnpm test:e2e

# Linting
pnpm lint
```

## 📊 Performance Targets

- **Lighthouse Score**: ≥ 90 across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Edge Deployment**: Global CDN with minimal latency

## 🔧 Key Configuration Files

- `wrangler.toml`: Cloudflare Workers configuration
- `next.config.ts`: Next.js and i18n setup
- `middleware.ts`: Locale routing
- `i18n/`: Translation files and glossary
- `src/lib/types.ts`: TypeScript definitions

## 🤝 Contributing

1. Create feature branches from `main`
2. Follow TypeScript + ESLint standards
3. Update translations for user-facing changes
4. Include tests for new features
5. Update documentation as needed

## 📝 License

Proprietary - Korena Digital Solutions

## 🆘 Support

- **Technical**: Check Cloudflare binding configuration
- **Business**: info@korena.mw | +265 1 123 4567
- **Emergency**: +265 999 EMERGENCY

---

🇲🇼 **Proudly built in Malawi** - Empowering digital transformation across Africa
