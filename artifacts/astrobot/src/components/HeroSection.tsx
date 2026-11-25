import React from 'react';
import { motion } from 'framer-motion';
import { ParticleBackground } from './ParticleBackground';
import heroRobot from '@/assets/images/hero-robot.webp';
import { Play } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <ParticleBackground />
      
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Your Companion. Your Adventure.
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.05] font-display font-bold mb-6 glow-text">
              Meet Astro<span className="text-primary">Bot</span> <br className="hidden md:block"/>
              <span className="text-white/90">The AI Robot Toy That Comes to Life.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl leading-relaxed">
              More than a toy. AstroBot is an interactive, programmable AI robot for kids and makers. It walks, talks, dances, reacts to your voice, learns new tricks, and becomes your smartest companion.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-10">
              <a 
                href="#pricing"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:bg-primary/90 glow-blue transition-all flex items-center justify-center gap-2"
                data-testid="button-preorder-hero"
              >
                Pre-Order Now
              </a>
              <a 
                href="#video"
                className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-lg backdrop-blur-sm transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5" fill="currentColor" /> Watch Demo
              </a>
            </div>
            
            <div className="flex flex-col gap-4 w-full">
              <div className="flex items-center gap-2">
                <div className="flex text-primary text-sm">
                  ★★★★★
                </div>
                <span className="text-sm text-white/70">Loved by 10,000+ kids, makers, and robot enthusiasts.</span>
              </div>
              
              <div className="flex flex-wrap gap-3 mt-2">
                {["AI Powered", "Programmable", "Safe & Durable"].map((badge) => (
                  <div key={badge} className="px-3 py-1.5 rounded-md glass-card text-xs font-semibold text-white/80">
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:h-[800px] flex items-center justify-center"
          >
            {/* Glowing ring platform */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-[100px] bg-primary/30 rounded-[100%] blur-[30px] border-b-4 border-primary shadow-[0_0_80px_rgba(59,130,246,0.6)]" style={{ transform: "rotateX(70deg) translate(-50%, 0)" }} />
            
            <div className="relative z-10 w-full max-w-lg mx-auto transform hover:-translate-y-4 transition-transform duration-700">
              <img 
                src={heroRobot} 
                alt="AstroBot AI robot toy for kids standing" 
                className="w-full h-auto [mask-image:radial-gradient(closest-side,black_72%,transparent_100%)]"
                fetchPriority="high"
                width={1530}
                height={1600}
                data-testid="img-hero-robot"
              />
            </div>
            
            {/* Overlay halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full border border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] border border-primary/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
