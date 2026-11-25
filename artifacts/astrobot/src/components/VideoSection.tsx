import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import robotWaving from '@/assets/images/robot-waving.webp';

export const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="video" className="py-24 relative z-10 bg-black/60">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">See AstroBot In Action</h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden glass-card border border-white/10 group cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          {isPlaying ? (
            <div className="absolute inset-0 bg-black flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full border-t-2 border-primary animate-spin mb-4" />
              <p className="text-white/70 font-medium">Loading demo video...</p>
            </div>
          ) : (
            <>
              {/* Thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img 
                src={robotWaving} 
                alt="AstroBot robot toy demo video" 
                loading="lazy"
                className="w-full h-full object-cover object-center opacity-70 group-hover:scale-105 transition-transform duration-1000"
              />
              
              {/* Play Button */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center backdrop-blur-md group-hover:bg-primary/40 group-hover:scale-110 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};
