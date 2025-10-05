"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileNav } from "@/components/mobile-nav";
import { LanguageSwitcher } from "@/components/language-switcher";
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
];

export const Header = () => {
  const t = useTranslations("navigation");
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-200",
        isScrolled && "shadow-sm"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/logo.svg"
            alt="Korena Digital Solutions"
            width={40}
            height={40}
            className="h-8 w-8"
          />
          <span className="hidden font-bold sm:inline-block">
            Korena Digital Solutions
          </span>
          <span className="font-bold sm:hidden">Korena</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "flex items-center text-sm font-medium transition-colors hover:text-primary",
                  item.children && "space-x-1"
                )}
              >
                <span>{t(item.name)}</span>
                {item.children && <ChevronDown className="h-3 w-3" />}
              </Link>

              {/* Dropdown Menu */}
              {item.children && openDropdown === item.name && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-md border bg-popover p-2 shadow-lg">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      className="block rounded-sm px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
                    >
                      {t(child.name)}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          
          <Button asChild className="hidden sm:inline-flex">
            <Link href="/contact">{t("contact")}</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <MobileNav />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};