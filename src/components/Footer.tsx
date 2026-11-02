import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Mail, Phone, MapPin, ArrowUp, Code2, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: '3D Lab', href: '#lab-3d' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-[#101C35] text-white pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info (col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-mono font-bold text-white text-base border border-white/10">
                JR
              </div>
              <div>
                <h3 className="text-xl font-extrabold tracking-tight text-white">
                  JANVI RAJ
                </h3>
                <p className="text-xs font-semibold text-[#A78BFA] tracking-wide">
                  Full Stack Web Developer
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              BCA graduate passionate about building clean, functional, and performant web applications with modern frontend architectures, databases, and AI-assisted engineering.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>Ludhiana, Punjab</span>
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>MERN & Full Stack</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links (col-span-3) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Direct Links (col-span-4) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-[#A78BFA] group-hover:bg-white/10">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span>{PERSONAL_INFO.email}</span>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-emerald-400 group-hover:bg-white/10">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>{PERSONAL_INFO.phone}</span>
              </a>
            </div>

            <div className="pt-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}?subject=Resume%20Request%20-%20Janvi%20Raj`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-semibold text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#A78BFA]" />
                <span>Request Resume PDF via Email</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {currentYear} Janvi Raj and collab with YogeshDevX. All rights reserved. Built with React & Three.js.
          </p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              <span>Crafted for web excellence</span>
              <Sparkles className="w-3 h-3 text-[#A78BFA]" />
            </span>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
