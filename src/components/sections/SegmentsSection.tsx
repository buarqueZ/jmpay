import { motion } from "framer-motion";
import { Building2, ShoppingCart, Code2, Globe, Layers } from "lucide-react";

const segments = [
  { icon: Building2, name: "Fintechs" },
  { icon: ShoppingCart, name: "Marketplaces" },
  { icon: Code2, name: "SaaS" },
  { icon: Globe, name: "E-commerce" },
  { icon: Layers, name: "Plataformas" },
];

export function SegmentsSection() {
  return (
    <section className="relative section-padding">
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Segmentos atendidos
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Para empresas que operam em escala
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {segments.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center gap-3 p-6 rounded-lg transition-colors bg-card shadow-[0_2px_8px_-2px_hsl(30_10%_15%_/0.06)]"
            >
              <s.icon size={28} className="text-primary" strokeWidth={1.5} />
              <span className="text-sm font-medium text-foreground">{s.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
