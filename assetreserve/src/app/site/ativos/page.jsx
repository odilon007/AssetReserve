"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import buscarAtivos from "@/services/ativos";
import Galeria from "@/components/ativos/galeria";
import FiltroAtivos from "@/components/ativos/FiltroAtivos";
import { supabase } from "@/lib/supabaseClient";

export default function AtivosPage() {
  const [filtroCategoria, setFiltroCategoria] = useState('');
  const [filtroCapacidade, setFiltroCapacidade] = useState('');
  const [ativos, setAtivos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [ativoSelecionado, setAtivoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  // Lógica de filtro
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
            .getPublicUrl(ativo.imagem);

          return { ...ativo, imagemUrl: data.publicUrl };
        });
        setAtivos(ativosComUrl);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setCarregando(false);
      }
    }
    carregarDados();
  }, []);

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
    // Container ajustado para mobile e desktop
    <main className="container mx-auto py-6 px-4 md:py-8">
      
      <header className="mb-6 md:mb-8">
        {/* Texto responsivo: menor no mobile, maior no desktop */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#0B2545]">
          Galeria de Ativos Disponíveis
        </h1>
      </header>

      <section className="flex flex-col gap-6 md:gap-10" aria-busy={carregando}>
        {carregando ? (
          <p className="text-center animate-pulse" role="status">Carregando...</p>
        ) : (
          <>
            <FiltroAtivos
              filtroCategoria={filtroCategoria}
              setFiltroCategoria={setFiltroCategoria}
              filtroCapacidade={filtroCapacidade}
              setFiltroCapacidade={setFiltroCapacidade}
            />
            {/* Certifique-se que o componente Galeria tenha classes como grid-cols-1 md:grid-cols-2 lg:grid-cols-3 */}
            <Galeria ativos={ativosFiltrados} aoClicar={abrirModal} />
          </>
        )}
      </section>

{/* --- MODAL RESPONSIVO --- */}
      {modalAberto && ativoSelecionado && (
        <div
          className="
    fixed inset-0 z-[99]
    flex justify-center
    items-start md:items-center
    p-4
    bg-black/60 backdrop-blur-sm
  "
          onClick={(e) => e.target === e.currentTarget && fecharModal()}
          role="dialog"
          aria-modal="true"
        >
          <article 
            className="
    bg-white w-full max-w-lg
    rounded-2xl shadow-2xl
    overflow-hidden flex flex-col
    max-h-[90vh]
    mt-6 md:mt-0
  "
          >
            {/* 1. Cabeçalho do Modal (Fixo) */}
            <header className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0 bg-white">
              <h2 className="text-lg md:text-xl font-bold text-[#0B2545] truncate pr-4">
                {ativoSelecionado.titulo}
              </h2>
              <button
                onClick={fecharModal}
                className="p-2 -mr-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Fechar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </header>

            {/* 2. Corpo do Modal (Rolagem Interna) */}
            <div className="overflow-y-auto p-5 space-y-5 overscroll-contain">
              <figure className="relative">
                <img
                  src={ativoSelecionado.imagemUrl}
                  alt={ativoSelecionado.titulo}
                  // max-h-48 garante que a imagem não ocupe a tela toda no mobile
                  className="w-full h-auto max-h-48 md:max-h-64 object-cover rounded-xl shadow-sm border border-gray-100"
                />
              </figure>

              <div className="space-y-4">
                {/* Grid de Informações */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <span className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Categoria</span>
                    <span className="text-sm sm:text-base text-[#0B2545] font-semibold block truncate">
                      {ativoSelecionado.categoria}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                    <span className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Capacidade</span>
                    <span className="text-sm sm:text-base text-[#0B2545] font-semibold block truncate">
                      {ativoSelecionado.capacidade || "N/A"}
                    </span>
                  </div>
                </div>

                {/* Detalhes */}
                {ativoSelecionado.detalhes && (
                  <div>
                    <h3 className="text-sm font-bold text-[#0B2545] mb-2">Detalhes e Observações</h3>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg border border-gray-100 leading-relaxed break-words min-h-[60px]">
                      {typeof ativoSelecionado.detalhes === "object"
                        ? JSON.stringify(ativoSelecionado.detalhes, null, 2).replace(/[{}"]/g, "")
                        : ativoSelecionado.detalhes}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 3. Rodapé do Modal (Fixo) */}
            <footer className="p-4 border-t border-gray-100 bg-white shrink-0 pb-6 md:pb-4">
              <Link
                href={`/site/calendario?ativo=${encodeURIComponent(ativoSelecionado.titulo)}`}
                className="flex items-center justify-center w-full bg-[#0B2545] text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-900 active:scale-[0.98] transition-all shadow-lg shadow-blue-900/20 text-sm md:text-base"
              >
                <span>Ver Disponibilidade</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Link>
            </footer>

          </article>
        </div>
      )}
    </main>
  );
}