import React from 'react';
import { motion } from 'framer-motion';

export const CTASection = () => {
  return (
    <section className="py-32 relative z-10 overflow-hidden border-t border-white/10">
      {/* Background gradient & particles */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/10" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 glow-text">Bring AstroBot Home Today</h2>
          <p className="text-xl text-white/70 mb-10 leading-relaxed">
            Join thousands of future owners and experience the next generation of interactive robotics. The future is waiting.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#pricing"
              className="w-full sm:w-auto px-10 py-5 rounded-full bg-primary text-primary-foreground font-bold text-xl hover:bg-primary/90 glow-blue transition-all"
            >
              Pre-Order Now
            </a>
            <a 
              href="#contact"
              className="w-full sm:w-auto px-10 py-5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-xl backdrop-blur-sm transition-all"
            >
              Contact Sales
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
