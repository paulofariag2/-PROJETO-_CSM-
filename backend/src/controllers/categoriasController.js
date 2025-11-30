const pool = require('../config/db');

async function listar(req, res) {
  try {
    const [rows] = await pool.query('SELECT * FROM categorias ORDER BY name');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar categorias' });
  }
}

async function criar(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Nome obrigatório' });
    const [result] = await pool.query('INSERT INTO categorias (name) VALUES (?)', [name]);
    res.status(201).json({ id: result.insertId, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
}

module.exports = { listar, criar };
