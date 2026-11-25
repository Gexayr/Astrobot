import React from 'react';
import { motion } from 'framer-motion';
import { Check, Shield } from 'lucide-react';
import { PreorderDialog } from './PreorderDialog';
import robotCta from '@/assets/images/robot-cta.webp';

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 glow-text">Get AstroBot Before It Sells Out</h2>
        </div>

        <div className="relative">
          {/* Background glow behind card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-primary/20 blur-[100px] -z-10 rounded-full" />

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-[2.5rem] p-8 md:p-12 border-primary/30 relative overflow-hidden flex flex-col md:flex-row gap-12 items-center"
          >
            {/* Left side pricing info */}
            <div className="flex-1 w-full relative z-10">
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary font-bold text-sm mb-6 border border-primary/30 uppercase tracking-widest">
                Early Bird Edition
              </div>
              
              <div className="mb-8">
                <span className="text-2xl text-white/50 line-through mr-4">$249</span>
                <span className="text-6xl font-display font-bold text-white">$199</span>
                <p className="text-primary font-medium mt-2">Save $50. Limited Time Offer</p>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  "AstroBot Robot Unit",
                  "USB-C Fast Charger",
                  "Developer Guide (PDF)",
                  "Mobile App (iOS & Android)",
                  "1-Year Global Warranty",
                  "Free Worldwide Shipping"
                ].map((item, i) => (
                  <li key={i} className="flex items-center text-white/80">
                    <Check className="w-5 h-5 text-primary mr-3 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <PreorderDialog>
                <button className="w-full py-5 rounded-2xl bg-primary text-primary-foreground font-bold text-xl hover:bg-primary/90 glow-blue transition-all transform hover:-translate-y-1" data-testid="button-checkout">
                  Reserve Yours Now →
                </button>
              </PreorderDialog>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/50">
                <Shield className="w-4 h-4" /> No payment now. Cancel your reservation anytime.
              </div>
            </div>

            {/* Right side Robot Image */}
            <div className="flex-1 relative w-full h-[400px] md:h-auto flex justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent rounded-full blur-3xl" />
              <img 
                src={robotCta} 
                alt="AstroBot AI robot toy"
                loading="lazy" 
                className="w-full max-w-[300px] md:max-w-md object-contain relative z-10 drop-shadow-2xl rounded-3xl [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
