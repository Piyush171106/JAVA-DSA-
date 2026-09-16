'use client';

import React from 'react';
import Navbar from '../components/layout/Navbar';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import StatsOverview from '../components/dashboard/StatsOverview';
import TopicConstellation3D from '../components/3d/TopicConstellation3D';
import FilterBar from '../components/catalog/FilterBar';
import ProblemTable from '../components/catalog/ProblemTable';
import ProblemDetailModal from '../components/catalog/ProblemDetailModal';
import PatternCheatSheet from '../components/patterns/PatternCheatSheet';
import PlacementRoadmap from '../components/roadmap/PlacementRoadmap';
import { useDSAStore } from '../context/DSAContext';
import { Sparkles, Globe2, ListTodo, Map } from 'lucide-react';

export default function Home() {
  const { activeTab, setActiveTab } = useDSAStore();

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <DashboardHeader />
            <div className="my-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-cyan-400" />
                  3D Topic Universe Preview
                </h3>
                <button
                  onClick={() => setActiveTab('constellation')}
                  className="text-xs text-cyan-400 hover:underline font-semibold"
                >
                  Expand 3D View &rarr;
                </button>
              </div>
              <TopicConstellation3D />
            </div>
            <StatsOverview />
          </div>
        )}

        {/* TAB 2: 3D CONSTELLATION */}
        {activeTab === 'constellation' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <Globe2 className="w-6 h-6 text-cyan-400" />
                3D Topic Constellation Universe
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Explore the 17 core DSA topics in 3D space. Hover over node spheres for solve rates, or click to filter catalog questions by topic.
              </p>
            </div>

            <TopicConstellation3D />
          </div>
        )}

        {/* TAB 3: 300 PROBLEMS CATALOG */}
        {activeTab === 'catalog' && (
          <div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-4">
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                <ListTodo className="w-6 h-6 text-cyan-400" />
                300 Curated Placement Problems Catalog
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Filter by topic, pattern, difficulty, or target company. Check off problems as you solve them to save progress locally!
              </p>
            </div>

            <FilterBar />
            <ProblemTable />
          </div>
        )}

        {/* TAB 4: MASTER PATTERNS */}
        {activeTab === 'patterns' && (
          <div>
            <PatternCheatSheet />
          </div>
        )}

        {/* TAB 5: PLACEMENT ROADMAP */}
        {activeTab === 'roadmap' && (
          <div>
            <PlacementRoadmap />
          </div>
        )}
      </main>

      <ProblemDetailModal />

      <footer className="border-t border-slate-800/80 bg-slate-950/80 py-6 text-center text-xs text-slate-500 font-mono">
        <p>DSA Placement 3D Checklist • 300 Placement Curated Problems • Pattern-Wise & Topic-Wise</p>
      </footer>
    </div>
  );
}
