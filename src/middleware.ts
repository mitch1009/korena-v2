import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "ny", "tum", "yao", "lomwe", "sena", "tonga"],

  // Used when no locale matches
  defaultLocale: "en",

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  localePrefix: "as-needed",

  // Locale detection configuration
  localeDetection: true,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};