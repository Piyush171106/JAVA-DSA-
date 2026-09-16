'use client';

import React, { useState } from 'react';
import { ROADMAP_DATA_30_DAYS, ROADMAP_DATA_60_DAYS } from '../../data/roadmaps';
import { Map, Calendar, Target, CheckCircle2 } from 'lucide-react';
import { useDSAStore } from '../../context/DSAContext';
import { DSATopic } from '../../types';

export default function PlacementRoadmap() {
  const [activePlan, setActivePlan] = useState<'30days' | '60days'>('30days');
  const { setFilterState, setActiveTab } = useDSAStore();

  const planData = activePlan === '30days' ? ROADMAP_DATA_30_DAYS : ROADMAP_DATA_60_DAYS;

  const handleTopicClick = (topic: DSATopic) => {
    setFilterState((prev) => ({ ...prev, topic }));
    setActiveTab('catalog');
  };

  return (
    <div className="space-y-6 my-6">
      {/* Header & Toggle */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <Map className="w-6 h-6 text-cyan-400" />
            Placement Preparation Roadmaps
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Structured milestone schedule to solve 300 curated questions before target placement drives.
          </p>
        </div>

        {/* Plan Switcher */}
        <div className="flex items-center gap-1 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          <button
            onClick={() => setActivePlan('30days')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activePlan === '30days'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            30-Day Intensive Sprint
          </button>
          <button
            onClick={() => setActivePlan('60days')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activePlan === '60days'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            60-Day Comprehensive Path
          </button>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-4">
        {planData.map((step, idx) => (
          <div
            key={idx}
            className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-cyan-500/40 transition"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {step.dayRange}
                </span>
                <h3 className="text-base font-extrabold text-white">{step.title}</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{step.description}</p>

              {/* Topic Pills */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {step.keyTopics.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTopicClick(t)}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 font-medium text-xs transition"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Count */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 self-start md:self-center">
              <Target className="w-5 h-5 text-emerald-400" />
              <div>
                <div className="text-sm font-black text-white font-mono">{step.recommendedCount} Problems</div>
                <div className="text-[10px] text-slate-400">Target Milestone</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
