import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingBag, Store, Tag, Users, Package, Sparkles, CheckCircle2 } from "lucide-react";

export function HeroSection() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="inicio" className="relative pt-28 md:pt-36 pb-20 md:pb-28 overflow-hidden bg-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              JMP MARKETPLACE
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] mb-6">
              O marketplace que conecta pessoas, lojas e{" "}
              <span className="text-primary">oportunidades</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              A JMP reúne uma curadoria de vendedores e categorias em um só lugar. Um ambiente confiável para comprar com praticidade e para vender com mais visibilidade.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-7 gap-2 shadow-lg shadow-primary/20"
                onClick={() => scrollTo("sobre")}
              >
                Conhecer a JMP <ArrowRight size={18} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-7 border-foreground/20 hover:bg-muted"
                onClick={() => scrollTo("contato")}
              >
                Falar com a JMP
              </Button>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              {["Curadoria de lojas", "Categorias variadas", "Compra confiável"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-primary" /> {t}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Marketplace mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="relative rounded-2xl bg-white border border-border shadow-2xl shadow-foreground/10 p-5 md:p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-foreground/15" />
                </div>
                <div className="text-xs text-muted-foreground font-medium">jmp.marketplace</div>
                <div className="w-8" />
              </div>

              {/* Search bar */}
              <div className="flex items-center gap-2 rounded-full bg-muted px-4 py-2.5 mb-5">
                <Sparkles size={14} className="text-primary" />
                <span className="text-sm text-muted-foreground">Buscar no marketplace</span>
              </div>

              {/* Category chips */}
              <div className="flex flex-wrap gap-2 mb-5">
                {["Moda", "Casa", "Tech", "Beleza", "Esporte"].map((c, i) => (
                  <span
                    key={c}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      i === 0 ? "bg-primary text-primary-foreground" : "bg-muted text-foreground/70"
                    }`}
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { name: "Item Aurora", price: "R$ 189", tag: "Novo" },
                  { name: "Item Atlas", price: "R$ 249", tag: "Top" },
                  { name: "Item Vita", price: "R$ 129", tag: "-20%" },
                ].map((p) => (
                  <div key={p.name} className="rounded-xl bg-muted/60 p-3">
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/30 to-primary/10 mb-2 flex items-center justify-center">
                      <Package size={22} className="text-primary" />
                    </div>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] font-bold text-primary uppercase">{p.tag}</span>
                    </div>
                    <div className="text-xs font-semibold text-foreground truncate">{p.name}</div>
                    <div className="text-xs text-muted-foreground">{p.price}</div>
                  </div>
                ))}
              </div>

              {/* Featured store */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <Store size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Loja em destaque</div>
                    <div className="text-xs text-muted-foreground">Avaliação 4.9 · 320 produtos</div>
                  </div>
                </div>
                <Tag size={16} className="text-primary" />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -left-4 md:-left-8 top-10 bg-white rounded-xl shadow-lg border border-border p-3 items-center gap-2 hidden sm:flex"
            >
              <div className="w-9 h-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                <Users size={16} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Compradores ativos</div>
                <div className="text-sm font-bold text-foreground">+120 mil</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="absolute -right-3 md:-right-6 bottom-16 bg-white rounded-xl shadow-lg border border-border p-3 items-center gap-2 hidden sm:flex"
            >
              <div className="w-9 h-9 rounded-lg bg-accent text-primary flex items-center justify-center">
                <ShoppingBag size={16} />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Lojas parceiras</div>
                <div className="text-sm font-bold text-foreground">+1.2 mil</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
