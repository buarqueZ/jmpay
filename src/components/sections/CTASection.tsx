import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative section-padding">
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-6">
            A infraestrutura certa transforma pagamentos em{" "}
            <span className="text-black">vantagem competitiva</span>
          </h2>
          <p className="text-black text-lg mb-10 leading-relaxed">
            Fale com o time da JM PAY e veja como centralizar recebimentos, repasses e automação financeira em uma única operação.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
              Começar integração <ArrowRight size={18} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-black/40 text-black hover:bg-black/10"
            >
              Solicitar apresentação
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
