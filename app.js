// Importa el módulo dotenv para cargar las variables de entorno desde el archivo .env
require('dotenv').config();
// Importa los módulos necesarios
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Crea una instancia de la aplicación Express
const app = express();

// Middleware para permitir solicitudes de diferentes dominios
app.use(cors());

// Conecta la base de datos MongoDB utilizando la URL proporcionada en las variables de entorno
mongoose.connect(process.env.MONGO_DB_URI)
    .then(result => {
        // Inicia el servidor Express una vez que se haya establecido la conexión a la base de datos
        app.listen(PORT, () => {
            console.log(`Servidor escuchando exitosamente en el puerto ${PORT}`);
        });
        console.log("Conexión exitosa a la base de datos");
    })
    .catch((err) => console.log(err));

// Define el esquema del producto utilizando Mongoose
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: Number,
},
    { timestamps: true }
);

// Crea el modelo Product basado en el esquema definido
const Product = mongoose.model('Product', productSchema);

// Middleware para analizar el cuerpo de las solicitudes entrantes como JSON
app.use(express.json());

// Ruta para manejar las solicitudes POST de productos
app.post('/api/v1/products', async (req, res) => {
    // Verifica si se proporciona el nombre del producto en el cuerpo de la solicitud
    if (!req.body.name) {
        // Si no se proporciona, responde con un código de estado 400 (Bad Request) y un mensaje de error
        res.status(400).json({
            ok: false,
            message: "El campo nombre del producto es obligatorio"
        });
        return;
    }

    // Crea una nueva instancia del modelo Product con los datos proporcionados en el cuerpo de la solicitud
    const newProduct = new Product(req.body);
    // Guarda el nuevo producto en la base de datos
    await newProduct.save()
        .then((result) => {
            // Si se guarda correctamente, responde con un código de estado 201 (Created) y un objeto de respuesta exitosa
            res.status(201).json({ ok: true });
        })
        .catch((err) => {
            // Si hay un error al guardar, responde con un código de estado 500 (Internal Server Error)
            res.status(500).json({ ok: false });
        });
});

// Puerto en el que se ejecutará el servidor, obtenido de las variables de entorno
const PORT = process.env.PORT;
