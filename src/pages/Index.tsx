import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { DifferentialsSection } from "@/components/sections/DifferentialsSection";
import { CTASection } from "@/components/sections/CTASection";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-foreground">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <FeaturesSection />
        <BenefitsSection />
        <HowItWorksSection />
        <DifferentialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
