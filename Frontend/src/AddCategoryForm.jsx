import React, { useState } from 'react';
import axios from 'axios';

function AddCategoryForm() {
  const [categoryData, setCategoryData] = useState({
    name: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryData({
      ...categoryData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/categories', categoryData);
      console.log('Category added:', response.data);
      // Reset form after successful submission
      setCategoryData({
        name: '',
      });
      window.location.reload();

    } catch (error) {
      console.error('Error adding category:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Add New Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name</label>
          <input
            type="text"
            name="name"
            value={categoryData.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Category</button>
      </form>
    </div>
  );
}

export default AddCategoryForm;
