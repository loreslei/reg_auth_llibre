document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm"); // Seleciona o formulário
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita o comportamento padrão de recarregar a página

        // Coletando os valores dos campos do formulário
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        // Validando os dados no frontend
        if (!email || !senha) {
            alert("Todos os campos são obrigatórios!");
            return;
        }

        try {
            // Fazendo a requisição POST para o backend
            //"http://localhost:3000/auth/login"
            //const response = await fetch(`${process.env.API_URL}/auth/register`, {
            const response = await fetch("https://regauthllibre-production.up.railway.app/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // Define o tipo de dado enviado
                },
                credentials: "include", // Para enviar cookies, se necessário
                body: JSON.stringify({ email: email, password: senha }),
            });

            const result = await response.json();

            // Verificando a resposta do servidor
            if (response.ok) {
                alert(result.msg); // Mostra a mensagem de sucesso
                localStorage.setItem("token", result.token); // Salva o token no LocalStorage
                // Redireciona para uma página protegida, se necessário
                window.location.href = "home.html";
            } else {
                alert(`Erro: ${result.msg}`); // Mostra a mensagem de erro
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            alert("Ocorreu um erro ao fazer login. Tente novamente mais tarde!");
        }
    });
});
