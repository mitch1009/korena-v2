import { useTranslations } from "next-intl";
import Link from "next/link";
import { 
  Download, 
  Monitor, 
  Headphones, 
  Radio, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  ArrowRight,
  Globe,
  Zap,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/lead-form";

export default function HoloSchoolPage() {
  const t = useTranslations("holo-school");

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-cyan-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20 blur-3xl" />
        
        <div className="relative container px-4 mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>MACRA Partnership • Microsoft Azure • Innovation</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
              {t("hero.title")}
            </h1>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              {t("hero.description")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-white/90">
                <Download className="mr-2 h-5 w-5" />
                {t("cta.button")}
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {t("sections.how.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Revolutionary holographic education delivery combining cutting-edge technology with proven broadcast infrastructure
            </p>
          </div>

          {/* Technology Flow */}
          <div className="grid gap-8 md:grid-cols-5 mb-16">
            {[
              {
                icon: Monitor,
                title: "Content Studio",
                description: "Azure Media Services studio for content creation and live streaming",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: Globe,
                title: "Teams Integration",
                description: "Microsoft Teams for real-time teacher-student interaction",
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: Radio,
                title: "MACRA Broadcast",
                description: "RF broadcast infrastructure for reliable signal distribution",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Monitor,
                title: "Hologram Display",
                description: "Community hologram screens powered by Chinese technology partners",
                color: "from-orange-500 to-red-500",
              },
              {
                icon: Headphones,
                title: "Audio Sync",
                description: "Wireless headsets for synchronized audio experience",
                color: "from-yellow-500 to-orange-500",
              },
            ].map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="text-center relative">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Arrow */}
                  {index < 4 && (
                    <ArrowRight className="hidden md:block absolute top-8 -right-4 w-6 h-6 text-muted-foreground" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Architecture Diagram */}
          <div className="bg-muted/30 rounded-2xl p-8 mb-16">
            <h3 className="text-xl font-semibold text-center mb-8">System Architecture</h3>
            <div className="relative">
              {/* Placeholder for architecture diagram */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 text-center">
                <div className="space-y-4">
                  <div className="flex justify-center items-center space-x-8">
                    <div className="bg-blue-100 rounded-lg p-4">
                      <Monitor className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-sm font-medium">Azure Studio</div>
                    </div>
                    <div className="text-gray-400">→</div>
                    <div className="bg-purple-100 rounded-lg p-4">
                      <Radio className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-sm font-medium">MACRA RF</div>
                    </div>
                    <div className="text-gray-400">→</div>
                    <div className="bg-green-100 rounded-lg p-4">
                      <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <div className="text-sm font-medium">Communities</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Detailed technical architecture diagram would be integrated here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Holo-School */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-6">
                {t("sections.why.title")}
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Users,
                    title: "Educational Equity",
                    description: "Bridge the gap between urban and rural education access, ensuring every child receives quality instruction.",
                  },
                  {
                    icon: Globe,
                    title: "Virtual Teachers",
                    description: "Provide access to qualified teachers remotely, overcoming geographical and resource constraints.",
                  },
                  {
                    icon: Shield,
                    title: "Resilient Infrastructure",
                    description: "RF broadcast technology ensures reliable delivery even in areas with limited internet connectivity.",
                  },
                  {
                    icon: Zap,
                    title: "Scalable Solution",
                    description: "Designed for nationwide deployment, reaching every village and community across Malawi.",
                  },
                ].map((benefit) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={benefit.title} className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">{benefit.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-6">Impact Projections</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                  <span>Students Reached (Year 1)</span>
                  <span className="font-bold">10,000+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                  <span>Rural Schools Connected</span>
                  <span className="font-bold">150+</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                  <span>Teacher-Student Ratio Improvement</span>
                  <span className="font-bold">300%</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                  <span>Educational Content Hours</span>
                  <span className="font-bold">2,000+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pilot Program */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {t("sections.pilot.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("sections.pilot.description")}
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Pilot Sites */}
            <div className="bg-background border rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">{t("sections.pilot.sites")}</h3>
              <div className="space-y-4">
                {[
                  { name: "Chiradzulu District", students: "500+", screens: 3, headsets: 15 },
                  { name: "Ntcheu Rural", students: "350+", screens: 2, headsets: 12 },
                  { name: "Mangochi Lakeshore", students: "450+", screens: 3, headsets: 18 },
                ].map((site) => (
                  <div key={site.name} className="p-3 bg-muted/50 rounded-lg">
                    <div className="font-medium">{site.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {site.students} students • {site.screens} screens • {site.headsets} headsets
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KPIs */}
            <div className="bg-background border rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">{t("sections.pilot.kpis")}</h3>
              <div className="space-y-4">
                {[
                  { metric: "Student Attendance", target: "85%", current: "0%" },
                  { metric: "System Uptime", target: "99%", current: "0%" },
                  { metric: "Comprehension Rate", target: "75%", current: "0%" },
                  { metric: "Teacher Engagement", target: "90%", current: "0%" },
                ].map((kpi) => (
                  <div key={kpi.metric} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{kpi.metric}</span>
                      <span className="font-medium">Target: {kpi.target}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-0 transition-all duration-1000" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-background border rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">{t("sections.pilot.timeline")}</h3>
              <div className="space-y-4">
                {[
                  { phase: "Planning & Setup", duration: "3 months", status: "upcoming" },
                  { phase: "Equipment Installation", duration: "2 months", status: "upcoming" },
                  { phase: "Pilot Testing", duration: "6 months", status: "upcoming" },
                  { phase: "Evaluation & Scale", duration: "3 months", status: "upcoming" },
                ].map((phase, index) => (
                  <div key={phase.phase} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${phase.status === 'completed' ? 'bg-green-600' : phase.status === 'active' ? 'bg-blue-600' : 'bg-muted-foreground'}`} />
                    <div className="flex-1">
                      <div className="text-sm font-medium">{phase.phase}</div>
                      <div className="text-xs text-muted-foreground">{phase.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-muted/30">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              {t("sections.tech.title")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on proven Microsoft Azure infrastructure with specialized broadcast and holographic technologies
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Azure Media Services",
                description: t("sections.tech.azure"),
                icon: "🌐",
                color: "from-blue-500 to-cyan-500",
              },
              {
                title: "Microsoft Teams",
                description: t("sections.tech.teams"),
                icon: "👥",
                color: "from-purple-500 to-pink-500",
              },
              {
                title: "MACRA Infrastructure",
                description: t("sections.tech.macra"),
                icon: "📡",
                color: "from-green-500 to-emerald-500",
              },
              {
                title: "Power Apps",
                description: t("sections.tech.apps"),
                icon: "📱",
                color: "from-orange-500 to-red-500",
              },
            ].map((tech) => (
              <div key={tech.title} className="bg-background border rounded-2xl p-6 text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${tech.color} mb-4 text-2xl`}>
                  {tech.icon}
                </div>
                <h3 className="font-semibold mb-2">{tech.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container px-4 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Download Prospectus */}
            <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-2xl p-8 text-white">
              <h2 className="text-2xl font-bold mb-4">{t("cta.title")}</h2>
              <p className="text-blue-100 mb-6 leading-relaxed">
                {t("cta.description")}
              </p>
              
              <div className="space-y-4 mb-6">
                {[
                  "Detailed technical specifications",
                  "Implementation timeline and milestones",
                  "Budget breakdown and ROI projections",
                  "Partnership opportunities and requirements",
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-300" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
              
              <Button size="lg" className="w-full bg-white text-blue-900 hover:bg-white/90">
                <Download className="mr-2 h-5 w-5" />
                {t("cta.button")}
              </Button>
              
              <p className="text-xs text-blue-200 mt-4 text-center">
                * PDF document • 2.5MB • Last updated: October 2025
              </p>
            </div>

            {/* Contact Form */}
            <div className="bg-background border rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-4">Request More Information</h2>
              <p className="text-muted-foreground mb-6">
                Interested in the Holo-School initiative? Contact our team for detailed discussions and partnership opportunities.
              </p>
              
              <LeadForm 
                source="holo-school-page" 
                defaultInterest="holo-school"
                className="space-y-4"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}