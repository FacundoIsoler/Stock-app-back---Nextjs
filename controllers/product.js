const Product = require('../models/product.js')

const getProducts = async (req, res) => {
    const products = await Product.find()
    res.status(200).json({ ok: true, products, count: products.length })
}

const createProduct = (req, res) => {
    // Verifica si se proporciona el nombre del producto en el cuerpo de la solicitud
    if (!req.body.name) {
        // Si no se proporciona, responde con un código de estado 400 (Bad Request) y un mensaje de error
        res.status(400).json({
            ok: false,
            message: "El campo nombre del producto es obligatorio"
        });
        return;
    } // Crea una nueva instancia del modelo Product con los datos proporcionados en el cuerpo de la solicitud
    const newProduct = new Product(req.body);
    // Guarda el nuevo producto en la base de datos
    newProduct.save()
        .then((result) => {
            // Si se guarda correctamente, responde con un código de estado 201 (Created) y un objeto de respuesta exitosa
            res.status(201).json({ ok: true });
        })
        .catch((err) => {
            // Si hay un error al guardar, responde con un código de estado 500 (Internal Server Error)
            res.status(500).json({ ok: false });
        });
}

module.exports = { getProducts, createProduct }