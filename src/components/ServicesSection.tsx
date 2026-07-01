import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LucideIcon } from "./LucideIcon";
import content from "../content/content.json";
import { serviceDetails } from "../data/serviceDetails";

const serviceIdToFormValue: Record<string, string> = {
  "power-bi": "Dashboard Power BI",
  "automacao": "Automação de Processos",
  "sites": "Desenvolvimento de Site",
  "sistemas": "Sistema Web Sob Medida",
  "ia": "Inteligência Artificial",
  "vps": "Infraestrutura VPS",
  "consultoria": "Consultoria em Tecnologia",
};

export function ServicesSection() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedServiceId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedServiceId]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="servicos" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute bottom-10 left-10 w-[250px] h-[250px] bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />

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
            {content.services.title.includes("reduzir custos") && content.services.title.includes("acelerar o crescimento") ? (
              <>
                {content.services.title.split("reduzir custos")[0]}
                <span className="text-emerald-400 font-extrabold">reduzir custos</span>
                {content.services.title.split("reduzir custos")[1].split("acelerar o crescimento")[0]}
                <span className="text-emerald-400 font-extrabold">acelerar o crescimento</span>
                {content.services.title.split("acelerar o crescimento")[1]}
              </>
            ) : content.services.title === "Soluções completas para transformar processos em resultados" ? (
              <>
                Soluções completas para <span className="text-emerald-400 font-extrabold">transformar</span> processos em <span className="text-emerald-400 font-extrabold">resultados</span>
              </>
            ) : (
              content.services.title
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            {content.services.subtitle}
          </motion.p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {content.services.items.map((service, index) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelectedServiceId(service.id)}
              className="group p-6 sm:p-8 rounded-2xl border border-slate-900 bg-slate-900/30 hover:bg-slate-900/50 hover:border-emerald-500/20 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden cursor-pointer"
            >
              {/* Corner ambient glow on hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/0 group-hover:bg-emerald-500/5 rounded-full blur-2xl transition-all duration-300" />

              <div>
                {/* Icon wrapper */}
                <div className="h-12 w-12 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/20">
                  <LucideIcon name={service.icon} size={22} />
                </div>

                {/* Service Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors font-display">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                  {service.description}
                </p>
              </div>

              {/* Bullet feature or decorative micro indicator */}
              <div className="mt-8 pt-4 border-t border-slate-900 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-slate-400">
                <span>SOLUÇÃO DIGITAL</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-emerald-400 flex items-center gap-1">
                  Saiba mais <LucideIcon name="ArrowUpRight" size={12} />
                </span>
              </div>
            </motion.div>
          ))}
          
          {/* Custom "Outro" interactive card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            onClick={() => {
              const element = document.getElementById("contato");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="group p-6 sm:p-8 rounded-2xl border border-dashed border-slate-800 hover:border-emerald-500/40 bg-transparent flex flex-col justify-between h-full cursor-pointer transition-all duration-300 relative"
          >
            <div>
              <div className="h-12 w-12 rounded-xl bg-slate-900/50 border border-slate-800 text-emerald-400 flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:border-emerald-500/30">
                <LucideIcon name="HelpCircle" size={22} className="group-hover:animate-spin" />
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 font-display">
                Tem outra demanda?
              </h3>
              
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Precisa de um projeto que não está listado aqui? Desenvolvimento sob medida é a minha especialidade. Vamos desenhar uma solução ideal para o seu negócio!
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-dashed border-slate-800 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-emerald-400">
              <span>SOLICITAR CONSULTORIA</span>
              <span className="text-emerald-400 flex items-center gap-1">
                Fale comigo <LucideIcon name="ArrowUpRight" size={12} />
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Pop-up Details Modal */}
      <AnimatePresence>
        {selectedServiceId && serviceDetails[selectedServiceId] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-hidden"
            onClick={() => setSelectedServiceId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-slate-900/95 border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden relative shadow-2xl shadow-emerald-500/10 p-6 sm:p-10 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glow behind icon */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedServiceId(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-white p-2 hover:bg-slate-800/60 rounded-xl transition-all cursor-pointer z-10"
                aria-label="Fechar"
              >
                <LucideIcon name="X" size={20} />
              </button>

              {/* Header: Icon & Title */}
              <div className="flex items-start space-x-4 sm:space-x-5 relative z-10 shrink-0 pb-5 border-b border-slate-800/60">
                <div className="h-14 w-14 rounded-2xl bg-slate-950 border border-slate-800 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/5">
                  <LucideIcon name={serviceDetails[selectedServiceId].icon} size={28} />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest font-mono">
                    Detalhes do Serviço
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white font-display leading-tight pr-6">
                    {serviceDetails[selectedServiceId].title}
                  </h4>
                </div>
              </div>

              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 my-5 relative z-10 space-y-6 sm:space-y-8">
                {/* Main Details Paragraph */}
                <div>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
                    {serviceDetails[selectedServiceId].details}
                  </p>
                </div>

                {/* Applications / Examples Section */}
                <div className="pt-6 border-t border-slate-800/80">
                  <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest font-mono flex items-center gap-2 mb-6">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Exemplos de Aplicação Prática para Empresas
                  </h5>

                  <div className="space-y-4 sm:space-y-5">
                    {serviceDetails[selectedServiceId].applications.map((app, appIdx) => (
                      <div 
                        key={appIdx} 
                        className="flex items-start space-x-3.5 p-4 rounded-2xl bg-slate-950/40 border border-slate-950 hover:border-slate-800/50 transition-all duration-200"
                      >
                        <div className="h-6 w-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                          <LucideIcon name="Check" size={14} />
                        </div>
                        <div className="space-y-1">
                          <h6 className="text-sm font-bold text-white">
                            {app.title}
                          </h6>
                          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                            {app.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer CTA Section */}
              <div className="pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row gap-5 items-center justify-between relative z-10 shrink-0">
                <p className="text-xs text-slate-500 font-medium text-center sm:text-left hidden md:block max-w-[240px]">
                  Dúvidas? Entre em contato para conversarmos sobre seu projeto.
                </p>
                
                <div className="flex flex-col gap-2.5 w-full sm:w-64 shrink-0">
                  <button
                    onClick={() => {
                      const mappedService = serviceIdToFormValue[selectedServiceId] || "";
                      // Dispatch event to select service in form
                      window.dispatchEvent(new CustomEvent("select-service", { detail: mappedService }));
                      setSelectedServiceId(null);
                      // Scroll to form
                      setTimeout(() => {
                        const element = document.getElementById("contato");
                        element?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }}
                    className="w-full px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl text-sm flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/10 hover:shadow-xl hover:shadow-emerald-500/20 transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <span>Solicitar Orçamento</span>
                    <LucideIcon name="ArrowUpRight" size={16} />
                  </button>
                  
                  <button
                    onClick={() => setSelectedServiceId(null)}
                    className="w-full px-6 py-3 bg-slate-950 hover:bg-slate-900 hover:text-white text-slate-300 font-bold rounded-xl text-sm border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <span>Voltar</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
