import React from 'react';
import { ThreeCanvas } from './ThreeCanvas';
import { Box, Sparkles, Cpu, Layers } from 'lucide-react';

export const Lab3DSection: React.FC = () => {
  return (
    <section id="lab-3d" className="py-20 bg-[#0B1325] text-white relative overflow-hidden">
      {/* Subtle background ambient lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5277E8]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#A78BFA]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-[#A78BFA] tracking-wider uppercase mb-3">
              <Box className="w-3.5 h-3.5" />
              <span>Interactive 3D Technology</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              3D Developer Station & Architecture Lab
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-2xl">
              An interactive 3D representation of modern full-stack development, procedural modeling, and graphics programming using Three.js and PBR shaders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>Procedural Geometry</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span>Studio PBR Lighting</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span>Zero External Assets</span>
            </span>
          </div>
        </div>

        {/* 3D Canvas Mount */}
        <ThreeCanvas />

        {/* Explanatory notes under 3D canvas */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-400">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="font-semibold text-slate-200 mb-1">Dual Display Terminal</p>
            <p>Procedural canvas textures rendering real-time IDE code and bash server output.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="font-semibold text-slate-200 mb-1">Rotational Camera & Controls</p>
            <p>Smoothly damped OrbitControls with preset angles for inspecting workstation elements.</p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <p className="font-semibold text-slate-200 mb-1">Exploded View Mode</p>
            <p>Isolates individual hardware and tech components to visualize the modular assembly.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
