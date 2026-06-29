import React, { useState, useEffect } from "react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    // Client-side validation
    if (!formData.name || !formData.whatsapp || !formData.email || !formData.service || !formData.message) {
      setErrorMessage("Por favor, preencha todos os campos obrigatórios (*).");
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          whatsapp: formData.whatsapp,
          email: formData.email,
          company: formData.company,
          service: formData.service,
          budget: formData.budget,
          message: formData.message,
          origin: "Formulário de Orçamento (Portfólio)",
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

                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-sm">
                    <button
                      onClick={handleWhatsAppDirect}
                      className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <LucideIcon name="MessageSquare" size={18} />
                      <span>Falar no WhatsApp Agora</span>
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-bold rounded-xl border border-slate-800 transition-all cursor-pointer"
                    >
                      Enviar Nova Solicitação
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
                  {submitStatus === "error" && (
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
