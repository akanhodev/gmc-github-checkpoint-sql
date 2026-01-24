
class Contact:
    """Represents a single contact with name and phone number."""
    def __init__(self, name, phone):
        self.name = name
        self.phone = phone
    
    def __str__(self):
        return f"{self.name} - {self.phone}"


class Node:
    """Node for doubly linked list containing a Contact."""
    def __init__(self, contact):
        self.contact = contact
        self.prev = None
        self.next = None


class DoublyLinkedList:
    """Doubly linked list to store contacts with forward/backward traversal."""
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0
    
    def add(self, contact):
        """Add a contact to the end of the list."""
        new_node = Node(contact)
        
        if not self.head:
            self.head = self.tail = new_node
        else:
            self.tail.next = new_node
            new_node.prev = self.tail
            self.tail = new_node
        
        self.size += 1
        return new_node
    
    def display_forward(self):
        """Display all contacts from head to tail."""
        if not self.head:
            print("No contacts to display.")
            return
        
        current = self.head
        print("\n--- Contacts (Forward) ---")
        while current:
            print(current.contact)
            current = current.next
        print(f"Total: {self.size} contact(s)\n")
    
    def display_backward(self):
        """Display all contacts from tail to head."""
        if not self.tail:
            print("No contacts to display.")
            return
        
        current = self.tail
        print("\n--- Contacts (Backward) ---")
        while current:
            print(current.contact)
            current = current.prev
        print(f"Total: {self.size} contact(s)\n")
    
    def get_all_contacts(self):
        """Return all contacts as a list."""
        contacts = []
        current = self.head
        while current:
            contacts.append(current.contact)
            current = current.next
        return contacts


class ContactManager:
    """Main contact management system combining linked list and hash table."""
    def __init__(self):
        self.contact_list = DoublyLinkedList()
        self.hash_table = {}  # Dictionary for O(1) lookup by exact name
    
    def add_contact(self, name, phone):
        """Add a new contact to both the linked list and hash table."""
        # Check if contact already exists
        if name.lower() in self.hash_table:
            print(f"Contact '{name}' already exists!")
            return False
        
        contact = Contact(name, phone)
        self.contact_list.add(contact)
        self.hash_table[name.lower()] = contact
        print("Contact added successfully.")
        return True
    
    def search_by_exact_name(self, name):
        """Search for a contact by exact name using hash table (O(1))."""
        contact = self.hash_table.get(name.lower())
        if contact:
            print(f"\nMatch found: {contact}\n")
            return contact
        else:
            print(f"\nNo contact found with name '{name}'.\n")
            return None
    
    def naive_substring_search(self, text, pattern):
        """Naive substring search algorithm."""
        n = len(text)
        m = len(pattern)
        
        for i in range(n - m + 1):
            j = 0
            while j < m and text[i + j].lower() == pattern[j].lower():
                j += 1
            if j == m:
                return True
        return False
    
    def search_by_keyword(self, keyword):
        """Search for contacts containing the keyword using substring matching."""
        matches = []
        all_contacts = self.contact_list.get_all_contacts()
        
        for contact in all_contacts:
            if self.naive_substring_search(contact.name, keyword):
                matches.append(contact)
        
        if matches:
            print(f"\n--- Search Results for '{keyword}' ---")
            for contact in matches:
                print(f"Match found: {contact}")
            print(f"Total matches: {len(matches)}\n")
        else:
            print(f"\nNo matches found for keyword '{keyword}'.\n")
        
        return matches
    
    def display_all_forward(self):
        """Display all contacts in forward order."""
        self.contact_list.display_forward()
    
    def display_all_backward(self):
        """Display all contacts in backward order."""
        self.contact_list.display_backward()


def display_menu():
    """Display the main menu options."""
    print("\n=== Contact Management System ===")
    print("1. Add Contact")
    print("2. Search by Keyword")
    print("3. Search by Exact Name")
    print("4. View All (Forward)")
    print("5. View All (Backward)")
    print("6. Exit")
    print("=" * 34)


def main():
    """Main function to run the contact management system."""
    manager = ContactManager()
    
    # Pre-populate with some sample data (optional)
    print("Initializing with sample contacts...")
    manager.add_contact("Alice", "1234567890")
    manager.add_contact("Bob", "2345678901")
    manager.add_contact("Charlie", "3456789012")
    manager.add_contact("David", "4567890123")
    manager.add_contact("Alex", "5678901234")
    print()
    
    while True:
        display_menu()
        
        try:
            option = input("Enter option: ").strip()
            
            if option == "1":
                print("\n--- Add Contact ---")
                name = input("Name: ").strip()
                phone = input("Phone: ").strip()
                
                if name and phone:
                    manager.add_contact(name, phone)
                else:
                    print("Name and phone cannot be empty!")
            
            elif option == "2":
                print("\n--- Search by Keyword ---")
                keyword = input("Search keyword: ").strip()
                
                if keyword:
                    manager.search_by_keyword(keyword)
                else:
                    print("Keyword cannot be empty!")
            
            elif option == "3":
                print("\n--- Search by Exact Name ---")
                name = input("Enter name: ").strip()
                
                if name:
                    manager.search_by_exact_name(name)
                else:
                    print("Name cannot be empty!")
            
            elif option == "4":
                manager.display_all_forward()
            
            elif option == "5":
                manager.display_all_backward()
            
            elif option == "6":
                print("\nThank you for using Contact Management System!")
                print("Goodbye!\n")
                break
            
            else:
                print("\nInvalid option! Please choose 1-6.\n")
        
        except KeyboardInterrupt:
            print("\n\nExiting program...")
            break
        except Exception as e:
            print(f"\nAn error occurred: {e}\n")


if __name__ == "__main__":
    main()