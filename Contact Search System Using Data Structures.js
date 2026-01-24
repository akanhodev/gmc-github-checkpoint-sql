const readline = require("readline");

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisify readline question for async/await
function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

/**
 * Represents a single contact with name and phone number.
 */
class Contact {
  constructor(name, phone) {
    this.name = name;
    this.phone = phone;
  }

  toString() {
    return `${this.name} - ${this.phone}`;
  }
}

/**
 * Node for doubly linked list containing a Contact.
 */
class Node {
  constructor(contact) {
    this.contact = contact;
    this.prev = null;
    this.next = null;
  }
}

/**
 * Doubly linked list to store contacts with forward/backward traversal.
 */
class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  /**
   * Add a contact to the end of the list.
   */
  add(contact) {
    const newNode = new Node(contact);

    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.size++;
    return newNode;
  }

  /**
   * Display all contacts from head to tail.
   */
  displayForward() {
    if (!this.head) {
      console.log("No contacts to display.");
      return;
    }

    let current = this.head;
    console.log("\n--- Contacts (Forward) ---");
    while (current) {
      console.log(current.contact.toString());
      current = current.next;
    }
    console.log(`Total: ${this.size} contact(s)\n`);
  }

  /**
   * Display all contacts from tail to head.
   */
  displayBackward() {
    if (!this.tail) {
      console.log("No contacts to display.");
      return;
    }

    let current = this.tail;
    console.log("\n--- Contacts (Backward) ---");
    while (current) {
      console.log(current.contact.toString());
      current = current.prev;
    }
    console.log(`Total: ${this.size} contact(s)\n`);
  }

  /**
   * Return all contacts as an array.
   */
  getAllContacts() {
    const contacts = [];
    let current = this.head;
    while (current) {
      contacts.push(current.contact);
      current = current.next;
    }
    return contacts;
  }
}

/**
 * Main contact management system combining linked list and hash table.
 */
class ContactManager {
  constructor() {
    this.contactList = new DoublyLinkedList();
    this.hashTable = {}; // Object for O(1) lookup by exact name
  }

  /**
   * Add a new contact to both the linked list and hash table.
   */
  addContact(name, phone) {
    // Check if contact already exists
    if (this.hashTable[name.toLowerCase()]) {
      console.log(`Contact '${name}' already exists!`);
      return false;
    }

    const contact = new Contact(name, phone);
    this.contactList.add(contact);
    this.hashTable[name.toLowerCase()] = contact;
    console.log("Contact added successfully.");
    return true;
  }

  /**
   * Search for a contact by exact name using hash table (O(1)).
   */
  searchByExactName(name) {
    const contact = this.hashTable[name.toLowerCase()];
    if (contact) {
      console.log(`\nMatch found: ${contact.toString()}\n`);
      return contact;
    } else {
      console.log(`\nNo contact found with name '${name}'.\n`);
      return null;
    }
  }

  /**
   * Naive substring search algorithm.
   */
  naiveSubstringSearch(text, pattern) {
    const n = text.length;
    const m = pattern.length;

    for (let i = 0; i <= n - m; i++) {
      let j = 0;
      while (j < m && text[i + j].toLowerCase() === pattern[j].toLowerCase()) {
        j++;
      }
      if (j === m) {
        return true;
      }
    }
    return false;
  }

  /**
   * Search for contacts containing the keyword using substring matching.
   */
  searchByKeyword(keyword) {
    const matches = [];
    const allContacts = this.contactList.getAllContacts();

    for (const contact of allContacts) {
      if (this.naiveSubstringSearch(contact.name, keyword)) {
        matches.push(contact);
      }
    }

    if (matches.length > 0) {
      console.log(`\n--- Search Results for '${keyword}' ---`);
      for (const contact of matches) {
        console.log(`Match found: ${contact.toString()}`);
      }
      console.log(`Total matches: ${matches.length}\n`);
    } else {
      console.log(`\nNo matches found for keyword '${keyword}'.\n`);
    }

    return matches;
  }

  /**
   * Display all contacts in forward order.
   */
  displayAllForward() {
    this.contactList.displayForward();
  }

  /**
   * Display all contacts in backward order.
   */
  displayAllBackward() {
    this.contactList.displayBackward();
  }
}

/**
 * Display the main menu options.
 */
function displayMenu() {
  console.log("\n=== Contact Management System ===");
  console.log("1. Add Contact");
  console.log("2. Search by Keyword");
  console.log("3. Search by Exact Name");
  console.log("4. View All (Forward)");
  console.log("5. View All (Backward)");
  console.log("6. Exit");
  console.log("=".repeat(34));
}

/**
 * Main function to run the contact management system.
 */
async function main() {
  const manager = new ContactManager();

  // Pre-populate with some sample data (optional)
  console.log("Initializing with sample contacts...");
  manager.addContact("Alice", "1234567890");
  manager.addContact("Bob", "2345678901");
  manager.addContact("Charlie", "3456789012");
  manager.addContact("David", "4567890123");
  manager.addContact("Alex", "5678901234");
  console.log();

  let running = true;

  while (running) {
    displayMenu();

    try {
      const option = (await question("Enter option: ")).trim();

      switch (option) {
        case "1":
          console.log("\n--- Add Contact ---");
          const name = (await question("Name: ")).trim();
          const phone = (await question("Phone: ")).trim();

          if (name && phone) {
            manager.addContact(name, phone);
          } else {
            console.log("Name and phone cannot be empty!");
          }
          break;

        case "2":
          console.log("\n--- Search by Keyword ---");
          const keyword = (await question("Search keyword: ")).trim();

          if (keyword) {
            manager.searchByKeyword(keyword);
          } else {
            console.log("Keyword cannot be empty!");
          }
          break;

        case "3":
          console.log("\n--- Search by Exact Name ---");
          const searchName = (await question("Enter name: ")).trim();

          if (searchName) {
            manager.searchByExactName(searchName);
          } else {
            console.log("Name cannot be empty!");
          }
          break;

        case "4":
          manager.displayAllForward();
          break;

        case "5":
          manager.displayAllBackward();
          break;

        case "6":
          console.log("\nThank you for using Contact Management System!");
          console.log("Goodbye!\n");
          running = false;
          break;

        default:
          console.log("\nInvalid option! Please choose 1-6.\n");
      }
    } catch (error) {
      console.log(`\nAn error occurred: ${error.message}\n`);
    }
  }

  rl.close();
}

// Run the program
main().catch((error) => {
  console.error("Fatal error:", error);
  rl.close();
  process.exit(1);
});
