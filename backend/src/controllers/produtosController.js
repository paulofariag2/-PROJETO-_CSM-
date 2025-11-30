const pool = require('../config/db');

async function listar(req, res) {
  try {
    const [rows] = await pool.query(`
      SELECT p.id, p.name, p.description, p.price, p.category_id, c.name as category_name
      FROM produtos p
      LEFT JOIN categorias c ON p.category_id = c.id
      ORDER BY p.name
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao listar produtos' });
  }
}

async function visualizar(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(`
      SELECT p.id, p.name, p.description, p.price, p.category_id, c.name as category_name
      FROM produtos p
      LEFT JOIN categorias c ON p.category_id = c.id
      WHERE p.id = ?
    `, [id]);
    if (!rows.length) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao visualizar produto' });
  }
}

async function criar(req, res) {
  try {
    const { name, description, price, category_id } = req.body;
    if (!name || !price) return res.status(400).json({ error: 'Campos obrigatórios' });
    const [result] = await pool.query('INSERT INTO produtos (name, description, price, category_id) VALUES (?, ?, ?, ?)', [name, description || null, price, category_id || null]);
    res.status(201).json({ id: result.insertId, name, description, price, category_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
}

async function atualizar(req, res) {
  try {
    const { id } = req.params;
    const { name, description, price, category_id } = req.body;
    const [result] = await pool.query('UPDATE produtos SET name = ?, description = ?, price = ?, category_id = ? WHERE id = ?', [name, description || null, price, category_id || null, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ id, name, description, price, category_id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao atualizar produto' });
  }
}

async function deletar(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM produtos WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Produto não encontrado' });
    res.json({ message: 'Produto removido' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao deletar produto' });
  }
}

module.exports = { listar, visualizar, criar, atualizar, deletar };
