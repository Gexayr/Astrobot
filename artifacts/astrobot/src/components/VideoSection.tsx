import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import demoVideo from '@/assets/video/astrobot-demo.mp4';
import videoPoster from '@/assets/images/video-poster.webp';

export const VideoSection = () => {
  // The <video> is mounted only after the click, so the 12 MB file is not downloaded until requested.
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
          className="relative max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden glass-card border border-white/10 group"
        >
          {isPlaying ? (
            <video
              src={demoVideo}
              poster={videoPoster}
              autoPlay
              controls
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full bg-black object-contain"
            >
              Your browser does not support HTML5 video.
            </video>
          ) : (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 w-full h-full cursor-pointer"
              aria-label="Play AstroBot demo video"
              data-testid="button-play-video"
            >
              {/* Thumbnail */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent z-10" />
              <img
                src={videoPoster}
                alt="AstroBot robot toy demo video"
                loading="lazy"
                width={1280}
                height={720}
                className="w-full h-full object-cover object-center opacity-80 group-hover:scale-105 transition-transform duration-1000"
              />

              {/* Play Button */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center backdrop-blur-md group-hover:bg-primary/40 group-hover:scale-110 transition-all duration-300">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.6)]">
                    <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
              <span className="absolute bottom-5 right-6 z-20 text-xs font-semibold text-white/70 bg-black/40 rounded-full px-3 py-1 backdrop-blur-sm">
                0:30
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
};
