import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

export default function Plataforma() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 gap-6">
      <img src={logo} alt="JM PAY" className="h-10 w-auto" />
      <h1 className="text-3xl font-bold text-foreground">Bem-vindo à plataforma JM PAY</h1>
      <p className="text-muted-foreground">Você está logado com sucesso.</p>
      <Button variant="outline" onClick={() => navigate("/")}>Voltar ao site</Button>
    </div>
  );
}