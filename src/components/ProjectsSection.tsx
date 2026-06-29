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
            {content.projects.title.includes("gerar resultados") ? (
              <>
                {content.projects.title.split("gerar resultados")[0]}
                <span className="text-emerald-400 font-extrabold">gerar resultados</span>
                {content.projects.title.split("gerar resultados")[1]}
              </>
            ) : content.projects.title.includes("gerar resultado") ? (
              <>
                {content.projects.title.split("gerar resultado")[0]}
                <span className="text-emerald-400 font-extrabold">gerar resultado</span>
                {content.projects.title.split("gerar resultado")[1]}
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
                <div>
                  {/* Category and Metric */}
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-slate-850 border border-slate-800 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-mono">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold font-mono">
                      <LucideIcon name="Award" className="inline-block" size={12} />
                      <span>{project.metric}</span>
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors font-display">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tech Badges and CTA */}
                <div className="mt-8 space-y-6">
                  {/* Tech stack tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-900 text-slate-400 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Divider and link */}
                  <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500">SOLUÇÃO CORPORATIVA</span>
                    <button
                      onClick={handleScrollToContact}
                      className="text-xs sm:text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors cursor-pointer group-hover:translate-x-1 transform transition-transform"
                    >
                      <span>Solicitar Projeto</span>
                      <LucideIcon name="ArrowUpRight" size={14} />
                    </button>
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
