import '../css/style.css';
import '../css/calendario.css';
import { ativos } from './data.js';

let dataCalendario = new Date(); 
let ativoSelecionado = null; 
let diaSelecionadoISO = null; 

const nomesMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const hojeISO = new Date().toISOString().split('T')[0];
const hojeDate = new Date(hojeISO + 'T00:00:00Z'); // Corrige fuso horário

// ===== ELEMENTOS DO DOM =====
const detalhesContainer = document.getElementById('ativo-detalhes');
const calendarioContainer = document.getElementById('calendario-container');
const horariosContainer = document.getElementById('horarios-container');
const modalConfirmacao = document.getElementById('confirmacao-reserva');
const fecharConfirmacao = document.getElementById('fechar-confirmacao');
const confirmacaoTexto = document.getElementById('confirmacao-texto');

//LOCALSTORAGE
function obterReservas() {
  return JSON.parse(localStorage.getItem('reservas')) || [];
}

function salvarReserva(novaReserva) {
  const reservas = obterReservas();
  reservas.push(novaReserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));
}

// iniciaçização
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const tituloAtivo = params.get('ativo');
  ativoSelecionado = ativos.find(a => a.titulo === tituloAtivo);

  if (!ativoSelecionado) {
    document.querySelector('main').innerHTML = '<h1>Ativo não encontrado.</h1><a href="index.html">Voltar</a>';
    return;
  }

  renderizarDetalhesAtivo();
  renderizarCalendario();
  adicionarEventosModalConfirmacao();
});

// DETALHES DO ATIVO 
function renderizarDetalhesAtivo() {
  detalhesContainer.innerHTML = `
    <img src="${ativoSelecionado.imagem}" alt="${ativoSelecionado.titulo}">
    <h2>${ativoSelecionado.titulo}</h2>
    <p><strong>Categoria:</strong> ${ativoSelecionado.categoria}</p>
    <p><strong>Capacidade:</strong> ${ativoSelecionado.detalhes.capacidade}</p>
    <p><strong>Conexões:</strong> ${ativoSelecionado.detalhes.conexoes}</p>
    <a href="index.html" class="link-voltar">← Mudar ativo</a>
  `;
}

// CALENDÁRIO 
function renderizarCalendario() {
  const ano = dataCalendario.getFullYear();
  const mes = dataCalendario.getMonth();
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const ultimoDia = new Date(ano, mes + 1, 0).getDate();

  let html = `
    <div class="calendario-header">
      <button id="prev-mes" class="btn-nav-calendario">&lt;</button>
      <h2>${nomesMeses[mes]} ${ano}</h2>
      <button id="next-mes" class="btn-nav-calendario">&gt;</button>
    </div>
    <div class="calendario-grid">
  `;

  diasSemana.forEach(dia => html += `<div class="dia-semana">${dia}</div>`);
  for (let i = 0; i < primeiroDia; i++) html += '<div class="dia-calendario vazio"></div>';

  for (let dia = 1; dia <= ultimoDia; dia++) {
    const dataISO = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
    const diaDate = new Date(dataISO + 'T00:00:00Z');
    let classes = 'dia-calendario';

    if (diaDate < hojeDate) classes += ' dia-passado';
    else if (dataISO === hojeISO) classes += ' hoje';
    if (dataISO === diaSelecionadoISO) classes += ' selecionado';

    html += `<div class="${classes}" data-dataiso="${dataISO}"><strong>${dia}</strong></div>`;
  }

  html += '</div>';
  calendarioContainer.innerHTML = html;
  adicionarEventosCalendario();
}

// EVENTOS DO CALENDÁRIO 
function adicionarEventosCalendario() {
  document.getElementById('prev-mes').addEventListener('click', () => {
    dataCalendario.setMonth(dataCalendario.getMonth() - 1);
    renderizarCalendario();
  });

  document.getElementById('next-mes').addEventListener('click', () => {
    dataCalendario.setMonth(dataCalendario.getMonth() + 1);
    renderizarCalendario();
  });

  document.querySelectorAll('.dia-calendario:not(.vazio):not(.dia-passado)').forEach(diaEl => {
    diaEl.addEventListener('click', () => {
      document.querySelectorAll('.dia-calendario.selecionado').forEach(el => el.classList.remove('selecionado'));
      diaEl.classList.add('selecionado');
      diaSelecionadoISO = diaEl.dataset.dataiso;
      renderizarHorarios(diaSelecionadoISO);
    });
  });
}

// HORÁRIOS
function renderizarHorarios(dataISO) {
  const reservas = obterReservas();
  const reservasDoDiaParaAtivo = reservas.filter(r => 
    r.data === dataISO && r.titulo === ativoSelecionado.titulo
  ).map(r => r.hora);

  const horariosCorretos = [];
  for (let hora = 7; hora <= 17; hora++) {
    horariosCorretos.push(`${String(hora).padStart(2, '0')}:00`);
  }

  let html = `<h3>Horários para ${dataISO}</h3><div class="horarios-grid">`;

  for (const hora of horariosCorretos) {
    if (reservasDoDiaParaAtivo.includes(hora)) {
      html += `<div class="horario-slot reservado">${hora} (Reservado)</div>`;
    } else {
      html += `<button class="horario-slot disponivel" data-hora="${hora}">${hora} (Disponível)</button>`;
    }
  }

  html += '</div>';
  horariosContainer.innerHTML = html;
  adicionarEventosHorarios(dataISO);
}

// EVENTOS DOS HORÁRIOS
function adicionarEventosHorarios(dataISO) {
  document.querySelectorAll('.horario-slot.disponivel').forEach(botao => {
    botao.addEventListener('click', () => {
      const hora = botao.dataset.hora;
      const novaReserva = {
        titulo: ativoSelecionado.titulo,
        descricao: ativoSelecionado.detalhes.conexoes,
        capacidade: ativoSelecionado.detalhes.capacidade,
        data: dataISO,
        hora: hora
      };
      salvarReserva(novaReserva);
      mostrarConfirmacao(novaReserva);
      renderizarHorarios(dataISO);
    });
  });
}

//  MODAL DE CONFIRMAÇÃO 
function mostrarConfirmacao(reserva) {
  confirmacaoTexto.innerText = `Você reservou ${reserva.titulo} no dia ${reserva.data} às ${reserva.hora}.`;
  modalConfirmacao.style.display = 'flex';
}

function adicionarEventosModalConfirmacao() {
  fecharConfirmacao.addEventListener('click', () => modalConfirmacao.style.display = 'none');
  modalConfirmacao.addEventListener('click', e => {
    if (e.target === modalConfirmacao) modalConfirmacao.style.display = 'none';
  });
}
