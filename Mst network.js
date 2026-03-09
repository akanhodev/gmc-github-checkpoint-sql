// ============================================================
// KRUSKAL'S ALGORITHM
// ============================================================
// Steps:
//  1. Sort all edges by cost (cheapest first)
//  2. Pick each edge — but skip it if it creates a cycle
//  3. Stop when we have (vertices - 1) edges in our MST
//
// To detect cycles, we use Union-Find (Disjoint Set)

// --- Union-Find helpers ---

// Each node starts as its own parent (its own group)
function makeParent(n) {
  const parent = [];
  const rank = [];
  for (let i = 0; i < n; i++) {
    parent[i] = i; // node is its own parent
    rank[i] = 0;
  }
  return { parent, rank };
}

// Find the root of a node's group (with path compression)
function find(parent, i) {
  if (parent[i] !== i) {
    parent[i] = find(parent, parent[i]); // shortcut to root
  }
  return parent[i];
}

// Join two groups together
function union(parent, rank, a, b) {
  const rootA = find(parent, a);
  const rootB = find(parent, b);
  if (rootA === rootB) return false; // already in same group = cycle!

  // Attach smaller tree under bigger tree
  if (rank[rootA] < rank[rootB]) parent[rootA] = rootB;
  else if (rank[rootA] > rank[rootB]) parent[rootB] = rootA;
  else {
    parent[rootB] = rootA;
    rank[rootA]++;
  }

  return true; // successfully joined
}

// --- Kruskal's main function ---
function kruskal(numComputers, edges) {
  // Sort edges from cheapest to most expensive
  const sorted = [...edges].sort((a, b) => a.cost - b.cost);

  const { parent, rank } = makeParent(numComputers);
  const mst = []; // edges we picked
  let totalCost = 0;

  for (const edge of sorted) {
    // Only add this edge if it doesn't form a cycle
    if (union(parent, rank, edge.from, edge.to)) {
      mst.push(edge);
      totalCost += edge.cost;
    }
    // Stop early once we have enough edges
    if (mst.length === numComputers - 1) break;
  }

  return { mst, totalCost };
}

// ============================================================
// PRIM'S ALGORITHM
// ============================================================
// Steps:
//  1. Start from any computer (we use computer 0)
//  2. Look at all edges going OUT from visited computers
//  3. Pick the cheapest one that connects to an unvisited computer
//  4. Repeat until all computers are visited
//
// We use a simple min-heap (priority queue) for step 3

// --- Simple Min-Heap ---
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(item) {
    this.heap.push(item);
    this._siftUp(this.heap.length - 1);
  }

  pop() {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._siftDown(0);
    }
    return top;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  _siftUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[i].cost < this.heap[parent].cost) {
        [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
        i = parent;
      } else break;
    }
  }

  _siftDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const l = 2 * i + 1,
        r = 2 * i + 2;
      if (l < n && this.heap[l].cost < this.heap[smallest].cost) smallest = l;
      if (r < n && this.heap[r].cost < this.heap[smallest].cost) smallest = r;
      if (smallest !== i) {
        [this.heap[i], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[i],
        ];
        i = smallest;
      } else break;
    }
  }
}

// --- Prim's main function ---
function prim(numComputers, edges) {
  // Build adjacency list: for each computer, list its neighbors
  const adj = Array.from({ length: numComputers }, () => []);
  for (const e of edges) {
    adj[e.from].push({ to: e.to, cost: e.cost, from: e.from, label: e.label });
    adj[e.to].push({ to: e.from, cost: e.cost, from: e.to, label: e.label });
  }

  const visited = new Array(numComputers).fill(false);
  const heap = new MinHeap();
  const mst = [];
  let totalCost = 0;

  // Start from computer 0 — add all its edges to the heap
  visited[0] = true;
  for (const edge of adj[0]) heap.push(edge);

  while (!heap.isEmpty() && mst.length < numComputers - 1) {
    const cheapest = heap.pop(); // grab the cheapest available edge

    if (visited[cheapest.to]) continue; // skip if already visited (would make cycle)

    // Accept this edge
    visited[cheapest.to] = true;
    mst.push({
      from: cheapest.from,
      to: cheapest.to,
      cost: cheapest.cost,
      label: cheapest.label,
    });
    totalCost += cheapest.cost;

    // Add new edges from the newly visited computer
    for (const edge of adj[cheapest.to]) {
      if (!visited[edge.to]) heap.push(edge);
    }
  }

  return { mst, totalCost };
}

// ============================================================
// OUTPUT HELPER
// ============================================================
function printResult(title, names, result) {
  console.log(`\n--- ${title} ---`);
  console.log("Selected connections:");
  for (const e of result.mst) {
    console.log(
      `  ${names[e.from]}  --[${e.cost}m]-->  ${names[e.to]}   (${e.label})`,
    );
  }
  console.log(`Total cable needed: ${result.totalCost} meters`);
}

// BONUS: Dynamic User Input (Node.js readline)
const readline = require("readline");

function runInteractive() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const ask = (q) => new Promise((res) => rl.question(q, res));

  (async () => {
    console.log("\n========================================");
    console.log("  Network Cable Optimizer (MST)");
    console.log("========================================");

    // --- Get computers ---
    const nStr = await ask("How many computers? ");
    const n = parseInt(nStr);
    const names = [];
    for (let i = 0; i < n; i++) {
      const name = await ask(`  Name of computer ${i}: `);
      names.push(name.trim());
    }

    // --- Get connections ---
    const eStr = await ask("How many connections (edges)? ");
    const numEdges = parseInt(eStr);
    const edges = [];

    console.log("Enter each connection as:  fromIndex  toIndex  cost  label");
    console.log('Example:  0 1 10 "Floor1-to-Floor2"');

    for (let i = 0; i < numEdges; i++) {
      const line = await ask(`  Connection ${i + 1}: `);
      const parts = line.trim().split(/\s+/);
      edges.push({
        from: parseInt(parts[0]),
        to: parseInt(parts[1]),
        cost: parseInt(parts[2]),
        label: parts.slice(3).join(" ") || `edge-${i}`,
      });
    }

    // --- Pick algorithm ---
    const algo = await ask("Use (K)ruskal or (P)rim? ").then((a) =>
      a.trim().toUpperCase(),
    );
    rl.close();

    if (algo === "K") {
      printResult("Kruskal's MST", names, kruskal(n, edges));
    } else {
      printResult("Prim's MST", names, prim(n, edges));
    }
  })();
}

// DEFAULT DEMO (runs when not in interactive mode)
function runDemo() {
  const names = ["A", "B", "C", "D", "E", "F"];
  const edges = [
    { from: 0, to: 1, cost: 10, label: "A-B" },
    { from: 0, to: 3, cost: 20, label: "A-D" },
    { from: 0, to: 4, cost: 30, label: "A-E" },
    { from: 1, to: 2, cost: 15, label: "B-C" },
    { from: 1, to: 4, cost: 35, label: "B-E" },
    { from: 2, to: 5, cost: 5, label: "C-F" },
    { from: 3, to: 4, cost: 25, label: "D-E" },
    { from: 4, to: 5, cost: 18, label: "E-F" },
  ];

  console.log("=== Office Network — Demo ===");
  console.log("Computers:", names.join(", "));
  console.log("Connections:");
  for (const e of edges) {
    console.log(`  ${names[e.from]} <--> ${names[e.to]}  cost=${e.cost}m`);
  }

  printResult("Kruskal's Algorithm", names, kruskal(names.length, edges));
  printResult("Prim's Algorithm", names, prim(names.length, edges));
}

if (process.argv.includes("--interactive")) {
  runInteractive();
} else {
  runDemo();
}
