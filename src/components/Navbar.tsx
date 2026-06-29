import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LucideIcon } from "./LucideIcon";
import content from "../content/content.json";
import logoImage from "../assets/images/logo_640_1782697170092.jpg";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll detection for background blur effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Detect active section
      const sections = content.navbar.links.map((link) => link.id);
      const scrollPosition = window.scrollY + 120; // offset

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of navbar
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

  // WhatsApp redirection
  const handleWhatsAppClick = () => {
    const url = `https://wa.me/${content.site.whatsappNumber}?text=${encodeURIComponent(
      content.site.whatsappDefaultMessage
    )}`;
    window.open(url, "_blank");
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-900/80 py-4 shadow-lg shadow-slate-950/20"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center group cursor-pointer"
          >
            <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900 shadow-md shadow-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300 flex items-center justify-center">
              <img
                src={logoImage}
                alt="Logo"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {content.navbar.links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors cursor-pointer rounded-lg hover:text-white ${
                  activeSection === link.id ? "text-emerald-400 font-semibold" : "text-slate-400"
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-emerald-500 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <button
              onClick={handleWhatsAppClick}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-sm rounded-xl flex items-center space-x-2 transition-all duration-300 shadow-md shadow-emerald-500/20 hover:shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <LucideIcon name="MessageSquare" size={16} />
              <span>{content.navbar.cta}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-900 border border-slate-800 rounded-xl transition-all cursor-pointer"
            aria-label="Abrir Menu"
          >
            <LucideIcon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Slide-out Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop blur overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm md:hidden"
            />

            {/* Drawer Body */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-50 bg-slate-900 border-l border-slate-800 p-6 flex flex-col justify-between md:hidden shadow-2xl"
            >
              <div className="space-y-8">
                {/* Header of Drawer */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-white">Menu</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 rounded-lg border border-slate-700/50 cursor-pointer"
                  >
                    <LucideIcon name="X" size={18} />
                  </button>
                </div>

                {/* Links */}
                <nav className="flex flex-col space-y-3">
                  {content.navbar.links.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => scrollToSection(link.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all flex items-center justify-between cursor-pointer ${
                        activeSection === link.id
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold"
                          : "text-slate-300 hover:bg-slate-800/50 border border-transparent"
                      }`}
                    >
                      <span>{link.label}</span>
                      <LucideIcon
                        name="ArrowUpRight"
                        className={`transition-transform duration-200 ${
                          activeSection === link.id ? "text-emerald-400 translate-x-0.5" : "text-slate-500"
                        }`}
                        size={16}
                      />
                    </button>
                  ))}
                </nav>
              </div>

              {/* Bottom CTA in Drawer */}
              <div className="space-y-4">
                <div className="h-px bg-slate-800" />
                <button
                  onClick={handleWhatsAppClick}
                  className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
                >
                  <LucideIcon name="MessageSquare" size={18} />
                  <span>{content.navbar.cta}</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
