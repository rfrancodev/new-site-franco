import { motion } from "motion/react";
import { LucideIcon } from "./LucideIcon";
import content from "../content/content.json";
import sobreDeveloper from "../assets/images/sobre_developer_1782697203091.jpeg";

export function AboutSection() {
  return (
    <section id="sobre" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-10 w-[250px] h-[250px] bg-emerald-500/5 rounded-full blur-[90px] pointer-events-none" />

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
            {content.about.title === "Tecnologia aplicada para impulsionar negócios" ? (
              <>
                Tecnologia aplicada para <span className="text-emerald-400 font-extrabold">impulsionar negócios</span>
              </>
            ) : (
              content.about.title
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            {content.about.subtitle}
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Biography Text & Skills (Left side on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-8 text-slate-300 text-base sm:text-lg leading-relaxed"
          >
            <div>
              <div className="border-l-4 border-emerald-500 pl-4 mb-6">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                  {content.about.name}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-emerald-400 mt-1">
                  {content.about.role}
                </p>
              </div>

              <div className="space-y-4 text-slate-400 text-sm sm:text-base">
                {content.about.story.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Skills Grid Categories (balanced inside left column with 2-column sub-grid) */}
            <div className="pt-4">
              <div className="bg-slate-900/30 rounded-2xl border border-slate-900/80 p-6 sm:p-8 glow-teal">
                <h4 className="text-lg font-bold text-white mb-6 flex items-center space-x-2 font-display">
                  <LucideIcon name="Sparkles" className="text-emerald-400" size={18} />
                  <span>{content.about.skillsTitle}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {content.about.skills.map((category) => (
                    <div key={category.category} className="space-y-3">
                      <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-mono">
                        {category.category}
                      </h5>
                      
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-300 hover:text-emerald-400 border border-slate-900 hover:border-emerald-500/20 transition-all duration-200 text-xs font-medium flex items-center space-x-1.5"
                          >
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            <span>{skill}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Elements (Portrait) */}
          <div className="lg:col-span-5 w-full">
            
            {/* Professional Portrait Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/40 p-3 shadow-xl glow-emerald group"
            >
              <div className="relative rounded-xl overflow-hidden aspect-square">
                <img
                  src={sobreDeveloper}
                  alt={content.about.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300" />
                
                {/* Floating experience tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md border border-slate-800 p-3.5 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold font-mono">Disponibilidade</p>
                    <p className="text-xs font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Projetos Selecionados
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-500 uppercase tracking-widest font-extrabold font-mono">Experiência</p>
                    <p className="text-xs font-bold text-white mt-0.5">Especialista</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
