import { motion } from "framer-motion";
import { Heart, Shield, Sparkles } from "lucide-react";

const items = [
  {
    icon: Heart,
    title: "Quem somos",
    text: "A JMP é um marketplace nacional que reúne lojas, produtos e serviços em um ambiente único, pensado para a experiência do cliente.",
  },
  {
    icon: Sparkles,
    title: "O que oferecemos",
    text: "Uma curadoria de marcas e categorias variadas, com navegação simples e foco em descoberta de bons produtos.",
  },
  {
    icon: Shield,
    title: "Como entregamos",
    text: "Um ambiente confiável, com lojas verificadas, comunicação transparente e suporte ao comprador.",
  },
];

export function AboutSection() {
  return (
    <section id="sobre" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">Sobre a JMP</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-5 leading-tight">
            Um marketplace feito para conectar <span className="text-primary">marcas e pessoas</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A JMP nasceu para ser um espaço onde lojas encontram seus próximos clientes e clientes encontram produtos com confiança, variedade e uma experiência consistente.
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
              className="rounded-2xl border border-border bg-white p-7 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
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
