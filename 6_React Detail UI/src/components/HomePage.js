// src/components/HomePage.js
import React, { useState } from 'react';
import Detail from './Detail';

const HomePage = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleClear = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <h1>Item List</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id} onClick={() => handleItemClick(item)}>
            {item.name}
          </li>
        ))}
      </ul>
      <p>Select an item to view details.</p>
      {selectedItem ? (
        <Detail item={selectedItem} onClear={handleClear} />
      ) : (
        <p>Please select an item.</p>
      )}
    </div>
  );
};

export default HomePage;
