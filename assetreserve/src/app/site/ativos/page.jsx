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
      const dados = await buscarAtivos();
      setAtivos(dados || []);
      setCarregando(false);
    }
    carregarDados();
  }, []);

  function abrirModal(ativo) {
    setAtivoSelecionado(ativo);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", backgroundColor: "var(--color-bg)" }}>
      <h1>Galeria de Ativos Disponíveis</h1>

      {carregando ? (
        <p style={{ textAlign: "center" }}>Carregando...</p>
      ) : (
        <Galeria listaAtivos={ativos} aoClicar={abrirModal} />
      )}

      {modalAberto && ativoSelecionado && (
        <div 
          onClick={fecharModal}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "var(--color-white)",
              padding: "20px",
              borderRadius: "10px",
              width: "90%",
              maxWidth: "500px",
              position: "relative",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
            }}
          >
            <button 
              onClick={fecharModal}
              style={{ position: "absolute", top: "10px", right: "15px", cursor: "pointer", border: "none", background: "none", fontSize: "20px" }}
            >
              &times;
            </button>

            <h2 style={{ color: "var(--color-primary)", marginBottom: "15px" }}>
              {ativoSelecionado.titulo}
            </h2>
            
            <img 
              src={ativoSelecionado.imagem} 
              style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px", marginBottom: "15px" }} 
            />

            <div style={{ color: "var(--color-text)", fontSize: "14px", lineHeight: "1.6" }}>
              <p><b>Categoria:</b> {ativoSelecionado.categoria}</p>
              <p><b>Capacidade:</b> {ativoSelecionado.capacidade || "Não informada"}</p>
            </div>

            <div style={{ marginTop: "25px" }}>
              <Link
                href={"/site/calendario?ativo=" + ativoSelecionado.titulo}
                style={{
                  display: "block",
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-white)",
                  textAlign: "center",
                  padding: "12px",
                  borderRadius: "6px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  transition: "0.3s"
                }}
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