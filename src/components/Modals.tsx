import React from 'react';
import { Project, PERSONAL_INFO } from '../data/portfolioData';
import { X, CheckCircle, Code2, ExternalLink, Mail, ShieldAlert, Layers } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onRequestCode: (project: Project) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestCode,
}) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 bg-[#101C35] text-white">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#A78BFA]">
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Project Overview
            </h4>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              "{project.description}"
            </p>
          </div>

          {/* Key Architectural Highlights */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Implementation Highlights
            </h4>
            <div className="space-y-2.5">
              {project.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Badges */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
              Technologies & Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-lg bg-[#F8F9FC] border border-slate-200 text-[#101C35] font-semibold text-xs shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Recruiter / Evaluator Note */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-3">
            <Layers className="w-5 h-5 text-[#5277E8] shrink-0 mt-0.5" />
            <div className="text-xs text-indigo-950 leading-relaxed">
              <span className="font-bold">Technical Verification:</span> This project forms part of Janvi Raj's core portfolio curriculum. Complete code walkthroughs and private repository access can be arranged directly.
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
          <button
            onClick={() => {
              onClose();
              onRequestCode(project);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-[#101C35] font-semibold text-xs shadow-2xs cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-[#5277E8]" />
            <span>Request Source Code</span>
          </button>

          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=Inquiry%20Regarding%20${encodeURIComponent(project.title)}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#101C35] hover:bg-[#5277E8] text-white font-semibold text-xs shadow-sm transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Discuss This Project</span>
          </a>
        </div>

      </div>
    </div>
  );
};

interface CodeRequestModalProps {
  project: Project | null;
  onClose: () => void;
}

export const CodeRequestModal: React.FC<CodeRequestModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  const emailSubject = encodeURIComponent(`Request for Source Code: ${project.title} - Janvi Raj Portfolio`);
  const emailBody = encodeURIComponent(
    `Hello Janvi,\n\nI am reviewing your portfolio and would like to request code repository access for "${project.title}".\n\nLooking forward to hearing from you!\n\nBest regards,`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-[#101C35] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#A78BFA]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Repository Access</h3>
              <p className="text-xs text-slate-300">{project.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-4">
          <p className="text-sm text-slate-700 leading-relaxed">
            In compliance with academic project privacy standards and authentic developer portfolio guidelines, code repositories and demo instances for <strong>{project.title}</strong> are shared upon direct recruiter or evaluator request.
          </p>

          <div className="p-4 rounded-2xl bg-[#F8F9FC] border border-slate-200/90 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold">Developer:</span>
              <span>Janvi Raj</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold">Primary Contact:</span>
              <span className="font-mono">{PERSONAL_INFO.email}</span>
            </div>
            <div className="flex items-center justify-between text-slate-700">
              <span className="font-semibold">Project Tech:</span>
              <span>{project.technologies.slice(0, 3).join(', ')}</span>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Click below to generate a pre-formatted email request directly to Janvi Raj.
          </p>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-800 cursor-pointer"
          >
            Cancel
          </button>

          <a
            href={`mailto:${PERSONAL_INFO.email}?subject=${emailSubject}&body=${emailBody}`}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#101C35] hover:bg-[#5277E8] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Request Repository Access</span>
          </a>
        </div>

      </div>
    </div>
  );
};
