const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./orders.db');

// Create tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    buyer_name TEXT NOT NULL,
    delivery_address TEXT NOT NULL,
    status TEXT DEFAULT 'Pending'
  )`);

  // Insert sample products
  db.run(`INSERT OR IGNORE INTO products (id, name, price) VALUES 
    (1, 'Tomatoes', 30),
    (2, 'Onions', 25),
    (3, 'Potatoes', 20),
    (4, 'Carrots', 35),
    (5, 'Apples', 80),
    (6, 'Bananas', 40)`);
});

// API Routes
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/orders', (req, res) => {
  const { product_name, quantity, buyer_name, delivery_address } = req.body;
  
  db.run(
    'INSERT INTO orders (product_name, quantity, buyer_name, delivery_address) VALUES (?, ?, ?, ?)',
    [product_name, quantity, buyer_name, delivery_address],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ order_id: this.lastID, message: 'Order placed successfully' });
    }
  );
});

app.get('/api/orders/:id', (req, res) => {
  const { id } = req.params;
  
  db.get('SELECT * FROM orders WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Order not found' });
    res.json(row);
  });
});

app.get('/api/admin/orders', (req, res) => {
  db.all('SELECT * FROM orders ORDER BY id DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.put('/api/admin/orders/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  
  db.run('UPDATE orders SET status = ? WHERE id = ?', [status, id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Order status updated' });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
