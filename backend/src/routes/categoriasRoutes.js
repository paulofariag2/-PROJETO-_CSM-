const express = require('express');
const router = express.Router();
const categoriasController = require('../controllers/categoriasController');
const auth = require('../middleware/auth');
const { permit } = require('../middleware/role');

router.get('/', categoriasController.listar);
router.post('/', auth, permit('admin'), categoriasController.criar);

module.exports = router;
