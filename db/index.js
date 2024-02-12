const mongoose = require('mongoose');

const Product = require('../models/product.js')



const dbConnect = (app) => {
    // Conecta la base de datos MongoDB utilizando la URL proporcionada en las variables de entorno
    mongoose.connect(`mongodb+srv://isolerfacundo:${process.env.MONGO_DB_PASS}@development.l4tfmp0.mongodb.net/stock-app?retryWrites=true&w=majority`)
        .then(result => {
            // Puerto en el que se ejecutará el servidor, obtenido de las variables de entorno
            const PORT = process.env.PORT;
            // Inicia el servidor Express una vez que se haya establecido la conexión a la base de datos
            app.listen(PORT, () => {
                console.log(`Servidor escuchando exitosamente en el puerto ${PORT}`);
            });
            console.log("Conexión exitosa a la base de datos");
        })
        .catch((err) => console.log(err));

}


module.exports = dbConnect

