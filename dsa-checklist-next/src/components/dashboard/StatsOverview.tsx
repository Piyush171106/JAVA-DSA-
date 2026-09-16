'use client';

import React from 'react';
import { useDSAStore } from '../../context/DSAContext';
import { DSATopic } from '../../types';
import { ChevronRight, Layers } from 'lucide-react';

const ALL_TOPICS: DSATopic[] = [
  'Arrays & Hashing',
  'Two Pointers',
  'Sliding Window',
  'Prefix Sum & Subarrays',
  'Fast & Slow Pointers',
  'Binary Search',
  'Linked List',
  'Stack & Queue',
  'Binary Trees',
  'Binary Search Trees',
  'Heaps & Priority Queue',
  'Backtracking & Recursion',
  'Graphs',
  'Dynamic Programming',
  'Tries',
  'Intervals & Greedy',
  'Bit Manipulation & Math'
];

export default function StatsOverview() {
  const { problems, solvedIds, setFilterState, setActiveTab } = useDSAStore();

  const handleTopicSelect = (topic: DSATopic) => {
    setFilterState((prev) => ({ ...prev, topic }));
    setActiveTab('catalog');
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl my-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            Topic-Wise Completion Matrix
          </h3>
          <p className="text-xs text-slate-400">Click any topic to view filtered problem set</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {ALL_TOPICS.map((topic) => {
          const topicProblems = problems.filter((p) => p.topic === topic);
          const solved = topicProblems.filter((p) => solvedIds.has(p.id)).length;
          const total = topicProblems.length;
          const pct = total > 0 ? Math.round((solved / total) * 100) : 0;

          return (
            <div
              key={topic}
              onClick={() => handleTopicSelect(topic)}
              className="group bg-slate-950/60 border border-slate-800/80 hover:border-cyan-500/50 rounded-xl p-4 transition-all cursor-pointer hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-400 transition-colors">
                    {topic}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                </div>
                <div className="text-xs text-slate-400 font-mono mt-1">
                  {solved} / {total} Solved
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-[11px] mb-1 font-mono">
                  <span className="text-slate-400">Progress</span>
                  <span className={pct === 100 ? 'text-emerald-400 font-bold' : 'text-cyan-400'}>{pct}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      pct === 100 ? 'bg-emerald-400' : 'bg-gradient-to-r from-cyan-500 to-indigo-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
