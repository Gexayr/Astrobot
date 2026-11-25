import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "How long does the battery last?",
    a: "Up to 4 hours of continuous play. Charges in about 2 hours via the included USB-C cable."
  },
  {
    q: "Can I program it myself?",
    a: "Yes! AstroBot is fully Arduino compatible and ships with a comprehensive developer SDK and documentation."
  },
  {
    q: "Is it safe for children?",
    a: "Absolutely. AstroBot is made with child-safe ABS plastic, has no sharp edges, and meets all international toy safety standards."
  },
  {
    q: "Does it work offline?",
    a: "Yes. Core movement and pre-programmed features work completely offline. WiFi is only required for advanced voice AI processing and OTA software updates."
  },
  {
    q: "How do software updates work?",
    a: "Over-the-Air (OTA) updates are pushed wirelessly through the companion iOS/Android app. Just tap update."
  },
  {
    q: "Can I build custom accessories?",
    a: "Yes! We publish open-source hardware specifications and 3D models so makers can design and 3D print custom attachments."
  }
];

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative z-10 bg-black/40">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glass-card rounded-2xl overflow-hidden"
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="font-semibold text-lg text-white/90">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-5 text-white/60 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
