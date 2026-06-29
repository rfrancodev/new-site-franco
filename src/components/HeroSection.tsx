import { motion } from "motion/react";
import { LucideIcon } from "./LucideIcon";
import { TiltCard } from "./TiltCard";
import content from "../content/content.json";
import backgroundHome from "../assets/images/background_home_1782697188806.jpg";

export function HeroSection() {
  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${content.site.whatsappNumber}?text=${encodeURIComponent(
      content.site.whatsappDefaultMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen pt-32 pb-20 flex items-center bg-slate-950 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(2, 6, 23, 0.85), rgba(2, 6, 23, 0.95)), url(${backgroundHome})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Ambient background glows for tech aesthetic */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-2/3 right-10 w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] bg-teal-500/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs sm:text-sm text-emerald-400 font-semibold mb-8 shadow-inner shadow-emerald-500/5 hover:border-emerald-500/20 transition-all"
        >
          <span>{content.hero.badge}</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1] font-display"
        >
          {content.hero.title.split(" ").map((word, index) => {
            // Give specific words a beautiful emerald gradient accent
            const isHighlight =
              word.toLowerCase().includes("inteligência") ||
              word.toLowerCase().includes("ia") ||
              word.toLowerCase().includes("modernos") ||
              word.toLowerCase().includes("artificial");
            return (
              <span key={index} className="inline-block">
                {isHighlight ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-teal-400 font-black">
                    {word}
                  </span>
                ) : (
                  word
                )}
                &nbsp;
              </span>
            );
          })}
        </motion.h1>

        {/* Subheadline / Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-6 text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          {content.hero.subtitle}
        </motion.p>

        {/* Call to Actions (CTAs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4"
        >
          <button
            onClick={() => handleScrollTo("contato")}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/35 transform hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
          >
            <LucideIcon name="Send" size={18} />
            <span>{content.hero.ctaPrimary}</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800/80 text-white font-bold rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
          >
            <LucideIcon name="MessageSquare" className="text-emerald-400" size={18} />
            <span>{content.hero.ctaSecondary}</span>
          </button>

          <button
            onClick={() => handleScrollTo("projetos")}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/30 hover:bg-slate-900/60 text-slate-300 hover:text-white font-bold rounded-xl border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-center space-x-2 text-base cursor-pointer"
          >
            <span>{content.hero.ctaTertiary}</span>
            <LucideIcon name="ArrowUpRight" size={18} className="text-slate-400" />
          </button>
        </motion.div>

        {/* 3D Perspective Card Layout representing dashboard and code block */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 w-full max-w-4xl px-4 select-none"
        >
          <TiltCard className="rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md overflow-hidden glow-emerald">
            {/* Window bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center space-x-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-xs font-mono text-slate-500">solutions_engine.py — Rafael Franco</span>
              <div className="w-12" />
            </div>

            {/* Simulated 3D dashboard layout */}
            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 text-left font-mono">
              {/* Code Panel */}
              <div className="md:col-span-7 bg-slate-950/60 p-4 rounded-xl border border-slate-900 text-xs sm:text-sm text-emerald-300 leading-relaxed overflow-x-auto">
                <div className="text-slate-500"># Inicializando agente de IA de atendimento</div>
                <div><span className="text-teal-400">from</span> google <span className="text-teal-400">import</span> genai</div>
                <div>ai = genai.GoogleGenAI(api_key=process.env.GEMINI_API_KEY)</div>
                <br />
                <div><span className="text-teal-400">class</span> <span className="text-indigo-400">SolucaoDigital</span>:</div>
                <div className="pl-4"><span className="text-teal-400">def</span> <span className="text-indigo-400">__init__</span>(self, cliente):</div>
                <div className="pl-8">self.cliente = cliente</div>
                <div className="pl-8">self.tecnologias = [<span className="text-amber-300">"React"</span>, <span className="text-amber-300">"IA"</span>, <span className="text-amber-300">"BI"</span>]</div>
                <br />
                <div className="pl-4"><span className="text-teal-400">def</span> <span className="text-indigo-400">otimizar_processo</span>(self):</div>
                <div className="pl-8">agente = ai.get_active_agent()</div>
                <div className="pl-8">self.status = <span className="text-amber-300">"Processo Automatizado ✅"</span></div>
                <div className="pl-8"><span className="text-teal-400">return</span> <span className="text-amber-300">"Eficiência Máxima Ativada"</span></div>
              </div>

              {/* Status/Metas Panel */}
              <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Processamento IA</div>
                    <div className="text-lg font-bold text-white mt-1">Ativo / Online</div>
                  </div>
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Performance de Vendas</div>
                  <div className="text-xl font-extrabold text-emerald-400 mt-1">+238.4%</div>
                  <div className="h-2 w-full bg-slate-900 rounded-full mt-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "84%" }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
                    />
                  </div>
                  <div className="text-[9px] text-slate-500 mt-1 flex justify-between">
                    <span>Meta: R$15k</span>
                    <span>Progresso: 84%</span>
                  </div>
                </div>

                <div className="bg-emerald-500/10 p-4 rounded-xl border border-emerald-500/20 text-emerald-400 flex items-center space-x-3 text-xs sm:text-sm">
                  <LucideIcon name="Sparkles" className="animate-pulse" size={18} />
                  <span>"Seus dados estruturados e processos rodando sozinhos."</span>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}
