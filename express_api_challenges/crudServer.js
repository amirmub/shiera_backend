const express = require('express');
const app = express();
const PORT = 5000;

app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', price: 1000 },
  { id: 2, name: 'Phone', price: 500 },
  { id: 3, name: 'Tablet', price: 700 }
];
let nextId = 3; 

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// GET one product by ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// POST product
app.post('/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  const newProduct = {
    id: nextId++,
    name,
    price
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
  console.log(newProduct);
});

// PUT a product
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  const product = products.find(p => p.id === id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  if (!name || price == null) {
    return res.status(400).json({ error: 'Name and price are required' });
  }

  product.name = name;
  product.price = price;
  res.json(product);
});

// DELETE a product
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const deletedProduct = products.splice(index, 1);
  res.json({ message: 'Product deleted', product: deletedProduct[0] });
});

app.listen(PORT, () => {
  console.log(`CRUD API running at http://localhost:${PORT}`);
});
