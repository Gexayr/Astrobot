import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Terminal, MonitorSmartphone, GraduationCap, Home, Users, Gamepad, Gift } from 'lucide-react';

const cases = [
  { icon: <BookOpen />, title: "Learning Robotics", desc: "Understand mechanics and motion control." },
  { icon: <Terminal />, title: "Programming", desc: "Write C++ or Python to control behaviors." },
  { icon: <MonitorSmartphone />, title: "Desk Companion", desc: "Alerts you to notifications playfully." },
  { icon: <GraduationCap />, title: "STEM Education", desc: "Perfect for classrooms and workshops." },
  { icon: <Home />, title: "Home Assistant", desc: "Controls smart home devices via voice." },
  { icon: <Users />, title: "Fun with Family", desc: "Interactive games that involve everyone." },
  { icon: <Gamepad />, title: "Gaming Companion", desc: "Reacts to your gameplay in real-time." },
  { icon: <Gift />, title: "Perfect Gift", desc: "An unforgettable unboxing experience." },
];

export const UseCasesSection = () => {
  return (
    <section className="py-24 relative z-10 bg-black/40">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Fits Into Every Corner of Your Life</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cases.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl text-center glass-card-hover group"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
