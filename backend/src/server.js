const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const authRoutes = require('./routes/authRoutes');
const produtosRoutes = require('./routes/produtosRoutes');
const categoriasRoutes = require('./routes/categoriasRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// rotas API
app.use('/api/auth', authRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/categorias', categoriasRoutes);

// servir frontend estático
app.use('/', express.static(path.join(__dirname, '../../frontend')));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));
