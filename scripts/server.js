const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db'); // Banco de dados

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON
app.use(bodyParser.json());

// Rota para cadastrar usuário
app.post('/api/cadastro', (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios!" });
  }

  try {
    const insert = db.prepare('INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)');
    insert.run(nome, email, senha); // **Nota:** Adicione hash de senha no futuro para segurança.
    res.status(201).json({ success: true, message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      res.status(400).json({ success: false, message: "Email já cadastrado." });
    } else {
      res.status(500).json({ success: false, message: "Erro no servidor." });
    }
  }
});

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
