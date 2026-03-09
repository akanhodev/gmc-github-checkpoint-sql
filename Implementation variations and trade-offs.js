// PART 1: QUEUE

class ArrayQueue {
  constructor(capacity) {
    this.capacity = capacity;
    this.data = new Array(capacity).fill(null);
    this.front = 0;
    this.rear = -1;
    this.size = 0;
  }

  // Add element to the back
  enqueue(element) {
    if (this.size === this.capacity) {
      console.log("Queue is full!");
      return;
    }
    // Use modulo to wrap around the array (circular trick)
    this.rear = (this.rear + 1) % this.capacity;
    this.data[this.rear] = element;
    this.size++;
  }

  // Remove and return element from the front
  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue is empty!");
      return null;
    }
    const element = this.data[this.front];
    this.data[this.front] = null;
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return element;
  }

  // Look at the front element without removing it
  peek() {
    if (this.isEmpty()) {
      console.log("Queue is empty!");
      return null;
    }
    return this.data[this.front];
  }

  // Check if queue has no elements
  isEmpty() {
    return this.size === 0;
  }

  toString() {
    if (this.isEmpty()) return "ArrayQueue: [ empty ]";
    const items = Array.from(
      { length: this.size },
      (_, i) => this.data[(this.front + i) % this.capacity],
    );
    return `ArrayQueue: [ ${items.join(" -> ")} ]`;
  }
}

// 1B. Linked List-Based Queue (Dynamic Size)

// A single node holding a value and a pointer to the next node
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedListQueue {
  constructor() {
    this.head = null; // front of the queue
    this.tail = null; // back of the queue
    this.size = 0;
  }

  // Add a new node to the back
  enqueue(element) {
    const node = new Node(element);
    if (this.tail !== null) {
      this.tail.next = node; // link old tail to new node
    }
    this.tail = node;
    if (this.head === null) {
      this.head = node; // first element: head and tail are the same
    }
    this.size++;
  }

  // Remove and return the front node's value
  dequeue() {
    if (this.isEmpty()) {
      console.log("Queue is empty!");
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next; // move head forward
    if (this.head === null) {
      this.tail = null; // queue is now empty
    }
    this.size--;
    return value;
  }

  // Look at the front value without removing it
  peek() {
    if (this.isEmpty()) {
      console.log("Queue is empty!");
      return null;
    }
    return this.head.value;
  }

  // Check if queue has no elements
  isEmpty() {
    return this.head === null;
  }

  toString() {
    const items = [];
    let cur = this.head;
    while (cur !== null) {
      items.push(cur.value);
      cur = cur.next;
    }
    return `LinkedListQueue: [ ${items.join(" -> ")} ]`;
  }
}

// PART 2: PRIORITY QUEUE

class MinHeapPriorityQueue {
  constructor() {
    this.heap = []; // stores { priority, value } objects
  }

  // Add a new item and fix the heap order
  insert(priority, value) {
    this.heap.push({ priority, value });
    this._siftUp(this.heap.length - 1); // move new item up if needed
  }

  // Remove and return the item with the lowest priority number
  extractMin() {
    if (this.isEmpty()) {
      console.log("Priority queue is empty!");
      return null;
    }
    // Swap the root with the last item, remove it, then fix the heap
    this._swap(0, this.heap.length - 1);
    const min = this.heap.pop();
    if (this.heap.length > 0) this._siftDown(0);
    return min;
  }

  // Look at the minimum item without removing it
  peekMin() {
    if (this.isEmpty()) {
      console.log("Priority queue is empty!");
      return null;
    }
    return this.heap[0];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  // Bubble item UP until its parent is smaller
  _siftUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[i].priority < this.heap[parent].priority) {
        this._swap(i, parent);
        i = parent;
      } else break;
    }
  }

  // Push item DOWN until both children are larger
  _siftDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
      if (left < n && this.heap[left].priority < this.heap[smallest].priority)
        smallest = left;
      if (right < n && this.heap[right].priority < this.heap[smallest].priority)
        smallest = right;
      if (smallest !== i) {
        this._swap(i, smallest);
        i = smallest;
      } else break;
    }
  }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  toString() {
    const s = this.heap.map((e) => `(p${e.priority}:"${e.value}")`).join(", ");
    return `MinHeapPQ: [ ${s} ]`;
  }
}

// 2B. Ordered Array Priority Queue

class OrderedArrayPriorityQueue {
  constructor() {
    this.data = [];
  }

  // Insert in the correct sorted position using binary search
  insert(priority, value) {
    let lo = 0,
      hi = this.data.length;
    // Binary search: find where this priority fits
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (this.data[mid].priority <= priority) lo = mid + 1;
      else hi = mid;
    }
    this.data.splice(lo, 0, { priority, value }); // insert at position lo
  }

  // The minimum is always at index 0
  extractMin() {
    if (this.isEmpty()) {
      console.log("Priority queue is empty!");
      return null;
    }
    return this.data.shift(); // remove and return first element
  }

  // Peek at the front (lowest priority)
  peekMin() {
    if (this.isEmpty()) {
      console.log("Priority queue is empty!");
      return null;
    }
    return this.data[0];
  }

  isEmpty() {
    return this.data.length === 0;
  }

  toString() {
    const s = this.data.map((e) => `(p${e.priority}:"${e.value}")`).join(", ");
    return `OrderedArrayPQ: [ ${s} ]`;
  }
}

// TESTS

// --- Array Queue ---

console.log("1A. ARRAY QUEUE (capacity 4)");

const aq = new ArrayQueue(4);
console.log("isEmpty?", aq.isEmpty());
aq.enqueue(10);
aq.enqueue(20);
aq.enqueue(30);
aq.enqueue(40);
console.log(aq.toString());
console.log("peek:", aq.peek());
console.log("dequeue:", aq.dequeue());
console.log("dequeue:", aq.dequeue());
console.log(aq.toString());
aq.enqueue(50);
aq.enqueue(60);
console.log("After enqueue 50, 60:", aq.toString());
// Edge: full queue
aq.enqueue(99);
// Edge: empty queue
while (!aq.isEmpty()) aq.dequeue();
aq.dequeue();
aq.peek();

// --- Linked List Queue ---

console.log("1B. LINKED LIST QUEUE (dynamic)");

const llq = new LinkedListQueue();
console.log("isEmpty?", llq.isEmpty());
llq.enqueue("A");
llq.enqueue("B");
llq.enqueue("C");
console.log(llq.toString());
console.log("peek:", llq.peek());
console.log("dequeue:", llq.dequeue());
console.log(llq.toString());
// Edge: empty queue
while (!llq.isEmpty()) llq.dequeue();
llq.dequeue();
llq.peek();

// --- Min-Heap Priority Queue ---

console.log("2A. MIN-HEAP PRIORITY QUEUE");

const mhpq = new MinHeapPriorityQueue();
console.log("isEmpty?", mhpq.isEmpty());
mhpq.insert(5, "low");
mhpq.insert(1, "critical");
mhpq.insert(3, "medium");
mhpq.insert(2, "high");
console.log(mhpq.toString());
console.log("peekMin:", JSON.stringify(mhpq.peekMin()));
console.log("extractMin:", JSON.stringify(mhpq.extractMin()));
console.log("extractMin:", JSON.stringify(mhpq.extractMin()));
console.log(mhpq.toString());
// Edge: empty queue
mhpq.extractMin();
mhpq.extractMin();
mhpq.extractMin();
mhpq.peekMin();

// --- Ordered Array Priority Queue ---

console.log("2B. ORDERED ARRAY PRIORITY QUEUE");

const oapq = new OrderedArrayPriorityQueue();
console.log("isEmpty?", oapq.isEmpty());
oapq.insert(5, "low");
oapq.insert(1, "critical");
oapq.insert(3, "medium");
oapq.insert(2, "high");
console.log(oapq.toString());
console.log("peekMin:", JSON.stringify(oapq.peekMin()));
console.log("extractMin:", JSON.stringify(oapq.extractMin()));
console.log("extractMin:", JSON.stringify(oapq.extractMin()));
console.log(oapq.toString());
// Edge: empty queue
while (!oapq.isEmpty()) oapq.extractMin();
oapq.extractMin();
oapq.peekMin();

// --- Trade-off Summary ---

console.log("TRADE-OFF SUMMARY");

console.log(`
Structure                    | Insert  | Remove  | Peek
-----------------------------|---------|---------|-------
Array Queue (circular)       | O(1)    | O(1)    | O(1)
Linked List Queue            | O(1)    | O(1)    | O(1)
Min-Heap Priority Queue      | O(logn) | O(logn) | O(1)
Ordered Array Priority Queue | O(n)    | O(n)    | O(1)

Array Queue    -> fast, but fixed size (can overflow)
Linked List    -> flexible size, but uses more memory per node
Min-Heap       -> best for large priority queues (O log n)
Ordered Array  -> simple to understand, but slow for large data
`);
