'use client';

import React, { useState } from 'react';
import { PATTERNS_DATA } from '../../data/patterns';
import Card3DTilt from '../3d/Card3DTilt';
import { Sparkles, Code2, Clock, CheckCircle, Copy, Check } from 'lucide-react';

export default function PatternCheatSheet() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6 my-6">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-xl font-black text-white flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          Master Coding Patterns Cheat Sheet
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          The 20 fundamental algorithm patterns asked in top tech company interviews with standard Java templates.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PATTERNS_DATA.map((pattern) => (
          <Card3DTilt key={pattern.id}>
            <div className="bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 rounded-2xl p-6 shadow-xl h-full flex flex-col justify-between transition-all">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold text-xs">
                    {pattern.name}
                  </span>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    {pattern.timeComplexity}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">{pattern.description}</p>

                {/* When to use checklist */}
                <div className="mb-4 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">When to Apply:</h4>
                  <ul className="space-y-1">
                    {pattern.whenToUse.map((tip, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Code Template */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono font-bold text-indigo-400 flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5" /> Java Template
                  </span>
                  <button
                    onClick={() => handleCopy(pattern.id, pattern.javaTemplate)}
                    className="text-[11px] text-slate-400 hover:text-cyan-400 flex items-center gap-1 font-mono transition"
                  >
                    {copiedId === pattern.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedId === pattern.id ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <pre className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 text-[11px] font-mono text-cyan-200 overflow-x-auto max-h-48">
                  <code>{pattern.javaTemplate}</code>
                </pre>
              </div>
            </div>
          </Card3DTilt>
        ))}
      </div>
    </div>
  );
}
