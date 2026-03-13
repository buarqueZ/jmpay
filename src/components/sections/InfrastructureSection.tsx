import { motion } from "framer-motion";
import { Server, FileCode, Eye, Activity, Gauge, Shield } from "lucide-react";

const features = [
  { icon: Server, title: "Arquitetura escalável", desc: "Infraestrutura desenhada para crescer com a operação." },
  { icon: FileCode, title: "API-first", desc: "Documentação clara, integração rápida, endpoints estáveis." },
  { icon: Eye, title: "Observabilidade contínua", desc: "Logs, alertas e rastreabilidade em tempo real." },
  { icon: Activity, title: "Estabilidade transacional", desc: "Processamento sem interrupção e com consistência." },
  { icon: Gauge, title: "Baixa latência", desc: "Resposta média abaixo de 120ms." },
  { icon: Shield, title: "Alta disponibilidade", desc: "99,99% de uptime operacional." },
];

export function InfrastructureSection() {
  return (
    <section id="infraestrutura" className="relative section-padding">
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Infraestrutura
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tecnologia própria para operações que não podem parar
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4 p-5 rounded-lg border border-primary/10 bg-card"
            >
              <f.icon size={22} className="text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <h3 className="font-display font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
