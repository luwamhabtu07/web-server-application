import React, { useState, useEffect } from 'react';
import Detail from './Detail';

const Home = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetch('/api/items')
            .then((response) => response.json())
            .then((data) => setItems(data));
    }, []);

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    const handleSave = (item) => {
        fetch(`/api/items/${item._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item),
        })
        .then((response) => response.json())
        .then((updatedItem) => {
            setItems((prevItems) => prevItems.map((i) => (i._id === updatedItem._id ? updatedItem : i)));
        });
    };

    const handleDelete = (id) => {
        fetch(`/api/items/${id}`, { method: 'DELETE' })
        .then(() => {
            setItems((prevItems) => prevItems.filter((i) => i._id !== id));
            setSelectedItem(null);
        });
    };

    return (
        <div>
            <h1>Book Store</h1>
            <input type="text" placeholder="Enter a search term" />
            <ul>
                {items.map((item) => (
                    <li key={item._id} onClick={() => handleSelect(item)}>
                        {item.title}
                    </li>
                ))}
            </ul>
            {selectedItem && (
                <Detail selectedItem={selectedItem} onSave={handleSave} onDelete={handleDelete} />
            )}
        </div>
    );
};

export default Home;
