'use client';

import React from 'react';
import { useDSAStore } from '../../context/DSAContext';
import ProgressSphere3D from '../3d/ProgressSphere3D';
import { CheckCircle2, Bookmark, Code, Award, Flame, Target } from 'lucide-react';
import Card3DTilt from '../3d/Card3DTilt';

export default function DashboardHeader() {
  const { problems, solvedIds, revisionIds, notes, setActiveTab } = useDSAStore();

  const total = problems.length;
  const solved = solvedIds.size;
  const revisions = revisionIds.size;
  const notesCount = Object.keys(notes).filter((k) => notes[Number(k)]?.trim().length > 0).length;

  const easySolved = problems.filter((p) => p.difficulty === 'Easy' && solvedIds.has(p.id)).length;
  const easyTotal = problems.filter((p) => p.difficulty === 'Easy').length;

  const mediumSolved = problems.filter((p) => p.difficulty === 'Medium' && solvedIds.has(p.id)).length;
  const mediumTotal = problems.filter((p) => p.difficulty === 'Medium').length;

  const hardSolved = problems.filter((p) => p.difficulty === 'Hard' && solvedIds.has(p.id)).length;
  const hardTotal = problems.filter((p) => p.difficulty === 'Hard').length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-6">
      {/* 3D Progress Sphere Hero Card */}
      <Card3DTilt className="lg:col-span-1">
        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col justify-between h-full relative overflow-hidden">
          <div className="flex items-center justify-between z-10">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                Placement Mastery
              </span>
              <h2 className="text-xl font-black text-white mt-1">3D Progress Canvas</h2>
            </div>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Award className="w-6 h-6" />
            </div>
          </div>

          <div className="my-4 h-64">
            <ProgressSphere3D solvedCount={solved} totalCount={total} />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Flame className="w-4 h-4" />
              {solved >= 100 ? 'Placement Ready!' : 'Keep Grinding'}
            </span>
            <button
              onClick={() => setActiveTab('catalog')}
              className="text-cyan-400 hover:text-cyan-300 font-bold transition flex items-center gap-1"
            >
              View Catalog &rarr;
            </button>
          </div>
        </div>
      </Card3DTilt>

      {/* Stats Summary & Difficulty Meters */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quick Stat Cards */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{solved} / {total}</div>
            <div className="text-xs text-slate-400">Total Solved Problems</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Bookmark className="w-7 h-7" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{revisions}</div>
            <div className="text-xs text-slate-400">Flagged for Pre-Interview Revision</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Code className="w-7 h-7" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">{notesCount}</div>
            <div className="text-xs text-slate-400">Personal Code Notes Saved</div>
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Target className="w-7 h-7" />
          </div>
          <div>
            <div className="text-2xl font-black text-white">20+</div>
            <div className="text-xs text-slate-400">Placement Coding Patterns</div>
          </div>
        </div>

        {/* Difficulty Breakdown Meters */}
        <div className="md:col-span-2 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <h3 className="text-sm font-bold text-slate-200 mb-4 flex items-center gap-2">
            <span>Difficulty Solved Breakdown</span>
          </h3>

          <div className="space-y-4">
            {/* Easy */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-emerald-400">Easy ({easySolved} / {easyTotal})</span>
                <span className="text-slate-400">{easyTotal > 0 ? Math.round((easySolved / easyTotal) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-500"
                  style={{ width: `${easyTotal > 0 ? (easySolved / easyTotal) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Medium */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-amber-400">Medium ({mediumSolved} / {mediumTotal})</span>
                <span className="text-slate-400">{mediumTotal > 0 ? Math.round((mediumSolved / mediumTotal) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400 transition-all duration-500"
                  style={{ width: `${mediumTotal > 0 ? (mediumSolved / mediumTotal) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Hard */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-rose-400">Hard ({hardSolved} / {hardTotal})</span>
                <span className="text-slate-400">{hardTotal > 0 ? Math.round((hardSolved / hardTotal) * 100) : 0}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-rose-400 transition-all duration-500"
                  style={{ width: `${hardTotal > 0 ? (hardSolved / hardTotal) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
