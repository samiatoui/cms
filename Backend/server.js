const express = require('express');
const cors = require('cors');
const db = require('./db'); // Ensure you have the db configuration in this file

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON requests

app.get('/api/categories', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM categories');
        res.status(200).json(result.rows); // Send the list of categories
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Server Error');
    }
});

app.get('/api/products', async (req, res) => {
  try {
      // Query to fetch all products
      const query = 'SELECT * FROM products';
      const result = await db.query(query);
      
      // Send the list of products as a response
      res.status(200).json(result.rows);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Server Error');
  }
});

// POST endpoint to add a new category
app.post('/api/categories', async (req, res) => {
    const { name } = req.body;
  
    // Validate input
    if (!name) {
        return res.status(400).send('Missing required fields');
    }
  
    try {
        // Corrected query: No need to insert category_id since it's auto-generated
        const query = `
            INSERT INTO categories (name)  -- category_id will auto-increment
            VALUES ($1) RETURNING category_id, name;
        `;
        const values = [name];
        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]); // Return the newly created category with its category_id
    } catch (err) {
        console.error('Error adding category:', err);
        res.status(500).send('Server Error');
    }
});

app.post('/api/products', async (req, res) => {
    const { name, description, price, stock_quantity, category_id } = req.body;
  
    // Validate input
    if (!name || !price || !category_id) {
      return res.status(400).send('Missing required fields');
    }
  
    try {
      // SQL query to insert product into the database
      const query = `
        INSERT INTO products (name, description, price, stock_quantity, category_id)
        VALUES ($1, $2, $3, $4, $5) RETURNING product_id, name, description, price, stock_quantity, category_id;
      `;
      const values = [name, description, price, stock_quantity, category_id];
  
      // Execute the query
      const result = await db.query(query, values);
  
      // Return the newly created product
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error adding product:', err);  // Log the error to the backend console
      res.status(500).send(`Server Error: ${err.message}`);  // Send detailed error message back to frontend
    }
  });
  
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
