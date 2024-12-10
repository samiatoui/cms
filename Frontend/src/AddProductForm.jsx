import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddProductForm() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock_quantity: '',
    category_id: '', // category_id is required to link the product to a category
  });

  const [categories, setCategories] = useState([]); // State to hold categories for the dropdown

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data); // Assume the API returns a list of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/products', productData);
      console.log('Product added:', response.data);
      // Reset form or show success message
      setProductData({
        name: '',
        description: '',
        price: '',
        stock_quantity: '',
        category_id: '', // Reset category
      });
    } catch (error) {
      console.error('Error adding product:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="decimal"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>Stock Quantity</label>
          <input
            type="number"
            name="stock_quantity"
            value={productData.stock_quantity}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>Category</label>
          <select
            name="category_id"
            value={productData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProductForm;
