"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const partners = [
  {
    name: "Microsoft",
    tier: "Gold Partner",
    logo: "/logos/microsoft.svg",
    description: "Certified Gold Partner delivering Azure, Microsoft 365, and Power Platform solutions",
    certifications: ["Azure Expert", "Modern Work", "Security", "Data & AI"],
  },
  {
    name: "MACRA",
    tier: "Strategic Partner",
    logo: "/logos/macra.svg", 
    description: "Official partner for telecommunications and broadcasting infrastructure projects",
    certifications: ["Broadcast Technology", "RF Infrastructure", "National Coverage"],
  },
  {
    name: "Government of Malawi",
    tier: "Approved Vendor",
    logo: "/logos/malawi-gov.svg",
    description: "Approved vendor for government digital transformation initiatives",
    certifications: ["E-Government", "Digital Services", "Public Sector"],
  },
];

export const PartnersSection = () => {
  const t = useTranslations("footer");

  return (
    <section className="py-20 bg-muted/20">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {t("trusted-partners")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("partners-description")}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="p-6 bg-background rounded-2xl border shadow-sm hover:shadow-md transition-all duration-300 group-hover:scale-105 h-full">
                {/* Logo Placeholder */}
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {partner.name.slice(0, 2).toUpperCase()}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <h3 className="text-lg font-semibold mb-1">{partner.name}</h3>
                  <div className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    {partner.tier}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center mb-6 leading-relaxed">
                  {partner.description}
                </p>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-center mb-3">Certifications & Expertise</h4>
                  <div className="grid gap-2">
                    {partner.certifications.map((cert) => (
                      <div key={cert} className="flex items-center space-x-2 text-xs">
                        <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                        <span className="text-muted-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 p-6 bg-background rounded-2xl border"
        >
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">Our Certifications</h3>
            <p className="text-sm text-muted-foreground">
              Maintaining the highest standards through continuous certification and training
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {[
              "Azure Solutions Architect Expert",
              "Microsoft 365 Certified",
              "Power Platform Functional Consultant",
              "Security Operations Analyst",
              "Data Analyst Associate",
              "MACRA Broadcast License",
            ].map((cert) => (
              <div key={cert} className="flex items-center space-x-1 px-3 py-1 bg-muted rounded-full">
                <CheckCircle className="w-3 h-3 text-green-600" />
                <span>{cert}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};