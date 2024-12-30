//sections.js
const express = require('express');
const router = express.Router();

let sections = ['Hoje', 'Próximos 7 dias', 'Completas', 'Lixeira'];

// Obter todas as seções
router.get('/', (req, res) => {
  res.json(sections);
});

// Adicionar nova seção
router.post('/', (req, res) => {
  const { name } = req.body;
  if (!sections.includes(name)) {
    sections.push(name);
    res.status(201).json({ message: 'Section added', name });
  } else {
    res.status(400).json({ error: 'Section already exists' });
  }
});

// Remover seção
router.delete('/:name', (req, res) => {
  const { name } = req.params;
  sections = sections.filter((section) => section !== name);
  res.status(204).send();
});


module.exports = router;
