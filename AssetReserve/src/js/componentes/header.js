export function carregarHeader() {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  let html = `
    <header>
      <nav>
        <a class="logo" href="./index.html">AssetReserve</a>

        <ul class="nav-bar">
          <li><a href="./index.html">Início</a></li>
          <li><a href="./reservas.html">Reserva</a></li>
          <li><a href="./calendario.html">Calendário</a></li>
          <li><a href="./contato.html">Fale conosco</a></li>
  `;

  // 🔥 Se estiver logado → mostra o nome e o botão de sair
  if (usuario) {
    html += `
          <li class="user-info"><span>Olá, ${usuario.nome}</span></li>
          <li><button id="btnSair" class="btn btn-solid">Sair</button></li>
    `;
  } 
  //  Se não estiver logado → mostra Cadastrar / Login
  else {
    html += `
          <li><a href="./cadastro.html" class="btn btn-outline">Cadastrar</a></li>
          <li><a href="./login.html" class="btn btn-solid">Login</a></li>
    `;
  }

  html += `
        </ul>
      </nav>
    </header>
  `;

  document.body.insertAdjacentHTML("afterbegin", html);

  // --- Evento do botão sair ---
  if (usuario) {
    document.getElementById("btnSair").addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      window.location.reload();
    });
  }
}
