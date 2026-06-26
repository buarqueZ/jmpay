import { motion } from "framer-motion";
import {
  Shirt, Home, Smartphone, Sparkles, Dumbbell, Baby, Utensils, Gem,
} from "lucide-react";

const categories = [
  { icon: Shirt, title: "Moda e Acessórios", text: "Roupas, calçados e acessórios para todos os estilos." },
  { icon: Home, title: "Casa e Decoração", text: "Tudo para deixar seu lar com a sua cara." },
  { icon: Smartphone, title: "Tecnologia", text: "Eletrônicos, gadgets e novidades em tech." },
  { icon: Sparkles, title: "Beleza e Bem-estar", text: "Cuidado pessoal, perfumaria e cosméticos." },
  { icon: Dumbbell, title: "Esporte e Lazer", text: "Equipamentos e roupas para sua rotina ativa." },
  { icon: Baby, title: "Bebê e Infantil", text: "Tudo para os pequenos com segurança e carinho." },
  { icon: Utensils, title: "Alimentos e Bebidas", text: "Marcas selecionadas para o seu dia a dia." },
  { icon: Gem, title: "Joias e Presentes", text: "Itens especiais para datas que importam." },
];

export function FeaturesSection() {
  return (
    <section id="categorias" className="relative py-24 md:py-32 bg-muted/40">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-primary uppercase">Categorias</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-3 mb-5">
            Variedade que cabe na sua <span className="text-primary">rotina</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Categorias amplas para você encontrar, em um só lugar, marcas e produtos para diferentes momentos.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.07 }}
              className="group rounded-2xl bg-white border border-border p-6 hover:border-primary/50 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center mb-4 group-hover:bg-primary transition-colors">
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
