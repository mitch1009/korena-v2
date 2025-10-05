import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  Cloud, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  Settings,
  ArrowRight 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Cloud,
    key: "cloud-modern-work",
    href: "/services/cloud-modern-work",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: BarChart3,
    key: "data-ai",
    href: "/services/data-ai",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Shield,
    key: "security-compliance", 
    href: "/services/security-compliance",
    color: "from-red-500 to-orange-500",
  },
  {
    icon: Zap,
    key: "power-platform",
    href: "/services/power-platform",
    color: "from-yellow-500 to-amber-500",
  },
  {
    icon: Globe,
    key: "government-portals",
    href: "/services/government-portals",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Settings,
    key: "managed-services",
    href: "/services/managed-services",
    color: "from-gray-500 to-slate-500",
  },
];

export default function ServicesPage() {
  const t = useTranslations("services");

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
              {t("title")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.key} href={service.href} className="group">
                  <div className="relative p-8 bg-background rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 group-hover:scale-105 h-full overflow-hidden">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                    
                    <div className="relative z-10">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} mb-6`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-4 group-hover:text-primary transition-colors">
                        {t(`${service.key}.title`)}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {t(`${service.key}.description`)}
                      </p>
                      
                      <div className="space-y-3 mb-6">
                        {Array.from({ length: 4 }, (_, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-primary rounded-full" />
                            <span className="text-sm text-muted-foreground">
                              {t(`${service.key}.features.${i}`)}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                        <span className="text-sm">Learn more</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to Transform Your Organization?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how our services can help you achieve your digital transformation goals
          </p>
          <Button asChild size="lg">
            <Link href="/contact">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}