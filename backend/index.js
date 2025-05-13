const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const filePath = './registros.json';
const usersFilePath = './users.json'; // Aquí almacenaremos los usuarios registrados

const secretKey = 'tu-secreto'; // Cambia esto por una clave segura en producción

// RUTA: Registro de usuario
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  // Encriptar la contraseña
  const hashedPassword = bcrypt.hashSync(password, 10);

  // Verificar si el usuario ya existe
  let users = [];
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath);
    users = JSON.parse(data);
  }

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  // Guardar el nuevo usuario
  users.push({ username, password: hashedPassword });
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

  res.status(201).json({ message: 'Usuario registrado' });
});

// RUTA: Login de usuario
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  // Verificar usuario
  let users = [];
  if (fs.existsSync(usersFilePath)) {
    const data = fs.readFileSync(usersFilePath);
    users = JSON.parse(data);
  }

  const user = users.find(user => user.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }

  // Generar token JWT
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  res.json({ message: 'Login exitoso', token });
});

// RUTA: Lista de hábitos (restringida a usuarios logueados)
app.get('/registros', (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
  } catch (e) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : '[]';
  res.json(JSON.parse(data));
});

// POST - Nuevo hábito
app.post('/registros', (req, res) => {
  const nuevoRegistro = req.body;
  let registros = [];

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    registros = JSON.parse(data);
  }

  registros.push(nuevoRegistro);
  fs.writeFileSync(filePath, JSON.stringify(registros, null, 2));
  res.status(201).json({ message: 'Registro guardado' });
});

// RUTA: Formulario de contacto
app.post('/contacto', (req, res) => {
  const { nombre, apellido, email, mensaje } = req.body;

  if (!nombre || !apellido || !email || !mensaje) {
    return res.status(400).json({ message: 'Faltan campos en el formulario' });
  }

  // Leer registros actuales o crear arreglo nuevo
  const contactoFile = './mensajesContacto.json';
  let mensajes = [];

  if (fs.existsSync(contactoFile)) {
    const data = fs.readFileSync(contactoFile);
    mensajes = JSON.parse(data);
  }

  // Agregar nuevo mensaje
  mensajes.push({
    nombre,
    apellido,
    email,
    mensaje,
    fecha: new Date().toISOString()
  });

  // Guardar en archivo
  fs.writeFileSync(contactoFile, JSON.stringify(mensajes, null, 2));

  res.status(201).json({ message: 'Mensaje recibido' });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});