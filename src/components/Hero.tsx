import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, Sparkles, MapPin, GraduationCap, Code2, Linkedin, ExternalLink } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const [showLinkedInTooltip, setShowLinkedInTooltip] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Specific technology highlights requested by user
  const techHighlights = ['React.js', 'JavaScript', 'Node.js', 'MongoDB', 'PHP'];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-24 pb-16 lg:pt-32 lg:pb-24 flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#F8F9FC] via-[#F3F5FA] to-[#F8F9FC]"
    >
      {/* Subtle decorative background ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#A78BFA]/12 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-[#5277E8]/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#101C35 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/*
          EXACT TWO-COLUMN HORIZONTAL HERO LAYOUT:
          Desktop: 42% Left (Image) and 58% Right (Text & Content), vertically centered, gap 50px.
          Tablet: Two columns maintained with responsive gap.
          Mobile: Gracefully stacked vertically, center-aligned.
        */}
        <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] lg:grid-cols-[42%_1fr] items-center gap-8 md:gap-10 lg:gap-[50px] w-full">
          
          {/* ========================================================
              LEFT COLUMN – PROFILE IMAGE (Approx 42% width)
              ======================================================== */}
          <div className="flex justify-center items-center w-full">
            <div className="relative w-full max-w-[420px] md:max-w-none group">
              {/* Outer decorative gradient border ring with subtle glow */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-[#101C35] via-[#5277E8] to-[#A78BFA] opacity-30 blur-sm group-hover:opacity-50 transition duration-500" />

              {/* Premium rounded rectangular image container */}
              <div className="relative rounded-3xl overflow-hidden bg-white p-2 sm:p-2.5 shadow-2xl border border-slate-200/90">
                <div className="relative rounded-2xl overflow-hidden aspect-[9/15.2] bg-slate-100 flex items-center justify-center">
                  <img
                    src="/assets/aistudio/Polished_Office_Portrait_with_Plant_6e186a28.png"
                    alt="Janvi Raj - Full Stack Web Developer"
                    className="w-full h-full object-cover object-top transform transition-transform duration-700 group-hover:scale-[1.015]"
                    loading="eager"
                  />

                  {/* Subtle lower gradient overlay for text readability on badge */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101C35]/40 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Accent Badge inside photo */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-white/95 backdrop-blur-md border border-white/50 shadow-md text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Academic Merit
                        </p>
                        <p className="text-xs font-extrabold text-[#101C35]">
                          BCA Graduate • 79% (8.3 CGPA)
                        </p>
                      </div>
                      <div className="w-7 h-7 rounded-lg bg-[#101C35] flex items-center justify-center text-white">
                        <GraduationCap className="w-3.5 h-3.5 text-[#A78BFA]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtle top floating status pill */}
              <div className="absolute -top-3 right-3 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-md text-[11px] font-bold text-[#101C35]">
                <Sparkles className="w-3 h-3 text-[#5277E8]" />
                <span>Full Stack Developer</span>
              </div>
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN – ALL TEXT CONTENT (Vertically Centered)
              ======================================================== */}
          <div className="flex flex-col justify-center text-center md:text-left w-full">
            
            {/* Availability Indicator (Static, Clean, Recruiter-Friendly) */}
            <div className="inline-flex items-center justify-center md:justify-start gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-4 w-fit mx-auto md:mx-0">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[11px] sm:text-xs font-semibold text-slate-700 tracking-wide">
                Available for Full Stack Opportunities
              </span>
            </div>

            {/* 1. Small greeting */}
            <p className="text-sm sm:text-base font-bold tracking-widest text-[#5277E8] uppercase mb-1">
              Hello, I'm
            </p>

            {/* 2. Large heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#101C35] tracking-tight mb-2">
              JANVI RAJ
            </h1>

            {/* 3. Professional title */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-base sm:text-xl lg:text-2xl font-bold mb-4">
              <span className="text-[#5277E8]">BCA Graduate</span>
              <span className="text-slate-300">|</span>
              <span className="text-[#101C35]">Full Stack Web Developer</span>
            </div>

            {/* 4. Professional introduction paragraph */}
            <p className="text-slate-700 text-sm sm:text-base lg:text-[17px] leading-relaxed mb-6 font-normal max-w-2xl mx-auto md:mx-0">
              Enthusiastic Full Stack Web Developer passionate about building modern, functional and user-friendly web applications. I enjoy transforming ideas into digital experiences using modern web technologies and AI-assisted development.
            </p>

            {/* 5. Technology highlights: React.js, JavaScript, Node.js, MongoDB, PHP */}
            <div className="mb-7">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                Core Technologies
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                {techHighlights.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[#101C35] text-xs font-bold shadow-2xs hover:border-[#5277E8]/50 hover:bg-slate-50 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
                <span className="px-3 py-1.5 rounded-lg bg-[#EDE9FE] border border-[#A78BFA]/40 text-[#4338CA] text-xs font-bold">
                  AI-Assisted Workflows
                </span>
              </div>
            </div>

            {/* 6. Two CTA buttons */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3.5 mb-7">
              {/* Button 1: Explore My Work */}
              <button
                onClick={() => scrollTo('projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#101C35] hover:bg-[#5277E8] text-white font-bold text-sm shadow-md shadow-[#101C35]/15 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Button 2: Contact Me */}
              <button
                onClick={() => scrollTo('contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#101C35] border border-slate-300 font-bold text-sm shadow-xs hover:border-[#101C35]/40 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#5277E8]" />
                <span>Contact Me</span>
              </button>

              {/* 3D Lab shortcut button */}
              <button
                onClick={() => scrollTo('lab-3d')}
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold transition-all duration-200 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>3D Tech Lab</span>
              </button>
            </div>

            {/* 7. Social media & direct connection links */}
            <div className="pt-4 border-t border-slate-200/80 flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-slate-600">
              <span className="font-semibold text-slate-500 uppercase tracking-wider text-[11px]">
                Connect:
              </span>

              {/* Email direct link */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-[#5277E8] hover:text-[#5277E8] text-slate-700 font-medium transition-colors shadow-2xs"
                title="Send email"
              >
                <Mail className="w-3.5 h-3.5 text-[#5277E8]" />
                <span>Email</span>
              </a>

              {/* Phone / Call link */}
              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-emerald-500 hover:text-emerald-700 text-slate-700 font-medium transition-colors shadow-2xs"
                title="Call phone"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>+91 9877929194</span>
              </a>

              {/* LinkedIn status action */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowLinkedInTooltip(!showLinkedInTooltip)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-blue-400 hover:text-blue-700 text-slate-700 font-medium transition-colors shadow-2xs cursor-pointer"
                  title="LinkedIn Status"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0077b5]" />
                  <span>LinkedIn</span>
                </button>

                {showLinkedInTooltip && (
                  <div className="absolute bottom-full left-0 mb-2 w-64 p-3 rounded-xl bg-slate-900 text-white text-xs leading-relaxed shadow-xl border border-slate-700 z-30 text-left animate-in fade-in zoom-in-95">
                    <p className="font-bold text-slate-200 mb-0.5">LinkedIn Profile</p>
                    <p className="text-slate-300 text-[11px]">
                      Profile link available on recruiter inquiry. Contact via email ({PERSONAL_INFO.email}).
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowLinkedInTooltip(false)}
                      className="mt-1.5 text-[10px] text-[#A78BFA] hover:underline cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>

              {/* Location pill */}
              <span className="flex items-center gap-1 text-slate-500 text-[11px] ml-1">
                <MapPin className="w-3 h-3 text-slate-400" />
                <span>Ludhiana, Punjab</span>
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
