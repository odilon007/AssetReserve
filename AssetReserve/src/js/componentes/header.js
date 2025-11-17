export function carregarHeader() {
  document.body.insertAdjacentHTML('afterbegin', `
    <header>
    <nav>
      <a class="logo" href="./">AssetReserve</a>
      <ul class="nav-bar">
        <li><a href="./">Início</a></li>
        <li><a href="/Projeto-PW2/reservas.html">Reserva</a></li>
        <li><a href="./">Calendário</a></li>
        <li><a href="./">Fale conosco</a></li>
        <li><a href="./cadastro" class="btn btn-outline">Cadastrar</a></li>
        <li><a href="./login" class="btn btn-solid">Login</a></li>
      </ul>
    </nav>
  </header>
  `);
}
