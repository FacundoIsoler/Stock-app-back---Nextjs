const mongoose = require('mongoose');	

// Define el esquema del producto utilizando Mongoose
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
},
    { timestamps: true }
);

// Crea el modelo Product basado en el esquema definido
const Product = mongoose.model('Product', productSchema);

module.exports = Product;