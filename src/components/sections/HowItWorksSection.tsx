import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Empresa cria seu marketplace", text: "Configure identidade, regras de comissão e categorias em poucos passos." },
  { n: "02", title: "Vendedores entram na plataforma", text: "Onboarding rápido com documentação e aprovação centralizada." },
  { n: "03", title: "Produtos e serviços exibidos", text: "Vitrine pronta para receber pedidos e converter clientes." },
  { n: "04", title: "Gestão em um painel único", text: "Acompanhe pedidos, comissões, métricas e operação em tempo real." },
];

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="relative py-24 md:py-32 bg-muted/40">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">Como funciona</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-5">
            Quatro passos para colocar seu marketplace <span className="text-primary">no ar</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="relative rounded-2xl bg-white border border-border p-6 hover:border-primary/50 transition-colors"
            >
              <div className="font-display text-5xl font-bold text-primary/20 mb-3">{s.n}</div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
