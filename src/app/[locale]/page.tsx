import { Hero } from "@/components/hero";
import { ServicesOverview } from "@/components/services-overview";
import { StatsSection } from "@/components/stats-section";
import { PartnersSection } from "@/components/partners-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ServicesOverview />
      <StatsSection />
      <PartnersSection />
    </div>
  );
}
