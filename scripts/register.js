document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const senhaConfirmada = document.getElementById("senhaConfirmada").value;

    if (!nome || !email || !senha || !senhaConfirmada) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    if (senha !== senhaConfirmada) {
      alert("As senhas não conferem!");
      return;
    }
    //const response = await fetch(`${process.env.API_URL}/auth/register`, {
    //"http://localhost:3000/auth/register"

    try {
      const response = await fetch("https://regauthllibre-production.up.railway.app/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Para enviar cookies, se necessário
        body: JSON.stringify({
          name: nome,
          email: email,
          password: senha,
          confirmpassword: senhaConfirmada,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.msg);
        window.location.href = "login.html";
      } else {
        alert(`Erro: ${result.msg}`);
      }
    } catch (error) {
      alert("Erro ao registrar. Tente novamente.");
    }
  });
});
