import { motion } from "framer-motion";
import { Sparkles, Layers, ShieldCheck, Heart, Gauge, Users } from "lucide-react";

const diffs = [
  { icon: Layers, title: "Variedade real", text: "Categorias amplas com marcas para diferentes momentos." },
  { icon: Sparkles, title: "Curadoria com cuidado", text: "Lojas e produtos selecionados para garantir qualidade." },
  { icon: ShieldCheck, title: "Ambiente confiável", text: "Vendedores verificados e regras claras de operação." },
  { icon: Heart, title: "Experiência primeiro", text: "Interface limpa, navegação simples, foco em quem usa." },
  { icon: Gauge, title: "Compra ágil", text: "Do interesse ao pedido em poucos passos." },
  { icon: Users, title: "Comunidade ativa", text: "Compradores e lojistas que crescem junto com a JMP." },
];

export function DifferentialsSection() {
  return (
    <section id="diferenciais" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">Diferenciais</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-5">
            Por que escolher a <span className="text-primary">JMP</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diffs.map((d, i) => (
            <motion.div
              key={d.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
              className="flex gap-4 p-6 rounded-2xl border border-border hover:bg-accent/40 transition-colors"
            >
              <div className="w-11 h-11 flex-shrink-0 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                <d.icon size={20} />
              </div>
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
