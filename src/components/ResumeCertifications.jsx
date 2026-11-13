import React from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  FileText, 
  Download, 
  GraduationCap, 
  Award, 
  ExternalLink, 
  Calendar, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ResumeCertifications() {
  const { data, setIsResumeOpen } = usePortfolio();
  const { education, certifications, personal } = data;

  if (!data.sectionVisibility.resume) return null;

  const handleDownload = () => {
    confetti({
      particleCount: 40,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#6366f1', '#06b6d4', '#ec4899']
    });
    setIsResumeOpen(true);
  };

  return (
    <section id="resume" className="py-20 relative bg-slate-100/50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading & Quick Resume Download Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-slate-200 dark:border-zinc-800 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 text-xs font-mono border border-slate-200 dark:border-zinc-800">
              <Award className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
              <span>Qualifications</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
              Education & Certifications
            </h2>
            <p className="text-base text-slate-600 dark:text-zinc-400">
              Formal academic credentials and industry-recognized certifications in software engineering & AI.
            </p>
          </div>

          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm transition-all flex-shrink-0"
          >
            <Download className="w-4 h-4" />
            <span>View & Download Resume</span>
          </button>
        </div>

        {/* 2-Column Layout: Education (Left) & Certifications (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Education Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white pb-2">
              <GraduationCap className="w-6 h-6" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {education && education.map((edu) => (
                <div
                  key={edu.id}
                  className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3 glass-card-hover"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs font-mono text-slate-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {edu.period}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {edu.grade}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {edu.degree}
                  </h4>

                  <p className="text-sm font-medium text-slate-700 dark:text-zinc-300">
                    {edu.institution}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 leading-relaxed pt-1">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3 text-slate-900 dark:text-white pb-2">
              <Award className="w-6 h-6" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                Certificates & Specializations
              </h3>
            </div>

            <div className="space-y-4">
              {certifications && certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="glass-card rounded-2xl p-5 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3 glass-card-hover"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h4 className="text-base font-bold text-slate-900 dark:text-white">
                        {cert.title}
                      </h4>
                      <p className="text-xs font-medium text-slate-700 dark:text-zinc-300 font-mono">
                        {cert.issuer}
                      </p>
                    </div>
                    {cert.badge && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-mono bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-zinc-700">
                        {cert.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-xs">
                    <span className="font-mono text-slate-500 dark:text-zinc-400">
                      Issued: {cert.issueDate}
                    </span>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-slate-900 dark:text-white hover:underline"
                      >
                        <span>Verify</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
