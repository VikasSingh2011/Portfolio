import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function Experience() {
  const { data } = usePortfolio();
  const { experience } = data;

  if (!data.sectionVisibility.experience) return null;

  return (
    <section id="experience" className="py-20 relative bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-white text-xs font-mono border border-slate-200 dark:border-zinc-800">
            <Briefcase className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-300" />
            <span>Experience</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Internship & Experience
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-zinc-300">
            Real-world software engineering contributions, production deployments, and hands-on systems work.
          </p>
        </div>

        {/* Timeline List */}
        <div className="max-w-4xl mx-auto relative pl-4 sm:pl-8 border-l-2 border-slate-200 dark:border-zinc-800 space-y-10">
          {experience && experience.map((item, index) => (
            <div key={item.id || index} className="relative group">
              
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[23px] sm:-left-[39px] top-2 w-3.5 h-3.5 rounded-full bg-slate-900 dark:bg-white border-2 border-white dark:border-zinc-950 shadow-sm" />

              {/* Experience Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 glass-card-hover">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-zinc-800 pb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-800 dark:text-white font-semibold pt-1">
                      <span>{item.company}</span>
                      {item.type && (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                          {item.type}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-col sm:items-end text-xs sm:text-sm text-slate-600 dark:text-zinc-400 font-medium space-y-1">
                    <div className="inline-flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                      <span>{item.period}</span>
                    </div>
                    {item.location && (
                      <div className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-zinc-500" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-800 dark:text-zinc-200 text-sm sm:text-base leading-relaxed">
                  {item.description}
                </p>

                {/* Key Achievements Bullet Points */}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-semibold">
                      Key Impact & Achievements:
                    </span>
                    <ul className="space-y-2">
                      {item.achievements.map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-zinc-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies Badges */}
                {item.technologies && item.technologies.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {item.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
