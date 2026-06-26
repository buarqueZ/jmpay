import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const navLinks: { label: string; id: string }[] = [
  { label: "Início", id: "inicio" },
  { label: "Plataforma", id: "plataforma" },
  { label: "Funcionalidades", id: "funcionalidades" },
  { label: "Benefícios", id: "beneficios" },
  { label: "Como Funciona", id: "como-funciona" },
  { label: "Contato", id: "contato" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md border-b border-border" : "bg-white/60 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex h-16 md:h-20 items-center justify-between">
        <button onClick={() => scrollTo("inicio")} className="flex items-center gap-2">
          <img src={logo} alt="JMP" className="h-8 md:h-9 w-auto" />
        </button>

        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-foreground hover:bg-muted"
            onClick={() => navigate("/infos")}
          >
            Entrar
          </Button>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm rounded-full px-5"
            onClick={() => scrollTo("contato")}
          >
            Solicitar Demonstração
          </Button>
        </div>

        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-border px-6 py-6 space-y-3">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className="block w-full text-left text-sm font-medium text-foreground/80 hover:text-primary py-1"
            >
              {l.label}
            </button>
          ))}
          <div className="flex flex-col gap-2 pt-3 border-t border-border">
            <Button variant="outline" size="sm" onClick={() => { setOpen(false); navigate("/infos"); }}>
              Entrar
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground" onClick={() => scrollTo("contato")}>
              Solicitar Demonstração
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
