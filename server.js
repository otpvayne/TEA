import express from 'express';
import { createClient } from '@libsql/client';

// Configuración del cliente de base de datos
const client = createClient({
  url: 'libsql://monkey-otpvayne.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MjQ0MTg2MjUsImlkIjoiNWY4Y2IxMzQtNGFhNi00Njk4LWE3Y2MtNGFiZWIxMjY3NjkxIn0.UXrjLDAXZp9_uVzuitxfCOCka3vHz3tguOFGgS9lxZvIREMXuzlSOTAiFj_3GuezpFJiVwnTj9sy9kBbu8YiBg'
});

// Crear la aplicación Express
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de la solicitud en formato JSON
app.use(express.json());

// Ruta para manejar la solicitud de login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Verificar las credenciales en la base de datos
  try {
    // Realizar la consulta para verificar el usuario y la contraseña
    const result = await client.execute(`
      SELECT * FROM users WHERE username = ? AND password = ?;
    `, [username, password]);

    // Comprobar si se encontraron resultados
    if (result.rows.length > 0) {
      res.json({ message: 'Login exitoso' });
    } else {
      res.status(401).json({ message: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:3000`);
});

// Manejar la conexión y el cierre
async function closeConnection() {
  try {
    await client.close();
    console.log('Conexión cerrada exitosamente');
  } catch (error) {
    console.error('Error cerrando la conexión:', error);
  }
}

// Ejecutar el cierre de conexión cuando el proceso se termine
process.on('SIGINT', closeConnection);
process.on('SIGTERM', closeConnection);

// Ruta para manejar solicitudes GET a la raíz
app.get('/', (req, res) => {
  res.send('El servidor esta funcionando perfectamente');
});

// Ruta para manejar la solicitud de registro
app.post('/Registro', async (req, res) => {
  const { Nombre, Apellido, Usuario, Contraseña, Fecha_registro, Edad, Genero, Email } = req.body;
  const fecha_registro = new Date().toISOString().slice(0, 19).replace('T', ' '); // Formato: YYYY-MM-DD HH:MM:SS

  console.log('Datos recibidos:', { Nombre, Apellido, Usuario, Contraseña, Fecha_registro, Edad, Genero, Email });

  try {
    const result = await client.execute(`
      INSERT INTO Registro_usuario (Nombre, Apellido, Usuario, Contraseña, Fecha_registro, Edad, Genero, Email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `, [Nombre, Apellido, Usuario, Contraseña, Fecha_registro, Edad, Genero, Email]);

    console.log('Resultado de la inserción:', result);

    if (result.rowsAffected > 0) {
      res.json({ message: 'Registro exitoso' });
    } else {
      res.status(500).json({ message: 'Error al registrar el usuario' });
    }
  } catch (error) {
    console.error('Error en la inserción:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});