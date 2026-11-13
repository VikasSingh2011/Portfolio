import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Download, 
  ArrowRight, 
  Mail, 
  MapPin, 
  Code, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Terminal, 
  ExternalLink 
} from 'lucide-react';
import { Github, Linkedin, TwitterX } from './icons/BrandIcons';
import confetti from 'canvas-confetti';

export default function Hero() {
  const { data, setIsResumeOpen } = usePortfolio();
  const { personal, socials } = data;

  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#06b6d4', '#ec4899']
    });
  };

  return (
    <section id="hero" className="relative min-h-[90vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern-light dark:bg-grid-pattern opacity-30 dark:opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Personal Branding & Details */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            {/* Status Pill Badge */}
            {personal.openToWork && (
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs font-mono text-slate-800 dark:text-zinc-200 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>{personal.statusText || 'Available for 2026 Full-Time Roles & Internships'}</span>
              </div>
            )}

            {/* Main Greeting & Name */}
            <div className="space-y-2.5">
              <h2 className="text-xs sm:text-sm font-mono font-medium text-slate-700 dark:text-zinc-300 tracking-wider uppercase">
                {personal.batch || 'B.Tech CSE • 2026 Batch'}
              </h2>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Hi, I'm {personal.name}
              </h1>
              <p className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-white pt-0.5">
                {personal.title}
              </p>
            </div>

            {/* Location & Introduction */}
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-600 dark:text-zinc-300">
                <MapPin className="w-4 h-4 text-slate-500 dark:text-zinc-400 flex-shrink-0" />
                <span>{personal.location}</span>
              </div>
              <p className="text-base sm:text-lg text-slate-800 dark:text-zinc-100 leading-relaxed">
                {personal.bio}
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              {/* Download / View Resume Button */}
              <button
                onClick={() => {
                  triggerConfetti();
                  setIsResumeOpen(true);
                }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </button>

              {/* View Projects Button */}
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm sm:text-base text-slate-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 shadow-sm transition-all duration-200"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
              </a>

              {/* Contact Me Button */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium text-sm sm:text-base text-slate-700 dark:text-zinc-300 bg-slate-100 hover:bg-slate-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Professional Social Links */}
            <div className="pt-3 flex flex-col items-center lg:items-start gap-2.5 w-full">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 dark:text-zinc-500">
                Connect & View Code Profiles:
              </span>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all"
                    title="GitHub Profile"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                {socials.leetcode && (
                  <a
                    href={socials.leetcode}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all font-mono text-xs font-bold"
                    title="LeetCode Profile"
                  >
                    <Code className="w-4 h-4" />
                  </a>
                )}
                {socials.geeksforgeeks && (
                  <a
                    href={socials.geeksforgeeks}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all font-mono text-xs font-bold"
                    title="GeeksforGeeks Profile"
                  >
                    GFG
                  </a>
                )}
                {socials.hackerrank && (
                  <a
                    href={socials.hackerrank}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all font-mono text-xs font-bold"
                    title="HackerRank Profile"
                  >
                    HR
                  </a>
                )}
                <a
                  href={`mailto:${personal.email}`}
                  className="p-2.5 rounded-xl bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-slate-200 dark:hover:bg-zinc-800 border border-slate-200 dark:border-zinc-800 transition-all"
                  title="Direct Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Photo Card with Interactive Metrics */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md">

              {/* Main Card */}
              <div className="relative glass-card rounded-2xl p-4 sm:p-5 shadow-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 overflow-hidden">
                
                {/* Profile Photo */}
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-200 dark:bg-zinc-800 mb-4 group border border-slate-200 dark:border-zinc-700/60">
                  <img
                    src={personal.avatar}
                    alt={personal.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="eager"
                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Vikas+Singh&size=400&background=18181b&color=fff'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                  {/* Corner Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-black/80 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10 text-xs">
                    <span className="text-white font-medium flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-zinc-400" />
                      <span>SDE / Full-Stack</span>
                    </span>
                    <span className="text-zinc-300 font-mono font-medium">2026 Batch</span>
                  </div>
                </div>

                {/* Metric Badges */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                    <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
                      {personal.yearsOfCoding || '3+ Yrs'}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                      Coding Exp
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                    <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
                      {personal.projectsCompleted || '15+'}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                      Projects
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800">
                    <div className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-mono">
                      {personal.problemsSolved || '250+'}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 dark:text-zinc-400 uppercase tracking-wider font-mono">
                      DSA Solved
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
