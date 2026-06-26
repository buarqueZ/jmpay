import { motion } from "framer-motion";
import {
  UserPlus, Package, ShoppingCart, LayoutDashboard,
  Percent, BarChart3, MessagesSquare, Store,
} from "lucide-react";

const features = [
  { icon: UserPlus, title: "Cadastro de vendedores", text: "Onboarding completo, documentação e aprovação em fluxo simplificado." },
  { icon: Package, title: "Gestão de produtos", text: "Catálogo unificado com variações, estoque e categorias." },
  { icon: ShoppingCart, title: "Gestão de pedidos", text: "Acompanhe status, prazos e operações logísticas em tempo real." },
  { icon: LayoutDashboard, title: "Painel administrativo", text: "Controle total da operação com permissões por equipe." },
  { icon: Percent, title: "Controle de comissões", text: "Regras flexíveis por vendedor, categoria ou produto." },
  { icon: BarChart3, title: "Relatórios e métricas", text: "Insights financeiros, operacionais e comerciais." },
  { icon: MessagesSquare, title: "Comunicação entre partes", text: "Mensagens diretas entre marketplace, vendedor e cliente." },
  { icon: Store, title: "Vitrine personalizável", text: "Identidade visual adaptada à sua marca e segmento." },
];

export function FeaturesSection() {
  return (
    <section id="funcionalidades" className="relative py-24 md:py-32 bg-muted/40">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">Funcionalidades</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-5">
            Tudo o que sua operação precisa em <span className="text-primary">um só lugar</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Recursos pensados para escalar marketplaces de qualquer porte com simplicidade e controle.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
              className="group rounded-2xl bg-white border border-border p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <f.icon size={20} className="text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
