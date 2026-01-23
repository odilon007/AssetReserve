"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

//

const REGEX_DATA_ISO = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const REGEX_HORARIO = /^([01]\d|2[0-3]):00$/;
const REGEX_TEXTO_SEGURO = /^[\w\sÀ-ÿ-]{1,50}$/;

export default function CalendarioPage() {
  const searchParams = useSearchParams();

  // 
  const ativoTituloBruto = searchParams.get("ativo");
  const ativoTitulo = REGEX_TEXTO_SEGURO.test(ativoTituloBruto || "")
    ? ativoTituloBruto
    : null;

  const [ativo, setAtivo] = useState(null);
  const [dataCalendario, setDataCalendario] = useState(new Date());
  const [diaSelecionadoISO, setDiaSelecionadoISO] = useState(null);
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  //

  const agora = new Date();
  const horaAtual = agora.getHours();

  // YYYY-MM-DD LOCAL 
  const dataHojeLocal = agora.toLocaleDateString("sv-SE");

  const hojeMeiaNoite = new Date();
  hojeMeiaNoite.setHours(0, 0, 0, 0);

  //

  useEffect(() => {
    async function buscarAtivo() {
      if (!ativoTitulo) return;

      const { data, error } = await supabase
        .from("ativos")
        .select("*")
        .eq("titulo", ativoTitulo)
        .single();

      if (!error) setAtivo(data);
    }

    buscarAtivo();
  }, [ativoTitulo]);

  // Busca agendamentos do dia

  useEffect(() => {
    async function buscarAgendamentos() {
      setHorariosOcupados([]);

      if (!diaSelecionadoISO || !ativoTitulo) return;

      // 
      if (!REGEX_DATA_ISO.test(diaSelecionadoISO)) return;

      const { data, error } = await supabase
        .from("agendamentos")
        .select("horario")
        .eq("ativo", ativoTitulo)
        .eq("data", diaSelecionadoISO);

      if (!error && data) {
        setHorariosOcupados(data.map((r) => r.horario));
      }
    }

    buscarAgendamentos();
  }, [diaSelecionadoISO, ativoTitulo]);

  // Funções-calendario

  const meses = [
    "Janeiro","Fevereiro","Março","Abril","Maio","Junho",
    "Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"
  ];

  const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  function getDiasDoMes() {
    const ano = dataCalendario.getFullYear();
    const mes = dataCalendario.getMonth();
    const primeiroDia = new Date(ano, mes, 1).getDay();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    const dias = [];
    for (let i = 0; i < primeiroDia; i++) dias.push(null);
    for (let d = 1; d <= ultimoDia; d++) dias.push(d);
    return dias;
  }

  function selecionarDia(dia) {
    const ano = dataCalendario.getFullYear();
    const mes = String(dataCalendario.getMonth() + 1).padStart(2, "0");
    const diaFmt = String(dia).padStart(2, "0");

    const iso = `${ano}-${mes}-${diaFmt}`;

    if (REGEX_DATA_ISO.test(iso)) {
      setDiaSelecionadoISO(iso);
    }
  }

  function mudarMes(offset) {
    const novaData = new Date(dataCalendario);
    novaData.setMonth(dataCalendario.getMonth() + offset);
    setDataCalendario(novaData);
  }


  // Reservar hora

  async function reservar(hora) {
    // 
    if (!REGEX_HORARIO.test(hora)) {
      alert("Horário inválido ⛔");
      return;
    }

    // Bloqueia horário passado no dia atual
    if (diaSelecionadoISO === dataHojeLocal && parseInt(hora) <= horaAtual) {
      alert("Esse horário já passou ⛔");
      return;
    }

    const { error } = await supabase.from("reservas").insert([
      {
        ativo: ativoTitulo,
        data: diaSelecionadoISO,
        horario: hora,
        usuario: "anonimo",
      },
    ]);

    if (error) {
      alert("Erro ao reservar: " + error.message);
    } else {
      setHorariosOcupados((prev) => [...prev, hora]);
      alert("Reserva confirmada ✅");
    }
  }

  if (!ativo) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-wrap gap-8">

      {/* ativo */}
      <section className="bg-white p-6 rounded-xl shadow w-full md:w-1/3 h-fit">
        <img src={ativo.imagem} className="rounded mb-4 w-full object-cover" />
        <h2 className="text-2xl font-bold text-[#0B2545]">{ativo.titulo}</h2>
        <p className="mt-2"><b>Categoria:</b> {ativo.categoria}</p>
        <p><b>Capacidade:</b> {ativo.capacidade}</p>
        <Link href="/site/ativos" className="text-blue-600 font-bold mt-4 block">
          ← Escolher outro ativo
        </Link>
      </section>

      {/* caledario */}
      <section className="flex-1 space-y-6">

        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => mudarMes(-1)} 
            className="cursor-pointer font-bold hover:opacity-70">◀</button>
            <h2 className="font-bold">
              {meses[dataCalendario.getMonth()]} {dataCalendario.getFullYear()}
            </h2>
            <button onClick={() => mudarMes(1)}
              className="cursor-pointer hover:opacity-70">▶</button>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center">
            {diasSemana.map(d => (
              <div key={d} className="font-bold text-gray-400">{d}</div>
            ))}

            {getDiasDoMes().map((dia, i) => {
              if (!dia) return <div key={i} />;

              const dataDoDia = new Date(
                dataCalendario.getFullYear(),
                dataCalendario.getMonth(),
                dia
              );

              const ehPassado = dataDoDia < hojeMeiaNoite;
              const iso =
                `${dataCalendario.getFullYear()}-${String(dataCalendario.getMonth() + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

              return (
                <div
                  key={i}
                  onClick={() => !ehPassado && selecionarDia(dia)}
                  className={`p-2 rounded cursor-pointer
                    ${iso === diaSelecionadoISO ? "bg-[#0B2545] text-white" : "bg-gray-50"}
                    ${ehPassado ? "opacity-30 cursor-not-allowed" : "hover:bg-blue-100"}
                  `}
                >
                  {dia}
                </div>
              );
            })}
          </div>
        </div>

        {/* horario */}
        <div className="bg-white p-6 rounded-xl shadow">
          {!diaSelecionadoISO ? (
            <p className="text-center text-gray-500">Selecione um dia</p>
          ) : (
            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 11 }, (_, i) => i + 7).map(h => {
                const hora = `${String(h).padStart(2, "0")}:00`;
                const reservado = horariosOcupados.includes(hora);
                const passouHoje =
                  diaSelecionadoISO === dataHojeLocal && h <= horaAtual;

                const desabilitado = reservado || passouHoje;

                return (
                  <button
                    key={hora}
                    disabled={desabilitado}
                    onClick={() => reservar(hora)}
                    className={`py-2 rounded font-bold
                      ${desabilitado
                        ? "bg-gray-200 text-gray-400 line-through"
                        : "bg-blue-200 hover:bg-blue-300"}
                    `}
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
