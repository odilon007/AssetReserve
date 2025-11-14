// login.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value.trim();

        // Verifica se existe cadastro salvo no navegador
        const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

        if (!usuarioSalvo) {
            alert("Nenhum usuário cadastrado. Faça o cadastro primeiro.");
            return;
        }

        // Verifica credenciais
        if (email === usuarioSalvo.email && senha === usuarioSalvo.senha) {
            alert("Login realizado com sucesso!");
            window.location.href = "index.html";  // Redireciona para página principal
        } else {
            alert("Email ou senha incorretos.");
        }
    });
});
