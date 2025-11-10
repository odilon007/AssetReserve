import ativos from './js/data.js'

// ===============================
// 1️⃣ GERAÇÃO DOS CARDS
// ===============================

function ativocard(ativo) {
  return `
    <div id="${ativo.id}" class="col-md-4 col-sm-6">
      <div class="card shadow-sm" data-category="${ativo.tipo}" data-capacity="${ativo.capacidade}">
        <div class="card-body">  
          <img src="${ativo.image}" class="card-img-top" alt="${ativo.title}">
          <h5 class="card-title">${ativo.title}</h5>
          <p class="card-text text-muted">${ativo.descricao}</p>
          <p class="card-text text-muted">Categoria: ${ativo.tipo}</p>
          <button class="btn open-modal btn-primary btn-reservar" data-id="${ativo.id}">Reservar</button>
        </div> 
      </div> 
    </div>
  `;
}

const main = document.querySelector('main');
if (main) {
  const allcards = ativos.map((ativo) => ativocard(ativo));
  main.innerHTML = allcards.join('');
}

// ===============================
// 2️⃣ MODAL DE RESERVA
// ===============================

const modal = document.getElementById("meuModal");
const btnFechar = document.getElementById("btnFechar");

function abrirModal() {
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function fecharModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

// Delegação de evento — funciona mesmo para elementos criados dinamicamente
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("open-modal")) {
    abrirModal();
  }

  if (e.target.id === "btnFechar") {
    e.preventDefault();
    fecharModal();
  }

  if (e.target === modal) {
    fecharModal();
  }
});

// ===============================
// 3️⃣ FILTROS DE CATEGORIA E CAPACIDADE
// ===============================

const filterCategory = document.getElementById('filter-category');
const filterCapacity = document.getElementById('filter-capacity');

function filtrarCards() {
  const category = filterCategory ? filterCategory.value : '';
  const capacity = filterCapacity ? filterCapacity.value : '';
  const cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    const cardCapacity = card.getAttribute('data-capacity');

    const matchesCategory = (category === '' || cardCategory === category);
    const matchesCapacity = (capacity === '' || cardCapacity === capacity);

    card.style.display = (matchesCategory && matchesCapacity) ? "block" : "none";
  });
}

if (filterCategory) filterCategory.addEventListener('change', filtrarCards);
if (filterCapacity) filterCapacity.addEventListener('change', filtrarCards);

// ===============================
// 4️⃣ LOGIN / LOGOUT
// ===============================

// PÁGINA DE LOGIN
if (window.location.pathname.includes("login.html")) {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      // Exemplo simples de autenticação
      if (email === "admin@teste.com" && senha === "1234") {
        localStorage.setItem("logado", "true");
        window.location.href = "index.html";
      } else {
        alert("E-mail ou senha incorretos!");
      }
    });
  }
}

// PÁGINA PRINCIPAL
if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
  const authButtons = document.getElementById("auth-buttons");

  if (authButtons) {
    if (localStorage.getItem("logado") === "true") {
      authButtons.innerHTML = `
        <button id="logout" class="btn btn-danger">Sair</button>
      `;
      document.getElementById("logout").addEventListener("click", () => {
        localStorage.removeItem("logado");
        window.location.href = "login.html";
      });
    } else {
      authButtons.innerHTML = `
        <a href="login.html" class="btn btn-light">Login</a>
      `;
    }
  }
}

console.log("✅ main.js carregado com sucesso!");
