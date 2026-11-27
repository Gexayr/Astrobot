import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';
import thumb1 from '@/assets/images/thumb-1.webp';
import thumb2 from '@/assets/images/thumb-2.webp';
import thumb3 from '@/assets/images/thumb-3.webp';
import thumb4 from '@/assets/images/thumb-4.webp';
import thumb5 from '@/assets/images/thumb-5.webp';
import thumb6 from '@/assets/images/thumb-6.webp';
import robotWaving from '@/assets/images/robot-waving.webp';

const galleryImages = [
  { src: thumb1, alt: 'AstroBot standing, front view' },
  { src: thumb2, alt: 'AstroBot in the lab' },
  { src: thumb3, alt: 'AstroBot in the electronics workshop' },
  { src: thumb4, alt: 'AstroBot on the workbench' },
  { src: thumb5, alt: 'AstroBot greeting with open hands' },
  { src: thumb6, alt: 'AstroBot at the repair bench' },
];

export const GallerySection = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Meet AstroBot Up Close</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative aspect-square rounded-2xl overflow-hidden glass-card group cursor-pointer"
                onClick={() => setSelectedImage(img.src)}
              >
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                  <ZoomIn className="w-8 h-8 text-white" />
                </div>
                <img 
                  src={img.src} 
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </motion.div>
            ))}
          </div>

          {/* Featured Large Image */}
          <div
            className="lg:col-span-1 glass-card rounded-3xl flex items-center justify-center relative overflow-hidden group cursor-pointer min-h-[320px]"
            onClick={() => setSelectedImage(robotWaving)}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img 
              src={robotWaving}
              alt="AstroBot waving hello"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-[30%_center] transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 rounded-full p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="AstroBot robot toy, enlarged view"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
