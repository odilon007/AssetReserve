// Recupera as reservas do LocalStorage
const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
const reservasList = document.getElementById('reservasList');

function renderReservas() {
    reservasList.innerHTML = '';

    if (reservas.length === 0) {
        reservasList.innerHTML = '<p>Nenhuma reserva encontrada.</p>';
        return;
    }

    reservas.forEach((reserva, index) => {
        const card = document.createElement('div');
        card.classList.add('reserva-card');
        card.innerHTML = `
      <h3>${reserva.ativo}</h3>
      <p>📅 ${reserva.data}</p>
      <p>🕒 ${reserva.hora}</p>
      <button class="remove-btn" data-index="${index}">Remover</button>
    `;
        reservasList.appendChild(card);
    });

    // Botões de remover
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Botões de remover
            document.querySelectorAll('.remove-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const i = e.target.dataset.index;
                    const reserva = reservas[i];

                    // 🧩 Confirmação antes de remover
                    const confirmar = confirm(`Tem certeza que deseja remover a reserva de "${reserva.ativo}" no dia ${reserva.data} às ${reserva.hora}?`);

                    if (confirmar) {
                        reservas.splice(i, 1);
                        localStorage.setItem('reservas', JSON.stringify(reservas));
                        renderReservas(); // Atualiza a lista na tela
                    }
                });
            });

        });
    });
}

// Renderiza na tela
renderReservas();
