import React, { useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  X, 
  Download, 
  Printer, 
  ExternalLink, 
  GraduationCap, 
  Briefcase, 
  Code2, 
  Award,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { Github, Linkedin } from '../icons/BrandIcons';
import confetti from 'canvas-confetti';

export default function ResumeModal() {
  const { isResumeOpen, setIsResumeOpen, data, showToast } = usePortfolio();
  const { personal, socials, education, experience, projects, skills, certifications } = data;
  const resumeRef = useRef(null);

  if (!isResumeOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDirectDownload = () => {
    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (personal.resumeUrl && personal.resumeUrl !== '#' && personal.resumeUrl !== '#resume-modal') {
      window.open(personal.resumeUrl, '_blank');
      showToast('Opening external resume document...');
    } else {
      // Trigger print-to-PDF
      handlePrint();
      showToast('Printing / saving portfolio resume as PDF...');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Toolbar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/50 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
              Resume Preview
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
              2026 Batch CSE
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-colors"
              title="Print / Save PDF via Browser"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>

            <button
              onClick={handleDirectDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={() => setIsResumeOpen(false)}
              className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors ml-2"
              title="Close Resume"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Formatted Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 font-sans selection:bg-brand-100 selection:text-brand-900">
          <div ref={resumeRef} id="printable-resume" className="max-w-3xl mx-auto space-y-6">
            
            {/* Resume Header */}
            <div className="text-center border-b border-slate-300 pb-5 space-y-2">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
                {personal.name}
              </h1>
              <p className="text-sm font-medium text-slate-700 tracking-wide">
                {personal.title} • {personal.batch}
              </p>

              {/* Contact info bar */}
              <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {personal.email}
                </span>
                {personal.phone && (
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {personal.phone}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {personal.location}
                </span>
                {personal.portfolioUrl && (
                  <a
                    href={personal.portfolioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-slate-900 font-medium hover:underline"
                    title="Live Portfolio Website"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                    Live Portfolio
                  </a>
                )}
                {socials.github && (
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                    title="GitHub"
                  >
                    <Github className="w-3.5 h-3.5 text-slate-400" />
                    GitHub
                  </a>
                )}
                {socials.linkedin && (
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-slate-400" />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            {/* Professional Summary */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
                Professional Summary
              </h3>
              <p className="text-xs text-slate-700 leading-relaxed pt-1">
                {personal.bio}
              </p>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1 flex items-center justify-between">
                <span>Education</span>
              </h3>
              <div className="space-y-2 pt-1">
                {education && education.map((edu) => (
                  <div key={edu.id} className="text-xs space-y-0.5">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{edu.degree}</span>
                      <span className="font-mono text-[11px] text-slate-500">{edu.period}</span>
                    </div>
                    <div className="flex items-center justify-between text-slate-700 font-medium">
                      <span>{edu.institution}</span>
                      <span className="font-semibold text-slate-900">{edu.grade}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 pt-0.5">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Skills */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
                Technical Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                {Object.entries(skills || {}).map(([cat, list]) => (
                  <div key={cat} className="space-y-0.5">
                    <span className="font-bold text-slate-800">{cat}:</span>{' '}
                    <span className="text-slate-600">
                      {list.map(s => s.name).join(', ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
                Experience & Leadership
              </h3>
              <div className="space-y-3 pt-1">
                {experience && experience.map((exp) => (
                  <div key={exp.id} className="text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{exp.role} — <span className="font-normal text-slate-700">{exp.company}</span></span>
                      <span className="font-mono text-[11px] text-slate-500">{exp.period}</span>
                    </div>
                    <p className="text-slate-700 leading-normal">{exp.description}</p>
                    {exp.achievements && (
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600 pl-1">
                        {exp.achievements.map((ach, idx) => (
                          <li key={idx}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Projects */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
                Key Technical Projects
              </h3>
              <div className="space-y-3 pt-1">
                {projects && projects.map((proj) => (
                  <div key={proj.id} className="text-xs space-y-1">
                    <div className="flex items-center justify-between font-bold text-slate-900">
                      <span>{proj.title} <span className="text-slate-500 font-normal">({proj.category})</span></span>
                      <span className="font-mono text-[11px] text-slate-500">
                        {proj.technologies.slice(0, 4).join(', ')}
                      </span>
                    </div>
                    <p className="text-slate-700 leading-normal">{proj.description}</p>
                    {proj.keyPoints && proj.keyPoints.length > 0 && (
                      <ul className="list-disc list-inside space-y-0.5 text-[11px] text-slate-600 pl-1">
                        {proj.keyPoints.map((point, idx) => (
                          <li key={idx}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-1">
                Certifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                {certifications && certifications.map((c) => (
                  <div key={c.id} className="text-[11px]">
                    <span className="font-bold text-slate-900">{c.name}</span> —{' '}
                    <span className="text-slate-600">{c.issuer} ({c.date})</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
