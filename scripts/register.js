/*3. Serviço de Gerenciamento de Usuários
Descrição: Gerencia informações de clientes e autenticação.
Funcionalidades:
Cadastro e login de clientes.
Atualização de informações do cliente.
Controle de acesso baseado em tokens JWT ou sessões.
Endpoints sugeridos:
POST /users/register - Cadastra um novo cliente.
POST /users/login - Autentica um cliente.
GET /users/{id} - Recupera informações de um cliente.
Tecnologias: Pode usar ferramentas como Firebase Authentication ou bibliotecas JWT para autenticação.
*/

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const senha = document.getElementById("senha");
    const senhaConfirmada = document.getElementById("senhaConfirmada");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita o envio padrão do formulário
  
      // Captura dos campos
      const nomeUsuario = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const senhaValor = senha.value;
      const senhaConfirmadaValor = senhaConfirmada.value;
  
      // Validação básica
      if (senhaValor !== senhaConfirmadaValor) {
        alert("As senhas não coincidem. Por favor, tente novamente.");
        return;
      }
  
      if (!nomeUsuario || !email || !senhaValor) {
        alert("Todos os campos devem ser preenchidos.");
        return;
      }
  
      // Simulando envio dos dados para um backend
      const usuario = {
        nome: nomeUsuario,
        email: email,
        senha: senhaValor,
      };
  
      fetch('/api/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            alert("Cadastro realizado com sucesso!");
          } else {
            alert("Erro no cadastro: " + data.message);
          }
        })
        .catch((error) => {
          console.error("Erro:", error);
          alert("Erro ao cadastrar.");
        });
      alert("Cadastro realizado com sucesso!");
  
      // Limpar o formulário
      form.reset();
    });
  });
  