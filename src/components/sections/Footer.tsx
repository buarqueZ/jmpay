import logo from "@/assets/logo.png";

const footerLinks = {
  "Soluções": ["PIX", "Cartões", "Split", "Automação", "Dashboard"],
  "Empresa": ["Sobre", "Infraestrutura", "Segurança", "FAQ", "Contato"],
  "Legal": ["Termos de uso", "Política de privacidade", "Compliance"],
};

const cnpj = "37.993.872/0001-08";

export function Footer() {
  return (
    <footer className="relative py-16 bg-black">
      <div className="container-tight relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <img
              src={logo}
              alt="JM PAY"
              className="h-10 w-auto brightness-0 invert"
            />
            <p className="text-sm text-gray-400 mt-3 leading-relaxed">
              Infraestrutura de pagamentos para empresas que precisam crescer com estabilidade, segurança e controle.
            </p>
            <p className="text-xs text-gray-500 mt-4">CNPJ: {cnpj}</p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-white mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © 2025 JM PAY · Todos os direitos reservados
          </p>
          <p className="text-xs text-gray-500">
            Infraestrutura de pagamentos para empresas que operam em escala
          </p>
        </div>
      </div>
    </footer>
  );
}
