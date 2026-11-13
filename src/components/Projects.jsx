import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  FolderGit2, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Info,
  Star,
  CheckCircle2
} from 'lucide-react';
import { Github } from './icons/BrandIcons';

export default function Projects() {
  const { data, setSelectedProject } = usePortfolio();
  const { projects } = data;
  const [activeFilter, setActiveFilter] = useState('All');

  if (!data.sectionVisibility.projects) return null;

  // Categories
  const categories = ['All', 'Full-Stack', 'AI / ML', 'Featured'];

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Featured') return project.featured;
    return project.category.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 text-xs font-mono border border-slate-200 dark:border-zinc-800">
            <FolderGit2 className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
            <span>Featured Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Projects & Systems Built
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400">
            Production-oriented full-stack web applications, AI/ML models, and developer tools.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 border ${
                activeFilter === category
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-black border-slate-900 dark:border-white shadow-sm'
                  : 'bg-white dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-800 hover:border-slate-400 dark:hover:border-zinc-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-md flex flex-col glass-card-hover group"
            >
              {/* Project Image & Overlay */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  loading="lazy"
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
                    if (map[project.id] && !e.target.src.endsWith(map[project.id])) {
                      e.target.src = map[project.id];
                    } else {
                      e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="800" height="450" fill="%2311141c"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23ffffff" font-family="sans-serif" font-size="22" font-weight="600">' + encodeURIComponent(project.title) + '</text></svg>';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Badges on Top */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-black/80 text-white backdrop-blur-md border border-white/10">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-900/90 text-zinc-200 border border-zinc-700 backdrop-blur-md shadow-sm">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Quick overlay buttons */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="px-3 py-1.5 rounded-lg bg-black/80 text-white hover:bg-black transition-colors backdrop-blur-md border border-white/20 text-xs flex items-center gap-1.5 shadow"
                    title="View Architectural Breakdown"
                  >
                    <Info className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="font-medium">Details</span>
                  </button>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono text-slate-500 dark:text-zinc-400 font-medium">
                    {project.tagline}
                  </p>
                  <p className="text-slate-800 dark:text-zinc-200 text-sm leading-relaxed line-clamp-3 pt-1">
                    {project.description}
                  </p>
                </div>

                {/* Key Points highlight */}
                {project.keyPoints && project.keyPoints.length > 0 && (
                  <div className="space-y-1.5 pt-1">
                    {project.keyPoints.slice(0, 2).map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-1">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Badges */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span>Source Code</span>
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-slate-700 dark:text-zinc-300 hover:text-black dark:hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono text-slate-500 dark:text-zinc-400 hover:text-black dark:hover:text-white underline underline-offset-4"
                  >
                    Architecture &rarr;
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
