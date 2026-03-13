import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.webp";

export function HeroSection() {
  return (
    <section className="relative section-padding pt-32 md:pt-40 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Diagonal gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <img
            src={logo}
            alt="JM PAY"
            className="h-20 w-auto mb-6 brightness-0 invert"
          />
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-6">
            Infraestrutura de pagamentos
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
            Pagamentos sem fricção.{" "}
            <span className="text-primary">Infraestrutura de verdade.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mb-10 leading-relaxed">
            PIX, cartões, split de pagamentos e automação financeira em uma única plataforma.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              Começar integração <ArrowRight size={18} />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
