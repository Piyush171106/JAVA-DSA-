import { PatternInfo } from '../types';

export const PATTERNS_DATA: PatternInfo[] = [
  {
    id: 'prefix-sum',
    name: 'Prefix Sum',
    description: 'Precompute cumulative sums of elements in an array to answer range sum queries in O(1) time or detect zero-sum subarrays using HashMaps.',
    whenToUse: [
      'Subarray sum equals K',
      'Range sum queries [left..right]',
      'Contiguous subarray sum problems',
      'Difference array interval updates'
    ],
    timeComplexity: 'Build O(N), Query O(1)',
    spaceComplexity: 'O(N)',
    javaTemplate: `// Prefix Sum + HashMap Template
Map<Integer, Integer> map = new HashMap<>();
map.put(0, 1); // Base case for prefix sum starting from index 0
int currSum = 0, count = 0;

for (int num : nums) {
    currSum += num;
    if (map.containsKey(currSum - target)) {
        count += map.get(currSum - target);
    }
    map.put(currSum, map.getOrDefault(currSum, 0) + 1);
}`
  },
  {
    id: 'two-pointers',
    name: 'Two Pointers',
    description: 'Use two pointers starting at opposite ends or same direction moving towards each other to process sorted arrays or linked lists in linear time.',
    whenToUse: [
      'Sorted array search pairs (e.g. 2Sum II, 3Sum)',
      'Reversing arrays/strings or checking palindromes',
      'Trapping rain water or container with max area',
      'Merging two sorted arrays'
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaTemplate: `// Two Pointers Opposite Ends Template
int left = 0, right = nums.length - 1;
while (left < right) {
    int currentSum = nums[left] + nums[right];
    if (currentSum == target) {
        // Found pair
        left++; right--;
    } else if (currentSum < target) {
        left++;
    } else {
        right--;
    }
}`
  },
  {
    id: 'sliding-window',
    name: 'Sliding Window',
    description: 'Maintain a dynamic or fixed-size window over contiguous elements to optimize sub-segment queries from O(N^2) to O(N).',
    whenToUse: [
      'Longest/shortest subarray or substring with condition K',
      'Substrings containing specific set of characters',
      'Fixed window size max/min sum'
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(K) or O(1)',
    javaTemplate: `// Variable Sliding Window Template
Map<Character, Integer> counts = new HashMap<>();
int left = 0, maxLen = 0;

for (int right = 0; right < s.length(); right++) {
    char c = s.charAt(right);
    counts.put(c, counts.getOrDefault(c, 0) + 1);

    // Shrink window if invalid condition met
    while (/* condition invalid */) {
        char leftChar = s.charAt(left);
        counts.put(leftChar, counts.get(leftChar) - 1);
        if (counts.get(leftChar) == 0) counts.remove(leftChar);
        left++;
    }

    maxLen = Math.max(maxLen, right - left + 1);
}`
  },
  {
    id: 'fast-slow-pointers',
    name: 'Fast & Slow Pointers',
    description: 'Use two pointers moving at different speeds (1 step vs 2 steps) to detect cycles, find middle nodes, or happy numbers without auxiliary memory.',
    whenToUse: [
      'Linked list cycle detection',
      'Find starting node of cycle',
      'Middle of linked list',
      'Palindrome linked list'
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(1)',
    javaTemplate: `// Fast & Slow Pointers Template
ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) {
        // Cycle detected!
        break;
    }
}`
  },
  {
    id: 'monotonic-stack',
    name: 'Monotonic Stack',
    description: 'Maintain elements in strictly increasing or decreasing order inside a stack to find next greater element, previous smaller element, or histogram areas in linear time.',
    whenToUse: [
      'Next Greater / Previous Smaller Element',
      'Daily Temperatures / Stock Span',
      'Largest Rectangle in Histogram',
      'Sliding Window Maximum (Deque)'
    ],
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    javaTemplate: `// Monotonic Decreasing Stack Template
Stack<Integer> stack = new Stack<>();
int[] result = new int[nums.length];

for (int i = 0; i < nums.length; i++) {
    while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
        int idx = stack.pop();
        result[idx] = nums[i]; // Next greater element
    }
    stack.push(i);
}`
  },
  {
    id: 'binary-search-answer',
    name: 'Binary Search on Answer',
    description: 'When the search space is monotonic (e.g. minimum capacity, maximum rate), binary search over the range of possible answers [min..max] checking feasibility in O(N).',
    whenToUse: [
      'Koko Eating Bananas (eating rate)',
      'Capacity to Ship Packages within D Days',
      'Split Array Largest Sum',
      'Book Allocation Problem'
    ],
    timeComplexity: 'O(N log(MaxVal - MinVal))',
    spaceComplexity: 'O(1)',
    javaTemplate: `// Binary Search on Answer Template
int low = 1, high = maxPossibleValue;
int ans = high;

while (low <= high) {
    int mid = low + (high - low) / 2;
    if (isValid(mid, nums, K)) {
        ans = mid; // Record valid candidate
        high = mid - 1; // Try smaller answer for minimization
    } else {
        low = mid + 1;
    }
}`
  },
  {
    id: 'top-k-elements',
    name: 'Top K Elements',
    description: 'Use a Min-Heap of size K (or Max-Heap) to maintain top K largest or smallest elements without sorting the entire dataset.',
    whenToUse: [
      'Top K Frequent Elements/Words',
      'Kth Largest/Smallest element',
      'K Closest Points to Origin',
      'Task Scheduler'
    ],
    timeComplexity: 'O(N log K)',
    spaceComplexity: 'O(K)',
    javaTemplate: `// Min-Heap of Size K Template
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

for (int num : nums) {
    minHeap.add(num);
    if (minHeap.size() > k) {
        minHeap.poll(); // Evict smallest element
    }
}
// Top of minHeap is the Kth largest element!`
  },
  {
    id: 'topological-sort',
    name: 'Topological Sort',
    description: "Linearly order vertices in a directed acyclic graph (DAG) such that for every directed edge u -> v, u comes before v. Solved via Kahn's Algorithm (BFS) or DFS.",
    whenToUse: [
      'Course Schedule / Dependency resolution',
      'Task execution ordering',
      'Build systems compilation order',
      'Detecting cycle in directed graph'
    ],
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    javaTemplate: `// Kahn's Algorithm (BFS Topological Sort)
int[] inDegree = new int[V];
Queue<Integer> queue = new LinkedList<>();

for (int i = 0; i < V; i++) {
    if (inDegree[i] == 0) queue.add(i);
}

List<Integer> topoOrder = new ArrayList<>();
while (!queue.isEmpty()) {
    int node = queue.poll();
    topoOrder.add(node);
    for (int neighbor : adj.get(node)) {
        inDegree[neighbor]--;
        if (inDegree[neighbor] == 0) queue.add(neighbor);
    }
}`
  },
  {
    id: 'knapsack-01',
    name: '0/1 Knapsack',
    description: 'Dynamic Programming pattern where each item can either be taken once or skipped to maximize value within a weight capacity or reach a target sum.',
    whenToUse: [
      'Partition Equal Subset Sum',
      'Target Sum',
      'House Robber series',
      'Subset Sum Equals K'
    ],
    timeComplexity: 'O(N * Capacity)',
    spaceComplexity: 'O(Capacity)',
    javaTemplate: `// 1D Space Optimized 0/1 Knapsack Template
boolean[] dp = new boolean[target + 1];
dp[0] = true;

for (int num : nums) {
    for (int i = target; i >= num; i--) {
        dp[i] = dp[i] || dp[i - num];
    }
}`
  }
];
