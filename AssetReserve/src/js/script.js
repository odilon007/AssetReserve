import { assets } from './data.js';

const gallery = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalImage = document.getElementById('modalImage');
const modalDetails = document.getElementById('modalDetails');
const closeModal = document.getElementById('closeModal');
const reservationForm = document.getElementById('reservationForm');
// Define automaticamente a data atual no campo de data
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.value = today;
dateInput.min = today;
const categoryFilter = document.getElementById('categoryFilter');
const capacityFilter = document.getElementById('capacityFilter');

// Funções auxiliares de LocalStorage
function getReservations() {
  return JSON.parse(localStorage.getItem('reservas')) || [];
}

function saveReservation(reserva) {
  const reservas = getReservations();
  reservas.push(reserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));
}

function isReserved(title, date, time) {
  const reservas = getReservations();
  return reservas.some(r => r.title === title && r.date === date && r.time === time);
}

// Renderiza os cards
export function renderAssets(data = assets) {
  gallery.innerHTML = data.map(asset => `
    <div class="asset" data-category="${asset.category}">
      <img src="${asset.image}" alt="${asset.title}">
      <h3>${asset.title}</h3>

      ${asset.capacity ? `<p>Capacidade: ${asset.capacity} pessoas</p>` : ''}

      <p class="status ${asset.available ? '' : 'unavailable'}">
        ${asset.available ? 'Disponível' : 'Indisponível'}
      </p>
    </div>
  `).join('');
}


// Modal
function openModal(assetTitle) {
  const asset = assets.find(a => a.title === assetTitle);
  if (!asset) return;

  modalTitle.textContent = asset.title;
  modalImage.src = asset.image;
  modalDetails.textContent = `Capacidade: ${asset.details.capacity}\nConexões: ${asset.details.connections}`;

  // mostra o modal
  modal.style.display = 'flex';

  // força o navegador a renderizar antes de aplicar o fade
  requestAnimationFrame(() => {
    modal.classList.add('show');
  });
}

function hideModal() {
  modal.classList.remove('show');

  const handleTransitionEnd = (e) => {
    if (e.propertyName === 'opacity') {
      modal.style.display = 'none';
      modal.removeEventListener('transitionend', handleTransitionEnd);
    }
  };

  modal.addEventListener('transitionend', handleTransitionEnd);
}

// fecha ao clicar no X
closeModal.addEventListener('click', hideModal);

// fecha ao clicar fora do conteúdo
modal.addEventListener('click', (e) => {
  if (e.target === modal) hideModal();
});


// Reserva
reservationForm.addEventListener('submit', e => {
  e.preventDefault();

  const ativo = modalTitle.textContent;
  const data = document.getElementById('date').value;
  const hora = document.getElementById('time').value;

  if (isReserved(ativo, data, hora)) {
    alert('Este ativo já está reservado para esse horário!');
    return;
  }

  const reserva = { ativo, data, hora };
  saveReservation(reserva);
  alert(`✅ Reserva confirmada para ${ativo} em ${data} às ${hora}!`);
  modal.style.display = 'none';
});


// Filtros
function filterAssets() {
  const category = categoryFilter.value;
  const capacity = capacityFilter.value;

  const filtered = assets.filter(a =>
    (!category || a.category === category) &&
    (!capacity || a.capacity === capacity)
  );
  renderAssets(filtered);
}

categoryFilter.addEventListener('change', filterAssets);
capacityFilter.addEventListener('change', filterAssets);

gallery.addEventListener('click', e => {
  const card = e.target.closest('.asset');
  if (card) openModal(card.querySelector('h3').textContent);
});
