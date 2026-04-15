import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

const IMG_URL = "https://baserow-backend-production20240528124524339000000001.s3.amazonaws.com/user_files/HewtYUgVTkk1s6JgIIxtcXoqEEOe2Nx1_cd5a739dc6be181d203a63724233cc6a192d4b8c3ad91a5e93801137effd9de4.png";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [tab, setTab] = useState<"login" | "cadastro">(location.pathname === "/cadastro" ? "cadastro" : "login");
  const [loading, setLoading] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginSenha, setLoginSenha] = useState("");
  const [loginErrors, setLoginErrors] = useState<Record<string, string>>({});

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
    <div className="min-h-screen flex" style={{ backgroundColor: "#f2f2f2" }}>
      {/* Left — Image */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8">
        <img src={IMG_URL} alt="JM PAY" className="max-w-full max-h-[85vh] object-contain rounded-2xl" />
      </div>

      {/* Right — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="JM PAY" className="h-10 w-auto cursor-pointer" onClick={() => navigate("/")} />
          </div>

          {/* Tab switcher */}
          <div className="flex rounded-lg bg-white/60 p-1 mb-8 shadow-sm">
            {(["login", "cadastro"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "flex-1 py-2.5 text-sm font-semibold rounded-md transition-all duration-300",
                  tab === t
                    ? "bg-gradient-to-br from-[hsl(26,100%,45%)] to-[hsl(42,97%,51%)] text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {t === "login" ? "Login" : "Cadastro"}
              </button>
            ))}
          </div>

          {/* Login */}
          <div
            className={cn(
              "transition-all duration-400 ease-out",
              tab === "login"
                ? "opacity-100 translate-x-0 h-auto"
                : "opacity-0 -translate-x-8 h-0 overflow-hidden pointer-events-none absolute"
            )}
          >
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <Label htmlFor="l-email" className="text-gray-700">E-mail</Label>
                <Input id="l-email" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="mt-1 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" />
                {loginErrors.email && <p className="text-sm text-destructive mt-1">{loginErrors.email}</p>}
              </div>
              <div>
                <Label htmlFor="l-senha" className="text-gray-700">Senha</Label>
                <Input id="l-senha" type="password" value={loginSenha} onChange={(e) => setLoginSenha(e.target.value)} className="mt-1 bg-white border-gray-200 text-gray-900" />
                {loginErrors.senha && <p className="text-sm text-destructive mt-1">{loginErrors.senha}</p>}
              </div>
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              Não tem conta?{" "}
              <button onClick={() => setTab("cadastro")} className="text-[hsl(26,100%,45%)] font-medium hover:underline">Criar conta</button>
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
            <form onSubmit={handleCadastro} className="space-y-4">
              <div>
                <Label htmlFor="c-nome" className="text-gray-700">Nome completo</Label>
                <Input id="c-nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} className="mt-1 bg-white border-gray-200 text-gray-900" />
                {cadErrors.nome && <p className="text-sm text-destructive mt-1">{cadErrors.nome}</p>}
              </div>
              <div>
                <Label htmlFor="c-doc" className="text-gray-700">CPF ou CNPJ</Label>
                <Input id="c-doc" value={form.documento} maxLength={18} onChange={(e) => setForm({ ...form, documento: maskCpfCnpj(e.target.value) })} className="mt-1 bg-white border-gray-200 text-gray-900" />
                {cadErrors.documento && <p className="text-sm text-destructive mt-1">{cadErrors.documento}</p>}
              </div>
              <div>
                <Label htmlFor="c-tel" className="text-gray-700">Telefone</Label>
                <Input id="c-tel" value={form.telefone} maxLength={15} onChange={(e) => setForm({ ...form, telefone: maskPhone(e.target.value) })} className="mt-1 bg-white border-gray-200 text-gray-900" />
                {cadErrors.telefone && <p className="text-sm text-destructive mt-1">{cadErrors.telefone}</p>}
              </div>
              <div>
                <Label htmlFor="c-dt" className="text-gray-700">Data de nascimento</Label>
                <Input id="c-dt" placeholder="DD/MM/AAAA" value={form.dataNascimento} maxLength={10} onChange={(e) => setForm({ ...form, dataNascimento: maskDate(e.target.value) })} className="mt-1 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400" />
                {cadErrors.dataNascimento && <p className="text-sm text-destructive mt-1">{cadErrors.dataNascimento}</p>}
              </div>
              <div>
                <Label htmlFor="c-email" className="text-gray-700">E-mail</Label>
                <Input id="c-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 bg-white border-gray-200 text-gray-900" />
                {cadErrors.email && <p className="text-sm text-destructive mt-1">{cadErrors.email}</p>}
              </div>
              <div>
                <Label htmlFor="c-senha" className="text-gray-700">Senha</Label>
                <Input id="c-senha" type="password" value={form.senha} onChange={(e) => setForm({ ...form, senha: e.target.value })} className="mt-1 bg-white border-gray-200 text-gray-900" />
                {cadErrors.senha && <p className="text-sm text-destructive mt-1">{cadErrors.senha}</p>}
              </div>
              <div className="flex items-start gap-2">
                <Checkbox id="c-lgpd" checked={lgpd} onCheckedChange={(v) => setLgpd(v === true)} className="mt-1" />
                <Label htmlFor="c-lgpd" className="text-xs text-gray-500 leading-snug">
                  Declaro que as informações fornecidas são de minha responsabilidade e autorizo a JM PAY a utilizá-las para manter contato, conforme a LGPD (Lei nº 13.709/2018).
                </Label>
              </div>
              {cadErrors.lgpd && <p className="text-sm text-destructive">{cadErrors.lgpd}</p>}
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              Já tem conta?{" "}
              <button onClick={() => setTab("login")} className="text-[hsl(26,100%,45%)] font-medium hover:underline">Fazer login</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
