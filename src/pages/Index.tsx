import { lazy, Suspense } from "react";

import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";

const HistorySection = lazy(() => import("@/components/sections/HistorySection").then(m => ({ default: m.HistorySection })));
const SolutionsSection = lazy(() => import("@/components/sections/SolutionsSection").then(m => ({ default: m.SolutionsSection })));
const SecuritySection = lazy(() => import("@/components/sections/SecuritySection").then(m => ({ default: m.SecuritySection })));
const FAQSection = lazy(() => import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection })));
const CTASection = lazy(() => import("@/components/sections/CTASection").then(m => ({ default: m.CTASection })));
const Footer = lazy(() => import("@/components/sections/Footer").then(m => ({ default: m.Footer })));

function DarkSection({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative bg-black", className)}>
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function PlainSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative bg-background">
      <div className="relative z-10">{children}</div>
    </div>
  );
}

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Dark: Hero */}
      <DarkSection className="rounded-b-[30%]">
        <HeroSection />
      </DarkSection>

      <Suspense fallback={null}>
        {/* Plain: History */}
        <PlainSection>
          <HistorySection />
        </PlainSection>

        {/* Dark: Solutions */}
        <DarkSection>
          <SolutionsSection />
        </DarkSection>

        {/* Plain: Security */}
        <PlainSection>
          <SecuritySection />
        </PlainSection>

        {/* Dark: FAQ */}
        <DarkSection>
          <FAQSection />
        </DarkSection>

        {/* Plain: CTA */}
        <PlainSection>
          <CTASection />
        </PlainSection>

        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
