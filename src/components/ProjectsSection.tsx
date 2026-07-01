import { motion } from "motion/react";
import { LucideIcon } from "./LucideIcon";
import { TiltCard } from "./TiltCard";
import content from "../content/content.json";

export function ProjectsSection() {
  const handleScrollToContact = () => {
    const element = document.getElementById("contato");
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <section id="projetos" className="py-24 bg-slate-900/40 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

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
            {content.projects.title.includes("impulsionar o crescimento") ? (
              <>
                {content.projects.title.split("impulsionar o crescimento")[0]}
                <span className="text-emerald-400 font-extrabold">impulsionar o crescimento</span>
                {content.projects.title.split("impulsionar o crescimento")[1]}
              </>
            ) : (
              content.projects.title
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            {content.projects.subtitle}
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {content.projects.items.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <TiltCard className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8 flex flex-col justify-between h-full hover:border-emerald-500/30 transition-all group overflow-hidden">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    {/* Category */}
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-slate-850 border border-slate-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono">
                        {project.category}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors font-display mb-6">
                      {project.title}
                    </h3>

                    {/* 💼 Impacto para o Negócio */}
                    <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-xl p-4 mb-5">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                        <span>💼 Impacto para o Negócio</span>
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed font-medium">
                        {project.businessImpact}
                      </p>
                    </div>

                    {/* 🎯 Desafio */}
                    <div className="mb-5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        <span>🎯 Desafio</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {project.challenge}
                      </p>
                    </div>

                    {/* 💡 Solução */}
                    <div className="mb-5">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                        <span>💡 Solução</span>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>

                    {/* 📈 Resultados */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                        <span>📈 Resultados</span>
                      </div>
                      <ul className="space-y-1.5">
                        {project.result.map((res, rIndex) => (
                          <li key={rIndex} className="text-sm text-slate-300 flex items-start gap-2 leading-relaxed">
                            <span className="text-emerald-400 font-bold flex-shrink-0">✓</span>
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer content: Technologies & CTA */}
                  <div className="mt-6 pt-4 border-t border-slate-800/60 space-y-4">
                    {/* 🛠 Tecnologias */}
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                        <span>🛠 Tecnologias</span>
                      </div>
                      <div className="text-sm font-mono text-emerald-400/90 leading-relaxed">
                        {project.technologies.join(" • ")}
                      </div>
                    </div>

                    {/* Action link */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Solução Concluída</span>
                      <button
                        onClick={handleScrollToContact}
                        className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer group-hover:translate-x-1 transform transition-transform"
                      >
                        <span>Solicitar Projeto</span>
                        <LucideIcon name="ArrowUpRight" size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
