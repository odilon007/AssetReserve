"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const REGEX_DATA = /^\d{4}-\d{2}-\d{2}$/;
const REGEX_HORA = /^\d{2}:00$/;

export default function CalendarioPage() {
const searchParams = useSearchParams();
const ativoTitulo = searchParams.get("ativo");

// Estados
const [ativo, setAtivo] = useState(null);
const [dataAtual, setDataAtual] = useState(new Date());
const [diaSelecionado, setDiaSelecionado] = useState(null);
const [horariosOcupados, setHorariosOcupados] = useState([]);

const hoje = new Date();
const horaAtual = hoje.getHours();
const hojeISO = hoje.toLocaleDateString("sv-SE");

const hojeZero = new Date();
hojeZero.setHours(0, 0, 0, 0);

const meses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

// Busca o ativo
useEffect(() => {
  async function carregarAtivo() {
    if (!ativoTitulo) return;

    const { data } = await supabase
      .from("ativos")
      .select("*")
      .eq("titulo", ativoTitulo)
      .single();

    setAtivo(data);
  }

  carregarAtivo();
}, [ativoTitulo]);

// Busca reservas do dia
useEffect(() => {
  if (!diaSelecionado) return;

  async function carregarReservas() {
    const { data } = await supabase
      .from("reservas")
      .select("horario")
      .eq("ativo", ativoTitulo)
      .eq("data", diaSelecionado);

    if (data) {
      setHorariosOcupados(data.map(r => r.horario));
    }
  }

  carregarReservas();
}, [diaSelecionado, ativoTitulo]);

function diasDoMes() {
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();
  const primeiroDia = new Date(ano, mes, 1).getDay();
  const totalDias = new Date(ano, mes + 1, 0).getDate();

  const dias = [];
  for (let i = 0; i < primeiroDia; i++) dias.push(null);
  for (let d = 1; d <= totalDias; d++) dias.push(d);

  return dias;
}

function selecionarDia(dia) {
  const ano = dataAtual.getFullYear();
  const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
  const diaFmt = String(dia).padStart(2, "0");
  const dataString = `${ano}-${mes}-${diaFmt}`;

  if (REGEX_DATA.test(dataString)) {
    setDiaSelecionado(dataString);
  }
}

function mudarMes(valor) {
  const novaData = new Date(dataAtual);
  novaData.setMonth(dataAtual.getMonth() + valor);
  setDataAtual(novaData);
}

async function reservarHorario(hora) {
  if (!REGEX_HORA.test(hora)) {
    alert("Hora inválida");
    return;
  }

  const { error } = await supabase.from("reservas").insert({
    ativo: ativoTitulo,
    data: diaSelecionado,
    horario: hora,
    usuario: "Estudante",
  });

  if (error) {
    alert("Erro ao reservar");
  } else {
    setHorariosOcupados([...horariosOcupados, hora]);
    alert("Reserva feita com sucesso");
  }
}

if (!ativo) return <p className="text-center mt-10">Carregando...</p>;

return (
  <div className="max-w-6xl mx-auto p-6 flex gap-8 flex-wrap">

    {/* Info do ativo */}
    <section className="bg-white p-6 rounded shadow w-full md:w-1/3">
      <img
        src={ativo.imagem}
        className="rounded mb-4 w-full h-48 object-cover"
        alt="Ativo"
      />
      <h2 className="text-xl font-bold">{ativo.titulo}</h2>
      <p><b>Categoria:</b> {ativo.categoria}</p>
      <p><b>Capacidade:</b> {ativo.capacidade}</p>
      <Link href="/site/ativos" className="block mt-4 font-bold">
        ← Voltar
      </Link>
    </section>

    {/* Calendário e horários */}
    <section className="flex-1 space-y-6">

      <div className="bg-white p-6 rounded shadow">
        <div className="flex justify-between mb-4">
          <button onClick={() => mudarMes(-1)}>◀</button>
          <h2 className="font-bold">
            {meses[dataAtual.getMonth()]} {dataAtual.getFullYear()}
          </h2>
          <button onClick={() => mudarMes(1)}>▶</button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center">
          {diasDoMes().map((dia, i) => {
            if (!dia) return <div key={i} />;

            const dataDia = new Date(
              dataAtual.getFullYear(),
              dataAtual.getMonth(),
              dia
            );

            const passado = dataDia < hojeZero;

            const iso = `${dataAtual.getFullYear()}-${String(
              dataAtual.getMonth() + 1
            ).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

            return (
              <div
                key={i}
                onClick={() => !passado && selecionarDia(dia)}
                className={`p-2 rounded cursor-pointer ${
                  passado ? "opacity-30" : "hover:bg-blue-100"
                } ${iso === diaSelecionado ? "bg-blue-500 text-white" : ""}`}
              >
                {dia}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        {!diaSelecionado ? (
          <p className="text-center">Escolha um dia</p>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {Array.from({ length: 11 }, (_, i) => i + 7).map((h) => {
              const hora = `${String(h).padStart(2, "0")}:00`;
              const reservado = horariosOcupados.includes(hora);
              const passouHoje = diaSelecionado === hojeISO && h <= horaAtual;

              const desabilitado = reservado || passouHoje;

              return (
                <button
                  key={hora}
                  disabled={desabilitado}
                  onClick={() => reservarHorario(hora)}
                  className={`py-2 rounded font-bold ${
                    desabilitado
                      ? "bg-gray-100 text-gray-300 line-through"
                      : "bg-blue-200 hover:bg-blue-300"
                  }`}
                >
                  {hora}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  </div>
);
}
