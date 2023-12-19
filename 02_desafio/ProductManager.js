const fs = require('fs');

class ProductManager {
constructor(path) {
    this.path = path;
    this.products = this.loadProducts();
}

loadProducts() {
    try {
    const data = fs.readFileSync(this.path, 'utf8');
    return JSON.parse(data);
    } catch (error) {
    return [];
    }
}

saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2), 'utf8');
}

addProduct(product) {
    product.id = this.products.length + 1;
    this.products.push(product);
    this.saveProducts();
}

getProducts() {
    return this.products;
}

getProductById(productId) {
    return this.products.find(product => product.id === productId);
}

updateProduct(productId, newData) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
    this.products[index] = { ...this.products[index], ...newData };
    this.saveProducts();
    return true;
    }
    return false;
}

deleteProduct(productId) {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
    this.products.splice(index, 1);
    this.saveProducts();
    return true;
    }
    return false;
}
}

// Ejemplo de uso
const manager = new ProductManager('productos.json');

// Agregar un producto
const newProduct = {
title: 'Producto 1',
description: 'Descripción del producto 1',
price: 10.99,
thumbnail: 'ruta/imagen1.jpg',
code: 'P001',
stock: 50
};
manager.addProduct(newProduct);

// Obtener todos los productos
const allProducts = manager.getProducts();
console.log('Todos los productos:', allProducts);

// Obtener un producto por ID
const productIdToGet = 1;
const productById = manager.getProductById(productIdToGet);
console.log('Producto por ID:', productById);

// Modificar un producto
const productIdToUpdate = 1;
const updatedData = {
title: 'Producto Actualizado',
price: 15.99,
stock: 40
};
if (manager.updateProduct(productIdToUpdate, updatedData)) {
console.log('Producto actualizado.');
} else {
console.log('Producto no encontrado.');
}

// Eliminar un producto
const productIdToDelete = 1;
if (manager.deleteProduct(productIdToDelete)) {
console.log('Producto eliminado.');
} else {
console.log('Producto no encontrado.');
}