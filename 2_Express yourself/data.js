// data.js

// Sample data: Array of objects
const items = [
  { id: 1, name: 'Ferrari', type: 'Car', model: '488 GTB', year: 2020 },
  { id: 2, name: 'Tesla Model S', type: 'Car', model: 'Model S', year: 2021 },
  { id: 3, name: 'Aloe Vera', type: 'Plant', species: 'Aloe barbadensis', usage: 'Medicinal' },
  { id: 4, name: 'The Dark Side of the Moon', type: 'Album', artist: 'Pink Floyd', year: 1973 },
  { id: 5, name: '1984', type: 'Book', author: 'George Orwell', genre: 'Dystopian' }
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
