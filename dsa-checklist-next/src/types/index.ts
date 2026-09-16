export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type DSATopic =
  | 'Arrays & Hashing'
  | 'Two Pointers'
  | 'Sliding Window'
  | 'Prefix Sum & Subarrays'
  | 'Fast & Slow Pointers'
  | 'Binary Search'
  | 'Linked List'
  | 'Stack & Queue'
  | 'Binary Trees'
  | 'Binary Search Trees'
  | 'Heaps & Priority Queue'
  | 'Backtracking & Recursion'
  | 'Graphs'
  | 'Dynamic Programming'
  | 'Tries'
  | 'Intervals & Greedy'
  | 'Bit Manipulation & Math';

export type DSAPattern =
  | 'Prefix Sum'
  | 'Two Pointers'
  | 'Sliding Window'
  | 'Fast & Slow Pointers'
  | 'Monotonic Stack'
  | 'Binary Search on Answer'
  | 'Top K Elements'
  | 'K-way Merge'
  | 'Two Heaps'
  | 'Subsets & Permutations'
  | 'BFS / Matrix Traversal'
  | 'DFS / Tree Traversal'
  | 'Topological Sort'
  | 'Union Find (Disjoint Set)'
  | '0/1 Knapsack'
  | 'Unbounded Knapsack'
  | 'Longest Common Subsequence'
  | 'Longest Increasing Subsequence'
  | 'Trie Prefix Search'
  | 'Interval Merging'
  | 'Bitwise XOR Trick';

export interface Problem {
  id: number;
  title: string;
  topic: DSATopic;
  pattern: DSAPattern;
  difficulty: Difficulty;
  leetcodeUrl: string;
  gfgUrl?: string;
  companies: string[];
  patternHint: string;
  codeSnippetJava: string;
}

export interface ProblemUserStatus {
  solved: boolean;
  needsRevision: boolean;
  notes: string;
  lastSolvedAt?: string;
}

export interface UserProgressData {
  solvedIds: number[];
  revisionIds: number[];
  notes: Record<number, string>;
  customTags?: Record<number, string[]>;
}

export interface FilterState {
  searchQuery: string;
  topic: string;
  pattern: string;
  difficulty: string;
  status: 'All' | 'Solved' | 'Unsolved' | 'Revision' | 'Bookmarked';
  company: string;
}

export interface PatternInfo {
  id: string;
  name: DSAPattern;
  description: string;
  whenToUse: string[];
  timeComplexity: string;
  spaceComplexity: string;
  javaTemplate: string;
}

export interface RoadmapStep {
  dayRange: string;
  title: string;
  description: string;
  keyTopics: DSATopic[];
  recommendedCount: number;
}
