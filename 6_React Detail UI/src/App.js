// src/App.js
import React, { useState } from 'react';
import HomePage from './components/HomePage';

const App = () => {
  const [items] = useState([
    { id: 1, name: 'To Kill a Mockingbird', description: 'A novel by Harper Lee published in 1960.' },
    { id: 2, name: '1984', description: 'A dystopian social science fiction novel by George Orwell.' },
    { id: 3, name: 'Moby-Dick', description: 'An 1851 novel by Herman Melville.' },
    { id: 4, name: 'Pride and Prejudice', description: 'A romantic novel of manners by Jane Austen.' },
    { id: 5, name: 'The Great Gatsby', description: 'A 1925 novel by F. Scott Fitzgerald.' },
  ]);

  return (
    <div>
      <HomePage items={items} />
    </div>
  );
};

export default App;
