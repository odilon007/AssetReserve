// Recupera as reservas do LocalStorage
const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
const reservasList = document.getElementById('reservasList');

function renderReservas() {
  reservasList.innerHTML = ''; // Limpa o conteúdo anterior

  if (reservas.length === 0) {
    reservasList.innerHTML = '<p>Nenhuma reserva encontrada.</p>';
    return;
  }

  // Cria a tabela
  const table = document.createElement('table');
  table.classList.add('tabela-reservas');

  // Cabeçalho da tabela
  table.innerHTML = `
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
  const tbody = document.createElement('tbody');

  reservas.forEach((reserva, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${reserva.ativo || '-'}</td>
      <td>${reserva.descricao || '-'}</td>
      <td>${reserva.capacidade || '-'}</td>
      <td>${reserva.data || '-'}</td>
      <td>${reserva.hora || '-'}</td>
      <td>
        <button class="remove-btn" data-index="${index}">Remover</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  reservasList.appendChild(table);

  // Função de remover reserva
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const i = e.target.dataset.index;
      const reserva = reservas[i];
      const confirmar = confirm(`Deseja realmente remover a reserva de "${reserva.ativo}" (${reserva.data} às ${reserva.hora})?`);

      if (confirmar) {
        reservas.splice(i, 1);
        localStorage.setItem('reservas', JSON.stringify(reservas));
        renderReservas(); // Atualiza a tabela
      }
    });
  });
}

// Renderiza na tela
renderReservas();