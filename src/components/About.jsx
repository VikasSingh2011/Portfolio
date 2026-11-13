import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import {
  GraduationCap,
  Target,
  Compass,
  Sparkles,
  CheckCircle,
  BookOpen,
  Cpu,
  Layers
} from 'lucide-react';

export default function About() {
  const { data } = usePortfolio();
  const { about, personal } = data;

  if (!data.sectionVisibility.about) return null;

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-white text-xs font-mono border border-slate-200 dark:border-zinc-800">
            <BookOpen className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-300" />
            <span>About</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Engineering Mindset & Background
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-zinc-300">
            A comprehensive look into my academic journey, core competencies, and engineering focus.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Story & Career Goals */}
          <div className="lg:col-span-7 space-y-6">

            {/* Story Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-slate-900 dark:text-white" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  My Engineering Journey
                </h3>
              </div>
              <div className="text-slate-800 dark:text-zinc-200 leading-relaxed space-y-4 whitespace-pre-line text-sm sm:text-base">
                {about.story}
              </div>
            </div>

            {/* Career Goals Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-4 shadow-sm border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5 text-slate-900 dark:text-white" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Career Goals & Focus
                </h3>
              </div>
              <p className="text-slate-800 dark:text-zinc-200 leading-relaxed text-sm sm:text-base">
                {about.careerGoals}
              </p>
            </div>

          </div>

          {/* Right Column: Highlights & Technical Interests */}
          <div className="lg:col-span-5 space-y-6">

            {/* Academic & Professional Highlights */}
            <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80">
              <div className="flex items-center gap-3">
                <GraduationCap className="w-5 h-5 text-slate-900 dark:text-white" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Academic Credentials
                </h3>
              </div>

              <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                {about.highlights && about.highlights.map((item, idx) => (
                  <div key={idx} className="py-3 first:pt-0 last:pb-0 flex flex-col space-y-1">
                    <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                      {item.label}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Core Technical Interests */}
            <div className="glass-card rounded-2xl p-6 sm:p-7 space-y-4 shadow-sm border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80">
              <div className="flex items-center gap-3">
                <Compass className="w-5 h-5 text-slate-900 dark:text-white" />
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Areas of Interest
                </h3>
              </div>

              <div className="space-y-2.5">
                {about.interests && about.interests.map((interest, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-xs sm:text-sm font-medium text-slate-800 dark:text-zinc-200"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
