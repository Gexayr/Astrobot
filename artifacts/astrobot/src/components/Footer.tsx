import React from 'react';
import { Link } from 'wouter';
import { NewsletterForm } from './NewsletterForm';
import { Bot, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer id="contact" className="bg-black border-t border-white/10 pt-20 pb-10 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight">
                Astro<span className="text-primary">Bot</span>
              </span>
            </a>
            <p className="text-white/50 text-sm mb-6 max-w-xs">
              Your companion. Your adventure. The world's smartest programmable AI robot toy.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/astrobot22/"
                target="_blank"
                rel="noopener"
                aria-label="AstroBot on Instagram"
                className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors text-sm"
              >
                <Instagram className="w-5 h-5" /> @astrobot22
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-white mb-6">Product</h4>
            <ul className="space-y-3">
              {['Features', 'Gallery', 'Specs', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-white/50 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Press Kit', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-white mb-6">Stay Updated</h4>
            <p className="text-white/50 text-sm mb-4">Get the latest news and OTA release notes.</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © 2026 AstroBot. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-white/40 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="text-white/40 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
