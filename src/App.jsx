import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import CodingProfiles from './components/CodingProfiles';
import FreelanceServices from './components/FreelanceServices';
import CreativeStudio from './components/CreativeStudio';
import ResumeCertifications from './components/ResumeCertifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Modals & Floating Tools
import ProjectModal from './components/modals/ProjectModal';
import ResumeModal from './components/modals/ResumeModal';
import HireModal from './components/modals/HireModal';
import AdminDashboard from './components/admin/AdminDashboard';
import Toast from './components/Toast';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <CodingProfiles />
        <FreelanceServices />
        <CreativeStudio />
        <ResumeCertifications />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <ProjectModal />
      <ResumeModal />
      <HireModal />
      <AdminDashboard />
      <Toast />
    </div>
  );
}
