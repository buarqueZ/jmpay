import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const navLinks = ["Soluções", "Infraestrutura", "Segurança", "Sobre", "FAQ"];

export function Header() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container-tight flex h-16 items-center justify-between">
        <img
          src={logo}
          alt="JM PAY"
          className="h-8 w-auto"
        />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="border-black/40 text-black hover:bg-black/10"
            onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
          >
            Solicitar apresentação
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => document.getElementById("contato")?.scrollIntoView({ behavior: "smooth" })}
          >
            Começar integração
          </Button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg px-6 py-6 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))}
              className="block text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </button>
          ))}
          <div className="flex flex-col gap-2 pt-4">
            <Button variant="outline" size="sm" className="border-black/40 text-black">
              Solicitar apresentação
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground">
              Começar integração
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
