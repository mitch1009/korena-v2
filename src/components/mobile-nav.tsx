"use client";

import * as React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { 
    name: "services", 
    href: "/services",
    children: [
      { name: "cloud-modern-work", href: "/services/cloud-modern-work" },
      { name: "data-ai", href: "/services/data-ai" },
      { name: "security-compliance", href: "/services/security-compliance" },
      { name: "power-platform", href: "/services/power-platform" },
      { name: "government-portals", href: "/services/government-portals" },
      { name: "managed-services", href: "/services/managed-services" },
    ]
  },
  { 
    name: "solutions", 
    href: "/solutions",
    children: [
      { name: "govcloud-starter", href: "/solutions/govcloud-starter" },
      { name: "smart-data-platform", href: "/solutions/smart-data-platform" },
      { name: "secure-identity", href: "/solutions/secure-identity" },
      { name: "gov-payments", href: "/solutions/gov-payments" },
    ]
  },
  { 
    name: "industries", 
    href: "/industries",
    children: [
      { name: "government", href: "/industries/government" },
      { name: "healthcare", href: "/industries/healthcare" },
      { name: "education", href: "/industries/education" },
      { name: "finance", href: "/industries/finance" },
    ]
  },
  { name: "holo-school", href: "/holo-school" },
  { name: "case-studies", href: "/case-studies" },
  { name: "tenders", href: "/tenders" },
  { name: "about", href: "/about" },
  { name: "contact", href: "/contact" },
];

export const MobileNav = () => {
  const t = useTranslations("navigation");
  const [openItems, setOpenItems] = React.useState<Set<string>>(new Set());

  const toggleItem = (name: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(name)) {
      newOpenItems.delete(name);
    } else {
      newOpenItems.add(name);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="flex flex-col space-y-3 pt-6">
      <div className="px-2">
        <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
          {t("menu")}
        </h2>
      </div>

      <div className="space-y-1">
        {navigation.map((item) => (
          <div key={item.name}>
            {item.children ? (
              <div>
                <Button
                  variant="ghost"
                  className="w-full justify-between h-auto p-2"
                  onClick={() => toggleItem(item.name)}
                >
                  <span className="font-medium">{t(item.name)}</span>
                  {openItems.has(item.name) ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
                
                {openItems.has(item.name) && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="block rounded-sm px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      >
                        {t(child.name)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                href={item.href}
                className="block rounded-sm px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
              >
                {t(item.name)}
              </Link>
            )}
          </div>
        ))}
      </div>

      <div className="border-t pt-4">
        <Button asChild className="w-full">
          <Link href="/contact">{t("get-started")}</Link>
        </Button>
      </div>
    </div>
  );
};