import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Para quais empresas a JM PAY foi pensada?", a: "Para fintechs, marketplaces, SaaS, e-commerces e plataformas digitais que precisam de infraestrutura de pagamentos confiável e escalável." },
  { q: "Quais métodos de pagamento são suportados?", a: "PIX, cartão de crédito, débito e cobranças recorrentes — tudo em uma única integração." },
  { q: "A JM PAY oferece split e recorrência?", a: "Sim. Split automático com rastreabilidade e recorrência com automação de cobrança estão disponíveis na plataforma." },
  { q: "A integração é voltada para times técnicos?", a: "A API foi desenhada para ser rápida de integrar, com documentação clara e endpoints estáveis." },
  { q: "A plataforma suporta operações em escala?", a: "Sim. A infraestrutura é desenhada para suportar alto volume de transações com estabilidade e baixa latência." },
  { q: "Como a JM PAY reduz atritos operacionais?", a: "Centralizando recebimentos, repasses e conciliação em uma única plataforma, eliminando processos manuais." },
];

export function FAQSection() {
  return (
    <section id="faq" className="relative section-padding">
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            FAQ
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Perguntas frequentes
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="rounded-lg px-6 bg-white/5 border border-white/10"
              >
                <AccordionTrigger className="text-white font-display font-medium text-left hover:no-underline hover:text-primary transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/60">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
