import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

function maskCpfCnpj(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 11) {
    return digits
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return digits
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 10) {
    return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  }
  return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

function maskDate(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 8);
  return digits
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2");
}

export default function Cadastro() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    documento: "",
    telefone: "",
    dataNascimento: "",
    email: "",
    senha: "",
  });
  const [lgpd, setLgpd] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.nome.trim()) e.nome = "Nome é obrigatório";
    const docDigits = form.documento.replace(/\D/g, "");
    if (docDigits.length !== 11 && docDigits.length !== 14) e.documento = "CPF ou CNPJ inválido";
    const phoneDigits = form.telefone.replace(/\D/g, "");
    if (phoneDigits.length < 10) e.telefone = "Telefone inválido";
    const dateDigits = form.dataNascimento.replace(/\D/g, "");
    if (dateDigits.length !== 8) e.dataNascimento = "Data inválida";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "E-mail inválido";
    if (form.senha.length < 6) e.senha = "Senha deve ter pelo menos 6 caracteres";
    if (!lgpd) e.lgpd = "Você precisa aceitar os termos";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await fetch("https://auto.zendry.com/webhook/cadastrojmpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          documento: form.documento,
          telefone: form.telefone,
          dataNascimento: form.dataNascimento,
          email: form.email,
          senha: form.senha,
        }),
      });
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Agora faça login para acessar a plataforma.",
      });
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      toast({ title: "Erro ao cadastrar", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-3">
          <img src={logo} alt="JM PAY" className="h-10 w-auto" />
          <h1 className="text-2xl font-bold text-foreground">Criar conta</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome completo</Label>
            <Input id="nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
            {errors.nome && <p className="text-sm text-destructive mt-1">{errors.nome}</p>}
          </div>

          <div>
            <Label htmlFor="documento">CPF ou CNPJ</Label>
            <Input
              id="documento"
              value={form.documento}
              maxLength={18}
              onChange={(e) => setForm({ ...form, documento: maskCpfCnpj(e.target.value) })}
            />
            {errors.documento && <p className="text-sm text-destructive mt-1">{errors.documento}</p>}
          </div>

          <div>
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={form.telefone}
              maxLength={15}
              onChange={(e) => setForm({ ...form, telefone: maskPhone(e.target.value) })}
            />
            {errors.telefone && <p className="text-sm text-destructive mt-1">{errors.telefone}</p>}
          </div>

          <div>
            <Label htmlFor="dataNascimento">Data de nascimento</Label>
            <Input
              id="dataNascimento"
              placeholder="DD/MM/AAAA"
              value={form.dataNascimento}
              maxLength={10}
              onChange={(e) => setForm({ ...form, dataNascimento: maskDate(e.target.value) })}
            />
            {errors.dataNascimento && <p className="text-sm text-destructive mt-1">{errors.dataNascimento}</p>}
          </div>

          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
          </div>

          <div>
            <Label htmlFor="senha">Senha</Label>
            <Input id="senha" type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} />
            {errors.senha && <p className="text-sm text-destructive mt-1">{errors.senha}</p>}
          </div>

          <div className="flex items-start gap-2">
            <Checkbox id="lgpd" checked={lgpd} onCheckedChange={(v) => setLgpd(v === true)} className="mt-1" />
            <Label htmlFor="lgpd" className="text-xs text-muted-foreground leading-snug">
              Declaro que as informações fornecidas são de minha responsabilidade e autorizo a JM PAY a utilizá-las para manter contato, conforme a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </Label>
          </div>
          {errors.lgpd && <p className="text-sm text-destructive">{errors.lgpd}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link to="/login" className="text-primary hover:underline">Fazer login</Link>
        </p>
      </div>
    </div>
  );
}