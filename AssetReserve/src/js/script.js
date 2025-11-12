import { ativos } from './data.js';

const galeria = document.getElementById('galeria');
const modal = document.getElementById('modal');
const modalTitulo = document.getElementById('modalTitulo');
const modalImg = document.getElementById('modalImagem');
const modalDetalhes = document.getElementById('modalDetalhes');
const fecharModalBtn = document.getElementById('fecharModalBtn');
const formularioReserva = document.getElementById('formularioReserva');

// Define automaticamente a data atual no campo de data
const campoData = document.getElementById('data');
const hoje = new Date().toISOString().split('T')[0];
campoData.value = hoje;
campoData.min = hoje;

const filtroCategoria = document.getElementById('filtroCategoria');
const filtroCapacidade = document.getElementById('filtroCapacidade');

// Funções auxiliares de LocalStorage
function obterReservas() {
  return JSON.parse(localStorage.getItem('reservas')) || [];
}

function salvarReserva(reserva) {
  const reservas = obterReservas();
  reservas.push(reserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));
}

function existeReserva(titulo, data, hora) {
  const reservas = obterReservas();
  return reservas.some(r => r.titulo === titulo && r.data === data && r.hora === hora);
}

// Renderiza os cards
export function renderizarAtivos(data = ativos) {
  galeria.innerHTML = data.map(ativo => `
    <div class="ativo" data-categoria="${ativo.categoria}">
      <img src="${ativo.imagem}" alt="${ativo.titulo}">
      <h3>${ativo.titulo}</h3>
      
      <p class="status ${ativo.disponivel ? '' : 'indisponivel'}">
        ${ativo.disponivel ? 'Disponível' : 'Indisponível'}
      </p>
    </div>
  `).join('');
}

// Modal
function abrirModal(tituloAtivo) {
  const ativo = ativos.find(a => a.titulo === tituloAtivo);
  if (!ativo) return;

  modalTitulo.textContent = ativo.titulo;
  modalImg.src = ativo.imagem;
  modalDetalhes.textContent = `Capacidade: ${ativo.detalhes.capacidade}\nConexões: ${ativo.detalhes.conexoes}`;

  modal.style.display = 'flex';
}

function fecharModalInstantaneo() {
  modal.style.display = 'none';
}

// fecha ao clicar no X
fecharModalBtn.addEventListener('click', fecharModalInstantaneo);

// fecha ao clicar fora do conteúdo
modal.addEventListener('click', (e) => {
  if (e.target === modal) fecharModalInstantaneo();
});

// Reserva
formularioReserva.addEventListener('submit', e => {
  e.preventDefault();

  const ativoTitulo = modalTitulo.textContent;
  const data = document.getElementById('data').value;
  const hora = document.getElementById('hora').value;

  const ativo = ativos.find(a => a.titulo === ativoTitulo);

  if (existeReserva(ativoTitulo, data, hora)) {
    alert('Este ativo já está reservado para esse horário!');
    return;
  }

  const reserva = {
    titulo: ativoTitulo,
    descricao: ativo.detalhes?.conexoes || "Sem descrição",
    capacidade: ativo.detalhes?.capacidade || "Não informado",
    data,
    hora
  };

  salvarReserva(reserva);
  alert(`Reserva confirmada para ${ativoTitulo} em ${data} às ${hora}!`);
  modal.style.display = 'none';
});

// Filtros
function filtrarAtivos() {
  const categoria = filtroCategoria.value;
  const capacidade = filtroCapacidade.value;

  const filtrados = ativos.filter(a =>
    (!categoria || a.categoria === categoria) &&
    (!capacidade || a.capacidade === capacidade)
  );
  renderizarAtivos(filtrados);
}

filtroCategoria.addEventListener('change', filtrarAtivos);
filtroCapacidade.addEventListener('change', filtrarAtivos);

galeria.addEventListener('click', e => {
  const card = e.target.closest('.ativo');
  if (card) abrirModal(card.querySelector('h3').textContent);
});
