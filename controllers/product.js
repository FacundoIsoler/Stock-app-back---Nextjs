const Movement = require('../models/movement.js')
const Product = require('../models/product.js')

const getProducts = async (req, res) => {
    const products = await Product.aggregate([
        {
            $match: { deleted: false },
        },
        {
            $sort: { _id: -1 },
        },
        {
            $limit: 10,
        },
        {
            $lookup: {
                from: "movements",
                localField: "_id",
                foreignField: "product",
                as: "movements"
            },
        },
        {
            $unwind: {
                path: "$movements",
                preserveNullAndEmptyArrays: true,
            }
        },
        {
            $group: {
                _id: { _id: '$_id', name: '$name', price: '$price' },
                stock: {
                    $sum: '$movements.quantity'
                },
            },
        },
        {
            $project: {
                _id: '$_id._id',
                name: '$_id.name',
                price: '$_id.price',
                stock: 1,
            },
        },
        {
            $sort: { name: 1 },
        },
    ])
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
        .then((product) => {
            // Si se guarda correctamente, responde con un código de estado 201 (Created) y un objeto de respuesta exitosa
            res.status(201).json({ ok: true, product });
        })
        .catch((err) => {
            // Si hay un error al guardar, responde con un código de estado 500 (Internal Server Error)
            res.status(500).json({ ok: false });
        });
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    await Product.findByIdAndUpdate(id, {
        deleted: true
    })
    res.status(200).json({ ok: true, message: 'Producto eliminado' })
}


const createMovement = (req, res) => {
    const { productId } = req.params
    const { type, quantity } = req.body
    const newMovement = new Movement({
        type,
        quantity: type === "Compra" ? quantity : quantity * -1,
        product: productId
    });
    // Guarda el nuevo producto en la base de datos
    newMovement.save()
        .then((movement) => {
            // Si se guarda correctamente, responde con un código de estado 201 (Created) y un objeto de respuesta exitosa
            res.status(201).json({ ok: true, movement });
        })
        .catch((err) => {
            // Si hay un error al guardar, responde con un código de estado 500 (Internal Server Error)
            res.status(500).json({ ok: false });
        });
}

const deleteMovement = async (req, res) => {
    const { id } = req.params
    await Movement.findByIdAndUpdate(id, {
        deleted: true
    })
    res.status(200).json({ ok: true, message: 'Movimiento eliminado' })
}

module.exports = { getProducts, createProduct, deleteProduct, createMovement, deleteMovement }