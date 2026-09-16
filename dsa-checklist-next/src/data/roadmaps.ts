import { RoadmapStep } from '../types';

export const ROADMAP_DATA_30_DAYS: RoadmapStep[] = [
  {
    dayRange: 'Days 1 - 5',
    title: 'Foundations & Arrays Mastery',
    description: 'Master Array transformations, HashMaps, Prefix Sums, and Two Pointer fundamentals.',
    keyTopics: ['Arrays & Hashing', 'Two Pointers', 'Prefix Sum & Subarrays'],
    recommendedCount: 50
  },
  {
    dayRange: 'Days 6 - 10',
    title: 'Sliding Window & Monotonic Stack',
    description: 'Conquer fixed & variable sliding windows, Fast-Slow pointers, and Monotonic Stack questions.',
    keyTopics: ['Sliding Window', 'Fast & Slow Pointers', 'Stack & Queue'],
    recommendedCount: 50
  },
  {
    dayRange: 'Days 11 - 16',
    title: 'Binary Search & Linked Lists',
    description: 'Master binary search on answer range, rotated sorted arrays, and linked list group reversals.',
    keyTopics: ['Binary Search', 'Linked List'],
    recommendedCount: 50
  },
  {
    dayRange: 'Days 17 - 22',
    title: 'Trees, BST & Heaps',
    description: 'Master DFS/BFS traversals, LCA, Tree Max Path Sum, and Top-K Priority Queue patterns.',
    keyTopics: ['Binary Trees', 'Binary Search Trees', 'Heaps & Priority Queue'],
    recommendedCount: 60
  },
  {
    dayRange: 'Days 23 - 27',
    title: 'Graphs & Backtracking',
    description: 'Master grid traversals (Islands, Oranges), Topological Sort (Kahn\'s), and N-Queens backtracking.',
    keyTopics: ['Graphs', 'Backtracking & Recursion'],
    recommendedCount: 50
  },
  {
    dayRange: 'Days 28 - 30',
    title: 'Dynamic Programming & Placement Sprint',
    description: 'Master 0/1 Knapsack, LCS, LIS, Intervals, and take company mock tests.',
    keyTopics: ['Dynamic Programming', 'Intervals & Greedy', 'Tries', 'Bit Manipulation & Math'],
    recommendedCount: 40
  }
];

export const ROADMAP_DATA_60_DAYS: RoadmapStep[] = [
  {
    dayRange: 'Weeks 1 - 2',
    title: 'Core Data Structures (Arrays, Hash, Strings)',
    description: 'Build absolute confidence in two pointers, frequency maps, sliding windows, and prefix sums.',
    keyTopics: ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Prefix Sum & Subarrays'],
    recommendedCount: 80
  },
  {
    dayRange: 'Weeks 3 - 4',
    title: 'Pointers, Linked Lists & Linear Stacks',
    description: 'Master linked list reversals, fast/slow cycle detection, min stack, and monotonic stack.',
    keyTopics: ['Fast & Slow Pointers', 'Linked List', 'Stack & Queue'],
    recommendedCount: 60
  },
  {
    dayRange: 'Weeks 5 - 6',
    title: 'Binary Search & Tree Architectures',
    description: 'Deep dive into Binary Search on answer spaces, Binary Tree DFS/BFS, and BST operations.',
    keyTopics: ['Binary Search', 'Binary Trees', 'Binary Search Trees'],
    recommendedCount: 70
  },
  {
    dayRange: 'Weeks 7 - 8',
    title: 'Graphs, Advanced DP & Tries',
    description: 'Complete graph algorithms (Shortest Path, Union Find, Topo Sort) and master 1D/2D DP.',
    keyTopics: ['Heaps & Priority Queue', 'Backtracking & Recursion', 'Graphs', 'Dynamic Programming', 'Tries', 'Intervals & Greedy'],
    recommendedCount: 90
  }
];
