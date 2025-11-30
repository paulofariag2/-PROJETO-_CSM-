const express = require('express');
const router = express.Router();
const produtosController = require('../controllers/produtosController');
const auth = require('../middleware/auth');
const { permit } = require('../middleware/role');

router.get('/', produtosController.listar);
router.get('/:id', produtosController.visualizar);
router.post('/', auth, permit('admin','editor'), produtosController.criar);
router.put('/:id', auth, permit('admin','editor'), produtosController.atualizar);
router.delete('/:id', auth, permit('admin'), produtosController.deletar);

module.exports = router;
