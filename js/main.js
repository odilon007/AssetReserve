// Selecionando os elementos do DOM
const modal = document.getElementById("modal");
const btns = document.querySelectorAll(".detalhes");
const close = document.querySelector(".close");
const carroInfo = document.getElementById("carro-info");

// Dados dos carros
const carros = {
    "Ford Model T": "Lançado em 1908, foi o primeiro carro produzido em massa.",
    "Chevrolet Camaro 1967": "Lançado em 1967, um dos carros mais icônicos da GM."
    // Adicione mais carros aqui
};

// Função para abrir o modal
btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const carroName = e.target.previousElementSibling.innerText;
        carroInfo.innerText = carros[carroName];
        modal.style.display = "block";
    });
});

// Função para fechar o modal
close.addEventListener('click', () => {
    modal.style.display = "none";
});

// Fechar o modal quando clicar fora dele
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});
