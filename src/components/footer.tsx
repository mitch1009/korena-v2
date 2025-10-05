import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";

const footerLinks = {
  services: [
    { name: "cloud-modern-work", href: "/services/cloud-modern-work" },
    { name: "data-ai", href: "/services/data-ai" },
    { name: "security-compliance", href: "/services/security-compliance" },
    { name: "power-platform", href: "/services/power-platform" },
    { name: "government-portals", href: "/services/government-portals" },
    { name: "managed-services", href: "/services/managed-services" },
  ],
  solutions: [
    { name: "govcloud-starter", href: "/solutions/govcloud-starter" },
    { name: "smart-data-platform", href: "/solutions/smart-data-platform" },
    { name: "secure-identity", href: "/solutions/secure-identity" },
    { name: "gov-payments", href: "/solutions/gov-payments" },
  ],
  company: [
    { name: "about", href: "/about" },
    { name: "case-studies", href: "/case-studies" },
    { name: "tenders", href: "/tenders" },
    { name: "holo-school", href: "/holo-school" },
    { name: "contact", href: "/contact" },
  ],
  legal: [
    { name: "privacy-policy", href: "/legal/privacy" },
    { name: "terms-of-service", href: "/legal/terms" },
    { name: "data-protection", href: "/legal/data-protection" },
    { name: "cookies", href: "/legal/cookies" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com/company/korena-digital", icon: Linkedin },
  { name: "Twitter", href: "https://twitter.com/korenadigital", icon: Twitter },
  { name: "Facebook", href: "https://facebook.com/korenadigital", icon: Facebook },
];

export const Footer = () => {
  const t = useTranslations("footer");
  const tn = useTranslations("navigation");

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image
                src="/logo.svg"
                alt="Korena Digital Solutions"
                width={40}
                height={40}
                className="h-8 w-8"
              />
              <span className="font-bold text-lg">Korena Digital Solutions</span>
            </Link>
            
            <p className="text-muted-foreground mb-6 max-w-md">
              {t("description")}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">
                  {t("address")}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">+265 1 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">info@korena.mw</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{tn("services")}</h3>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tn(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4">{tn("solutions")}</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tn(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">{t("company")}</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {tn(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="font-semibold mt-6 mb-4">{t("legal")}</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(link.name)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Partners Section */}
        <div className="border-t mt-12 pt-8">
          <div className="text-center mb-6">
            <h3 className="font-semibold text-lg mb-2">{t("trusted-partners")}</h3>
            <p className="text-muted-foreground text-sm">{t("partners-description")}</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
            {/* Microsoft Partner Badge */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">MS</span>
              </div>
              <span className="text-sm font-medium">Microsoft Partner</span>
            </div>
            
            {/* Government Badge */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">MW</span>
              </div>
              <span className="text-sm font-medium">Government Approved</span>
            </div>
            
            {/* MACRA Badge */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">MC</span>
              </div>
              <span className="text-sm font-medium">MACRA Partner</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © 2025 Korena Digital Solutions. {t("rights-reserved")}.
          </p>
          <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
            {t("made-in-malawi")} 🇲🇼
          </p>
        </div>
      </div>
    </footer>
  );
};