import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Code2, 
  Search, 
  Terminal, 
  Database, 
  Cpu, 
  Wrench, 
  Layers,
  Sparkles 
} from 'lucide-react';

export default function Skills() {
  const { data } = usePortfolio();
  const { skills } = data;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  if (!data.sectionVisibility.skills) return null;

  const categoryIcons = {
    "Frontend Development": Code2,
    "Backend & APIs": Terminal,
    "Databases & Cloud": Database,
    "AI, ML & Data Science": Cpu,
    "Core Computer Science": Layers,
    "Developer Tools": Wrench
  };

  const categories = Object.keys(skills || {});

  return (
    <section id="skills" className="py-20 relative bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-white text-xs font-mono border border-slate-200 dark:border-zinc-800">
            <Cpu className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-300" />
            <span>Skills</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Categorized Technical Skills
          </h2>
          <p className="text-base sm:text-lg text-slate-700 dark:text-zinc-300">
            Proficiencies across modern web frameworks, intelligent algorithms, databases, and core computer science.
          </p>
        </div>

        {/* Controls: Search and Category Filter */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-4xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                selectedCategory === 'All'
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black border-slate-900 dark:border-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600'
              }`}
            >
              All Categories
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-black border-slate-900 dark:border-white shadow-sm'
                    : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. React)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg text-xs bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-zinc-600 text-slate-900 dark:text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories
            .filter(cat => selectedCategory === 'All' || selectedCategory === cat)
            .map((category) => {
              const Icon = categoryIcons[category] || Code2;
              const skillList = (skills[category] || []).filter(skill => 
                skill.name.toLowerCase().includes(searchTerm.toLowerCase())
              );

              if (searchTerm && skillList.length === 0) return null;

              return (
                <div
                  key={category}
                  className="glass-card rounded-2xl p-6 space-y-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm"
                >
                  {/* Category Header */}
                  <div className="flex items-center gap-3 border-b border-slate-100 dark:border-zinc-800 pb-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-700">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {category}
                    </h3>
                  </div>

                  {/* Skills List with Progress */}
                  <div className="space-y-4">
                    {skillList.map((skill, idx) => (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-medium text-slate-900 dark:text-white">
                            {skill.name}
                          </span>
                          <div className="flex items-center gap-2">
                            {skill.badge && (
                              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700">
                                {skill.badge}
                              </span>
                            )}
                            <span className="font-mono text-slate-500 dark:text-zinc-400 font-medium">
                              {skill.level}%
                            </span>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-zinc-800 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-slate-900 dark:bg-white transition-all duration-500 ease-out"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
        </div>

      </div>
    </section>
  );
}
