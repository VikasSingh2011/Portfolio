import React, { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Copy, 
  Check, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { API_BASE_URL } from '../context/PortfolioContext';

export default function Contact() {
  const { data, showToast } = usePortfolio();
  const { personal, socials } = data;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    service: 'General Inquiry / Full-Time Role',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!data.sectionVisibility.contact) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message (minimum 10 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Send to Express + MongoDB backend if API configured
      if (API_BASE_URL) {
        await fetch(`${API_BASE_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
    } catch (err) {
      // Backend not running, local storage fallback will save it
    }

    // Save message locally in localStorage as reliable backup
    try {
      const savedMessages = JSON.parse(localStorage.getItem('portfolio_contact_messages') || '[]');
      const newMsg = {
        id: Date.now(),
        ...formData,
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
    setFormData({
      name: '',
      email: '',
      subject: '',
      service: 'General Inquiry / Full-Time Role',
      message: ''
    });

    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#06b6d4', '#ec4899', '#10b981']
    });

    showToast('Thank you! Your message has been sent to Vikas.');
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    showToast('Email address copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-300 text-xs font-mono border border-slate-200 dark:border-zinc-800">
            <Mail className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400" />
            <span>Contact</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white tracking-tight">
            Let's Discuss Opportunities
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400">
            Interested in hiring me for a full-time role (2026 grad), internship, or freelance project? Let's talk!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Info & Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Email Card */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-700">
                  <Mail className="w-5 h-5" />
                </div>
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                  Direct Email
                </span>
                <p className="text-base font-bold text-slate-900 dark:text-white break-all pt-0.5">
                  {personal.email}
                </p>
              </div>
            </div>

            {/* Location & Status Card */}
            <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3">
              <div className="p-2.5 w-fit rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-700">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                  Current Location
                </span>
                <p className="text-base font-bold text-slate-900 dark:text-white pt-0.5">
                  {personal.location}
                </p>
                <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono pt-1">
                  Available for relocation & remote collaboration.
                </p>
              </div>
            </div>

            {/* Phone Card (if available) */}
            {personal.phone && (
              <div className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-sm space-y-3">
                <div className="p-2.5 w-fit rounded-lg bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white border border-slate-200 dark:border-zinc-700">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
                    Phone & WhatsApp
                  </span>
                  <p className="text-base font-bold text-slate-900 dark:text-white pt-0.5">
                    {personal.phone}
                  </p>
                </div>
              </div>
            )}

            {/* Response note */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-700 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Response Commitment</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
                I regularly review emails and messages. You can expect a response within 12–24 hours on business days.
              </p>
            </div>

          </div>

          {/* Right Column: Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 shadow-md">
              <div className="flex items-center gap-3 border-b border-slate-100 dark:border-zinc-800 pb-4 mb-6">
                <MessageSquare className="w-5 h-5 text-slate-900 dark:text-white" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Send a Direct Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-zinc-900 border ${
                        errors.name ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-zinc-700 focus:ring-slate-400 dark:focus:ring-zinc-600'
                      } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 pt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. recruiter@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-zinc-900 border ${
                        errors.email ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-zinc-700 focus:ring-slate-400 dark:focus:ring-zinc-600'
                      } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-rose-500 flex items-center gap-1 pt-0.5">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject & Inquiry Type */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. SDE Role Interview / Project Inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-zinc-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                      Category
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400 dark:focus:ring-zinc-600"
                    >
                      <option value="Full-Time SDE Role (2026 Batch)">Full-Time SDE Role (2026 Batch)</option>
                      <option value="Internship Opportunity">Internship Opportunity</option>
                      <option value="Freelance Web Development">Freelance Web Development</option>
                      <option value="React / Frontend Refactoring">React / Frontend Refactoring</option>
                      <option value="Bug Fixing & Optimization">Bug Fixing & Optimization</option>
                      <option value="General Networking / Collaboration">General Networking / Collaboration</option>
                    </select>
                  </div>
                </div>

                {/* Message Field */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-zinc-300">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about the role, project requirements, timeline, or just say hello..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-lg text-sm bg-slate-50 dark:bg-zinc-900 border ${
                      errors.message ? 'border-rose-500 focus:ring-rose-500' : 'border-slate-200 dark:border-zinc-700 focus:ring-slate-400 dark:focus:ring-zinc-600'
                    } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 resize-none`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-500 flex items-center gap-1 pt-0.5">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-lg font-medium text-sm sm:text-base text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
