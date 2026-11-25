import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { Brain, Gamepad2, Code2, ShieldCheck } from 'lucide-react';

const features = [
  {
    icon: <Brain className="w-8 h-8 text-primary" />,
    title: "Smart AI Companion",
    points: [
      "Natural conversations",
      "Voice interaction",
      "Remembers commands",
      "Personality that grows"
    ]
  },
  {
    icon: <Gamepad2 className="w-8 h-8 text-primary" />,
    title: "Endless Fun",
    points: [
      "Dance modes",
      "Funny reactions",
      "Interactive games",
      "Music & animations"
    ]
  },
  {
    icon: <Code2 className="w-8 h-8 text-primary" />,
    title: "Programmable",
    points: [
      "Arduino compatible",
      "Custom behaviors",
      "Developer SDK",
      "Educational STEM"
    ]
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Safe & Durable",
    points: [
      "Child friendly",
      "Rechargeable battery",
      "Premium materials",
      "Replaceable parts"
    ]
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 relative z-10 bg-black/40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Why Everyone Loves AstroBot
          </motion.h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Packed with advanced technology, but designed for pure enjoyment. 
            AstroBot bridges the gap between sophisticated robotics and accessible fun.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="glass-card rounded-3xl p-8 glass-card-hover flex flex-col"
              data-testid={`card-feature-${index}`}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-bold mb-4">{feature.title}</h3>
              <ul className="space-y-3 mt-auto">
                {feature.points.map((point, i) => (
                  <li key={i} className="flex items-center text-white/70 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
