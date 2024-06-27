const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

// Inicializa la aplicación Express
const app = express();
app.use(bodyParser.json());

// Ruta para obtener la lista completa de productos
app.get('/products', (req, res) => {
  res.json(db.getAllProducts());
});

// Ruta para obtener un único producto según su ID
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = db.getProductById(id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Ruta para agregar un nuevo producto
app.post('/products', (req, res) => {
  const { name, quantity, price } = req.body;
  if (!name || quantity === undefined || price === undefined) {
    return res.status(400).send('Todos los campos son obligatorios');
  }
  const newProduct = db.addProduct({ name, quantity, price });
  res.status(201).json(newProduct);
});

// Ruta para actualizar un producto existente
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, quantity, price } = req.body;
  const updatedProduct = db.updateProduct(id, { name, quantity, price });
  if (updatedProduct) {
    res.json(updatedProduct);
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Ruta para eliminar un producto por su ID
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const success = db.deleteProduct(id);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

// Inicia el servidor en el puerto 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

