require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const taskRoutes = require('./routes/tasks');
const sectionRoutes = require('./routes/sections');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas
app.use('/tasks', taskRoutes);
app.use('/sections', sectionRoutes);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
