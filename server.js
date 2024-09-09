const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();

// Configura el body-parser para obtener datos POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configura la conexión a la base de datos MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'jive',
    port: 3307
});

// Verifica la conexión a la base de datos
connection.connect(err => {
    if (err) {
        console.error('Error conectando a la base de datos: ', err);
    } else {
        console.log('Conectado a la base de datos');
    }
});

// Ruta para insertar datos en la base de datos
app.post('/insertar', (req, res) => {
    const { nombre, usuario, contraseña } = req.body;
    
    const query = `INSERT INTO prueba1 (nombre, usuario, contraseña) VALUES (?, ?, ?)`;

    connection.query(query, [nombre, usuario, contraseña], (err, result) => {
        if (err) {
            console.error('Error al insertar datos: ', err);
            res.status(500).send('Error al insertar datos');
        } else {
            res.send('Datos insertados correctamente');
        }
    });
});
// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
