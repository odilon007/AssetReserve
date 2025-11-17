import '../css/style.css';
import '../css/calendario.css';
import { ativos } from './data.js';

// Evita rodar o script 2x em modo DEV do Vite (Strict Mode)
if (window.__ATIVO_CALENDARIO_LOADED__) {
    console.warn("ativo-calendario.js ignorado (já foi carregado)");
} else {
    window.__ATIVO_CALENDARIO_LOADED__ = true;
}

// ===============================
let dataCalendario = new Date();
let ativoSelecionado = null;
let diaSelecionadoISO = null;

const nomesMeses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const hojeISO = new Date().toISOString().split('T')[0];
const hojeDate = new Date(`${hojeISO}T00:00:00`);

// ===== ELEMENTOS DO DOM =====
let detalhesContainer;
let calendarioContainer;
let horariosContainer;
let modalConfirmacao;
let fecharConfirmacao;
let confirmacaoTexto;

// LOCALSTORAGE
function obterReservas() {
    return JSON.parse(localStorage.getItem('reservas')) || [];
}

function salvarReserva(novaReserva) {
    const reservas = obterReservas();
    reservas.push(novaReserva);
    localStorage.setItem('reservas', JSON.stringify(reservas));
}

document.addEventListener('DOMContentLoaded', () => {

    // Evita executar o script antes do body estar totalmente montado
    detalhesContainer = document.getElementById('ativo-detalhes');
    calendarioContainer = document.getElementById('calendario-container');
    horariosContainer = document.getElementById('horarios-container');
    modalConfirmacao = document.getElementById('confirmacao-reserva');
    fecharConfirmacao = document.getElementById('fechar-confirmacao');
    confirmacaoTexto = document.getElementById('confirmacao-texto');

    if (!detalhesContainer || !calendarioContainer || !horariosContainer) {
        console.error("Containers não encontrados — impedindo renderização duplicada.");
        return;
    }

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

// ===============================
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

// ===============================
// CALENDÁRIO
function renderizarCalendario() {

    if (!calendarioContainer) return;

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

    for (let i = 0; i < primeiroDia; i++) 
        html += '<div class="dia-calendario vazio"></div>';

    for (let dia = 1; dia <= ultimoDia; dia++) {
        const dataISO = `${ano}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

        let classes = 'dia-calendario';

        const diaDate = new Date(`${dataISO}T00:00:00`);

        if (diaDate < hojeDate) classes += ' dia-passado';
        if (dataISO === hojeISO) classes += ' hoje';
        if (dataISO === diaSelecionadoISO) classes += ' selecionado';

        html += `<div class="${classes}" data-dataiso="${dataISO}"><strong>${dia}</strong></div>`;
    }

    html += `</div>`;
    calendarioContainer.innerHTML = html;

    adicionarEventosCalendario();
}

// ===============================
// EVENTOS DO CALENDÁRIO
function adicionarEventosCalendario() {

    const prevBtn = document.getElementById('prev-mes');
    const nextBtn = document.getElementById('next-mes');

    if (!prevBtn || !nextBtn) return;

    prevBtn.onclick = () => {
        dataCalendario.setMonth(dataCalendario.getMonth() - 1);
        renderizarCalendario();
    };

    nextBtn.onclick = () => {
        dataCalendario.setMonth(dataCalendario.getMonth() + 1);
        renderizarCalendario();
    };

    document.querySelectorAll('.dia-calendario:not(.vazio):not(.dia-passado)')
        .forEach(diaEl => {
            diaEl.addEventListener('click', () => {
                document.querySelectorAll('.dia-calendario.selecionado')
                    .forEach(el => el.classList.remove('selecionado'));

                diaEl.classList.add('selecionado');
                diaSelecionadoISO = diaEl.dataset.dataiso;

                renderizarHorarios(diaSelecionadoISO);
            });
        });
}

// ===============================
// HORÁRIOS
function renderizarHorarios(dataISO) {

    const reservas = obterReservas();
    const reservasDia = reservas
        .filter(r => r.data === dataISO && r.titulo === ativoSelecionado.titulo)
        .map(r => r.hora);

    const horarios = [];
    for (let h = 7; h <= 17; h++) {
        horarios.push(`${String(h).padStart(2, '0')}:00`);
    }

    let html = `<h3>Horários para ${dataISO}</h3><div class="horarios-grid">`;

    horarios.forEach(h => {
        if (reservasDia.includes(h)) {
            html += `<div class="horario-slot reservado">${h} (Reservado)</div>`;
        } else {
            html += `<button class="horario-slot disponivel" data-hora="${h}">${h} (Disponível)</button>`;
        }
    });

    html += `</div>`;
    horariosContainer.innerHTML = html;

    adicionarEventosHorarios(dataISO);
}

// EVENTOS DOS HORÁRIOS
function adicionarEventosHorarios(dataISO) {
    document.querySelectorAll('.horario-slot.disponivel').forEach(btn => {
        btn.addEventListener('click', () => {
            const hora = btn.dataset.hora;

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

// ===============================
// MODAL
function mostrarConfirmacao(reserva) {
    confirmacaoTexto.innerText =
        `Você reservou ${reserva.titulo} no dia ${reserva.data} às ${reserva.hora}.`;

    modalConfirmacao.style.display = 'flex';
}

function adicionarEventosModalConfirmacao() {
    fecharConfirmacao.addEventListener('click', () => {
        modalConfirmacao.style.display = 'none';
    });

    modalConfirmacao.addEventListener('click', e => {
        if (e.target === modalConfirmacao)
            modalConfirmacao.style.display = 'none';
    });
}
