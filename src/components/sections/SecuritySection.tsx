import { motion } from "framer-motion";
import { ShieldCheck, MonitorCheck, Lock, Eye, Scale, TrendingUp } from "lucide-react";

const items = [
  { icon: ShieldCheck, title: "Segurança de nível financeiro" },
  { icon: MonitorCheck, title: "Monitoramento contínuo" },
  { icon: Lock, title: "Proteção de dados" },
  { icon: Eye, title: "Rastreabilidade operacional" },
  { icon: Scale, title: "Governança de fluxos" },
  { icon: TrendingUp, title: "Estrutura preparada para crescimento" },
];

export function SecuritySection() {
  return (
    <section id="seguranca" className="relative section-padding">
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-14"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Segurança
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Segurança, controle e confiabilidade em cada transação
          </h2>
          <p className="text-muted-foreground">
            Arquitetura com foco em segurança, boas práticas de proteção e controle, camadas de monitoramento e rastreabilidade.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex items-center gap-4 p-5 rounded-lg border border-primary/10 bg-card"
            >
              <item.icon size={22} className="text-primary shrink-0" strokeWidth={1.5} />
              <span className="font-display font-medium text-foreground">{item.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
