'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FilterState, Problem, UserProgressData } from '../types';
import { ALL_300_PROBLEMS } from '../data/problems';
import confetti from 'canvas-confetti';

interface DSAContextType {
  problems: Problem[];
  solvedIds: Set<number>;
  revisionIds: Set<number>;
  notes: Record<number, string>;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  toggleSolved: (id: number) => void;
  toggleRevision: (id: number) => void;
  saveNote: (id: number, text: string) => void;
  exportData: () => void;
  importData: (jsonStr: string) => boolean;
  resetProgress: () => void;
  activeTab: 'dashboard' | 'constellation' | 'catalog' | 'patterns' | 'roadmap';
  setActiveTab: (tab: 'dashboard' | 'constellation' | 'catalog' | 'patterns' | 'roadmap') => void;
  selectedProblem: Problem | null;
  setSelectedProblem: (p: Problem | null) => void;
}

const defaultFilter: FilterState = {
  searchQuery: '',
  topic: 'All',
  pattern: 'All',
  difficulty: 'All',
  status: 'All',
  company: 'All',
};

const STORAGE_KEY = 'DSA_CHECKLIST_PROGRESS_V1';

const DSAContext = createContext<DSAContextType | undefined>(undefined);

export const DSAContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [solvedIds, setSolvedIds] = useState<Set<number>>(new Set());
  const [revisionIds, setRevisionIds] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState<Record<number, string>>({});
  const [filterState, setFilterState] = useState<FilterState>(defaultFilter);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'constellation' | 'catalog' | 'patterns' | 'roadmap'>('dashboard');
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: UserProgressData = JSON.parse(saved);
        if (parsed.solvedIds) setSolvedIds(new Set(parsed.solvedIds));
        if (parsed.revisionIds) setRevisionIds(new Set(parsed.revisionIds));
        if (parsed.notes) setNotes(parsed.notes);
      }
    } catch (e) {
      console.error('Failed to parse saved DSA progress', e);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      const data: UserProgressData = {
        solvedIds: Array.from(solvedIds),
        revisionIds: Array.from(revisionIds),
        notes,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save DSA progress', e);
    }
  }, [solvedIds, revisionIds, notes]);

  const toggleSolved = (id: number) => {
    setSolvedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // Trigger celebratory confetti on solve
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      }
      return next;
    });
  };

  const toggleRevision = (id: number) => {
    setRevisionIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const saveNote = (id: number, text: string) => {
    setNotes((prev) => ({
      ...prev,
      [id]: text,
    }));
  };

  const exportData = () => {
    const data: UserProgressData = {
      solvedIds: Array.from(solvedIds),
      revisionIds: Array.from(revisionIds),
      notes,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dsa_placement_progress_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed: UserProgressData = JSON.parse(jsonStr);
      if (Array.isArray(parsed.solvedIds)) setSolvedIds(new Set(parsed.solvedIds));
      if (Array.isArray(parsed.revisionIds)) setRevisionIds(new Set(parsed.revisionIds));
      if (parsed.notes) setNotes(parsed.notes);
      return true;
    } catch (e) {
      console.error('Invalid JSON import file', e);
      return false;
    }
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress and notes? This action cannot be undone.')) {
      setSolvedIds(new Set());
      setRevisionIds(new Set());
      setNotes({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <DSAContext.Provider
      value={{
        problems: ALL_300_PROBLEMS,
        solvedIds,
        revisionIds,
        notes,
        filterState,
        setFilterState,
        toggleSolved,
        toggleRevision,
        saveNote,
        exportData,
        importData,
        resetProgress,
        activeTab,
        setActiveTab,
        selectedProblem,
        setSelectedProblem,
      }}
    >
      {children}
    </DSAContext.Provider>
  );
};

export const useDSAStore = () => {
  const context = useContext(DSAContext);
  if (!context) throw new Error('useDSAStore must be used within a DSAContextProvider');
  return context;
};
