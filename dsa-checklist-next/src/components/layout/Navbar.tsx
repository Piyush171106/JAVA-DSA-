'use client';

import React, { useRef } from 'react';
import { useDSAStore } from '../../context/DSAContext';
import {
  LayoutDashboard,
  Globe2,
  ListTodo,
  Sparkles,
  Map,
  Download,
  Upload,
  RotateCcw,
  Search,
  Code2
} from 'lucide-react';

export default function Navbar() {
  const {
    solvedIds,
    problems,
    activeTab,
    setActiveTab,
    filterState,
    setFilterState,
    exportData,
    importData,
    resetProgress,
  } = useDSAStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const total = problems.length;
  const solved = solvedIds.size;
  const percent = total > 0 ? Math.round((solved / total) * 100) : 0;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const success = importData(text);
          if (success) alert('Progress & Notes imported successfully!');
          else alert('Failed to import JSON file. Invalid format.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 p-0.5 shadow-neon-cyan flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-indigo-300 to-emerald-400">
                  DSA Placement 3D
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                  300 Curated
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Pattern-wise & Topic-wise Tracker</p>
            </div>
          </div>

          {/* Center Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/70 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('constellation')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'constellation'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Globe2 className="w-4 h-4" />
              3D Constellation
            </button>
            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'catalog'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <ListTodo className="w-4 h-4" />
              300 Problems
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'patterns'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Master Patterns
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'roadmap'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <Map className="w-4 h-4" />
              Placement Roadmap
            </button>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <div className="relative hidden xl:block w-48">
              <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search problem..."
                value={filterState.searchQuery}
                onChange={(e) => {
                  setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }));
                  if (activeTab !== 'catalog') setActiveTab('catalog');
                }}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Solved Counter Badge */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-semibold text-slate-200 font-mono">
                {solved}/{total}
              </span>
              <span className="text-[10px] text-cyan-400 font-bold">({percent}%)</span>
            </div>

            {/* Data Export / Import */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              <button
                onClick={exportData}
                title="Backup Progress (Export JSON)"
                className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-md transition"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                title="Restore Backup (Import JSON)"
                className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-md transition"
              >
                <Upload className="w-4 h-4" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={resetProgress}
                title="Reset All Progress"
                className="p-1.5 hover:bg-rose-500/20 text-rose-400 rounded-md transition"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
