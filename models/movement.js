const mongoose = require('mongoose');	

// Define el esquema del producto utilizando Mongoose
const movementSchema = new mongoose.Schema({
    type: String,
    quantity: Number,
    product: {type: mongoose.Schema.Types.ObjectId, ref: "Products"},
    deleted: {type: Boolean, default: false},
},
    { timestamps: true }
);

// Crea el modelo Product basado en el esquema definido
const Movement = mongoose.model('Movement', movementSchema);

module.exports = Movement;