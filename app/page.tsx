import Nav from "@/components/sections/Nav";
import Hero from "@/components/sections/Hero";
import Platform from "@/components/sections/Platform";
import Consultation from "@/components/sections/Consultation";
import HealthcareSuite from "@/components/sections/HealthcareSuite";
import Modules from "@/components/sections/Modules";
import HowItWorks from "@/components/sections/HowItWorks";
import OrchestrationComparison from "@/components/sections/OrchestrationComparison";
import Compliance from "@/components/sections/Compliance";
import HardwareAddons from "@/components/sections/HardwareAddons";
import Integrations from "@/components/sections/Integrations";
import Pricing from "@/components/sections/Pricing";
import Onboarding from "@/components/sections/Onboarding";
import IndustryAgents from "@/components/sections/IndustryAgents";
import Faq from "@/components/sections/Faq";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-dvh w-full overflow-x-clip bg-[var(--paper)] text-[var(--ink)]">
      <Nav />
      <Hero />
      <Platform />
      <Consultation />
      <HealthcareSuite />
      <Modules />
      <HowItWorks />
      <OrchestrationComparison />
      <Compliance />
      <HardwareAddons />
      <Integrations />
      <Pricing />
      <Onboarding />
      <IndustryAgents />
      <Faq />
      <Footer />
    </main>
  );
}
