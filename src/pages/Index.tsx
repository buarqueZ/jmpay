import { lazy, Suspense } from "react";
import { AnimatedGridPattern } from "@/components/ui/animated-grid-pattern";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";

const HistorySection = lazy(() => import("@/components/sections/HistorySection").then(m => ({ default: m.HistorySection })));
const SolutionsSection = lazy(() => import("@/components/sections/SolutionsSection").then(m => ({ default: m.SolutionsSection })));
const SecuritySection = lazy(() => import("@/components/sections/SecuritySection").then(m => ({ default: m.SecuritySection })));
const FAQSection = lazy(() => import("@/components/sections/FAQSection").then(m => ({ default: m.FAQSection })));
const CTASection = lazy(() => import("@/components/sections/CTASection").then(m => ({ default: m.CTASection })));
const Footer = lazy(() => import("@/components/sections/Footer").then(m => ({ default: m.Footer })));

function GridSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <AnimatedGridPattern
          numSquares={15}
          maxOpacity={0.25}
          duration={3}
          className="absolute inset-0 h-full w-full text-black/50 opacity-70"
          width={5}
          height={5}
        />
      </div>
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

      {/* Grid: Hero */}
      <GridSection>
        <HeroSection />
      </GridSection>

      <Suspense fallback={null}>
        {/* Plain: History */}
        <PlainSection>
          <HistorySection />
        </PlainSection>

        {/* Grid: Solutions */}
        <GridSection>
          <SolutionsSection />
        </GridSection>

        {/* Plain: Security */}
        <PlainSection>
          <SecuritySection />
        </PlainSection>

        {/* Grid: FAQ */}
        <GridSection>
          <FAQSection />
        </GridSection>

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
