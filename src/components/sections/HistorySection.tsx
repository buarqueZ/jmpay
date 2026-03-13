import { motion } from "framer-motion";

const timeline = [
  { year: "2018", title: "Identificação da dor no mercado" },
  { year: "2020", title: "Criação da plataforma — foco em simplicidade e escala" },
  { year: "Hoje", title: "Pagamentos como vantagem competitiva" },
];

export function HistorySection() {
  return (
    <section id="sobre" className="relative section-padding">
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-14"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Nossa história
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            O dia em que os pagamentos deixaram de ser um problema
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Em 2018, desenvolvedores e empreendedores digitais identificaram um problema recorrente: vender online ficou simples, mas receber pagamentos continuava lento, confuso e instável. A JM PAY nasceu para eliminar esse atrito com uma infraestrutura clara, rápida de integrar e preparada para escalar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative pl-6 border-l border-primary/30"
            >
              <span className="text-primary font-display text-2xl font-bold">{item.year}</span>
              <p className="text-foreground mt-2 font-medium">{item.title}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
