import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GraduationCap, Award, BookOpen, CheckCircle, Calendar, MapPin, Building2 } from 'lucide-react';

export const Education: React.FC = () => {
  const edu = PERSONAL_INFO.education;

  return (
    <section id="education" className="py-24 bg-[#F8F9FC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#5277E8] tracking-widest uppercase mb-3">
            Academic Background
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C35] tracking-tight">
            Education & Qualifications
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Formal collegiate computer science foundations, algorithm study, database management, and web programming.
          </p>
          <div className="w-16 h-1 bg-[#5277E8] mx-auto mt-4 rounded-full" />
        </div>

        {/* Education Timeline / Feature Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-lg">
            
            {/* Top row with degree title and merit score badges */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-100">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#101C35] text-white flex items-center justify-center shrink-0 shadow-md">
                  <GraduationCap className="w-8 h-8 text-[#A78BFA]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 text-[#5277E8] text-[11px] font-bold uppercase tracking-wider">
                      Undergraduate Degree
                    </span>
                    <span className="text-xs text-slate-400">• Completed</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#101C35]">
                    {edu.degree}
                  </h3>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-4 mt-2 text-sm text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium text-slate-800">
                      <Building2 className="w-4 h-4 text-slate-400" />
                      {edu.college}
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {edu.affiliation}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verified Scores Badge */}
              <div className="flex items-center gap-4 bg-gradient-to-r from-slate-50 to-indigo-50/50 p-4 rounded-2xl border border-slate-200">
                <div className="text-center px-3 border-r border-slate-200">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Score
                  </div>
                  <div className="text-2xl font-black text-[#5277E8]">
                    {edu.percentage}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">Percentage</div>
                </div>
                <div className="text-center px-3">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Cumulative
                  </div>
                  <div className="text-2xl font-black text-emerald-600">
                    {edu.cgpa}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium">CGPA / 10</div>
                </div>
              </div>
            </div>

            {/* Core Academic Pillars */}
            <div className="pt-8">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-[#5277E8]" />
                <h4 className="text-sm font-bold text-[#101C35] uppercase tracking-wider">
                  Core Computer Applications Curriculum
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {edu.coreSubjects.map((sub, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-[#F8F9FC] border border-slate-200/70 text-xs font-semibold text-slate-700 flex items-center gap-2.5"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Academic Highlights Summary */}
            <div className="mt-8 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-3">
              <Award className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-950 leading-relaxed">
                <span className="font-bold">Academic Distinction:</span> Maintained high academic standing with a 79% score (8.3 CGPA) throughout the Bachelor of Computer Applications program at Devki Devi Jain College under Panjab University curriculum guidelines.
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
