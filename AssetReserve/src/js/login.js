// login.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value.trim();

        // Busca usuário cadastrado
        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

        if (!usuarioSalvo) {
            alert("Nenhum usuário cadastrado. Faça o cadastro primeiro.");
            return;
        }

        // Valida email e senha
        if (email === usuarioSalvo.email && senha === usuarioSalvo.senha) {

            // Salva usuário logado
            const usuarioLogado = {
                nome: usuarioSalvo.nome,
                email: usuarioSalvo.email
            };

            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));

            alert("Login realizado com sucesso!");

            // Redireciona após login
            window.location.href = "/index.html";
        } 
        else {
            alert("Email ou senha incorretos.");
        }
    });
});
