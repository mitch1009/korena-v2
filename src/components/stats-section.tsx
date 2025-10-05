"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Award, Clock, Map, TrendingUp } from "lucide-react";

const stats = [
  {
    icon: Award,
    value: "50+",
    labelKey: "clients",
    description: "Government and enterprise clients across Malawi",
  },
  {
    icon: TrendingUp,
    value: "200+",
    labelKey: "projects",
    description: "Successful digital transformation projects delivered",
  },
  {
    icon: Clock,
    value: "99.9%",
    labelKey: "uptime",
    description: "Service uptime with 24/7 monitoring and support",
  },
  {
    icon: Map,
    value: "100%",
    labelKey: "coverage",
    description: "National coverage reaching all regions of Malawi",
  },
];

export const StatsSection = () => {
  const t = useTranslations("hero");

  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Trusted by Leading Organizations
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Delivering exceptional results across government, healthcare, education, and finance sectors
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.labelKey}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary-foreground/10 rounded-2xl group-hover:bg-primary-foreground/20 transition-colors">
                  <Icon className="w-8 h-8" />
                </div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 1, delay: index * 0.2 + 0.3 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold mb-2"
                >
                  {stat.value}
                </motion.div>
                
                <h3 className="text-lg font-semibold mb-2">
                  {t(`stats.${stat.labelKey}`)}
                </h3>
                
                <p className="text-sm text-primary-foreground/70 leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};