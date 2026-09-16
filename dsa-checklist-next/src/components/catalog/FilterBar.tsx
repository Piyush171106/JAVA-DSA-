'use client';

import React from 'react';
import { useDSAStore } from '../../context/DSAContext';
import { Filter, Search, RotateCcw } from 'lucide-react';

const TOPIC_OPTIONS = [
  'All',
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

const PATTERN_OPTIONS = [
  'All',
  'Prefix Sum',
  'Two Pointers',
  'Sliding Window',
  'Fast & Slow Pointers',
  'Monotonic Stack',
  'Binary Search on Answer',
  'Top K Elements',
  'K-way Merge',
  'Two Heaps',
  'Subsets & Permutations',
  'BFS / Matrix Traversal',
  'DFS / Tree Traversal',
  'Topological Sort',
  'Union Find (Disjoint Set)',
  '0/1 Knapsack',
  'Unbounded Knapsack',
  'Longest Common Subsequence',
  'Longest Increasing Subsequence',
  'Trie Prefix Search',
  'Interval Merging',
  'Bitwise XOR Trick'
];

const COMPANY_OPTIONS = [
  'All',
  'Amazon',
  'Google',
  'Microsoft',
  'Meta',
  'Apple',
  'Uber',
  'Goldman Sachs',
  'Flipkart'
];

export default function FilterBar() {
  const { filterState, setFilterState } = useDSAStore();

  const handleResetFilters = () => {
    setFilterState({
      searchQuery: '',
      topic: 'All',
      pattern: 'All',
      difficulty: 'All',
      status: 'All',
      company: 'All',
    });
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-xl my-4 space-y-4">
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search problems by title, tag, or pattern..."
            value={filterState.searchQuery}
            onChange={(e) => setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Status Pills */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          {(['All', 'Solved', 'Unsolved', 'Revision'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setFilterState((prev) => ({ ...prev, status: st }))}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterState.status === st
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <button
          onClick={handleResetFilters}
          className="flex items-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-white bg-slate-950 rounded-xl border border-slate-800 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Multi-Select Dropdowns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {/* Topic Select */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1">Topic</label>
          <select
            value={filterState.topic}
            onChange={(e) => setFilterState((prev) => ({ ...prev, topic: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {TOPIC_OPTIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Pattern Select */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1">Coding Pattern</label>
          <select
            value={filterState.pattern}
            onChange={(e) => setFilterState((prev) => ({ ...prev, pattern: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {PATTERN_OPTIONS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* Difficulty Select */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1">Difficulty</label>
          <select
            value={filterState.difficulty}
            onChange={(e) => setFilterState((prev) => ({ ...prev, difficulty: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        {/* Target Company Select */}
        <div>
          <label className="block text-[11px] font-bold text-slate-400 mb-1">Target Company</label>
          <select
            value={filterState.company}
            onChange={(e) => setFilterState((prev) => ({ ...prev, company: e.target.value }))}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            {COMPANY_OPTIONS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
