const path = require("path");

// Adiciona a pasta 'public' como estática
app.use(express.static("public"));

// Rota para servir o template de registro
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "register.html"));
});
