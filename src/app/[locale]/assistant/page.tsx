import { useTranslations } from "next-intl";
import { AIAssistant } from "@/components/ai-assistant";
import { Bot, MessageCircle, Zap, Shield } from "lucide-react";

export default function AssistantPage() {
  const t = useTranslations("assistant");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Get instant answers about our services, solutions, and how we can help with your digital transformation journey. Our AI assistant is powered by comprehensive knowledge of Korena's capabilities and expertise.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Responses</h3>
              <p className="text-muted-foreground text-sm">
                Get immediate answers to your questions about our services, pricing, and implementation approaches.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Recommendations</h3>
              <p className="text-muted-foreground text-sm">
                Receive personalized solution recommendations based on your industry and specific requirements.
              </p>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure & Private</h3>
              <p className="text-muted-foreground text-sm">
                Your conversations are processed securely with no personal data stored or shared.
              </p>
            </div>
          </div>

          {/* Sample Questions */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">Try asking about:</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "What cloud migration services do you offer?",
                "How can Power Platform help my government department?",
                "Tell me about the Holo-School initiative",
                "What security compliance frameworks do you support?",
                "How do you implement Microsoft 365 for organizations?",
                "What is your experience with Azure deployments?",
                "Can you help with data analytics and Power BI?",
                "What managed services do you provide?",
              ].map((question) => (
                <div
                  key={question}
                  className="p-4 bg-muted/50 rounded-lg border hover:bg-muted/80 transition-colors cursor-pointer"
                >
                  <p className="text-sm">{question}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assistant Widget */}
      <AIAssistant defaultOpen className="relative bottom-auto right-auto w-full max-w-4xl mx-auto mb-8" />

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Need More Detailed Assistance?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            While our AI assistant can answer many questions, our human experts are always ready 
            to provide detailed consultations and custom solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Schedule a Consultation
            </a>
            <a
              href="tel:+2651234567"
              className="inline-flex items-center justify-center px-6 py-3 border border-input rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Call +265 1 123 4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}