import { motion } from "framer-motion";
import { Zap, CreditCard, GitBranch, Code, RefreshCw, BarChart3 } from "lucide-react";

const solutions = [
  { icon: Zap, title: "PIX em escala", desc: "Processe cobranças via PIX com velocidade, rastreabilidade e zero fricção operacional." },
  { icon: CreditCard, title: "Cartões e cobrança", desc: "Aceite pagamentos por cartão de crédito e débito com aprovação inteligente e conciliação automática." },
  { icon: GitBranch, title: "Split de pagamentos", desc: "Automatize repasses entre múltiplos recebedores com previsibilidade, rastreabilidade e menos esforço operacional." },
  { icon: Code, title: "API-first", desc: "Integração simples e documentada. Estrutura pensada para times técnicos que precisam de velocidade e confiabilidade." },
  { icon: RefreshCw, title: "Automação financeira", desc: "Reduza processos manuais com automação de recorrência, conciliação e fluxo financeiro centralizado." },
  { icon: BarChart3, title: "Dashboard e monitoramento", desc: "Visibilidade total das transações em tempo real. Controle operacional em um único painel." },
];

export function SolutionsSection() {
  return (
    <section id="solucoes" className="relative section-padding">
      <div className="container-tight relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-primary text-sm font-medium tracking-widest uppercase mb-4">
            Soluções
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Tudo o que sua operação precisa, em um só lugar
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="p-6 rounded-lg transition-all bg-card group shadow-[0_2px_8px_-2px_hsl(30_10%_15%_/0.06)]"
            >
              <s.icon
                size={28}
                className="text-primary mb-4"
                strokeWidth={1.5}
              />
              <h3 className="text-lg font-display font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
