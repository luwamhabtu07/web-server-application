// Sample data: Array of objects
const items = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', publisher: 'J.B. Lippincott & Co.', publicationDate: '1960' },
  { id: 2, title: 'The Joke', author: 'Milan Kundera', publisher: 'Secker & Warburg', publicationDate: '1967' },
  { id: 3, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', publisher: 'Charles Scribner\'s Sons', publicationDate: '1925' },
  { id: 4, title: 'Moby Dick', author: 'Herman Melville', publisher: 'Harper & Brothers', publicationDate: '1851' },
  { id: 5, title: 'Pride and Prejudice', author: 'Jane Austen', publisher: 'T. Egerton', publicationDate: '1813' }
];

// Get all items
function getAll() {
  return items;
}

// Get a single item by ID
function getItem(id) {
  return items.find(item => item.id === parseInt(id, 10));
}

// Export methods for use in other modules
export { getAll, getItem };
