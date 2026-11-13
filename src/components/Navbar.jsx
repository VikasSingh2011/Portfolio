import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Lock, 
  Unlock, 
  FileText, 
  ExternalLink,
  Code2,
  Sparkles
} from 'lucide-react';

export default function Navbar() {
  const { 
    data, 
    darkMode, 
    toggleDarkMode, 
    setIsAdminOpen, 
    isAdminAuthenticated,
    setIsResumeOpen 
  } = usePortfolio();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', show: data.sectionVisibility.about },
    { name: 'Experience', href: '#experience', show: data.sectionVisibility.experience },
    { name: 'Projects', href: '#projects', show: data.sectionVisibility.projects },
    { name: 'Skills', href: '#skills', show: data.sectionVisibility.skills },
    { name: 'Profiles', href: '#profiles', show: data.sectionVisibility.codingProfiles },
    { name: 'Services', href: '#services', show: data.sectionVisibility.services },
    { 
      name: 'Creative Studio', 
      href: '#creative', 
      show: data.sectionVisibility.creative && data.creativeStudio?.enabled 
    },
    { name: 'Resume', href: '#resume', show: data.sectionVisibility.resume },
    { name: 'Contact', href: '#contact', show: data.sectionVisibility.contact },
  ].filter(link => link.show);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/85 dark:bg-dark-bg/85 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800/80 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a 
            href="#hero" 
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-slate-400 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-bold text-base font-mono shadow-sm">
              {data.personal.name ? data.personal.name.charAt(0) : 'V'}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base tracking-tight">
                {data.personal.name || 'Vikas Singh'}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
                2026 Batch CSE
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 bg-slate-100/90 dark:bg-zinc-900/90 p-1.5 rounded-full border border-slate-200 dark:border-zinc-800 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs xl:text-sm font-medium text-slate-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons: Resume, Dark Mode, Admin Button */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Quick Resume Button */}
            <button
              onClick={() => setIsResumeOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-white border border-slate-800 dark:border-zinc-700 transition-all"
              title="View & Download Resume"
            >
              <FileText className="w-3.5 h-3.5 text-zinc-400" />
              <span>Resume</span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all duration-200"
              aria-label="Toggle Theme"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 hover:-rotate-12 transition-transform" />
              )}
            </button>

            {/* Admin Dashboard Trigger */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className={`p-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-200 border ${
                isAdminAuthenticated
                  ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/20'
                  : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:text-black dark:hover:text-white'
              }`}
              title="Admin CMS Dashboard (Edit Portfolio)"
            >
              {isAdminAuthenticated ? (
                <Unlock className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4 text-slate-400 dark:text-zinc-400" />
              )}
              <span className="hidden md:inline font-mono text-xs">CMS</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-zinc-800 shadow-2xl py-5 px-6 animate-fadeIn">
          <nav className="flex flex-col space-y-2.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResumeOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-slate-900 text-white dark:bg-white dark:text-black shadow-sm"
              >
                <FileText className="w-4 h-4" />
                <span>View Resume</span>
              </button>
              
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsAdminOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Edit Site (Admin)</span>
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
