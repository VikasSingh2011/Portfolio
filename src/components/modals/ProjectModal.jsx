import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  Star,
  Terminal,
  Cpu
} from 'lucide-react';
import { Github } from '../icons/BrandIcons';

export default function ProjectModal() {
  const { selectedProject, setSelectedProject } = usePortfolio();

  if (!selectedProject) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-800 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProject(null)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          title="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700">
              {selectedProject.category}
            </span>
            {selectedProject.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900/90 text-zinc-200 border border-zinc-700">
                <Star className="w-3 h-3 text-amber-400 fill-current" />
                <span>Featured</span>
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
            {selectedProject.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-zinc-400 font-medium">
            {selectedProject.tagline}
          </p>
        </div>

        {/* Project Image Banner */}
        <div className="my-6 relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-zinc-800 shadow-inner">
          <img
            src={selectedProject.image}
            alt={selectedProject.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              const map = {
                'bookstore-mern': '/images/projects/bookstore.jpg',
                'brain-tumor-detection': '/images/projects/brain-tumor.jpg',
                'your-own-ai': '/images/projects/your-own-ai.jpg',
                'enterprise-voting-app': '/images/projects/voting-app.jpg',
                'mern-todo-app': '/images/projects/todo-app.jpg',
                'pixabay-clone': '/images/projects/pixabay-clone.jpg',
              };
              if (map[selectedProject.id] && !e.target.src.endsWith(map[selectedProject.id])) {
                e.target.src = map[selectedProject.id];
              } else {
                e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%2311141c"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="22" font-weight="600">' + encodeURIComponent(selectedProject.title) + '</text></svg>';
              }
            }}
          />
        </div>

        {/* Detailed Breakdown */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-semibold">
              Project Overview
            </h4>
            <p className="text-sm sm:text-base text-slate-600 dark:text-zinc-300 leading-relaxed">
              {selectedProject.description}
            </p>
          </div>

          {/* Architectural / Technical Highlights */}
          {selectedProject.keyPoints && selectedProject.keyPoints.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-semibold flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-900 dark:text-white" />
                <span>Key Technical Highlights & Implementation</span>
              </h4>
              <ul className="space-y-2">
                {selectedProject.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technology Stack */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-semibold flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-900 dark:text-white" />
              <span>Technologies & Tools Employed</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedProject.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {selectedProject.demo && (
              <a
                href={selectedProject.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-xs sm:text-sm text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Visit Live App</span>
              </a>
            )}
            {selectedProject.github && (
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-xs sm:text-sm bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Explore Source Code</span>
              </a>
            )}
          </div>

          <button
            onClick={() => setSelectedProject(null)}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
