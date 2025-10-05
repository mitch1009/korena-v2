"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LeadFormSchema, type LeadFormData } from "@/lib/types";
import { cn } from "@/lib/utils";
import { submitLead } from "@/lib/actions/submit-lead";

interface LeadFormProps {
  className?: string;
  source?: string;
  defaultInterest?: string;
}

export const LeadForm = ({ className, source = "website", defaultInterest }: LeadFormProps) => {
  const t = useTranslations("contact");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle");

  const form = useForm<LeadFormData>({
    resolver: zodResolver(LeadFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      organization: "",
      interest: defaultInterest as any || "general",
      message: "",
      consent: false,
      locale: "en",
      source,
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const result = await submitLead(data);
      
      if (result.success) {
        setSubmitStatus("success");
        form.reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const interestOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "cloud-modern-work", label: "Cloud & Modern Work" },
    { value: "data-ai", label: "Data & AI" },
    { value: "security-compliance", label: "Security & Compliance" },
    { value: "power-platform", label: "Power Platform" },
    { value: "government-portals", label: "Government Portals" },
    { value: "managed-services", label: "Managed Services" },
    { value: "holo-school", label: "Holo-School Initiative" },
    { value: "fintech-payments", label: "FinTech Payments" },
  ];

  return (
    <form 
      onSubmit={form.handleSubmit(onSubmit)} 
      className={cn("space-y-6", className)}
    >
      {/* Success Message */}
      {submitStatus === "success" && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-sm">{t("form.success")}</p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{t("form.error")}</p>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            {t("form.name")} *
          </label>
          <Input
            {...form.register("name")}
            placeholder={t("form.name-placeholder")}
            className={form.formState.errors.name ? "border-red-500" : ""}
          />
          {form.formState.errors.name && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            {t("form.email")} *
          </label>
          <Input
            {...form.register("email")}
            type="email"
            placeholder={t("form.email-placeholder")}
            className={form.formState.errors.email ? "border-red-500" : ""}
          />
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-600">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            {t("form.phone")}
          </label>
          <Input
            {...form.register("phone")}
            type="tel"
            placeholder={t("form.phone-placeholder")}
          />
        </div>

        {/* Organization */}
        <div>
          <label htmlFor="organization" className="block text-sm font-medium mb-2">
            {t("form.organization")}
          </label>
          <Input
            {...form.register("organization")}
            placeholder={t("form.organization-placeholder")}
          />
        </div>
      </div>

      {/* Interest */}
      <div>
        <label htmlFor="interest" className="block text-sm font-medium mb-2">
          {t("form.interest")} *
        </label>
        <select
          {...form.register("interest")}
          className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm"
        >
          <option value="">{t("form.interest-placeholder")}</option>
          {interestOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {form.formState.errors.interest && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.interest.message}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t("form.message")} *
        </label>
        <Textarea
          {...form.register("message")}
          rows={4}
          placeholder={t("form.message-placeholder")}
          className={form.formState.errors.message ? "border-red-500" : ""}
        />
        {form.formState.errors.message && (
          <p className="mt-1 text-sm text-red-600">
            {form.formState.errors.message.message}
          </p>
        )}
      </div>

      {/* Consent */}
      <div className="flex items-start space-x-3">
        <input
          {...form.register("consent")}
          type="checkbox"
          className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label htmlFor="consent" className="text-sm text-muted-foreground">
          {t("form.consent")} *
        </label>
      </div>
      {form.formState.errors.consent && (
        <p className="text-sm text-red-600">
          {form.formState.errors.consent.message}
        </p>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="w-full md:w-auto"
      >
        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {t("form.submit")}
      </Button>
    </form>
  );
};