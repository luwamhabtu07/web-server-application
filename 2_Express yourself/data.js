// data.js
const plants = [
    { id: 1, name: 'Fiddle Leaf Fig', type: 'Indoor', origin: 'West Africa', careLevel: 'Moderate' },
    { id: 2, name: 'Snake Plant', type: 'Indoor', origin: 'West Africa', careLevel: 'Low' },
    { id: 3, name: 'Cactus', type: 'Outdoor', origin: 'North America', careLevel: 'Low' },
    { id: 4, name: 'Rose', type: 'Outdoor', origin: 'Asia', careLevel: 'High' },
    { id: 5, name: 'Orchid', type: 'Indoor', origin: 'Tropical Asia', careLevel: 'High' }
];

export const getAll = () => plants;

export const getItem = (id) => plants.find(plant => plant.id === parseInt(id));
