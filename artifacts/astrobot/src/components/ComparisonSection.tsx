import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Minus } from 'lucide-react';

export const ComparisonSection = () => {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">AstroBot vs Traditional Toys</h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-3xl overflow-hidden"
        >
          <div className="grid grid-cols-3 bg-white/5 p-6 border-b border-white/10">
            <div className="font-bold text-lg text-white/70">Feature</div>
            <div className="font-display font-bold text-xl text-primary text-center">AstroBot</div>
            <div className="font-bold text-lg text-white/50 text-center">Generic Robot</div>
          </div>

          {[
            { label: "Interactive Personality", a: true, b: false },
            { label: "Programmable SDK", a: true, b: false },
            { label: "Voice Control", a: true, b: false },
            { label: "AI Powered", a: true, b: false },
            { label: "Autonomous Movement", a: true, b: "partial" },
            { label: "OTA Updates", a: true, b: false },
            { label: "Custom Behaviors", a: true, b: false },
            { label: "Rechargeable Battery", a: true, b: "partial" },
          ].map((row, i) => (
            <div key={i} className={`grid grid-cols-3 p-6 ${i !== 7 ? 'border-b border-white/5' : ''} hover:bg-white/5 transition-colors`}>
              <div className="text-white/90 font-medium flex items-center">{row.label}</div>
              
              {/* AstroBot Column */}
              <div className="flex justify-center items-center">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" strokeWidth={3} />
                </div>
              </div>

              {/* Generic Column */}
              <div className="flex justify-center items-center">
                {row.b === true ? (
                  <Check className="w-5 h-5 text-white/30" />
                ) : row.b === "partial" ? (
                  <Minus className="w-5 h-5 text-white/50" />
                ) : (
                  <X className="w-5 h-5 text-white/30" />
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
