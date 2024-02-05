require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const path = require('path')
const app = express()


mongoose.connect(`mongodb+srv://isolerfacundo:${process.env.MONGO_DB_PASS}@development.l4tfmp0.mongodb.net/?retryWrites=true&w=majority`)
    .then(result => {
        app.listen(PORT, () => {
            console.log(`servidor escuchando exitosamente en el puerto ${PORT}`)
        })
        console.log("conexion exitosa a la base de datos")
    })
    .catch((err) => console.log(err))

    app.use(express.json());


app.post('/api/v1/products', (req, res) => {
    res.status(200).json({ ok: true })
})

app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT

