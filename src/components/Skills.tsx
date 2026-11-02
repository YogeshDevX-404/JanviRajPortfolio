import React, { useState, useMemo } from 'react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Code, Database, Sparkles, Search, Check, Terminal, Cpu } from 'lucide-react';

export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const tabs = [
    { id: 'all', label: 'All Technologies' },
    { id: 'Languages & Frameworks', label: 'Languages & Frameworks' },
    { id: 'Databases', label: 'Databases & Storage' },
    { id: 'AI & Modern Tools', label: 'AI & Modern Tools' },
  ];

  const filteredCategories = useMemo(() => {
    return SKILL_CATEGORIES.map((cat) => {
      // Check if category matches active tab
      const isCategoryMatch = activeTab === 'all' || cat.name === activeTab;
      if (!isCategoryMatch) return null;

      // Filter skills by search query
      const matchingSkills = cat.skills.filter((s) => {
        const q = searchQuery.toLowerCase().trim();
        if (!q) return true;
        return s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
      });

      if (matchingSkills.length === 0) return null;

      return {
        ...cat,
        skills: matchingSkills,
      };
    }).filter(Boolean);
  }, [activeTab, searchQuery]);

  const getCategoryIcon = (categoryName: string) => {
    if (categoryName.includes('Languages')) {
      return <Code className="w-5 h-5 text-[#5277E8]" />;
    }
    if (categoryName.includes('Databases')) {
      return <Database className="w-5 h-5 text-emerald-500" />;
    }
    return <Sparkles className="w-5 h-5 text-[#A78BFA]" />;
  };

  return (
    <section id="skills" className="py-24 bg-[#F8F9FC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold text-[#5277E8] tracking-widest uppercase mb-3">
            Technical Stack
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#101C35] tracking-tight">
            Technical Skills & Tooling
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Verified technical competencies from academic foundations to modern full-stack web applications and AI-driven development.
          </p>
          <div className="w-16 h-1 bg-[#5277E8] mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/60 border border-slate-300/60">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#101C35] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#101C35] hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter skills (e.g. React, SQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5277E8]/40 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Skill Category Blocks */}
        <div className="space-y-10">
          {filteredCategories.map((category) => {
            if (!category) return null;
            return (
              <div
                key={category.name}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/80 shadow-xs"
              >
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    {getCategoryIcon(category.name)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#101C35]">{category.name}</h3>
                    <p className="text-xs text-slate-500">{category.description}</p>
                  </div>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-4 rounded-2xl bg-[#F8F9FC] hover:bg-white border border-slate-200/70 hover:border-[#5277E8]/40 transition-all duration-200 shadow-2xs hover:shadow-md group flex flex-col justify-between"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-bold text-sm text-[#101C35] group-hover:text-[#5277E8] transition-colors">
                          {skill.name}
                        </span>
                        <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 stroke-[2.5]" />
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredCategories.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <p className="text-slate-500 text-sm">No skills found matching "{searchQuery}".</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="mt-3 px-4 py-1.5 text-xs font-semibold text-[#5277E8] hover:underline"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

        {/* Note on Proficiency Standards */}
        <div className="mt-12 text-center">
          <p className="text-xs text-slate-500 max-w-xl mx-auto">
            Skills reflect academic coursework, full-stack projects, and verified technical implementations based strictly on Janvi Raj's resume.
          </p>
        </div>

      </div>
    </section>
  );
};
