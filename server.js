import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';

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
        process.exit(1); // Termina el proceso si hay un error en la conexión
    } else {
        console.log('Conectado a la base de datos');

        // Realiza una consulta simple para verificar la conexión
        connection.query('SELECT 1 + 1 AS solution', (err, results) => {
            if (err) {
                console.error('Error al realizar la consulta: ', err);
            } else {
                console.log('La conexión a la base de datos es exitosa, resultado de la consulta: ', results[0].solution);
            }
        });
    }
});

// Ruta para insertar datos en la base de datos
app.post('/Registro', (req, res) => {
    const { Nombre_Tutor, Nombre_Jugador, Contraseña, Correo, Edad_Jugador } = req.body;

    // Verifica que todos los campos necesarios estén presentes
    if (!Nombre_Tutor || !Nombre_Jugador || !Contraseña || !Correo || !Edad_Jugador) {
        return res.status(400).send('Todos los campos son necesarios');
    }

    const query = `INSERT INTO registro_usuario (Nombre_Tutor, Nombre_Jugador, Contraseña, Correo, Edad_Jugador) VALUES (?, ?, ?, ?, ?)`;

    connection.query(query, [Nombre_Tutor, Nombre_Jugador, Contraseña, Correo, Edad_Jugador], (err, result) => {
        if (err) {
            console.error('Error al insertar datos: ', err);
            return res.status(500).send('Error al insertar datos');
        } else {
            res.status(201).send('Datos insertados correctamente');
        }
    });
});

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error('Error no manejado: ', err);
    res.status(500).send('Algo salió mal en el servidor');
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
