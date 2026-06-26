import { motion } from "framer-motion";
import { LayoutDashboard, Layers, Workflow } from "lucide-react";

const items = [
  {
    icon: LayoutDashboard,
    title: "Painel centralizado",
    text: "Vendedores, produtos, pedidos, comissões e relatórios em uma única operação.",
  },
  {
    icon: Layers,
    title: "Multifuncional",
    text: "Pronta para diferentes segmentos: varejo, serviços, B2B, nichos e operações híbridas.",
  },
  {
    icon: Workflow,
    title: "Foco em escala",
    text: "Estruture sua operação de marketplace com agilidade, controle e experiência do usuário.",
  },
];

export function AboutSection() {
  return (
    <section id="plataforma" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">A Plataforma</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-5 leading-tight">
            Estruture, opere e escale seu próprio <span className="text-primary">marketplace</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A JMP Marketplace é a solução para empresas que querem operar um marketplace próprio com gestão completa, do cadastro de vendedores ao relatório final.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-white p-7 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5">
                <item.icon size={22} className="text-primary" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
