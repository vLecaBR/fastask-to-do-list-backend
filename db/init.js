const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Tabela de seções
  db.run(`
    CREATE TABLE IF NOT EXISTS sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE
    );
  `);

  // Tabela de tarefas
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      completed BOOLEAN DEFAULT 0,
      section_id INTEGER,
      FOREIGN KEY (section_id) REFERENCES sections(id)
    );
  `);

  // Adicionar seções iniciais
  db.run(`INSERT OR IGNORE INTO sections (name) VALUES ('Hoje'), ('Lixeira'), ('Próximos 7 dias');`);
});

db.close();
