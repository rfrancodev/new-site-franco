import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LucideIcon } from "./LucideIcon";
import content from "../content/content.json";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    _honeypot: "", // Honeypot field for bot protection
  });

  useEffect(() => {
    const handleSelectService = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setFormData((prev) => ({ ...prev, service: customEvent.detail }));
      }
    };
    window.addEventListener("select-service", handleSelectService);
    return () => {
      window.removeEventListener("select-service", handleSelectService);
    };
  }, []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(3);

  const formatWhatsApp = (value: string) => {
    // Remove all non-digits
    const clean = value.replace(/\D/g, "");
    
    // Format based on length: (XX) XXXXX-XXXX or (XX) XXXX-XXXX
    if (clean.length === 0) return "";
    if (clean.length <= 2) return `(${clean}`;
    if (clean.length <= 6) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    if (clean.length <= 10) return `(${clean.slice(0, 2)}) ${clean.slice(2, 6)}-${clean.slice(6)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "whatsapp") {
      const formatted = formatWhatsApp(value);
      setFormData((prev) => ({ ...prev, [name]: formatted }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceSelect = (val: string) => {
    setFormData((prev) => ({ ...prev, service: val }));
  };

  const handleBudgetSelect = (val: string) => {
    setFormData((prev) => ({ ...prev, budget: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check honeypot first
    if (formData._honeypot) {
      console.log("Spam bot detected!");
      setSubmitStatus("success"); // Silently ignore spam bots, pretending to succeed
      return;
    }

    // Client-side validation: 1. Field presence
    if (!formData.name.trim() || !formData.whatsapp.trim() || !formData.email.trim() || !formData.service || !formData.message.trim()) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios (*).");
      return;
    }

    // Client-side validation: 2. Name validation
    if (formData.name.trim().length < 3) {
      setErrorMessage("Por favor, insira seu nome completo ou pelo menos 3 caracteres.");
      return;
    }

    // Client-side validation: 3. Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage("Por favor, insira um e-mail válido (exemplo: nome@empresa.com.br).");
      return;
    }

    // Client-side validation: 4. WhatsApp length check (including DDD)
    const cleanPhone = formData.whatsapp.replace(/\D/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      setErrorMessage("Por favor, insira um WhatsApp válido com DDD (exemplo: (11) 99999-9999).");
      return;
    }

    // Client-side validation: 5. Message length validation
    if (formData.message.trim().length < 10) {
      setErrorMessage("Por favor, detalhe seu projeto ou necessidade com pelo menos 10 caracteres.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const apiBaseUrl = import.meta.env.VITE_API_URL || "";
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          whatsapp: formData.whatsapp.trim(),
          email: formData.email.trim().toLowerCase(),
          company: formData.company.trim(),
          service: formData.service,
          budget: formData.budget,
          message: formData.message.trim(),
          origin: "Formulário de Orçamento - site Franco Desenvolvedor",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus("success");
      } else {
        setErrorMessage(result.error || content.contact.form.errorText);
        setSubmitStatus("error");
      }
    } catch (err) {
      console.error("Erro ao enviar formulário:", err);
      setErrorMessage("Não foi possível conectar ao servidor. Verifique sua conexão ou fale pelo WhatsApp.");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      whatsapp: "",
      company: "",
      service: "",
      budget: "",
      message: "",
      _honeypot: "",
    });
    setSubmitStatus("idle");
    setErrorMessage("");
  };

  const handleWhatsAppDirect = () => {
    const name = formData.name || "Interessado";
    const service = formData.service || "Solução Digital";
    const customText = `Olá Rafael! Meu nome é ${name}. Gostaria de solicitar um orçamento para: ${service}.`;
    const url = `https://wa.me/${content.site.whatsappNumber}?text=${encodeURIComponent(customText)}`;
    window.open(url, "_blank");
  };

  const getWhatsAppFallbackUrl = useCallback(() => {
    const name = formData.name.trim() || "Interessado";
    const service = formData.service || "Solução Digital";
    const email = formData.email.trim() || "Não informado";
    const phone = formData.whatsapp.trim() || "Não informado";
    const company = formData.company.trim() || "Não informada";
    const budget = formData.budget || "Não informado";
    const message = formData.message.trim() || "Sem mensagem adicional";

    const customText = `Olá Rafael! O envio do formulário pelo site apresentou uma instabilidade na automação, então estou enviando os dados diretamente por aqui:

*Nome:* ${name}
*WhatsApp:* ${phone}
*E-mail:* ${email}
*Empresa:* ${company}
*Serviço:* ${service}
*Orçamento:* ${budget}

*Mensagem:* ${message}`;

    return `https://wa.me/${content.site.whatsappNumber}?text=${encodeURIComponent(customText)}`;
  }, [formData]);

  const handleWhatsAppFallback = useCallback(() => {
    const url = getWhatsAppFallbackUrl();
    const isIframe = window.self !== window.top;
    
    // Tenta abrir em nova aba primeiro (preferência do usuário)
    const newWindow = window.open(url, "_blank");
    
    // Se window.open falhar (bloqueador de popups do navegador ou restrições de iframe):
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      if (!isIframe) {
        // Se NÃO estiver em iframe, o redirecionamento direto por window.location.href é 100% confiável e nunca bloqueado.
        window.location.href = url;
      } else {
        // Se estiver em iframe, evitamos acessar diretamente window.top.location para não disparar erro de segurança (cross-origin).
        // Em vez disso, tentamos abrir via clique programático em elemento link temporário com target="_blank".
        // Caso o navegador bloqueie por falta de interação do usuário, o link amigável já estará renderizado na tela.
        try {
          const link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (e) {
          console.error("Erro ao simular clique no iframe:", e);
        }
      }
    }
  }, [getWhatsAppFallbackUrl]);

  // 1. Efeito para controlar o decremento do timer de forma pura
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (submitStatus === "error") {
      setCountdown(3);
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [submitStatus]);

  // 2. Efeito separado para disparar o redirecionamento quando o countdown chega a exatamente 0
  useEffect(() => {
    if (submitStatus === "error" && countdown === 0) {
      handleWhatsAppFallback();
    }
  }, [countdown, submitStatus, handleWhatsAppFallback]);

  return (
    <section id="contato" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[250px] h-[250px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-display"
          >
            {content.contact.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            {content.contact.subtitle}
          </motion.p>
        </div>

        {/* Contact Form Layout */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="bg-slate-900/30 rounded-3xl border border-slate-900 p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden"
          >
            {/* Honeypot field (hidden from screen readers & users but accessible by bots) */}
            <input
              type="text"
              name="_honeypot"
              value={formData._honeypot}
              onChange={handleChange}
              className="hidden"
              autoComplete="off"
              style={{ display: "none" }}
            />

            <AnimatePresence mode="wait">
              {submitStatus === "success" ? (
                /* Success Message Panel */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 flex flex-col items-center"
                >
                  <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 animate-bounce">
                    <LucideIcon name="Check" size={40} />
                  </div>
                  
                  <h3 className="text-2xl font-black text-white font-display">
                    {content.contact.form.successTitle}
                  </h3>
                  
                  <p className="mt-4 text-slate-300 max-w-md mx-auto leading-relaxed text-sm sm:text-base">
                    {content.contact.form.successText.replace("{name}", formData.name)}
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer whitespace-nowrap shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/20 transform hover:-translate-y-0.5"
                    >
                      <LucideIcon name="MessageSquare" size={18} />
                      <span>Falar no WhatsApp Agora</span>
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-bold rounded-xl border border-slate-800 transition-all cursor-pointer whitespace-nowrap transform hover:-translate-y-0.5"
                    >
                      Enviar Nova Solicitação
                    </button>
                  </div>
                </motion.div>
              ) : submitStatus === "error" ? (
                /* Error/Fallback Message Panel with Auto-Redirect */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 flex flex-col items-center"
                >
                  <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6 relative">
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-500/10 border-t-emerald-400 animate-spin" />
                    <span className="text-xl font-black font-display text-emerald-400">{countdown}s</span>
                  </div>
                  
                  <h3 className="text-2xl font-black text-white font-display max-w-md mx-auto leading-tight">
                    Sua mensagem será redirecionada automaticamente em {countdown}s
                  </h3>
                  
                  <p className="mt-4 text-slate-300 max-w-lg mx-auto leading-relaxed text-sm sm:text-base">
                    Detectamos uma instabilidade temporária em nossa integração automática pelo site.
                    <br />
                    <span className="text-emerald-400 font-bold">Mas seus dados já estão salvos e prontos para envio!</span>
                  </p>

                  {/* Elegant link helper if countdown reaches 0 and redirection was blocked by browser pop-up blocker */}
                  {countdown === 0 && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 text-sm text-emerald-400 max-w-md mx-auto bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 leading-relaxed"
                    >
                      Se a página do WhatsApp não abriu automaticamente devido ao bloqueador de pop-ups do seu navegador,{" "}
                      <a
                        href={getWhatsAppFallbackUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline font-black text-emerald-300 hover:text-emerald-200 transition-colors inline-flex items-center gap-1"
                      >
                        clique aqui para iniciar a conversa <LucideIcon name="MessageSquare" size={14} />
                      </a>
                    </motion.p>
                  )}

                  <div className="mt-8 flex justify-center w-full max-w-sm">
                    <button
                      onClick={() => setSubmitStatus("idle")}
                      className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-bold rounded-xl border border-slate-800 transition-all cursor-pointer"
                    >
                      Voltar e Tentar Novamente
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Main Form Panel */
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                        {content.contact.form.nameLabel} <span className="text-emerald-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                          <LucideIcon name="User" size={16} />
                        </span>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder={content.contact.form.namePlaceholder}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-600 transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div className="space-y-2">
                      <label htmlFor="whatsapp" className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                        {content.contact.form.phoneLabel} <span className="text-emerald-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                          <LucideIcon name="Phone" size={16} />
                        </span>
                        <input
                          id="whatsapp"
                          type="tel"
                          name="whatsapp"
                          required
                          value={formData.whatsapp}
                          onChange={handleChange}
                          placeholder={content.contact.form.phonePlaceholder}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-600 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                        {content.contact.form.emailLabel} <span className="text-emerald-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                          <LucideIcon name="Mail" size={16} />
                        </span>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={content.contact.form.emailPlaceholder}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-600 transition-all duration-200"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                        {content.contact.form.companyLabel}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                          <LucideIcon name="Building2" size={16} />
                        </span>
                        <input
                          id="company"
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder={content.contact.form.companyPlaceholder}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-600 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Service select dropdown */}
                    <div className="space-y-2">
                      <label htmlFor="service" className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                        {content.contact.form.serviceLabel} <span className="text-emerald-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                          <LucideIcon name="LayoutGrid" size={16} />
                        </span>
                        <select
                          id="service"
                          name="service"
                          required
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="" disabled className="bg-slate-900 text-slate-500">
                            {content.contact.form.servicePlaceholder}
                          </option>
                          {content.contact.form.services.map((svc) => (
                            <option key={svc} value={svc} className="bg-slate-900 text-white">
                              {svc}
                            </option>
                          ))}
                        </select>
                        <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 pointer-events-none">
                          <LucideIcon name="ChevronDown" size={16} />
                        </span>
                      </div>
                    </div>

                    {/* Budget select dropdown */}
                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                        {content.contact.form.budgetLabel}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 pointer-events-none">
                          <LucideIcon name="DollarSign" size={16} />
                        </span>
                        <select
                          id="budget"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white transition-all duration-200 appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-slate-900 text-slate-500">
                            {content.contact.form.budgetPlaceholder}
                          </option>
                          {content.contact.form.budgets.map((bdg) => (
                            <option key={bdg} value={bdg} className="bg-slate-900 text-white">
                              {bdg}
                            </option>
                          ))}
                        </select>
                        <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 pointer-events-none">
                          <LucideIcon name="ChevronDown" size={16} />
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Message details */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
                      {content.contact.form.messageLabel} <span className="text-emerald-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={content.contact.form.messagePlaceholder}
                      className="w-full px-4 py-3.5 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white placeholder-slate-600 transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Error Notification inside panel */}
                  {errorMessage && submitStatus === "idle" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm flex items-start space-x-2.5"
                    >
                      <span className="mt-0.5"><LucideIcon name="HelpCircle" size={16} /></span>
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 text-slate-950 disabled:text-slate-500 font-black rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/20 transform hover:-translate-y-0.5 cursor-pointer disabled:transform-none disabled:shadow-none"
                    >
                      {isSubmitting ? (
                        <>
                          <LucideIcon name="Loader2" className="animate-spin" size={18} />
                          <span>{content.contact.form.submittingButton}</span>
                        </>
                      ) : (
                        <>
                          <LucideIcon name="Send" size={18} />
                          <span>{content.contact.form.submitButton}</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Floating WhatsApp Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={handleWhatsAppDirect}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="h-14 w-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 flex items-center justify-center shadow-2xl shadow-emerald-500/30 border border-emerald-400/20 cursor-pointer relative group transition-all duration-300"
          aria-label="Falar no WhatsApp"
        >
          {/* Pulsating outline ring */}
          <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping pointer-events-none" />
          
          <LucideIcon name="MessageSquare" size={26} />

          {/* Tooltip on hover */}
          <span className="absolute right-16 scale-0 group-hover:scale-100 bg-slate-900 border border-slate-800 text-white font-bold text-xs py-2 px-3.5 rounded-xl whitespace-nowrap shadow-xl transition-all duration-200 origin-right">
            Dúvidas? Fale direto no WhatsApp! 💬
          </span>
        </motion.button>
      </div>
    </section>
  );
}
