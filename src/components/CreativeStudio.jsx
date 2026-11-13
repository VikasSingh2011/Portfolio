import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Video, ExternalLink, Play, Film, Sparkles } from 'lucide-react';

export default function CreativeStudio() {
  const { data } = usePortfolio();
  const { creativeStudio, sectionVisibility } = data;

  // Requirement: "Hide this section until projects are added. All content, images, links, and project details must be editable."
  if (!sectionVisibility.creative || !creativeStudio?.enabled || !creativeStudio?.items?.length) {
    return null;
  }

  return (
    <section id="creative" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 text-xs font-mono border border-slate-200 dark:border-zinc-800">
            <Film className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
            <span>Media</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Creative Studio
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400">
            {creativeStudio.tagline || 'Video editing, motion graphics, YouTube thumbnails, and creative visual assets.'}
          </p>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creativeStudio.items.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm flex flex-col justify-between glass-card-hover group"
            >
              {/* Media Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-12 rounded-full bg-black/80 text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <Play className="w-5 h-5 ml-0.5 fill-current" />
                  </div>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-black/80 text-white backdrop-blur-md">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 line-clamp-2">
                  {item.description}
                </p>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-900 dark:text-white hover:underline pt-2"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
