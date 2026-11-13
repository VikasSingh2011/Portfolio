import React, { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { X, Send, Sparkles, CheckCircle2, Clock, Briefcase } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function HireModal() {
  const { isHireModalOpen, setIsHireModalOpen, selectedService, showToast } = usePortfolio();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    timeline: 'Within 2 Weeks',
    budget: '$300 - $800',
    details: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isHireModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) {
      showToast('Please fill out the required fields.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const savedMessages = JSON.parse(localStorage.getItem('portfolio_contact_messages') || '[]');
        const newMsg = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          service: selectedService?.title || 'Custom Service',
          subject: `Service Inquiry: ${selectedService?.title || 'Freelance'}`,
          message: `Budget: ${formData.budget} | Timeline: ${formData.timeline}\n\nProject Scope:\n${formData.details}`,
          date: new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };
        localStorage.setItem('portfolio_contact_messages', JSON.stringify([newMsg, ...savedMessages]));
      } catch (err) {
        console.error(err);
      }

      setIsSubmitting(false);
      setIsHireModalOpen(false);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });

      showToast('Service request received! I will review and reply within 24 hours.');
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-xl glass-card rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/80 dark:border-slate-800 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsHireModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-mono">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Service Request</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {selectedService ? selectedService.title : 'Hire For A Project'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400">
            Tell me about your project goals, preferred timeline, and deliverables.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                Your Name *
              </label>
              <input
                type="text"
                required
                placeholder="Alex Morgan"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg text-sm bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-zinc-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                Your Email *
              </label>
              <input
                type="email"
                required
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg text-sm bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-zinc-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                Target Timeline
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg text-sm bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-zinc-600"
              >
                <option value="Urgent (24 - 48 Hours)">Urgent (24 - 48 Hours)</option>
                <option value="Within 1 Week">Within 1 Week</option>
                <option value="Within 2 Weeks">Within 2 Weeks</option>
                <option value="Flexible / 1 Month">Flexible / 1 Month</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                Estimated Budget
              </label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-3.5 py-2 rounded-lg text-sm bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-zinc-600"
              >
                <option value="$150 - $300">$150 - $300 (Micro task / Bug fix)</option>
                <option value="$300 - $800">$300 - $800 (Landing page / Module)</option>
                <option value="$800 - $2,000">$800 - $2,000 (Full-stack MVP)</option>
                <option value="$2,000+">$2,000+ (Comprehensive project)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">
              Project Details & Scope *
            </label>
            <textarea
              rows={4}
              required
              placeholder="Describe what you want to build or fix, links to Figma/reference sites, and any key requirements..."
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              className="w-full px-3.5 py-2 rounded-lg text-sm bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-zinc-600 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-medium text-sm text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <span className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Service Inquiry</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
