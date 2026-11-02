import React, { useState } from 'react';
import { PROJECTS, Project } from '../data/portfolioData';
import { ExternalLink, Code2, Sparkles, Compass, Home, Terminal, Info, Layers, CheckCircle } from 'lucide-react';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
  onRequestCode: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject, onRequestCode }) => {
  return (
    <section id="projects" className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#5277E8] tracking-widest uppercase mb-3">
            Featured Portfolio Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C35] tracking-tight">
            Projects & Web Solutions
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Documented web projects demonstrating full-stack engineering, database integration, and user-centric web applications.
          </p>
          <div className="w-16 h-1 bg-[#5277E8] mx-auto mt-4 rounded-full" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => {
            const isAirbnb = project.id === 'airbnb-clone';
            const isTravel = project.id === 'travel-website';

            return (
              <div
                key={project.id}
                className="flex flex-col justify-between rounded-3xl bg-[#F8F9FC] border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#5277E8]/40 transition-all duration-300 overflow-hidden group"
              >
                <div>
                  {/* Visual Thumbnail Placeholder / Graphic UI Header */}
                  <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-[#101C35] to-[#1E293B] p-6 flex flex-col justify-between">
                    
                    {/* Background Graphic Pattern */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: 'radial-gradient(#A78BFA 1px, transparent 1px)',
                          backgroundSize: '18px 18px',
                        }}
                      />
                    </div>

                    {/* Top Row: Category Pill & Icon */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold tracking-wide">
                        {project.category}
                      </span>
                      <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-white">
                        {isAirbnb ? (
                          <Home className="w-4 h-4 text-rose-400" />
                        ) : isTravel ? (
                          <Compass className="w-4 h-4 text-cyan-400" />
                        ) : (
                          <Terminal className="w-4 h-4 text-amber-400" />
                        )}
                      </div>
                    </div>

                    {/* Visual UI Mockup Simulation */}
                    <div className="relative z-10 p-3 rounded-xl bg-slate-900/80 border border-slate-700/80 backdrop-blur-sm shadow-lg transform transition-transform duration-300 group-hover:-translate-y-1">
                      {isAirbnb ? (
                        <div className="space-y-1.5 font-mono text-[11px]">
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="text-rose-400 font-bold">● StayHub Engine</span>
                            <span className="text-emerald-400 text-[10px]">CRUD: Active</span>
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            Schema: Listings • Reviews • Auth Sessions
                          </div>
                        </div>
                      ) : isTravel ? (
                        <div className="space-y-1.5 font-mono text-[11px]">
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="text-cyan-400 font-bold">● Travel Portal</span>
                            <span className="text-slate-400 text-[10px]">Full Stack</span>
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            Explore Destinations • Curated Itineraries
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-1.5 font-mono text-[11px]">
                          <div className="flex items-center justify-between text-slate-300">
                            <span className="text-amber-400 font-bold">● Dev Lab Suite</span>
                            <span className="text-purple-400 text-[10px]">Frontend + Backend</span>
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            Core Concepts • Asynchronous Logic • UI Labs
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom Project Tagline */}
                    <div className="relative z-10">
                      <p className="text-xs text-slate-300 font-medium">
                        {project.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#101C35] mb-2 group-hover:text-[#5277E8] transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 min-h-[4rem]">
                      "{project.description}"
                    </p>

                    {/* Key Highlights list */}
                    <div className="mb-6 space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Key Features & Scope
                      </p>
                      {project.highlights.map((hl, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Technology Badges */}
                    <div className="mb-6">
                      <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Technologies Used
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-[#101C35] text-[11px] font-semibold shadow-2xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons (View Project & View Code) */}
                <div className="p-6 pt-0 border-t border-slate-200/60 mt-auto">
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {/* View Project button */}
                    <button
                      onClick={() => onSelectProject(project)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#101C35] hover:bg-[#5277E8] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                    >
                      <span>View Project</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>

                    {/* View Code button */}
                    <button
                      onClick={() => onRequestCode(project)}
                      className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-[#101C35] border border-slate-300 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
                    >
                      <Code2 className="w-3.5 h-3.5 text-[#5277E8]" />
                      <span>View Code</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Verification / Integrity Guarantee */}
        <div className="mt-12 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs text-slate-500">
          <Info className="w-4 h-4 text-[#5277E8] shrink-0" />
          <span>
            Project details reflect original implementations from Janvi Raj's curriculum & portfolio. Source code repositories can be provided upon direct recruiter request.
          </span>
        </div>

      </div>
    </section>
  );
};
