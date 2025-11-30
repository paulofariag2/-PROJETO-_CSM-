-- criar database
CREATE DATABASE IF NOT EXISTS projeto_csm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE projeto_csm;

-- tabela users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(30) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- tabela categorias
CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- tabela produtos (relaciona com categorias)
CREATE TABLE IF NOT EXISTS produtos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  category_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categorias(id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- inserir dados iniciais
INSERT INTO categorias (name) VALUES ('Eletrônicos'), ('Livros'), ('Roupas');

-- criar usuário admin (senha: admin123 -> hashed manualmente ou via script)
-- você pode usar o script Node para criar usuário com bcrypt (veja backend/create_user.js)
