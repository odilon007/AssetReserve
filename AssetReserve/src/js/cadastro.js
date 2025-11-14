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

        // Verificar se já existe usuário cadastrado
        const usuarioExistente = JSON.parse(localStorage.getItem("usuario"));

        if (usuarioExistente && usuarioExistente.email === email) {
            alert("Este email já está cadastrado!");
            return;
        }

        // Criar objeto do novo usuário
        const novoUsuario = {
            nome,
            email,
            senha
        };

        // Salvar no localStorage
        localStorage.setItem("usuario", JSON.stringify(novoUsuario));

        alert("Cadastro realizado com sucesso!");

        // Redireciona para login
        window.location.href = "login.html";
    });
});
