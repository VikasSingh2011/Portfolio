import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Code2, 
  Layout, 
  Sparkles, 
  Bug, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Briefcase
} from 'lucide-react';

export default function FreelanceServices() {
  const { data, setIsHireModalOpen, setSelectedService } = usePortfolio();
  const { freelanceServices } = data;

  if (!data.sectionVisibility.services) return null;

  const iconMap = {
    Code2: Code2,
    Layout: Layout,
    Sparkles: Sparkles,
    Bug: Bug
  };

  const handleHireClick = (service) => {
    setSelectedService(service);
    setIsHireModalOpen(true);
  };

  return (
    <section id="services" className="py-20 relative bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 text-xs font-mono border border-slate-200 dark:border-zinc-800">
            <Briefcase className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
            <span>Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Freelance & Contract Services
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400">
            Available for freelance projects, startup MVPs, frontend refactoring, and custom web applications.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {freelanceServices && freelanceServices.map((service) => {
            const Icon = iconMap[service.icon] || Code2;

            return (
              <div
                key={service.id}
                className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm flex flex-col justify-between space-y-6 glass-card-hover relative group"
              >
                {/* Popular Pill */}
                {service.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-slate-900 dark:bg-white text-white dark:text-black shadow-sm">
                      Popular
                    </span>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="p-3 w-fit rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-700">
                    <Icon className="w-6 h-6" />
                  </div>

                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-2 pt-1 text-xs font-mono text-slate-500 dark:text-zinc-400">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Turnaround: {service.turnaround}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Deliverables */}
                  <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-zinc-500 font-semibold">
                      Deliverables & Scope:
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {service.deliverables && service.deliverables.map((del, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-zinc-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action */}
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800">
                  <button
                    onClick={() => handleHireClick(service)}
                    className="w-full py-3 rounded-xl font-medium text-sm bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-slate-800 dark:hover:bg-zinc-200 transition-colors duration-200 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Request This Service</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
