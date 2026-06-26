import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle2, Mail } from "lucide-react";
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
      /* noop */
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contato" className="relative py-24 md:py-32 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="rounded-3xl bg-foreground text-white overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-0">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-10 md:p-14 lg:p-16 relative overflow-hidden"
            >
              
              <div className="relative">
                <span className="text-xs font-semibold tracking-widest text-primary uppercase">
                  Fale com a JMP
                </span>
                <h2 className="font-display text-3xl md:text-5xl font-bold mt-3 mb-5 leading-tight">
                  Quer fazer parte do marketplace{" "}
                  <span className="text-primary">JMP?</span>
                </h2>
                <p className="text-white/70 text-lg leading-relaxed mb-8">
                  Seja você comprador, lojista ou parceiro — conte para a gente como podemos te ajudar. Nosso time responde em breve.
                </p>

                <div className="flex items-center gap-3 text-sm text-white/80">
                  <Mail size={18} className="text-primary" />
                  contato@jmp.marketplace
                </div>
              </div>
            </motion.div>

            {/* Right form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white text-foreground p-8 md:p-12 lg:p-14"
            >
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-12 h-full"
                  >
                    <CheckCircle2 size={56} className="text-primary mb-4" />
                    <h3 className="font-display text-2xl font-bold mb-2">Mensagem enviada!</h3>
                    <p className="text-muted-foreground">Em breve nosso time entrará em contato.</p>
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
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        placeholder="Seu nome completo"
                        value={form.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                      />
                      {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email">E-mail corporativo</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="voce@empresa.com"
                        value={form.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                      />
                      {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Telefone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                      />
                      {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message">Sua mensagem</Label>
                      <Textarea
                        id="message"
                        placeholder="Como podemos te ajudar?"
                        value={form.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        className="min-h-[110px]"
                      />
                      {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={sending}
                      className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
                    >
                      {sending ? "Enviando..." : "Enviar mensagem"} <Send size={16} />
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
