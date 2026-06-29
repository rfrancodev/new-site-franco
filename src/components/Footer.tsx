import { LucideIcon } from "./LucideIcon";
import content from "../content/content.json";
import logoImage from "../assets/images/logo_640_1782697170092.jpg";

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900/80 pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <button
              onClick={handleScrollTop}
              className="flex items-center group cursor-pointer"
            >
              <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900 shadow-md shadow-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300 flex items-center justify-center">
                <img
                  src={logoImage}
                  alt="Logo"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              </div>
            </button>
            <p className="text-sm text-slate-500 font-medium">
              {content.footer.text.split(" | ")[1]}
            </p>
            <p className="text-xs text-slate-600 max-w-sm leading-relaxed">
              {content.footer.disclaimer}
            </p>
          </div>

          {/* Navigation Links Col */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
              Navegação Rápida
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {content.navbar.links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-slate-500 hover:text-emerald-400 hover:translate-x-1 transform transition-all text-left py-1.5 cursor-pointer font-medium"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Socials & Actions Col */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">
              Redes & Contatos
            </h4>
            <div className="flex space-x-3.5">
              <a
                href="https://linkedin.com/in/rafa-franco"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 flex items-center justify-center transition-all"
                aria-label="LinkedIn Profile"
              >
                <LucideIcon name="Linkedin" size={18} />
              </a>
              <a
                href="https://github.com/rfrancodev"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 flex items-center justify-center transition-all"
                aria-label="GitHub Profile"
              >
                <LucideIcon name="Github" size={18} />
              </a>
            </div>
            
            <button
              onClick={handleScrollTop}
              className="text-xs font-bold text-slate-600 hover:text-emerald-400 flex items-center gap-1 cursor-pointer pt-4"
            >
              <span>Voltar ao topo</span>
              <LucideIcon name="ArrowUpRight" size={12} />
            </button>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-600">
          <div>{content.footer.copyright}</div>
          <div>Desenvolvido por Rafael Franco • 2026</div>
        </div>

      </div>
    </footer>
  );
}
