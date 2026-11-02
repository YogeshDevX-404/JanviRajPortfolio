/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Lab3DSection } from './components/Lab3DSection';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectDetailModal, CodeRequestModal } from './components/Modals';
import { Project } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [requestCodeProject, setRequestCodeProject] = useState<Project | null>(null);

  const handleOpenContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FC] text-[#202536] flex flex-col font-sans selection:bg-[#DDD6FE] selection:text-[#101C35]">
      {/* Sticky Navigation Bar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section (Left: Portrait Photo, Right: Resume Details & CTAs) */}
        <Hero />

        {/* About Me Section (Bio, Highlights, Strengths, Languages, Badminton) */}
        <About />

        {/* Interactive 3D Developer Station & Architecture Lab (Three.js PBR) */}
        <Lab3DSection />

        {/* Technical Skills Section (Languages, Databases, AI/Vibe Coding) */}
        <Skills />

        {/* Featured Projects (Travel Website, Airbnb App, Mini Projects) */}
        <Projects
          onSelectProject={(project) => setSelectedProject(project)}
          onRequestCode={(project) => setRequestCodeProject(project)}
        />

        {/* Education Section (BCA, Panjab University, 79%, 8.3 CGPA) */}
        <Education />

        {/* Contact Section (Direct Info, Mailto, Tel, LinkedIn, Validated Form) */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestCode={(project) => {
          setSelectedProject(null);
          setRequestCodeProject(project);
        }}
      />

      <CodeRequestModal
        project={requestCodeProject}
        onClose={() => setRequestCodeProject(null)}
      />
    </div>
  );
}
