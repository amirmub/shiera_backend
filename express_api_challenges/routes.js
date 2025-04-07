const express = require('express');
const router = express.Router();

const products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price:  500 },
  { id: 3, name: 'Tablet', price: 700 },
];

router.get('/products', (req, res) => {
  res.json(products);
});

router.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

module.exports = router;
