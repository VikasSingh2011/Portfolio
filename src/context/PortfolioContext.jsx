import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialPortfolioData } from '../data/initialPortfolioData';

const PortfolioContext = createContext(null);

const STORAGE_KEY = 'portfolio_cms_data_vikas_v4';
const THEME_KEY = 'portfolio_theme_mode';
export const API_BASE_URL = 'http://localhost:5000/api';

export function PortfolioProvider({ children }) {
  // Theme state
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return true; // Default dark mode per user request
  });

  // Portfolio data state
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure name is Vikas Singh
        if (parsed.personal && parsed.personal.name === 'Vikas Singh') {
          return {
            ...initialPortfolioData,
            ...parsed,
            personal: { ...initialPortfolioData.personal, ...(parsed.personal || {}) },
            socials: { ...initialPortfolioData.socials, ...(parsed.socials || {}) },
            about: { ...initialPortfolioData.about, ...(parsed.about || {}) },
            sectionVisibility: { ...initialPortfolioData.sectionVisibility, ...(parsed.sectionVisibility || {}) },
            creativeStudio: { ...initialPortfolioData.creativeStudio, ...(parsed.creativeStudio || {}) },
            adminConfig: { ...initialPortfolioData.adminConfig, ...(parsed.adminConfig || {}) }
          };
        }
      }
    } catch (e) {
      console.error('Failed to load portfolio data from storage:', e);
    }
    return initialPortfolioData;
  });

  // Backend connection status
  const [backendStatus, setBackendStatus] = useState('checking'); // 'connected' | 'offline' | 'checking'
  const [databaseType, setDatabaseType] = useState('Local Storage');

  // Active UI Modals & State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [toast, setToast] = useState(null);

  // Apply dark mode class to html document
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [darkMode]);

  // Check Backend & MongoDB Status on load
  useEffect(() => {
    const checkBackend = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(3000) });
        if (res.ok) {
          const json = await res.json();
          setBackendStatus(json.database === 'connected' ? 'connected' : 'server-only');
          setDatabaseType(json.databaseType || 'Express Server');
          
          // Optionally fetch live portfolio data from DB
          const portRes = await fetch(`${API_BASE_URL}/portfolio`);
          if (portRes.ok) {
            const portJson = await portRes.json();
            if (portJson.success && portJson.data) {
              setData(prev => ({ ...prev, ...portJson.data }));
            }
          }
        } else {
          setBackendStatus('offline');
        }
      } catch (e) {
        setBackendStatus('offline');
      }
    };

    checkBackend();
  }, []);

  // Persist data changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save portfolio data to storage:', e);
    }
  }, [data]);

  const toggleDarkMode = () => setDarkMode(prev => !prev);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const updateData = async (updater) => {
    const next = typeof updater === 'function' ? updater(data) : { ...data, ...updater };
    setData(next);

    // Try saving to Express / MongoDB backend
    try {
      const res = await fetch(`${API_BASE_URL}/portfolio`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(next)
      });
      if (res.ok) {
        const json = await res.json();
        showToast(json.message || 'Changes saved to backend!');
        return;
      }
    } catch (e) {
      // Backend not running, already saved to localStorage
    }

    showToast('Changes saved locally! Real-time updates active.');
  };

  const resetData = () => {
    setData(initialPortfolioData);
    localStorage.removeItem(STORAGE_KEY);
    showToast('Portfolio reset to default curated details.');
  };

  const exportDataJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Portfolio data exported as JSON file!');
  };

  const importDataJSON = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.personal && parsed.projects) {
        setData(parsed);
        showToast('Portfolio data successfully imported!');
        return true;
      } else {
        showToast('Invalid portfolio backup file format.', 'error');
        return false;
      }
    } catch (e) {
      showToast('Error parsing JSON backup file.', 'error');
      return false;
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        updateData,
        resetData,
        exportDataJSON,
        importDataJSON,
        darkMode,
        toggleDarkMode,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        setIsAdminAuthenticated,
        selectedProject,
        setSelectedProject,
        isResumeOpen,
        setIsResumeOpen,
        isHireModalOpen,
        setIsHireModalOpen,
        selectedService,
        setSelectedService,
        toast,
        showToast,
        backendStatus,
        databaseType
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
