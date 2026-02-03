"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import buscarAtivos from "@/services/ativos";
import Galeria from "@/components/galeria-ativos/galeria";
import FiltroAtivos from "@/components/galeria-ativos/FiltroAtivos";
import { supabase } from "@/lib/supabaseClient";

export default function AtivosPage() {
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroCapacidade, setFiltroCapacidade] = useState('');  
  const [ativos, setAtivos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [ativoSelecionado, setAtivoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  const ativosFiltrados = ativos.filter(ativo => {
    const categoriaOk = filtroCategoria ? ativo.categoria === filtroCategoria : true;
    const capacidadeOk = filtroCapacidade ? ativo.capacidade === filtroCapacidade : true;
    return categoriaOk && capacidadeOk;
  });
  

  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await buscarAtivos();
        const ativosComUrl = (dados || []).map((ativo) => {
          const { data } = supabase.storage
          .from('ativos-images')
          .getPublicUrl(ativo.imagem)

          return {
            ...ativo,
            imagemUrl: data.publicUrl,
          };
        });

        setAtivos(ativosComUrl)
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

  // Trava o scroll do fundo quando o modal estiver aberto
  useEffect(() => {
    document.body.style.overflow = modalAberto ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [modalAberto]);

  const abrirModal = (ativo) => {
    setAtivoSelecionado(ativo);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setAtivoSelecionado(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#0B2545]">
        Galeria de Ativos Disponíveis
      </h1>

      <div className="flex flex-col gap-10">
        {carregando ? (
          <p className="text-center animate-pulse">Carregando...</p>
        ) : (
          <>
          <FiltroAtivos
            filtroCategoria={filtroCategoria}
            setFiltroCategoria={setFiltroCategoria}
            filtroCapacidade={filtroCapacidade}
            setFiltroCapacidade={setFiltroCapacidade}
          />
          <Galeria ativos={ativosFiltrados} aoClicar={abrirModal} />
          </>
        )}
      </div>

      {modalAberto && ativoSelecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300"
          onClick={(e) => e.target === e.currentTarget && fecharModal()}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xl max-h-[85vh] overflow-y-auto mx-4 relative transform transition-all duration-300 ease-out animate-in fade-in zoom-in"
          >
            <button
              onClick={fecharModal}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-red-500 transition"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-[#0B2545] mb-3 pr-8">
              {ativoSelecionado.titulo}
            </h2>

            <img
              src={ativoSelecionado.imagemUrl}
              alt={ativoSelecionado.titulo}
              className="w-full h-48 object-cover rounded-lg mb-4 border"
            />

            <div className="space-y-2 mb-6 text-sm text-gray-700">
              <p>
                <span className="font-semibold text-[#0B2545]">Categoria:</span>{" "}
                {ativoSelecionado.categoria}
              </p>

              <p>
                <span className="font-semibold text-[#0B2545]">Capacidade:</span>{" "}
                {ativoSelecionado.capacidade || "Não informada"}
              </p>

              {ativoSelecionado.detalhes && (
                <div className="text-xs bg-gray-50 p-3 rounded border mt-2 text-gray-600 italic">
                  {typeof ativoSelecionado.detalhes === "object"
                    ? JSON.stringify(ativoSelecionado.detalhes).replace(/[{}"]/g, " ")
                    : ativoSelecionado.detalhes}
                </div>
              )}
            </div>

            <div className="text-center">
              <Link
                href={`/site/calendario?ativo=${encodeURIComponent(ativoSelecionado.titulo)}`}
                className="inline-block w-full bg-[#0B2545] text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-900 transition-all shadow-md"
              >
                Ver Disponibilidade
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}