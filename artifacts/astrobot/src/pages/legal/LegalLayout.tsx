import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Bot } from 'lucide-react';
import { LEGAL } from '@/lib/legal';

export const LegalLayout = ({ title, children }: { title: string; children: React.ReactNode }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = `${title} | ${LEGAL.siteName}`;
    return () => {
      document.title = prev;
    };
  }, [title]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-white/10 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-lg">
              Astro<span className="text-primary">Bot</span>
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to site
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 py-16 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-3">{title}</h1>
        <p className="text-white/50 text-sm mb-12">Last updated: {LEGAL.lastUpdated}</p>
        <article className="legal-prose">{children}</article>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="container mx-auto px-6 md:px-12 flex flex-col sm:flex-row gap-4 justify-between text-sm text-white/40">
          <span>© 2026 {LEGAL.companyName}. All rights reserved.</span>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
