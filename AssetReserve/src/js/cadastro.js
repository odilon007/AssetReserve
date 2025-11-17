// cadastro.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastroForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value.trim();

        if (!nome || !email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        // Pega usuários existentes (agora suporta vários)
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        // Verifica se o email já existe
        const emailJaCadastrado = usuarios.some(user => user.email === email);

        if (emailJaCadastrado) {
            alert("Este email já está cadastrado!");
            return;
        }

        // Cria objeto do novo usuário
        const novoUsuario = {
            nome,
            email,
            senha
        };

        // Salva no array de usuários
        usuarios.push(novoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("Cadastro realizado com sucesso!");

        // Redireciona para o login
        window.location.href = "login.html";
    });
});
