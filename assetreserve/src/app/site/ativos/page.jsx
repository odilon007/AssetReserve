"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import buscarAtivos from "@/services/ativos";
import Galeria from "@/components/galeria";

export default function AtivosPage() {
  const [ativos, setAtivos] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [ativoSelecionado, setAtivoSelecionado] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarDados() {
      try {
        const dados = await buscarAtivos();
        setAtivos(dados || []);
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
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#0B2545]">
        Galeria de Ativos Disponíveis
      </h1>

      <div className="px-4">
        {carregando ? (
          <p className="text-center">Carregando...</p>
        ) : (
          <Galeria listaAtivos={ativos} aoClicar={abrirModal} />
        )}
      </div>

      {modalAberto && ativoSelecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
                     bg-white/10 backdrop-blur-sm
                     transition-opacity duration-300"
          onClick={(e) => e.target === e.currentTarget && fecharModal()}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-2xl
                       w-full max-w-xl
                       max-h-[75vh] overflow-y-auto
                       mx-4 relative
                       transform transition-all duration-300 ease-out
                       animate-modal-in"
          >
            <button
              onClick={fecharModal}
              className="absolute top-3 right-4 text-2xl font-bold
                         text-gray-400 hover:text-red-500 transition"
            >
              &times;
            </button>

            <h2 className="text-xl font-bold text-[#0B2545] mb-3 pr-8">
              {ativoSelecionado.titulo}
            </h2>

            <img
              src={ativoSelecionado.imagem}
              alt={ativoSelecionado.titulo}
              className="w-full h-44 object-cover rounded-lg mb-4 border"
            />

            <div className="space-y-2 mb-6 text-sm text-gray-700">
              <p>
                <span className="font-semibold text-[#0B2545]">Categoria:</span>{" "}
                {ativoSelecionado.categoria}
              </p>

              <p>
                <span className="font-semibold text-[#0B2545]">
                  Capacidade:
                </span>{" "}
                {ativoSelecionado.capacidade || "Não informada"}
              </p>

              {ativoSelecionado.detalhes && (
                <p className="text-xs bg-gray-50 p-2 rounded border mt-2">
                  {typeof ativoSelecionado.detalhes === "object"
                    ? JSON.stringify(ativoSelecionado.detalhes).replace(
                        /[{}"]/g,
                        " "
                      )
                    : ativoSelecionado.detalhes}
                </p>
              )}
            </div>

            <div className="text-center">
              <Link
                href={`/site/calendario?ativo=${encodeURIComponent(
                  ativoSelecionado.titulo
                )}`}
                className="inline-block w-full bg-[#0B2545] text-white font-bold
                          py-2.5 px-6 rounded-lg hover:bg-blue-900
                          transition-all shadow-md"
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
