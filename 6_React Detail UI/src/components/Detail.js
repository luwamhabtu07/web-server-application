// src/components/Detail.js
import React, { useState } from 'react';

const Detail = ({ item, onClear }) => {
  const [formData, setFormData] = useState(item);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClear = () => {
    onClear();
  };

  return (
    <div>
      <h2>Item Details</h2>
      <form>
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default Detail;
