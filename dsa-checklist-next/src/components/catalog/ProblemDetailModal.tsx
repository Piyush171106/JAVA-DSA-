'use client';

import React, { useState, useEffect } from 'react';
import { useDSAStore } from '../../context/DSAContext';
import { X, CheckCircle2, Circle, Bookmark, ExternalLink, Copy, Check, Lightbulb, Code2 } from 'lucide-react';

export default function ProblemDetailModal() {
  const {
    selectedProblem,
    setSelectedProblem,
    solvedIds,
    revisionIds,
    notes,
    toggleSolved,
    toggleRevision,
    saveNote,
  } = useDSAStore();

  const [noteText, setNoteText] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedProblem) {
      setNoteText(notes[selectedProblem.id] || '');
    }
  }, [selectedProblem, notes]);

  if (!selectedProblem) return null;

  const isSolved = solvedIds.has(selectedProblem.id);
  const isRevision = revisionIds.has(selectedProblem.id);

  const handleNoteSave = () => {
    saveNote(selectedProblem.id, noteText);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(selectedProblem.codeSnippetJava);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col justify-between">
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span
                className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                  selectedProblem.difficulty === 'Easy'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : selectedProblem.difficulty === 'Medium'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                }`}
              >
                {selectedProblem.difficulty}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-medium text-xs">
                {selectedProblem.topic}
              </span>
              <span className="px-2.5 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-medium text-xs">
                {selectedProblem.pattern}
              </span>
            </div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              #{selectedProblem.id}. {selectedProblem.title}
            </h2>
          </div>

          <button
            onClick={() => setSelectedProblem(null)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Target Companies */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Asked In Companies</h4>
            <div className="flex flex-wrap gap-1.5">
              {selectedProblem.companies.map((comp) => (
                <span
                  key={comp}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 font-medium"
                >
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Pattern Hint / Intuition */}
          <div className="bg-cyan-950/20 border border-cyan-500/30 rounded-2xl p-4">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-cyan-400" />
              Pattern Core Intuition
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed font-mono">{selectedProblem.patternHint}</p>
          </div>

          {/* Java Code Snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-indigo-400" />
                Java Solution Template
              </h4>
              <button
                onClick={handleCopyCode}
                className="flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition font-mono"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
            <pre className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs font-mono text-cyan-200 overflow-x-auto">
              <code>{selectedProblem.codeSnippetJava}</code>
            </pre>
          </div>

          {/* Personal Notes */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">My Personal Notes</h4>
            <textarea
              rows={3}
              placeholder="Write your key takeaways, time/space complexity notes, or edge cases here..."
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              onBlur={handleNoteSave}
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Modal Footer Controls */}
        <div className="p-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mark Solved */}
            <button
              onClick={() => toggleSolved(selectedProblem.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
                isSolved
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isSolved ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
              {isSolved ? 'Completed' : 'Mark as Solved'}
            </button>

            {/* Revision Bookmark */}
            <button
              onClick={() => toggleRevision(selectedProblem.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition ${
                isRevision
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                  : 'bg-slate-800 border-transparent text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {isRevision ? 'Revision Flagged' : 'Flag for Revision'}
            </button>
          </div>

          {/* LeetCode Button */}
          <a
            href={selectedProblem.leetcodeUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition"
          >
            Solve on LeetCode
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
