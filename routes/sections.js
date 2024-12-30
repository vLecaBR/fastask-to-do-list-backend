const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const dbPath = process.env.DB_PATH;

// Conexão com o banco de dados
const db = new sqlite3.Database(dbPath);

// Listar todas as seções
router.get('/', (req, res) => {
  db.all(`SELECT * FROM sections`, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Criar uma nova seção
router.post('/', (req, res) => {
  const { name } = req.body;
  db.run(`INSERT INTO sections (name) VALUES (?)`, [name], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, name });
  });
});

// Deletar seção
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.run(`DELETE FROM sections WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Seção removida com sucesso!' });
  });
});

module.exports = router;
