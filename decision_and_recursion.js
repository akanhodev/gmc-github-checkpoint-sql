// ============================================================
//   Decision Making & Recursive Algorithms
//   Student: checkpoint exercise
// ============================================================


// ============================================================
// PART 1 – DECISION MAKING (if-else / switch)
// ============================================================

// ---- 1. Leap Year Checker ----
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  } else if (year % 100 === 0) {
    return false;
  } else if (year % 4 === 0) {
    return true;
  } else {
    return false;
  }
}

// Tests
console.log("=== Leap Year Checker ===");
console.log(`2000 → ${isLeapYear(2000)}`);  // true  (divisible by 400)
console.log(`1900 → ${isLeapYear(1900)}`);  // false (divisible by 100, not 400)
console.log(`2024 → ${isLeapYear(2024)}`);  // true  (divisible by 4)
console.log(`2023 → ${isLeapYear(2023)}`);  // false


// ---- 2. Ticket Pricing ----
function getTicketPrice(age) {
  let price;
  let category;

  if (age <= 12) {
    price    = 10;
    category = "Child";
  } else if (age <= 17) {
    price    = 15;
    category = "Teenager";
  } else {
    price    = 20;
    category = "Adult";
  }

  console.log(`Age ${age} → ${category}: $${price}`);
  return price;
}

console.log("\n=== Ticket Pricing ===");
getTicketPrice(8);   // Child  – $10
getTicketPrice(15);  // Teenager – $15
getTicketPrice(30);  // Adult  – $20


// ============================================================
// PART 2 – RECURSION
// ============================================================

// ---- 3. Fibonacci Sequence ----
function fibonacci(n) {
  // Base cases
  if (n === 0) return 0;
  if (n === 1) return 1;

  // Recursive case: fib(n) = fib(n-1) + fib(n-2)
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("\n=== Fibonacci Sequence ===");
for (let i = 0; i <= 8; i++) {
  process.stdout.write(fibonacci(i) + " ");
}
console.log();
// Expected: 0 1 1 2 3 5 8 13 21


// ---- 4. Palindrome Checker ----
function isPalindrome(str) {
  // Clean the string: lowercase, remove non-alphanumeric characters
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, "");

  // Base cases
  if (cleaned.length <= 1) return true;

  // Check first and last characters, then recurse on the middle part
  if (cleaned[0] !== cleaned[cleaned.length - 1]) {
    return false;
  }

  return isPalindrome(cleaned.slice(1, -1));
}

console.log("\n=== Palindrome Checker ===");
console.log(`"racecar"          → ${isPalindrome("racecar")}`);          // true
console.log(`"A man a plan a canal Panama" → ${isPalindrome("A man a plan a canal Panama")}`); // true
console.log(`"hello"            → ${isPalindrome("hello")}`);            // false
console.log(`"Was it a car or a cat I saw?" → ${isPalindrome("Was it a car or a cat I saw?")}`); // true
