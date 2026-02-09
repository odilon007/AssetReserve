"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Suspense } from "react";

import AtivoInfo from "@/components/calendario/AtivoInfo";
import Calendario from "@/components/calendario/Calendario";
import Horarios from "@/components/calendario/Horarios";

const REGEX_DATA = /^\d{4}-\d{2}-\d{2}$/;
const REGEX_HORA = /^\d{2}:00$/;

export default function CalendarioPage() {
  const searchParams = useSearchParams();
  const ativoTitulo = searchParams.get("ativo");

  const [ativo, setAtivo] = useState(null);
  const [dataAtual, setDataAtual] = useState(new Date());
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [horariosOcupados, setHorariosOcupados] = useState([]);

  const hoje = new Date();
  const horaAtual = hoje.getHours();
  const hojeISO = hoje.toLocaleDateString("sv-SE");

  const hojeZero = new Date();
  hojeZero.setHours(0, 0, 0, 0);

  useEffect(() => {
    async function carregarAtivo() {
      if (!ativoTitulo) return;

      const { data } = await supabase
        .from("ativos")
        .select("*")
        .eq("titulo", ativoTitulo)
        .single();

      if (data) {
        const { data: imgData } = supabase.storage
          .from("ativos-images")
          .getPublicUrl(data.imagem);

        setAtivo({ ...data, imagemUrl: imgData.publicUrl });
      }
    }

    carregarAtivo();
  }, [ativoTitulo]);

  useEffect(() => {
    if (!diaSelecionado) return;

    async function carregarReservas() {
      const { data } = await supabase
        .from("reservas")
        .select("horario")
        .eq("ativo", ativoTitulo)
        .eq("data", diaSelecionado);

      if (data) setHorariosOcupados(data.map(r => r.horario));
    }

    carregarReservas();
  }, [diaSelecionado, ativoTitulo]);

  function selecionarDia(dia) {
    const ano = dataAtual.getFullYear();
    const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
    const diaFmt = String(dia).padStart(2, "0");
    const dataString = `${ano}-${mes}-${diaFmt}`;

    if (REGEX_DATA.test(dataString)) {
      setDiaSelecionado(dataString);
    }
  }

  async function reservarHorario(hora) {
    if (!REGEX_HORA.test(hora)) return;

    const { data: { user } } = await supabase.auth.getUser();

    const nomeUsuario =
      user?.user_metadata?.nome || user?.email || "ANONIMO";

    const { error } = await supabase.from("reservas").insert({
      ativo: ativoTitulo,
      data: diaSelecionado,
      horario: hora,
      usuario: nomeUsuario,
      usuario_id: user.id
    });

    if (error) {
      console.log(error)
      alert("Erro ao reservar");
    } else {
      setHorariosOcupados((prev) => [...prev, hora]);
      alert("Reserva feita com sucesso ✅");
    }

    if (!error) {
      setHorariosOcupados([...horariosOcupados, hora]);
    }
  }

  if (!ativo) return <p className="text-center mt-10">Carregando...</p>;

  return (
    <Suspense fallback={<div>Carregando...</div>}>
    <div className="max-w-6xl mx-auto p-6 flex gap-8 flex-wrap">
      <AtivoInfo ativo={ativo} />

      <section className="flex-1 space-y-6">
        <Calendario
          dataAtual={dataAtual}
          setDataAtual={setDataAtual}
          diaSelecionado={diaSelecionado}
          selecionarDia={selecionarDia}
          hojeZero={hojeZero}
        />

        <div className="bg-white p-6 rounded shadow">
          <Horarios
            diaSelecionado={diaSelecionado}
            horariosOcupados={horariosOcupados}
            reservarHorario={reservarHorario}
            hojeISO={hojeISO}
            horaAtual={horaAtual}
          />
        </div>
      </section>
    </div>
    </Suspense>
  );
}
