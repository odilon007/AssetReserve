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

      {modalAberto && ativoSelecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300 p-4"
          onClick={(e) => e.target === e.currentTarget && fecharModal()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-titulo"
        >
          {/* Modal agora ocupa 95% da tela no mobile e tem largura fixa no desktop */}
          <article 
            className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl w-full md:max-w-xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto relative transform transition-all duration-300 ease-out animate-in fade-in zoom-in"
          >
            <button
              onClick={fecharModal}
              className="absolute top-3 right-4 text-2xl font-bold text-gray-400 hover:text-red-500 transition p-1"
              aria-label="Fechar detalhes do ativo" 
            >
              &times;
            </button>

            <header className="mb-3 pr-8">
              <h2 id="modal-titulo" className="text-lg md:text-xl font-bold text-[#0B2545]">
                {ativoSelecionado.titulo}
              </h2>
            </header>

            <figure className="mb-6">
              <img
                src={ativoSelecionado.imagemUrl}
                alt={`Foto de ${ativoSelecionado.titulo}`}
                // Altura da imagem ajustada para mobile (h-40) e desktop (h-48)
                className="w-full h-40 md:h-48 object-cover rounded-lg mb-4 border"
              />
              <figcaption>
                <dl className="space-y-2 text-sm text-gray-700">
                  <div className="flex flex-col sm:flex-row sm:gap-1">
                    <dt className="font-semibold text-[#0B2545]">Categoria:</dt>
                    <dd>{ativoSelecionado.categoria}</dd>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:gap-1">
                    <dt className="font-semibold text-[#0B2545]">Capacidade:</dt>
                    <dd>{ativoSelecionado.capacidade || "Não informada"}</dd>
                  </div>

                  {ativoSelecionado.detalhes && (
                    <div className="mt-2">
                      <dt className="sr-only">Detalhes</dt> 
                      <dd className="text-xs bg-gray-50 p-3 rounded border text-gray-600 italic break-words">
                        {typeof ativoSelecionado.detalhes === "object"
                          ? JSON.stringify(ativoSelecionado.detalhes).replace(/[{}"]/g, " ")
                          : ativoSelecionado.detalhes}
                      </dd>
                    </div>
                  )}
                </dl>
              </figcaption>
            </figure>

            <footer className="text-center sticky bottom-0 bg-white pt-2">
              <Link
                href={`/site/calendario?ativo=${encodeURIComponent(ativoSelecionado.titulo)}`}
                className="block w-full bg-[#0B2545] text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-900 transition-all shadow-md text-sm md:text-base"
              >
                Ver Disponibilidade
              </Link>
            </footer>

          </article>
        </div>
      )}
    </main>
  );
}