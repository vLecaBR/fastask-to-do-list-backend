const express = require('express');
const router = express.Router();

let tasks = []; // Lista simples para armazenar tarefas em memória

// Obter todas as tarefas
router.get('/', (req, res) => {
  res.json(tasks);
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
  const { completed } = req.body;
  const task = tasks.find((t) => t.id == id);
  if (task) {
    task.completed = completed;
    res.json(task);
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
