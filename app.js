require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const app = express()


mongoose.connect(`mongodb+srv://isolerfacundo:${process.env.MONGO_DB_PASS}@development.l4tfmp0.mongodb.net/stock-app?retryWrites=true&w=majority`)
    .then(result => {
        app.listen(PORT, () => {
            console.log(`servidor escuchando exitosamente en el puerto ${PORT}`)
        })
        console.log("conexion exitosa a la base de datos")
    })
    .catch((err) => console.log(err))

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
},
    { timestamps: true }
)

const Product = mongoose.model('Product', productSchema)

app.use(express.json());


app.post('/api/v1/products', async (req, res) => {

    const newProduct = new Product(req.body)
    await newProduct.save()
        .then((result) => {
            res.status(201).json({ ok: true })
        })
        .catch((err) => {
            res.status(500).json({ ok: false })
        })


})

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT

