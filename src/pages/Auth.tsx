import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

function maskCpfCnpj(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 11) {
    return digits.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }
  return digits.replace(/(\d{2})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1/$2").replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

function maskPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length <= 10) return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{4})(\d)/, "$1-$2");
  return digits.replace(/(\d{2})(\d)/, "($1) $2").replace(/(\d{5})(\d)/, "$1-$2");
}

function maskDate(value: string) {
  return value.replace(/\D/g, "").slice(0, 8).replace(/(\d{2})(\d)/, "$1/$2").replace(/(\d{2})(\d)/, "$1/$2");
}

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<"login" | "cadastro">("login");
  const [loading, setLoading] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});

  // Cadastro state
  const [form, setForm] = useState({ nome: "", documento: "", telefone: "", dataNascimento: "", email: "", senha: "" });
  const [lgpd, setLgpd] = useState(false);
  const [cadErrors, setCadErrors] = useState<Record<string, string>>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail)) errs.email = "E-mail inválido";
    if (!loginSenha) errs.senha = "Senha é obrigatória";
    setLoginErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const res = await fetch("https://auto.zendry.com/webhook/loginjmpay", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail, senha: loginSenha }), signal: controller.signal,
      });
      clearTimeout(timeout);
      const text = (await res.text()).trim().toLowerCase();
      if (text === "sim") {
        toast({ title: "Login realizado com sucesso!" });
        navigate("/plataforma");
      } else {
        toast({ title: "Dados inválidos", description: "Não encontramos esses dados na nossa base.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erro de conexão", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.nome.trim()) errs.nome = "Nome é obrigatório";
    const docDigits = form.documento.replace(/\D/g, "");
    if (docDigits.length !== 11 && docDigits.length !== 14) errs.documento = "CPF ou CNPJ inválido";
    if (form.telefone.replace(/\D/g, "").length < 10) errs.telefone = "Telefone inválido";
    if (form.dataNascimento.replace(/\D/g, "").length !== 8) errs.dataNascimento = "Data inválida";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "E-mail inválido";
    if (form.senha.length < 6) errs.senha = "Mínimo 6 caracteres";
    if (!lgpd) errs.lgpd = "Aceite os termos";
    setCadErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      await fetch("https://auto.zendry.com/webhook/cadastrojmpay", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      toast({ title: "Cadastro realizado!", description: "Faça login para continuar." });
      setTab("login");
      setLoginEmail(form.email);
    } catch {
      toast({ title: "Erro ao cadastrar", description: "Tente novamente.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-background rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex flex-col items-center pt-8 pb-4 gap-3">
          <img src={logo} alt="JM PAY" className="h-10 w-auto cursor-pointer" onClick={() => navigate("/")} />
        </div>

        {/* Tab switcher */}
        <div className="flex mx-6 mb-6 rounded-lg bg-muted p-1">
          {(["login", "cadastro"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300",
                tab === t ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {t === "login" ? "Login" : "Cadastro"}
            </button>
          ))}
        </div>

        {/* Card content with animation */}
        <div className="relative px-6 pb-8 overflow-hidden">
          {/* Login */}
          <div
            className={cn(
              "transition-all duration-400 ease-out",
              tab === "login"
                ? "opacity-100 translate-x-0 h-auto"
                : "opacity-0 -translate-x-8 h-0 overflow-hidden pointer-events-none absolute"
            )}
          >
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="l-email">E-mail</Label>
                <Input id="l-email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                {loginErrors.email && <p className="text-sm text-destructive mt-1">{loginErrors.email}</p>}
              </div>
              <div>
                <Label htmlFor="l-senha">Senha</Label>
                <Input id="l-senha" type="password" value={loginSenha} onChange={(e) => setLoginSenha(e.target.value)} />
                {loginErrors.senha && <p className="text-sm text-destructive mt-1">{loginErrors.senha}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Não tem conta?{" "}
              <button onClick={() => setTab("cadastro")} className="text-primary hover:underline">Criar conta</button>
            </p>
          </div>

          {/* Cadastro */}
          <div
            className={cn(
              "transition-all duration-400 ease-out",
              tab === "cadastro"
                ? "opacity-100 translate-x-0 h-auto"
                : "opacity-0 translate-x-8 h-0 overflow-hidden pointer-events-none absolute"
            )}
          >
            <form onSubmit={handleCadastro} className="space-y-3">
              <div>
                <Label htmlFor="c-nome">Nome completo</Label>
                <Input id="c-nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />
                {cadErrors.nome && <p className="text-sm text-destructive mt-1">{cadErrors.nome}</p>}
              </div>
              <div>
                <Label htmlFor="c-doc">CPF ou CNPJ</Label>
                <Input id="c-doc" value={form.documento} maxLength={18} onChange={(e) => setForm({ ...form, documento: maskCpfCnpj(e.target.value) })} />
                {cadErrors.documento && <p className="text-sm text-destructive mt-1">{cadErrors.documento}</p>}
              </div>
              <div>
                <Label htmlFor="c-tel">Telefone</Label>
                <Input id="c-tel" value={form.telefone} maxLength={15} onChange={(e) => setForm({ ...form, telefone: maskPhone(e.target.value) })} />
                {cadErrors.telefone && <p className="text-sm text-destructive mt-1">{cadErrors.telefone}</p>}
              </div>
              <div>
                <Label htmlFor="c-dt">Data de nascimento</Label>
                <Input id="c-dt" placeholder="DD/MM/AAAA" value={form.dataNascimento} maxLength={10} onChange={(e) => setForm({ ...form, dataNascimento: maskDate(e.target.value) })} />
                {cadErrors.dataNascimento && <p className="text-sm text-destructive mt-1">{cadErrors.dataNascimento}</p>}
              </div>
              <div>
                <Label htmlFor="c-email">E-mail</Label>
                <Input id="c-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                {cadErrors.email && <p className="text-sm text-destructive mt-1">{cadErrors.email}</p>}
              </div>
              <div>
                <Label htmlFor="c-senha">Senha</Label>
                <Input id="c-senha" type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} />
                {cadErrors.senha && <p className="text-sm text-destructive mt-1">{cadErrors.senha}</p>}
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="c-lgpd" checked={lgpd} onCheckedChange={(v) => setLgpd(v === true)} className="mt-1" />
                <Label htmlFor="c-lgpd" className="text-xs text-muted-foreground leading-snug">
                  Declaro que as informações fornecidas são de minha responsabilidade e autorizo a JM PAY a utilizá-las para manter contato, conforme a LGPD (Lei nº 13.709/2018).
                </Label>
              </div>
              {cadErrors.lgpd && <p className="text-sm text-destructive">{cadErrors.lgpd}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Já tem conta?{" "}
              <button onClick={() => setTab("login")} className="text-primary hover:underline">Fazer login</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}