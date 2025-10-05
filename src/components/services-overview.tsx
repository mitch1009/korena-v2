"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
  },
  {
    icon: BarChart3,
    key: "data-ai",
    href: "/services/data-ai",
  },
  {
    icon: Shield,
    key: "security-compliance", 
    href: "/services/security-compliance",
  },
  {
    icon: Zap,
    key: "power-platform",
    href: "/services/power-platform",
  },
  {
    icon: Globe,
    key: "government-portals",
    href: "/services/government-portals",
  },
  {
    icon: Settings,
    key: "managed-services",
    href: "/services/managed-services",
  },
];

export const ServicesOverview = () => {
  const t = useTranslations("services");

  return (
    <section className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={service.href}>
                  <div className="relative p-6 bg-background rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105 h-full">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                          {t(`${service.key}.title`)}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {t(`${service.key}.description`)}
                        </p>
                        
                        <div className="space-y-2">
                          {Array.from({ length: 4 }, (_, i) => (
                            <div key={i} className="flex items-center space-x-2 text-xs">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              <span className="text-muted-foreground">
                                {t(`${service.key}.features.${i}`)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowRight className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button asChild size="lg" variant="outline">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};