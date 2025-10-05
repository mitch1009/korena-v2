"use client";

import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "ny", name: "Chichewa", flag: "🇲🇼" },
  { code: "tum", name: "Tumbuka", flag: "🇲🇼" },
  { code: "yao", name: "Yao", flag: "🇲🇼" },
  { code: "lomwe", name: "Lomwe", flag: "🇲🇼" },
  { code: "sena", name: "Sena", flag: "🇲🇼" },
  { code: "tonga", name: "Tonga", flag: "🇲🇼" },
];

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("common");

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  const switchLanguage = (newLocale: string) => {
    // Remove current locale from pathname and add new one
    const segments = pathname.split("/");
    const currentLocaleIndex = segments.findIndex(segment => 
      languages.some(lang => lang.code === segment)
    );
    
    if (currentLocaleIndex > 0) {
      segments[currentLocaleIndex] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    
    const newPath = segments.join("/");
    router.push(newPath);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="space-x-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLanguage.name}</span>
          <span className="sm:hidden">{currentLanguage.flag}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => switchLanguage(language.code)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <span>{language.flag}</span>
            <span>{language.name}</span>
            {language.code === locale && (
              <span className="ml-auto text-xs text-muted-foreground">
                {t("current")}
              </span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};