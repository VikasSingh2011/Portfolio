import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Mail, Heart, Lock } from 'lucide-react';
import { Github, Linkedin } from './icons/BrandIcons';

export default function Footer() {
  const { data, setIsAdminOpen } = usePortfolio();
  const { personal, socials } = data;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-md py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Brand info */}
          <div className="flex flex-col items-center md:items-start space-y-1">
            <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
              {personal.name}
            </span>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
              B.Tech Computer Science & Engineering (2026 Batch)
            </p>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-400 text-center font-mono">
            <span>&copy; {new Date().getFullYear()} {personal.name}. All rights reserved.</span>
          </div>

          {/* Socials & Back to Top */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {socials.github && (
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-black dark:hover:text-white transition-colors"
                  title="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {socials.linkedin && (
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-500 hover:text-blue-500 transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              <a
                href={`mailto:${personal.email}`}
                className="p-2 rounded-lg text-slate-500 hover:text-black dark:hover:text-white transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shadow-sm"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>

            {/* Admin CMS Trigger */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="p-2.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-400 hover:text-black dark:hover:text-white transition-colors"
              title="Admin Portal"
            >
              <Lock className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>
    </footer>
  );
}
