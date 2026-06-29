import { motion } from "motion/react";
import { LucideIcon } from "./LucideIcon";
import content from "../content/content.json";

export function TestimonialsSection() {
  return (
    <section id="depoimentos" className="py-24 bg-slate-900/40 relative overflow-hidden">
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
            {content.testimonials.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-slate-400 leading-relaxed"
          >
            {content.testimonials.subtitle}
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.testimonials.items.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-slate-900/40 backdrop-blur-md relative flex flex-col justify-between"
            >
              {/* Giant quotation marks for styling */}
              <div className="absolute top-4 right-6 text-emerald-500/10 text-7xl font-serif select-none pointer-events-none">
                ”
              </div>

              <div>
                {/* Testimonial text */}
                <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed relative z-10">
                  "{item.text}"
                </p>
              </div>

              {/* Author profile block */}
              <div className="mt-8 flex items-center space-x-3.5 pt-4 border-t border-slate-800/40">
                {/* Simulated dynamic initials avatar */}
                <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm font-display">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white font-display">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
