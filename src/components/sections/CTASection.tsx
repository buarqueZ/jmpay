import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Send, CheckCircle2 } from "lucide-react";
import { z } from "zod";

const WEBHOOK_URL = "https://auto.zendry.com/webhook/3deea560-a7fc-43ab-accc-d3c9fab2f3a0";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(8, "Telefone inválido").max(20),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

export function CTASection() {
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactForm, string>>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactForm, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactForm;
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setSending(true);
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setForm({ name: "", email: "", phone: "", message: "" });
      }, 5000);
    } catch {
      // silently handle
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contato" className="relative section-padding">
      <div className="container-tight relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: CTA text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              A infraestrutura certa transforma pagamentos em{" "}
              <span className="text-primary">vantagem competitiva</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Fale com o time da JM PAY e veja como centralizar recebimentos, repasses e automação financeira em uma única operação.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => document.getElementById("contato-form")?.focus()}
              >
                Começar integração <ArrowRight size={18} />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-border text-foreground hover:bg-muted"
                onClick={() => document.getElementById("contato-form")?.focus()}
              >
                Solicitar apresentação
              </Button>
            </div>
          </motion.div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-lg">
              <h3 className="text-xl font-bold text-foreground mb-1">Fale com nosso time</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Preencha o formulário e entraremos em contato em breve.
              </p>

              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-4 py-12 text-center"
                  >
                    <CheckCircle2 size={48} className="text-primary" />
                    <h4 className="text-2xl font-bold text-foreground">Mensagem enviada!</h4>
                    <p className="text-muted-foreground">
                      Recebemos sua mensagem e logo entraremos em contato.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4"
                  >
                    <div className="space-y-1.5">
                      <Label htmlFor="contato-form" className="text-foreground">Nome</Label>
                      <Input
                        id="contato-form"
                        placeholder="Seu nome completo"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className="bg-muted/50 border-border"
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-foreground">E-mail</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="bg-muted/50 border-border"
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone" className="text-foreground">Telefone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="bg-muted/50 border-border"
                      />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-foreground">Mensagem</Label>
                      <Textarea
                        id="message"
                        placeholder="Escreva sua mensagem..."
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        className="bg-muted/50 border-border min-h-[100px]"
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={sending}
                      className="w-full gap-2"
                    >
                      {sending ? "Enviando..." : "Enviar mensagem"} <Send size={18} />
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
