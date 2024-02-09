# Mini Aplicación de Registro de Productos

Esta mini aplicación permite registrar productos mediante un formulario sencillo. Utiliza una arquitectura de cliente-servidor, donde el frontend está desarrollado en React y alojado en Vercel, mientras que el backend está construido con Express y se aloja en Azure. La base de datos utilizada es MongoDB.

## Flujo de Información

El flujo de información en esta aplicación sigue los siguientes pasos:

1. El usuario accede al formulario de registro de productos en la interfaz de usuario alojada en Vercel.

2. El usuario ingresa el nombre y el precio del producto en el formulario.

3. Cuando el usuario envía el formulario, se activa un evento de `handleSubmit` en React.

4. El evento `handleSubmit` realiza una validación básica para asegurarse de que se ha ingresado un nombre de producto.

5. Se envía una solicitud POST al servidor backend (hosteado en Azure) a través de la ruta `http://localhost:4000/api/v1/products`.

6. El servidor Express recibe la solicitud POST y procesa los datos recibidos.

7. Los datos del producto se guardan en la base de datos MongoDB.

8. El servidor responde con un mensaje de confirmación al cliente.

9. Si la respuesta del servidor es exitosa, se muestra un mensaje de éxito en la consola del navegador.

10. El formulario se reinicia para permitir el registro de un nuevo producto.

## Componentes Principales

### Frontend (React - Vercel)

El componente principal del frontend es `App.js`, que contiene el formulario para registrar productos. Utiliza estados locales para manejar el estado del formulario y las interacciones del usuario.

### Backend (Express - Azure)

El backend consiste en un servidor Express que maneja las solicitudes POST en la ruta `/api/v1/products`. Este servidor interactúa con la base de datos MongoDB para almacenar los datos de los productos.

## Instalación y Ejecución

Para ejecutar la aplicación en un entorno local, sigue estos pasos:

1. Clona este repositorio en tu máquina local.

2. Instala las dependencias del frontend y del backend ejecutando `npm install` en las carpetas correspondientes.

3. Crea un archivo `.env` en la carpeta del backend y agrega las siguientes variables:

    ```plaintext
    PORT=***** // Puerto en el que funcionará el backend localmente
    MONGO_DB_PASS=********** // Contraseña de la base de datos MongoDB
    ```

4. Configura la conexión a tu base de datos MongoDB en el archivo de configuración del backend.

5. Ejecuta el servidor backend utilizando el comando `npm start` en la carpeta correspondiente.

6. Inicia el servidor frontend utilizando el comando `npm start` en la carpeta correspondiente.

7. Accede a la aplicación en tu navegador utilizando la URL proporcionada por el servidor frontend (normalmente `http://localhost:3000`).

## Configuración de Azure y GitHub Actions

Para mantener actualizado el servidor en Azure, puedes configurar GitHub Actions. Sigue estos pasos:

1. Configura tu aplicación en Azure para que sea accesible a través de GitHub. Esto puede incluir la creación de credenciales de acceso y la configuración de permisos.

2. Configura un flujo de trabajo en GitHub Actions para que despliegue automáticamente tu aplicación en Azure cada vez que haya cambios en tu repositorio de GitHub.

3. Asegúrate de que las credenciales de acceso a Azure estén correctamente configuradas en GitHub Actions para que pueda desplegar la aplicación sin problemas.

4. Verifica que el flujo de trabajo esté configurado para ejecutarse después de cada confirmación (push) al repositorio de GitHub.

## Tecnologías Utilizadas

- **Frontend**: React, Vercel
- **Backend**: Express, Azure
- **Base de Datos**: MongoDB

## Autor

Esta aplicación fue desarrollada por [Autor Nombre/Apellido]. 

¡Gracias por usar nuestra mini aplicación de registro de productos! Si tienes alguna pregunta o sugerencia, no dudes en ponerte en contacto con nosotros.
