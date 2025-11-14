import '../css/style.css';


// Recupera as reservas do LocalStorage
const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
const listaReservas = document.getElementById('listaReservas');

function renderizarReservas() {
  listaReservas.innerHTML = ''; // Limpa o conteúdo anterior

  if (reservas.length === 0) {
    listaReservas.innerHTML = '<p>Nenhuma reserva encontrada.</p>';
    return;
  }

  // Cria a tabela
  const tabela = document.createElement('table');
  tabela.classList.add('tabela-reservas');

  // Cabeçalho da tabela
  tabela.innerHTML = `
    <thead>
      <tr>
        <th>Ativo</th>
        <th>Descrição</th>
        <th>Capacidade</th>
        <th>Data</th>
        <th>Hora</th>
        <th>Ações</th>
      </tr>
    </thead>
  `;

  // Corpo da tabela
  const corpo = document.createElement('tbody');

  reservas.forEach((reserva, index) => {
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td>${reserva.titulo || '-'}</td>
      <td>${reserva.descricao || '-'}</td>
      <td>${reserva.capacidade || '-'}</td>
      <td>${reserva.data || '-'}</td>
      <td>${reserva.hora || '-'}</td>
      <td>
        <button class="botao-remover" data-index="${index}">Remover</button>
      </td>
    `;
    corpo.appendChild(linha);
  });

  tabela.appendChild(corpo);
  listaReservas.appendChild(tabela);

  // Função de remover reserva
  document.querySelectorAll('.botao-remover').forEach(botao => {
    botao.addEventListener('click', e => {
      const indice = e.target.dataset.index;
      const reserva = reservas[indice];
      const confirmar = confirm(`Deseja realmente remover a reserva de "${reserva.titulo}" (${reserva.data} às ${reserva.hora})?`);

      if (confirmar) {
        reservas.splice(indice, 1);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        renderizarReservas(); // Atualiza a tabela
      }
    });
  });
}

// Renderiza na tela
renderizarReservas();
