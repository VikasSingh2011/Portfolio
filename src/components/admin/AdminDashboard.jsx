import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { 
  X, 
  Lock, 
  Unlock, 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Check, 
  Cloud, 
  Database, 
  User, 
  Briefcase, 
  FolderGit2, 
  Cpu, 
  Award, 
  Film, 
  Mail, 
  Sliders, 
  Sparkles,
  Key
} from 'lucide-react';

export default function AdminDashboard() {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    isAdminAuthenticated, 
    setIsAdminAuthenticated,
    data, 
    updateData, 
    resetData, 
    exportDataJSON, 
    importDataJSON,
    showToast 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('personal');
  const [passcodeAttempt, setPasscodeAttempt] = useState('');
  const [passcodeError, setPasscodeError] = useState('');

  // Editable clone of data
  const [formData, setFormData] = useState(data);

  // Messages inbox state
  const [messages, setMessages] = useState([]);

  // Sync formData when data updates
  useEffect(() => {
    setFormData(data);
  }, [data]);

  // Load received messages from localStorage
  useEffect(() => {
    try {
      const msgs = JSON.parse(localStorage.getItem('portfolio_contact_messages') || '[]');
      setMessages(msgs);
    } catch (e) {
      console.error(e);
    }
  }, [isAdminOpen, activeTab]);

  if (!isAdminOpen) return null;

  // Passcode verification
  const handleLogin = (e) => {
    e.preventDefault();
    const correctPasscode = data.adminConfig?.passcode || 'admin123';
    if (passcodeAttempt === correctPasscode) {
      setIsAdminAuthenticated(true);
      setPasscodeError('');
      showToast('Admin access granted! You can now edit any section.');
    } else {
      setPasscodeError('Incorrect passcode. Default is admin123');
    }
  };

  const handleSaveAll = () => {
    updateData(formData);
    showToast('All portfolio modifications saved successfully!');
  };

  const clearMessages = () => {
    localStorage.removeItem('portfolio_contact_messages');
    setMessages([]);
    showToast('Inquiry messages cleared.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-6xl h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-500 border border-brand-500/20">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Portfolio Content Management Studio</span>
                {isAdminAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Live Editing Mode
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Update content, projects, skills & sections without modifying source code.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={handleSaveAll}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/25 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>Save All Changes</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors ml-2"
              title="Close CMS Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area: Auth Gate or Dashboard Tabs */}
        {!isAdminAuthenticated ? (
          /* Authentication Screen */
          <div className="flex-1 flex items-center justify-center p-6 bg-slate-50/50 dark:bg-slate-950/30">
            <div className="w-full max-w-md glass-card rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-500 border border-brand-500/20 flex items-center justify-center mx-auto">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Admin Passcode Required
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Enter your admin passcode to edit portfolio information and manage projects.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Passcode
                  </label>
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter passcode (default: admin123)"
                    value={passcodeAttempt}
                    onChange={(e) => setPasscodeAttempt(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                  {passcodeError && (
                    <p className="text-xs text-rose-500 font-medium pt-1">
                      {passcodeError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-semibold text-sm text-white bg-brand-500 hover:bg-brand-600 shadow-md shadow-brand-500/25 transition-all"
                >
                  Unlock Admin Dashboard
                </button>
              </form>

              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400">
                <span>Default Passcode: </span>
                <code className="font-mono font-bold text-brand-500">admin123</code>
                <span className="block pt-0.5 text-[10px] text-slate-400">
                  (You can change this passcode in Settings anytime)
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* Main Admin Workspace with Sidebar Navigation */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            
            {/* Sidebar Tabs */}
            <div className="w-full md:w-60 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/40 p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto flex-shrink-0">
              {[
                { id: 'personal', label: 'Personal & Hero', icon: User },
                { id: 'projects', label: 'Projects Manager', icon: FolderGit2 },
                { id: 'experience', label: 'Experience & Roles', icon: Briefcase },
                { id: 'skills', label: 'Skills & Levels', icon: Cpu },
                { id: 'education', label: 'Education & Certs', icon: Award },
                { id: 'services', label: 'Freelance & Creative', icon: Film },
                { id: 'visibility', label: 'Section Visibility', icon: Eye },
                { id: 'inbox', label: `Inquiries (${messages.length})`, icon: Mail },
                { id: 'storage', label: 'Backup & Cloud Sync', icon: Database },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/25'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}

              <div className="hidden md:block mt-auto pt-4 border-t border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setIsAdminAuthenticated(false)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-500 hover:bg-rose-500/10 font-semibold transition-colors"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Lock Dashboard</span>
                </button>
              </div>
            </div>

            {/* Tab Panels Container */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              
              {/* TAB 1: Personal Branding */}
              {activeTab === 'personal' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Personal Branding & Hero Information
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Configure your name, title, profile photo URL, bio, and social profile links.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                      <input
                        type="text"
                        value={formData.personal.name}
                        onChange={(e) => setFormData({
                          ...formData,
                          personal: { ...formData.personal, name: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Professional Title</label>
                      <input
                        type="text"
                        value={formData.personal.title}
                        onChange={(e) => setFormData({
                          ...formData,
                          personal: { ...formData.personal, title: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Batch / Degree Subtitle</label>
                      <input
                        type="text"
                        value={formData.personal.batch}
                        onChange={(e) => setFormData({
                          ...formData,
                          personal: { ...formData.personal, batch: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Location</label>
                      <input
                        type="text"
                        value={formData.personal.location}
                        onChange={(e) => setFormData({
                          ...formData,
                          personal: { ...formData.personal, location: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                      <input
                        type="email"
                        value={formData.personal.email}
                        onChange={(e) => setFormData({
                          ...formData,
                          personal: { ...formData.personal, email: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                      <input
                        type="text"
                        value={formData.personal.phone}
                        onChange={(e) => setFormData({
                          ...formData,
                          personal: { ...formData.personal, phone: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Profile Photo Image URL</label>
                      <input
                        type="text"
                        value={formData.personal.avatar}
                        onChange={(e) => setFormData({
                          ...formData,
                          personal: { ...formData.personal, avatar: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Resume Link / Google Drive / URL</label>
                      <input
                        type="text"
                        placeholder="Paste link to PDF (or leave # to trigger built-in resume generator)"
                        value={formData.personal.resumeUrl}
                        onChange={(e) => setFormData({
                          ...formData,
                          personal: { ...formData.personal, resumeUrl: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                      />
                    </div>

                    <div className="space-y-1 sm:col-span-2">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Hero Introduction Bio</label>
                      <textarea
                        rows={3}
                        value={formData.personal.bio}
                        onChange={(e) => setFormData({
                          ...formData,
                          personal: { ...formData.personal, bio: e.target.value }
                        })}
                        className="w-full px-3.5 py-2 rounded-xl text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                      />
                    </div>
                  </div>

                  {/* Social Profile Links */}
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Social & Coding Profile URLs
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.keys(formData.socials).map((key) => (
                        <div key={key} className="space-y-1">
                          <label className="text-xs font-mono uppercase text-slate-500">{key}</label>
                          <input
                            type="text"
                            value={formData.socials[key]}
                            onChange={(e) => setFormData({
                              ...formData,
                              socials: { ...formData.socials, [key]: e.target.value }
                            })}
                            className="w-full px-3 py-1.5 rounded-lg text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Projects Manager */}
              {activeTab === 'projects' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Projects Manager ({formData.projects.length})
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Add, reorder, edit or remove projects.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const newProj = {
                          id: 'proj-' + Date.now(),
                          title: 'New Project Title',
                          tagline: 'Short description of architecture & tech',
                          description: 'Detailed description of the application...',
                          category: 'Full-Stack',
                          technologies: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
                          github: 'https://github.com',
                          demo: 'https://example.com',
                          image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
                          featured: false,
                          keyPoints: ['Custom feature implementation', 'High performance backend']
                        };
                        setFormData({
                          ...formData,
                          projects: [newProj, ...formData.projects]
                        });
                        showToast('New project template added!');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-500 text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Project</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.projects.map((proj, index) => (
                      <div
                        key={proj.id}
                        className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-4"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-slate-400">
                              #{index + 1}
                            </span>
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[index].title = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="font-bold text-base bg-transparent border-b border-dashed border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-1 py-0.5"
                            />
                            <span className="text-xs px-2 py-0.5 rounded bg-brand-500/10 text-brand-500 font-mono">
                              {proj.category}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            {/* Reorder Up */}
                            <button
                              disabled={index === 0}
                              onClick={() => {
                                const updated = [...formData.projects];
                                const temp = updated[index - 1];
                                updated[index - 1] = updated[index];
                                updated[index] = temp;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30"
                              title="Move Up"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            {/* Reorder Down */}
                            <button
                              disabled={index === formData.projects.length - 1}
                              onClick={() => {
                                const updated = [...formData.projects];
                                const temp = updated[index + 1];
                                updated[index + 1] = updated[index];
                                updated[index] = temp;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="p-1 rounded text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30"
                              title="Move Down"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                            {/* Delete */}
                            <button
                              onClick={() => {
                                const updated = formData.projects.filter((_, i) => i !== index);
                                setFormData({ ...formData, projects: updated });
                                showToast('Project removed.');
                              }}
                              className="p-1 rounded text-rose-500 hover:bg-rose-500/10"
                              title="Delete Project"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-500">Tagline</label>
                            <input
                              type="text"
                              value={proj.tagline}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[index].tagline = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-semibold text-slate-500">Category</label>
                            <input
                              type="text"
                              value={proj.category}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[index].category = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-slate-500">GitHub URL</label>
                            <input
                              type="text"
                              value={proj.github}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[index].github = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-slate-500">Live Demo URL</label>
                            <input
                              type="text"
                              value={proj.demo}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[index].demo = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="text-[11px] font-semibold text-slate-500">Image URL</label>
                            <input
                              type="text"
                              value={proj.image}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[index].image = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="text-[11px] font-semibold text-slate-500">Full Description</label>
                            <textarea
                              rows={2}
                              value={proj.description}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[index].description = e.target.value;
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="text-[11px] font-semibold text-slate-500">Technologies (comma separated)</label>
                            <input
                              type="text"
                              value={proj.technologies.join(', ')}
                              onChange={(e) => {
                                const updated = [...formData.projects];
                                updated[index].technologies = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                                setFormData({ ...formData, projects: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: Experience & Roles */}
              {activeTab === 'experience' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Experience & Internships
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Add and edit your internship experiences and campus leadership.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        const newExp = {
                          id: 'exp-' + Date.now(),
                          role: 'Software Engineer Intern',
                          company: 'Company Name',
                          period: 'Jun 2025 - Aug 2025',
                          location: 'Remote',
                          type: 'Internship',
                          description: 'Responsibilities and contributions...',
                          technologies: ['React', 'Node.js', 'MongoDB'],
                          achievements: ['Increased performance by 25%']
                        };
                        setFormData({
                          ...formData,
                          experience: [newExp, ...formData.experience]
                        });
                        showToast('New experience role added.');
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-brand-500 text-white"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Experience</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.experience.map((exp, index) => (
                      <div
                        key={exp.id}
                        className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={exp.role}
                            onChange={(e) => {
                              const updated = [...formData.experience];
                              updated[index].role = e.target.value;
                              setFormData({ ...formData, experience: updated });
                            }}
                            className="font-bold text-base bg-transparent border-b border-dashed border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-1 py-0.5"
                          />
                          <button
                            onClick={() => {
                              const updated = formData.experience.filter((_, i) => i !== index);
                              setFormData({ ...formData, experience: updated });
                            }}
                            className="p-1 rounded text-rose-500 hover:bg-rose-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div>
                            <label className="text-[11px] font-semibold text-slate-500">Company</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => {
                                const updated = [...formData.experience];
                                updated[index].company = e.target.value;
                                setFormData({ ...formData, experience: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-slate-500">Period</label>
                            <input
                              type="text"
                              value={exp.period}
                              onChange={(e) => {
                                const updated = [...formData.experience];
                                updated[index].period = e.target.value;
                                setFormData({ ...formData, experience: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>

                          <div>
                            <label className="text-[11px] font-semibold text-slate-500">Location / Mode</label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => {
                                const updated = [...formData.experience];
                                updated[index].location = e.target.value;
                                setFormData({ ...formData, experience: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>

                          <div className="sm:col-span-3">
                            <label className="text-[11px] font-semibold text-slate-500">Description</label>
                            <textarea
                              rows={2}
                              value={exp.description}
                              onChange={(e) => {
                                const updated = [...formData.experience];
                                updated[index].description = e.target.value;
                                setFormData({ ...formData, experience: updated });
                              }}
                              className="w-full px-2.5 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: Skills & Levels */}
              {activeTab === 'skills' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Technical Skills & Proficiency Levels
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Adjust proficiency percentages (0-100%) and skill badges.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {Object.entries(formData.skills).map(([category, skillList]) => (
                      <div key={category} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                            {category}
                          </h4>
                          <button
                            onClick={() => {
                              const skillName = prompt('Enter new skill name:');
                              if (skillName) {
                                const updated = { ...formData.skills };
                                updated[category] = [
                                  ...updated[category],
                                  { name: skillName, level: 80, badge: 'Proficient' }
                                ];
                                setFormData({ ...formData, skills: updated });
                              }
                            }}
                            className="text-xs font-semibold text-brand-500 hover:underline flex items-center gap-1"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add Skill</span>
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {skillList.map((skill, sIdx) => (
                            <div key={sIdx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                              <div className="flex items-center justify-between text-xs">
                                <input
                                  type="text"
                                  value={skill.name}
                                  onChange={(e) => {
                                    const updated = { ...formData.skills };
                                    updated[category][sIdx].name = e.target.value;
                                    setFormData({ ...formData, skills: updated });
                                  }}
                                  className="font-semibold text-slate-800 dark:text-slate-200 bg-transparent border-b border-slate-200 dark:border-slate-700 w-32"
                                />
                                <div className="flex items-center gap-1">
                                  <span className="font-mono text-brand-500 font-bold">{skill.level}%</span>
                                  <button
                                    onClick={() => {
                                      const updated = { ...formData.skills };
                                      updated[category] = updated[category].filter((_, i) => i !== sIdx);
                                      setFormData({ ...formData, skills: updated });
                                    }}
                                    className="p-1 text-rose-500 hover:bg-rose-500/10 rounded ml-1"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <input
                                type="range"
                                min="10"
                                max="100"
                                value={skill.level}
                                onChange={(e) => {
                                  const updated = { ...formData.skills };
                                  updated[category][sIdx].level = parseInt(e.target.value);
                                  setFormData({ ...formData, skills: updated });
                                }}
                                className="w-full accent-brand-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: Education & Certifications */}
              {activeTab === 'education' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Education & Certifications
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Manage degrees, CGPA, graduation batch, and course credentials.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Degree Programs</h4>
                    {formData.education.map((edu, idx) => (
                      <div key={edu.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const updated = [...formData.education];
                            updated[idx].degree = e.target.value;
                            setFormData({ ...formData, education: updated });
                          }}
                          className="font-bold text-sm bg-transparent border-b border-dashed border-slate-300 dark:border-slate-700 w-full text-slate-900 dark:text-white"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={edu.institution}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[idx].institution = e.target.value;
                              setFormData({ ...formData, education: updated });
                            }}
                            className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                          <input
                            type="text"
                            value={edu.grade}
                            onChange={(e) => {
                              const updated = [...formData.education];
                              updated[idx].grade = e.target.value;
                              setFormData({ ...formData, education: updated });
                            }}
                            className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">Certifications</h4>
                      <button
                        onClick={() => {
                          const newCert = {
                            id: 'cert-' + Date.now(),
                            name: 'Certification Name',
                            issuer: 'Coursera / Meta',
                            date: '2025',
                            credentialUrl: 'https://coursera.org',
                            skills: ['Cloud', 'React']
                          };
                          setFormData({ ...formData, certifications: [newCert, ...formData.certifications] });
                        }}
                        className="text-xs font-semibold text-brand-500 hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Certificate</span>
                      </button>
                    </div>

                    {formData.certifications.map((cert, idx) => (
                      <div key={cert.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={cert.name}
                            onChange={(e) => {
                              const updated = [...formData.certifications];
                              updated[idx].name = e.target.value;
                              setFormData({ ...formData, certifications: updated });
                            }}
                            className="font-bold text-sm bg-transparent border-b border-dashed border-slate-300 dark:border-slate-700 w-3/4 text-slate-900 dark:text-white"
                          />
                          <button
                            onClick={() => {
                              const updated = formData.certifications.filter((_, i) => i !== idx);
                              setFormData({ ...formData, certifications: updated });
                            }}
                            className="p-1 text-rose-500 hover:bg-rose-500/10 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={cert.issuer}
                            onChange={(e) => {
                              const updated = [...formData.certifications];
                              updated[idx].issuer = e.target.value;
                              setFormData({ ...formData, certifications: updated });
                            }}
                            className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                          <input
                            type="text"
                            value={cert.credentialUrl}
                            onChange={(e) => {
                              const updated = [...formData.certifications];
                              updated[idx].credentialUrl = e.target.value;
                              setFormData({ ...formData, certifications: updated });
                            }}
                            className="px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: Freelance & Creative Studio */}
              {activeTab === 'services' && (
                <div className="space-y-6 max-w-4xl">
                  {/* Creative Studio Toggle Requirement */}
                  <div className="p-6 rounded-2xl bg-brand-secondary/5 border border-brand-secondary/20 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                          <Film className="w-5 h-5 text-brand-secondary" />
                          <span>Creative Studio Section</span>
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Video editing, Reels, thumbnails & creative media. Currently: {formData.creativeStudio?.enabled ? 'VISIBLE' : 'HIDDEN'}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          const newStatus = !formData.creativeStudio?.enabled;
                          setFormData({
                            ...formData,
                            creativeStudio: { ...formData.creativeStudio, enabled: newStatus },
                            sectionVisibility: { ...formData.sectionVisibility, creative: newStatus }
                          });
                          showToast(newStatus ? 'Creative studio section enabled!' : 'Creative studio hidden.');
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                          formData.creativeStudio?.enabled
                            ? 'bg-brand-secondary text-white shadow-md'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {formData.creativeStudio?.enabled ? 'Section Enabled' : 'Section Disabled (Hidden)'}
                      </button>
                    </div>
                  </div>

                  {/* Freelance Services Deliverables */}
                  <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-4">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Freelance Services Offered
                    </h4>
                    <div className="space-y-3">
                      {formData.freelanceServices.map((srv, idx) => (
                        <div key={srv.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => {
                              const updated = [...formData.freelanceServices];
                              updated[idx].title = e.target.value;
                              setFormData({ ...formData, freelanceServices: updated });
                            }}
                            className="font-bold text-sm bg-transparent border-b border-dashed border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white w-full"
                          />
                          <textarea
                            rows={2}
                            value={srv.description}
                            onChange={(e) => {
                              const updated = [...formData.freelanceServices];
                              updated[idx].description = e.target.value;
                              setFormData({ ...formData, freelanceServices: updated });
                            }}
                            className="w-full px-2 py-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: Section Visibility CMS */}
              {activeTab === 'visibility' && (
                <div className="space-y-6 max-w-2xl">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Portfolio Section Visibility Controls
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Enable or disable entire sections of your portfolio instantly.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {Object.entries(formData.sectionVisibility).map(([key, isVisible]) => (
                      <div
                        key={key}
                        className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                      >
                        <div>
                          <span className="font-bold text-sm text-slate-900 dark:text-white capitalize">
                            {key === 'codingProfiles' ? 'Coding Profiles' : key} Section
                          </span>
                          <span className="block text-xs text-slate-400">
                            {isVisible ? 'Displayed on live portfolio' : 'Hidden from visitors'}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setFormData({
                              ...formData,
                              sectionVisibility: {
                                ...formData.sectionVisibility,
                                [key]: !isVisible
                              }
                            });
                          }}
                          className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                            isVisible
                              ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30'
                              : 'bg-slate-200 dark:bg-slate-800 text-slate-400'
                          }`}
                        >
                          {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                          <span>{isVisible ? 'Visible' : 'Hidden'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 8: Inquiries Inbox */}
              {activeTab === 'inbox' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Recruiter & Client Inquiries ({messages.length})
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Messages submitted through your website contact form and service requests.
                      </p>
                    </div>

                    {messages.length > 0 && (
                      <button
                        onClick={clearMessages}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors"
                      >
                        Clear All Messages
                      </button>
                    )}
                  </div>

                  {messages.length === 0 ? (
                    <div className="py-16 text-center text-slate-400 space-y-2">
                      <Mail className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
                      <p className="text-sm">No messages yet. Submissions through your contact form will appear here!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                            <span className="font-bold text-sm text-slate-900 dark:text-white">
                              {msg.name} ({msg.email})
                            </span>
                            <span className="font-mono text-slate-400">{msg.date}</span>
                          </div>

                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-400">
                            <span>Category: {msg.service || msg.subject || 'General'}</span>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                            {msg.message}
                          </p>

                          <div className="pt-2">
                            <a
                              href={`mailto:${msg.email}?subject=Re: ${msg.subject || 'Portfolio Inquiry'}`}
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-500 hover:underline"
                            >
                              <span>Reply via Email</span>
                              <span>&rarr;</span>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 9: Storage, Export & Supabase Cloud Sync */}
              {activeTab === 'storage' && (
                <div className="space-y-6 max-w-4xl">
                  <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      Backup, Restore & Supabase Backend Sync
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Local persistence is active. You can also export/import JSON or connect your Supabase database.
                    </p>
                  </div>

                  {/* Local Storage Controls */}
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-4">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-500" />
                      <span>Local Persistence & JSON Backup</span>
                    </h4>

                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={exportDataJSON}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-brand-600 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Portfolio as JSON</span>
                      </button>

                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer transition-colors border border-slate-200 dark:border-slate-700">
                        <Upload className="w-4 h-4" />
                        <span>Import Backup JSON</span>
                        <input
                          type="file"
                          accept=".json"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const content = event.target?.result;
                                if (typeof content === 'string') {
                                  importDataJSON(content);
                                }
                              };
                              reader.readAsText(file);
                            }
                          }}
                        />
                      </label>

                      <button
                        onClick={() => {
                          if (confirm('Reset portfolio back to default curated 2026 CSE data? Any unsaved local edits will be cleared.')) {
                            resetData();
                          }
                        }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 border border-rose-500/30 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset to Default</span>
                      </button>
                    </div>
                  </div>

                  {/* Supabase Integration Configuration */}
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-transparent to-brand-500/5 border border-emerald-500/20 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
                        <Cloud className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                          Optional Supabase Cloud Database Configuration
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          For remote syncing across devices, input your Supabase project parameters. Never expose service role secrets.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 dark:text-slate-300">Supabase Project URL</label>
                        <input
                          type="text"
                          placeholder="https://xyz.supabase.co"
                          value={formData.adminConfig?.supabase?.url || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            adminConfig: {
                              ...formData.adminConfig,
                              supabase: { ...formData.adminConfig?.supabase, url: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="font-semibold text-slate-700 dark:text-slate-300">Public Anon Key</label>
                        <input
                          type="password"
                          placeholder="eyJhbGciOi..."
                          value={formData.adminConfig?.supabase?.anonKey || ''}
                          onChange={(e) => setFormData({
                            ...formData,
                            adminConfig: {
                              ...formData.adminConfig,
                              supabase: { ...formData.adminConfig?.supabase, anonKey: e.target.value }
                            }
                          })}
                          className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Change Admin Passcode */}
                  <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Key className="w-4 h-4 text-amber-500" />
                      <span>Security & Admin Passcode</span>
                    </h4>
                    <div className="max-w-xs space-y-1 text-xs">
                      <label className="font-semibold text-slate-700 dark:text-slate-300">Admin Passcode</label>
                      <input
                        type="text"
                        value={formData.adminConfig?.passcode || 'admin123'}
                        onChange={(e) => setFormData({
                          ...formData,
                          adminConfig: { ...formData.adminConfig, passcode: e.target.value }
                        })}
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-mono font-bold"
                      />
                    </div>
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
