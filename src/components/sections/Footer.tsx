import logo from "@/assets/logo.png";

const links = {
  Marketplace: ["Sobre a JMP", "Categorias", "Como Funciona", "Diferenciais"],
  Institucional: ["Quem somos", "Contato", "Trabalhe conosco"],
  Legal: ["Termos de uso", "Política de privacidade"],
};

export function Footer() {
  return (
    <footer className="bg-foreground text-white pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <img src={logo} alt="JMP" className="h-9 w-auto brightness-0 invert" />
            <p className="text-sm text-white/60 mt-4 leading-relaxed">
              JMP Marketplace — um espaço para conectar marcas, lojas e pessoas em uma experiência única.
            </p>
            <p className="text-xs text-white/40 mt-4">contato@jmp.marketplace</p>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-white mb-4">{title}</h4>
              <ul className="space-y-2">
                {items.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-white/60 hover:text-primary transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} JMP Marketplace · Todos os direitos reservados</p>
          <p className="text-xs text-white/40">Plataforma institucional · dados fictícios para demonstração</p>
        </div>
      </div>
    </footer>
  );
}
