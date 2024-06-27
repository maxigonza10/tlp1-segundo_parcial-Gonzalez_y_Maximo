let products = [];
let nextId = 1;

const getAllProducts = () => {
  return products;
};

const getProductById = (id) => {
  return products.find(p => p.id === id);
};

const addProduct = ({ name, quantity, price }) => {
  const newProduct = {
    id: nextId++,
    name,
    quantity: parseInt(quantity),
    price: parseFloat(price),
  };
  products.push(newProduct);
  return newProduct;
};

const updateProduct = (id, { name, quantity, price }) => {
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    const updatedProduct = { ...products[productIndex] };
    if (name) updatedProduct.name = name;
    if (quantity !== undefined) updatedProduct.quantity = parseInt(quantity, 10);
    if (price !== undefined) updatedProduct.price = parseFloat(price);
    products[productIndex] = updatedProduct;
    return updatedProduct;
  }
  return null;
};

const deleteProduct = (id) => {
  const productIndex = products.findIndex(p => p.id === id);
  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    return true;
  }
  return false;
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
