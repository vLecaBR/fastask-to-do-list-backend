const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const dbPath = process.env.DB_PATH;

// Conexão com o banco de dados
const db = new sqlite3.Database(dbPath);

// Listar todas as tarefas por seção
router.get('/:sectionId', (req, res) => {
  const { sectionId } = req.params;
  db.all(`SELECT * FROM tasks WHERE section_id = ?`, [sectionId], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Criar uma nova tarefa
router.post('/', (req, res) => {
  const { text, sectionId } = req.body;
  db.run(
    `INSERT INTO tasks (text, section_id) VALUES (?, ?)`,
    [text, sectionId],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID, text, sectionId });
    }
  );
});

// Atualizar tarefa
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { text, completed } = req.body;
  db.run(
    `UPDATE tasks SET text = ?, completed = ? WHERE id = ?`,
    [text, completed, id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Tarefa atualizada com sucesso!' });
    }
  );
});

// Mover tarefa para a lixeira
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM tasks WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Tarefa removida com sucesso!' });
  });
});

module.exports = router;
