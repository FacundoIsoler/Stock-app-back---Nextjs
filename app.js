// Importa el módulo dotenv para cargar las variables de entorno desde el archivo .env
require('dotenv').config();
// Importa los módulos necesarios
const express = require('express');
const cors = require('cors');
const dbConnect = require('./db')
const productRouter = require('./routes/product.js')


// Crea una instancia de la aplicación Express
const app = express();

dbConnect(app)

// Middleware para permitir solicitudes de diferentes dominios
app.use(cors());

// Middleware para analizar el cuerpo de las solicitudes entrantes como JSON
app.use(express.json());

// Ruta para manejar las solicitudes POST de productos
app.use('/api/v1/products', productRouter)
