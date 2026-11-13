import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Code, 
  ExternalLink, 
  Terminal, 
  Trophy, 
  Flame, 
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { Github, Linkedin } from './icons/BrandIcons';

export default function CodingProfiles() {
  const { data } = usePortfolio();
  const { codingProfiles } = data;

  if (!data.sectionVisibility.codingProfiles) return null;

  return (
    <section id="profiles" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 text-xs font-mono border border-slate-200 dark:border-zinc-800">
            <Trophy className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
            <span>Problem Solving</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Competitive Coding & Developer Profiles
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400">
            Active tracking across leading competitive programming platforms and developer communities.
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {codingProfiles && codingProfiles.map((profile, idx) => (
            <a
              key={idx}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm flex flex-col justify-between space-y-5 glass-card-hover group relative overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-700 group-hover:scale-105 transition-transform">
                      {profile.platform === 'GitHub' && <Github className="w-5 h-5" />}
                      {profile.platform === 'LinkedIn' && <Linkedin className="w-5 h-5 text-blue-500" />}
                      {profile.platform === 'LeetCode' && <Code className="w-5 h-5 text-amber-500" />}
                      {profile.platform === 'GeeksforGeeks' && <span className="text-emerald-500 font-mono text-sm">GFG</span>}
                      {profile.platform === 'HackerRank' && <span className="text-emerald-400 font-mono text-sm">HR</span>}
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                        {profile.platform}
                      </h3>
                      <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                        @{profile.username}
                      </span>
                    </div>
                  </div>

                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                {/* Platform Stats Pill */}
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700">
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {profile.stats}
                  </div>
                  <div className="text-xs font-mono text-slate-500 dark:text-zinc-400 pt-0.5">
                    {profile.badge}
                  </div>
                </div>

                {/* Highlight Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {profile.highlight}
                </p>
              </div>

              {/* Footer CTA */}
              <div className="pt-2 text-xs font-medium text-slate-700 dark:text-zinc-300 flex items-center gap-1 group-hover:underline">
                <span>View verified profile</span>
                <span>&rarr;</span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
