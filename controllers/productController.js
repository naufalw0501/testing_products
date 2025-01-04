const db = require('../models/db');

// GET /products
exports.getAllProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

// GET /products/:id
exports.getProductById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM products WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.length === 0) return res.status(404).json({ error: 'Product not found' });
        res.json(results[0]);
    });
};

// POST /products
exports.createProduct = (req, res) => {
    const { name, price } = req.body;
    if (!name || typeof price !== 'number' || price <= 0) {
        return res.status(400).json({ error: 'Invalid name or price' });
    }

    const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
    db.query(query, [name, price], (err, results) => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id: results.insertId, name, price });
    });
};

// DELETE /products/:id
exports.deleteProductById = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        if (results.affectedRows === 0) return res.status(404).json({ error: 'Product not found' });
        res.status(204).send();
    });
};
