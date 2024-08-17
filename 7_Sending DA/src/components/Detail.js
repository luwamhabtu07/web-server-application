import React, { useState, useEffect } from 'react';

const Detail = ({ selectedItem, onSave, onDelete }) => {
    const [item, setItem] = useState(selectedItem || {});

    useEffect(() => {
        setItem(selectedItem || {});
    }, [selectedItem]);

    const handleSave = () => {
        onSave(item);
    };

    const handleDelete = () => {
        onDelete(item._id);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setItem((prevItem) => ({ ...prevItem, [name]: value }));
    };

    return (
        <div>
            <h2>Details:</h2>
            <p>
                <label>
                    Title:
                    <input type="text" name="title" value={item.title || ''} onChange={handleChange} />
                </label>
                <label>
                    Author:
                    <input type="text" name="author" value={item.author || ''} onChange={handleChange} />
                </label>
                <label>
                    Date:
                    <input type="text" name="date" value={item.date || ''} onChange={handleChange} />
                </label>
            </p>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default Detail;
