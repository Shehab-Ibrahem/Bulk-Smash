const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'bulk_smash'
});

db.connect((err) => {
  if (err) return;
});

app.get('/api/products', (req, res) => {
  const sql = "SELECT * FROM products";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.post('/api/orders', (req, res) => {
  const { customer, items, total } = req.body;
  
  const orderQuery = "INSERT INTO orders (customer_name, address, phone, total_price) VALUES (?, ?, ?, ?)";
  
  db.query(orderQuery, [customer.fullName, customer.address, customer.phone, total], (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to create order" });
    
    const orderId = result.insertId;
    const itemQuery = "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?";
    const itemValues = items.map(item => [orderId, item.id, item.quantity, item.price]);
    
    db.query(itemQuery, [itemValues], (err) => {
      if (err) return res.status(500).json({ error: "Failed to save order items" });
      res.status(200).json({ message: "Order placed successfully!", orderId });
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => {});