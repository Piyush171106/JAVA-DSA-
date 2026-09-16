'use client';

import React, { useMemo } from 'react';
import { useDSAStore } from '../../context/DSAContext';
import { ExternalLink, Bookmark, FileText, CheckCircle2, Circle } from 'lucide-react';
import { Problem } from '../../types';

export default function ProblemTable() {
  const {
    problems,
    solvedIds,
    revisionIds,
    notes,
    filterState,
    toggleSolved,
    toggleRevision,
    setSelectedProblem,
  } = useDSAStore();

  const filteredProblems = useMemo(() => {
    return problems.filter((p) => {
      // Search Query Filter
      if (filterState.searchQuery.trim().length > 0) {
        const q = filterState.searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchTopic = p.topic.toLowerCase().includes(q);
        const matchPattern = p.pattern.toLowerCase().includes(q);
        const matchCompany = p.companies.some((c) => c.toLowerCase().includes(q));
        if (!matchTitle && !matchTopic && !matchPattern && !matchCompany) return false;
      }

      // Topic Filter
      if (filterState.topic !== 'All' && p.topic !== filterState.topic) return false;

      // Pattern Filter
      if (filterState.pattern !== 'All' && p.pattern !== filterState.pattern) return false;

      // Difficulty Filter
      if (filterState.difficulty !== 'All' && p.difficulty !== filterState.difficulty) return false;

      // Company Filter
      if (filterState.company !== 'All' && !p.companies.includes(filterState.company)) return false;

      // Status Filter
      const isSolved = solvedIds.has(p.id);
      const isRevision = revisionIds.has(p.id);

      if (filterState.status === 'Solved' && !isSolved) return false;
      if (filterState.status === 'Unsolved' && isSolved) return false;
      if (filterState.status === 'Revision' && !isRevision) return false;

      return true;
    });
  }, [problems, solvedIds, revisionIds, filterState]);

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl my-4">
      {/* Table Stats Header */}
      <div className="px-6 py-4 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
        <div className="text-xs text-slate-400 font-mono">
          Showing <span className="font-bold text-cyan-400">{filteredProblems.length}</span> of {problems.length} Curated Placement Questions
        </div>
      </div>

      {/* Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 font-bold uppercase tracking-wider text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3.5 px-4 text-center w-12">Status</th>
              <th className="py-3.5 px-4">#</th>
              <th className="py-3.5 px-4">Problem Title</th>
              <th className="py-3.5 px-4">Topic</th>
              <th className="py-3.5 px-4">Pattern</th>
              <th className="py-3.5 px-4 text-center">Difficulty</th>
              <th className="py-3.5 px-4">Top Companies</th>
              <th className="py-3.5 px-4 text-center">Action / Links</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredProblems.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-12 text-slate-500 font-mono">
                  No problems match your selected filters. Try resetting search criteria!
                </td>
              </tr>
            ) : (
              filteredProblems.map((p) => {
                const isSolved = solvedIds.has(p.id);
                const isRevision = revisionIds.has(p.id);
                const hasNote = notes[p.id]?.trim().length > 0;

                return (
                  <tr
                    key={p.id}
                    className={`hover:bg-slate-800/40 transition-colors ${
                      isSolved ? 'bg-emerald-950/10' : ''
                    }`}
                  >
                    {/* Checkbox Status */}
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => toggleSolved(p.id)}
                        className="transition transform active:scale-125"
                      >
                        {isSolved ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                        )}
                      </button>
                    </td>

                    {/* ID */}
                    <td className="py-3 px-4 font-mono text-slate-500 font-semibold">{p.id}</td>

                    {/* Title */}
                    <td className="py-3 px-4 font-bold text-slate-200">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedProblem(p)}
                          className="hover:text-cyan-400 text-left transition"
                        >
                          {p.title}
                        </button>
                        {hasNote && (
                          <span title="Note saved" className="w-2 h-2 rounded-full bg-indigo-400"></span>
                        )}
                      </div>
                    </td>

                    {/* Topic */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-medium text-[11px]">
                        {p.topic}
                      </span>
                    </td>

                    {/* Pattern */}
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-medium text-[11px]">
                        {p.pattern}
                      </span>
                    </td>

                    {/* Difficulty */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                          p.difficulty === 'Easy'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : p.difficulty === 'Medium'
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        {p.difficulty}
                      </span>
                    </td>

                    {/* Top Companies */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {p.companies.slice(0, 3).map((comp) => (
                          <span
                            key={comp}
                            className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400"
                          >
                            {comp}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Actions & Practice Links */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Detail Modal Trigger */}
                        <button
                          onClick={() => setSelectedProblem(p)}
                          title="View Solution & Notes"
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>

                        {/* Revision Bookmark */}
                        <button
                          onClick={() => toggleRevision(p.id)}
                          title="Flag for Pre-Interview Revision"
                          className={`p-1.5 rounded-lg border transition ${
                            isRevision
                              ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                              : 'bg-slate-800 border-transparent text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5" />
                        </button>

                        {/* Direct LeetCode */}
                        <a
                          href={p.leetcodeUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Solve on LeetCode"
                          className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition flex items-center gap-1"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
