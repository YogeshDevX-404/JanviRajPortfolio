import React from 'react';
import { Layers, Lightbulb, Bot, BookOpen, CheckCircle2, Globe2, Trophy, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: <Layers className="w-6 h-6 text-[#5277E8]" />,
      title: "Full Stack Web Development",
      description:
        "Building end-to-end web architectures, connecting responsive frontend interfaces with robust backend APIs, business logic, and database schemas.",
      badge: "Core Expertise"
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-[#A78BFA]" />,
      title: "Problem Solving",
      description:
        "Tackling computational challenges with clean logic, well-structured algorithms, and defensive server-side data validation.",
      badge: "Methodical"
    },
    {
      icon: <Bot className="w-6 h-6 text-purple-600" />,
      title: "AI-assisted / Vibe Coding",
      description:
        "Leveraging generative AI workflows, structured prompt engineering, and rapid iteration to build polished, performant web applications faster.",
      badge: "Modern Workflow"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-emerald-600" />,
      title: "Continuous Learning",
      description:
        "Always expanding my technical horizons by mastering emerging web standards, modern developer toolkits, and industry best practices.",
      badge: "Growth Mindset"
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold text-[#5277E8] tracking-widest uppercase mb-3">
            Professional Profile
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C35] tracking-tight">
            About Me
          </h2>
          <div className="w-16 h-1 bg-[#5277E8] mx-auto mt-4 rounded-full" />
        </div>

        {/* Primary Bio Callout Box */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#F8F9FC] via-[#F3F6FD] to-[#FAF8FF] border border-slate-200/90 shadow-sm relative">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-12 h-12 rounded-2xl bg-[#101C35] text-white flex items-center justify-center shrink-0 shadow-md">
                <span className="font-mono font-bold text-lg text-[#A78BFA]">JR</span>
              </div>
              <div className="space-y-4">
                <p className="text-lg sm:text-xl text-[#202536] leading-relaxed font-normal">
                  "{PERSONAL_INFO.aboutText}"
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                    Degree: BCA (79% | 8.3 CGPA)
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                    College: Devki Devi Jain College, Ludhiana
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-2xs">
                    Affiliation: Panjab University
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Required Core Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#F8F9FC] hover:bg-white border border-slate-200/80 hover:border-[#5277E8]/40 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-[#101C35] flex items-center justify-center border border-slate-200 shadow-xs transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#101C35] mb-2.5 group-hover:text-[#5277E8] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Strengths, Languages & Interests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Professional Strengths */}
          <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#101C35] text-white flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#101C35]">Core Strengths</h3>
                <p className="text-xs text-slate-500">Professional attributes & work ethic</p>
              </div>
            </div>
            <ul className="space-y-3">
              {PERSONAL_INFO.strengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5277E8] mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-[#101C35] font-semibold">{str.title}:</strong>{' '}
                    <span className="text-slate-600">{str.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages Spoken */}
          <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#101C35] text-white flex items-center justify-center">
                <Globe2 className="w-5 h-5 text-[#A78BFA]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#101C35]">Languages Known</h3>
                <p className="text-xs text-slate-500">Communication & fluency</p>
              </div>
            </div>
            <div className="space-y-3">
              {PERSONAL_INFO.languagesSpoken.map((lang, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200/80"
                >
                  <span className="text-sm font-bold text-[#101C35]">{lang}</span>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                    Proficient
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Personal Interests & Hobbies */}
          <div className="p-6 rounded-2xl bg-[#F8F9FC] border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#101C35] text-white flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-bold text-[#101C35]">Interests & Balance</h3>
                <p className="text-xs text-slate-500">Beyond the code editor</p>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 font-bold text-lg">
                  🏸
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#101C35]">Playing Badminton</h4>
                  <p className="text-xs text-slate-500">
                    Active sport fostering agility, focus, stamina, and strategic reaction.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 text-xs text-indigo-900 leading-relaxed flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Believes in balanced personal growth and disciplined daily focus.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
