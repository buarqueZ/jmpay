import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Store, BarChart3, Users, Package, TrendingUp, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="inicio" className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden bg-white">
      {/* Background ornaments */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              JMP MARKETPLACE PLATFORM
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] mb-6">
              A plataforma completa para criar, gerenciar e{" "}
              <span className="text-primary">escalar marketplaces</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              A JMP conecta vendedores, compradores e operações em uma experiência centralizada — pronta para empresas que querem estruturar seu próprio marketplace com agilidade e controle.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7 gap-2 shadow-lg shadow-primary/20"
                onClick={() => scrollTo("plataforma")}
              >
                Conhecer Plataforma <ArrowRight size={18} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-7 border-foreground/20 hover:bg-muted"
                onClick={() => scrollTo("contato")}
              >
                Falar com Especialista
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Multi-vendedor", "Gestão centralizada", "Pronta para escalar"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" /> {t}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-2xl bg-white border border-border shadow-2xl shadow-foreground/10 p-5 md:p-6">
              {/* Top bar */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                </div>
                <div className="text-xs text-muted-foreground font-medium">jmp.marketplace/dashboard</div>
                <div className="w-8" />
              </div>

              {/* KPI cards */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Vendas", value: "R$ 284k", icon: TrendingUp },
                  { label: "Vendedores", value: "1.248", icon: Store },
                  { label: "Pedidos", value: "9.412", icon: Package },
                ].map((k) => (
                  <div key={k.label} className="rounded-xl bg-muted p-3">
                    <k.icon size={16} className="text-primary mb-2" />
                    <div className="text-xs text-muted-foreground">{k.label}</div>
                    <div className="font-display font-bold text-foreground">{k.value}</div>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="rounded-xl bg-muted/70 p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-foreground">Performance</div>
                  <BarChart3 size={16} className="text-primary" />
                </div>
                <div className="flex items-end gap-1.5 h-24">
                  {[40, 65, 50, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-md bg-gradient-to-t from-primary/80 to-primary"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>

              {/* Seller cards */}
              <div className="space-y-2">
                {[
                  { name: "Loja Aurora", sales: "R$ 32.4k", growth: "+18%" },
                  { name: "Norte Store", sales: "R$ 28.1k", growth: "+12%" },
                ].map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-3 rounded-xl bg-muted/60">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
                        <Store size={16} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{s.name}</div>
                        <div className="text-xs text-muted-foreground">{s.sales} este mês</div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-primary">{s.growth}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating chips */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -left-4 md:-left-8 top-10 bg-white rounded-xl shadow-lg border border-border p-3 flex items-center gap-2 hidden sm:flex"
            >
              <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                <Users size={16} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Novos clientes</div>
                <div className="text-sm font-bold text-foreground">+412 hoje</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute -right-3 md:-right-6 bottom-16 bg-white rounded-xl shadow-lg border border-border p-3 flex items-center gap-2 hidden sm:flex"
            >
              <div className="w-9 h-9 rounded-lg bg-accent text-primary flex items-center justify-center">
                <ShoppingBag size={16} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Conversão</div>
                <div className="text-sm font-bold text-foreground">7,4%</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
