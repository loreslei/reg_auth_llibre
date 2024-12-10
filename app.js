require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());


app.use(
  cors({
    origin: "https://regauthllibre-production.up.railway.app",
    credentials: true,
  })
);



const User = require("./models/User");

// Rota pública
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Bem-vindo à nossa API!" });
});

// Inicio tentativa
const path = require("path");

// Adiciona a pasta 'public' como estática
app.use(express.static("public"));

// Rota para servir o template de registro
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});

//Fim tentativa


// Rota de registro de usuário
app.post("/auth/register", async (req, res) => {
  const { name, email, password, confirmpassword } = req.body;

  if (!name || !email || !password || !confirmpassword) {
    return res.status(422).json({ msg: "Todos os campos são obrigatórios!" });
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "As senhas não conferem!" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(422).json({ msg: "Usuário já cadastrado!" });
  }

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(201).json({ msg: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao salvar o usuário." });
  }
});


// Rota de login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // Verifica se o email e senha foram fornecidos
  if (!email || !password) {
    return res.status(422).json({ msg: "E-mail e senha são obrigatórios!" });
  }

  // Busca o usuário no banco de dados
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ msg: "Usuário não encontrado!" });
  }

  // Verifica a senha
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ msg: "Senha inválida!" });
  }

  try {
    // Gera um token JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET, 
      { expiresIn: "1h" }
    );

    res.status(200).json({ msg: "Login realizado com sucesso!", token });
  } catch (error) {
    res.status(500).json({ msg: "Erro no servidor." });
  }
});


 const dbUser = process.env.DB_USER;
 const dbPassword = process.env.DB_PASS;

// Conexão com o banco de dados MongoDB
mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.a6hcx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )

  //
  .then(() => {
    app.listen(3000, () => {
      console.log(`API rodando na porta 3000!`);
    });
    
  })
  .catch((err) => console.error(err));
