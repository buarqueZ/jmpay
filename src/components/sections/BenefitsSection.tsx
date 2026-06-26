import { motion } from "framer-motion";
import { ShoppingBag, Store, Check } from "lucide-react";

const blocks = [
  {
    icon: ShoppingBag,
    label: "Para quem compra",
    items: [
      "Variedade de marcas em um só lugar",
      "Curadoria de lojas confiáveis",
      "Navegação simples e organizada",
      "Suporte ao comprador",
      "Boas oportunidades e descobertas",
    ],
  },
  {
    icon: Store,
    label: "Para quem vende",
    items: [
      "Mais visibilidade para sua marca",
      "Acesso a uma audiência ativa",
      "Vitrine pronta para divulgar produtos",
      "Apoio para crescer dentro da JMP",
      "Ambiente sério e organizado",
    ],
  },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">Benefícios</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-5">
            Bom para quem compra. Bom para quem <span className="text-primary">vende</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            A JMP é construída com o mesmo cuidado para os dois lados do marketplace.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {blocks.map((b, idx) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`rounded-3xl p-8 md:p-10 ${
                idx === 0
                  ? "bg-foreground text-white"
                  : "bg-accent text-foreground border border-primary/10"
              }`}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-primary text-primary-foreground">
                <b.icon size={22} />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-6">{b.label}</h3>
              <ul className="space-y-3">
                {b.items.map((i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check size={18} className="mt-1 flex-shrink-0 text-primary" />
                    <span className={idx === 0 ? "text-white/85" : "text-foreground/80"}>{i}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
