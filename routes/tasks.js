//tasks.js
const express = require('express');
const router = express.Router();

let tasks = []; // Lista simples para armazenar tarefas em memória

router.get('/', (req, res) => {
  const { section } = req.query;
  const tasksInSection = tasks.filter(task => task.section === section);  // Filtro pela seção
  res.json(tasksInSection);
});

// Adicionar nova tarefa
router.post('/', (req, res) => {
  const { text, section } = req.body;
  const newTask = { id: tasks.length + 1, text, section, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});


// Atualizar tarefa
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { completed, section } = req.body;
  const task = tasks.find((t) => t.id == id);

  if (task) {
    if (completed !== undefined) {
      task.completed = completed; // Atualiza o status da tarefa
    }
    if (section) {
      task.section = section; // Atualiza a seção, se for passado
    }
    res.json(task); // Retorna a tarefa atualizada para confirmar
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});



// Deletar tarefa
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((t) => t.id != id);
  res.status(204).send();
});

module.exports = router;
