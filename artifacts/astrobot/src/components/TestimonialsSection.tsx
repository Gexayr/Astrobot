import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote: "My son plays with AstroBot every single day. It's become his best friend and completely replaced his iPad time.",
    author: "Sarah M.",
    role: "Parent"
  },
  {
    quote: "It feels alive. The way it reacts to my voice and learns my routine is genuinely magical. Worth every penny.",
    author: "Jake T.",
    role: "Robotics Enthusiast"
  },
  {
    quote: "Best robotics project I've ever owned. The SDK is incredibly clean and writing custom Arduino scripts is a breeze.",
    author: "Maya K.",
    role: "Developer"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-24 relative z-10 bg-black/40 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">What People Are Saying</h2>
        </div>

        <div className="flex overflow-x-auto pb-8 -mx-6 px-6 md:mx-0 md:px-0 md:grid md:grid-cols-3 gap-6 snap-x snap-mandatory hide-scrollbar">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-8 rounded-3xl min-w-[300px] snap-center flex flex-col"
            >
              <div className="flex gap-1 text-primary mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5" fill="currentColor" />
                ))}
              </div>
              <p className="text-lg text-white/90 leading-relaxed mb-8 flex-grow">
                "{t.quote}"
              </p>
              <div>
                <div className="font-bold text-white">{t.author}</div>
                <div className="text-sm text-white/50">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
};
