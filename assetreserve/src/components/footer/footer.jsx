"use client";

import { useEffect, useState } from "react";

export function Footer({ modalAberto }) {
  const [visivel, setVisivel] = useState(true);
  const [ultimaPosicao, setUltimaPosicao] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const posicaoAtual = window.scrollY;

      if (posicaoAtual > ultimaPosicao && posicaoAtual > 50) {
        setVisivel(false);
      } else {
        setVisivel(true);
      }

      setUltimaPosicao(posicaoAtual);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [ultimaPosicao]);

  if (modalAberto) return null;

  return (
    <footer
      className={`
        fixed bottom-0 left-0 w-full
        bg-[#0B2545] text-white text-center p-3
        z-40 shadow-[0_-2px_5px_rgba(0,0,0,0.1)]
        transition-transform duration-300 ease-in-out
        ${visivel ? "translate-y-0" : "translate-y-full"}
      `}
    >
      <p>© 2025 AssetReserve — Todos os direitos reservados.</p>
    </footer>
  );
}
