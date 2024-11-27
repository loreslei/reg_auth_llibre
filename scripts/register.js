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
      e.preventDefault();
      const nomeUsuario = document.getElementById("nome").value;
      const email = document.getElementById("email").value;
      const senhaValor = senha.value;
      const senhaConfirmadaValor = senhaConfirmada.value;
  
      
      if (senhaValor !== senhaConfirmadaValor) {
        alert("As senhas não coincidem. Por favor, tente novamente.");
        return;
      }
      
    });
  });
  