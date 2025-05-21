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
const usersFilePath = './users.json';

const secretKey = 'tu-secreto';
const { v4: uuidv4 } = require('uuid');


app.post('/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }


  const hashedPassword = bcrypt.hashSync(password, 10);

  let users = [];
  try {
    if (fs.existsSync(usersFilePath)) {
      const data = fs.readFileSync(usersFilePath);
      users = JSON.parse(data);
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error al leer el archivo de usuarios', error: err });
  }

  if (users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'El usuario ya existe' });
  }

  const newUser = {
    userId: uuidv4(),
    username,
    password: hashedPassword,
  };

  try {
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));

    res.status(201).json({
      message: 'Usuario registrado con éxito',
      userId: newUser.userId,
    });
  } catch (err) {
    return res.status(500).json({ message: 'Error al guardar el usuario', error: err });
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  let users = [];
  try {
    if (fs.existsSync(usersFilePath)) {
      const data = fs.readFileSync(usersFilePath);
      users = JSON.parse(data);
    }
  } catch (err) {
    return res.status(500).json({ message: 'Error al leer el archivo de usuarios', error: err });
  }

  const user = users.find(user => user.username === username);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }

  const token = jwt.sign({ userId: user.userId, username }, secretKey, { expiresIn: '1h' });
  res.json({ message: 'Login exitoso', token });
});

app.get('/registros', (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    const { userId } = decoded; 

    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : '[]';
    const registros = JSON.parse(data);

    const registrosFiltrados = registros.filter(registro => registro.userId === userId);

    res.json(registrosFiltrados);
  } catch (e) {
    return res.status(401).json({ message: 'Token inválido' });
  }
});


app.post('/registros', (req, res) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log('Decoded JWT:', decoded);
    const { userId } = decoded;

    const nuevoRegistro = { ...req.body, userId };

    let registros = [];
    try {
      if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        registros = JSON.parse(data);
      }
    } catch (err) {
      return res.status(500).json({ message: 'Error al leer los registros', error: err });
    }

    registros.push(nuevoRegistro);
    try {
      fs.writeFileSync(filePath, JSON.stringify(registros, null, 2));
      res.status(201).json({ message: 'Registro guardado' });
    } catch (err) {
      return res.status(500).json({ message: 'Error al guardar el registro', error: err });
    }
  } catch (e) {
    return res.status(401).json({ message: 'Token inválido' });
  }
});


app.post('/contacto', (req, res) => {
  const { nombre, apellido, email, mensaje } = req.body;

  if (!nombre || !apellido || !email || !mensaje) {
    return res.status(400).json({ message: 'Faltan campos en el formulario' });
  }

  const contactoFile = './mensajesContacto.json';
  let mensajes = [];

  if (fs.existsSync(contactoFile)) {
    const data = fs.readFileSync(contactoFile);
    mensajes = JSON.parse(data);
  }

  mensajes.push({
    nombre,
    apellido,
    email,
    mensaje,
    fecha: new Date().toISOString()
  });

  fs.writeFileSync(contactoFile, JSON.stringify(mensajes, null, 2));

  res.status(201).json({ message: 'Mensaje recibido' });
});


app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});